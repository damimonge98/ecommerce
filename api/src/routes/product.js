const server = require('express').Router();
const { Product , Categories,Product_Category,conn} = require('../db.js');
const Sequelize = require('sequelize');
const cors = require('cors');
const multer = require('multer');//midleware para manejar el archivod de imagen
const fs = require("fs");
const {promisify} = require("util");
const pipeline = promisify(require("stream").pipeline);
server.use(cors());

// Obtener todos los productos con su categoría 

server.get('/', (req, res, next) => {
	Product.findAll({
		include: {
			model: Categories
		}})
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

// Agregar producto

const upload = multer();
//ruta para guardar producto con sus categorias
server.post("/", upload.single("file"),async (req, res,next)=>{

	//procesar los  datos recibidos del formulario que hacen parte del body
	var { name, description, price,stock, genre } = req.body;
	const genreArray=genre.split`,`.map(x=>+x) //convirtiendo el string de generos en un array
	if(!Number.isInteger(genreArray[0])) next(new Error("Género invalido"));//validar que vengan enteros de id de generos

	//Procesar archivo de imagen recibido
	const {file} = req;	
	
	if (file.detectedFileExtension != ".jpg" && file.detectedFileExtension != ".png") next(new Error("Invalid file type"));
	const fileName = 'productoimg' + '_' + Date.now() + file.detectedFileExtension;
	var img = `http://localhost:3001/img/${fileName}`;//definiendo la url de la imagen que se va a guardar en la base de datos
	//guardar archivo de imagen en el servidor 
	await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../upload/img/${fileName}`)).catch(e=>{console.log(e)});

	
	// si todo salio bien entonces guardar producto en base de datos
	Product.create({
		name,
		description,
		price,
		stock,
		img,
	}).then(product=>{
			product.addCategories(genreArray);
			res.status(200).json(product)
	})
	.catch(e=>{
		res.status(400).json(e)
	}) 
});


//actualizar un producto
server.put('/:id', upload.single("file"),async (req, res, next) => {

	//procesar los  datos recibidos del formualrio que hacen parte del body
	var { name, description, price,stock, genre } = req.body;
	const genreArray=genre.split`,`.map(x=>+x) //convirtiendo el string de generos en un array
	if(!Number.isInteger(genreArray[0])) next(new Error("Género invalido"));//validar que vengan numeros de id de generos
	const { id } = req.params;//recueprando el id de la url
	

	//Encontrar las categorias que tiene el producto actualmente en la base de datos
	const productCat= await Product.findOne({
		include:{ model:Categories},
		where:{id:id},
	})

	//Procesar archivo de imagen recibido
	const {file} = req;	
	
	if(file){

		if (file.detectedFileExtension != ".jpg" && file.detectedFileExtension != ".png") next(new Error("Invalid file type"));
		//conseguir imagen anterior  que esta en la base de datos
		var fileNameAntiguo = productCat.img;
		var ultimoSlash = fileNameAntiguo.lastIndexOf("/"); 
		fileNameAntiguo=fileNameAntiguo.substring(ultimoSlash+1);
		//borrar la imagen antigua del servidor 
		if(fileNameAntiguo !== 'producto-sin-foto.jpg')
		await pipeline(fs.unlink(`${__dirname}/../upload/img/${fileNameAntiguo}`,function(){console.log('')})).catch(e=>{console.log(e)});
		
		const fileName = 'productoimg' + '_' + Date.now() + file.detectedFileExtension;//definiendo el nombde del archivo a guardar en el servidor
		var img = `http://localhost:3001/img/${fileName}`;//definiendo la url de la imagen que se va a guardar en la base de datos
		//guardar el nuevo archivo de imagen en el servidor 
		await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../upload/img/${fileName}`)).catch(e=>{console.log(e)});
	}

	try {
		const t = await conn.transaction(async (t) => {
			const product = await Product.update(
				{
					name,
					description,
					price,
					stock,
					img,
				},
				{ returning: true, where: { id } },
				{transaction: t}
			)
			
			//guardar las categorias conseguidas de la base de datos en un array
			const categoriesDB=[];
			productCat.categories.map(c=>{
				categoriesDB.push(c.id)
			})
			
			const productAct = await Product.findByPk(id,{transaction: t})
			const removeCategories= productAct.removeCategories(categoriesDB);
			const addCategories= productAct.addCategories(genreArray);
	
			res.status(201).json(productAct);
	
		});
	} catch (error) {
		res.status(400).json(error);
	}
 
});

// Ruta para cargar categoria a un producto

server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
	let { idProducto, idCategoria } = req.params;

	Product.findByPk(idProducto)
		.then(product => {
			if (!product) {
				return res
					.status(400) // este if no hace lo que espero que haga del todo bien pero todavía no la voy a borrar
					.json({ message: "No se encontraron categorías con ese id" });
			}
			product.addCategories([idCategoria])
				.then((products) => {
					if (!products) {
						return res
							.status(400)
							.json({ message: "No se encontraron productos con ese id." });
					}
					product.update({
						genre: Sequelize.fn('array_append', Sequelize.col('genre'), idCategoria)
					})	//array_append es una función de sequelize para concatenar arrays y col es para indicarle en que columna quiero agregar el dato
					res.status(201).json({ message: "Categoria agregada" });
				})
		})
})


// Ruta para remover categoria a un producto 

server.delete("/:idProducto/category/:idCategoria", (req, res, next) => {
	let { idProducto, idCategoria } = req.params;
	Product.findByPk(idProducto)
		.then((product) => {
			 if (!product) {
				return res
					.status(400)
					.json({ message: "No se encontraron categorías con ese id" });
			} 
			product.removeCategories([idCategoria])
				.then((products) => {
					if (!products) {
						return res
							.status(400)
							.json({ message: "No se encontraron productos con ese id" });
					}
					product.update({
						genre: Sequelize.fn('array_remove', Sequelize.col('genre'), idCategoria)
					}) // remuevo del array genre el valor que le paso como idCategoría, siempre y cuando coincidan, el update me actualiza el array a ese valor y el array_remove, lo saca
					res.status(200).json({ message: "Categoria borrada" });
				})
		})
})


// Ruta para "eliminar" productos

server.delete("/:id", async (req, res) => {

	const {id}= req.params
	const product = await Product.findOne({
		where:{
			id:id
		}
	})
	
	if (!product) {
		res.json({ message: "El id especificado no existe o contiene errores." });
	} else {
		const productDelete = await product.destroy();

		//conseguir imagen anterior  que esta en la base de datos
		var fileNameAntiguo = product.img;
		var ultimoSlash = fileNameAntiguo.lastIndexOf("/"); 
		fileNameAntiguo=fileNameAntiguo.substring(ultimoSlash+1);
		//borrar la imagen del servidor
		if(fileNameAntiguo !== 'producto-sin-foto.jpg')
		await pipeline(fs.unlink(`${__dirname}/../upload/img/${fileNameAntiguo}`,function(){console.log('')})).catch(e=>{console.log(e)});
		return res.json({productDelete,msg:'Producto eliminado'});
	}
	
});

// Ruta para obtener detalles de un ID específico

server.get('/:id', (req, res) => {
	Product.findOne({
		where: {
			id: req.params.id
		},
		include: {
			model: Categories
		}
	})
		.then(products => {
			res.send(products)
		})
});

// Ruta para obtener todos los productos de X categoría

server.get("/category/:nombreCat", (req,res) => {
	const name = req.params.nombreCat;
	Product.findAll ({
		include: {
			model: Categories,
			where : {name}
		}
	})
	.then ((products => {
		if (!products[0]) { //Comprueba si el array esta vació
			return res.status(400).json({message : "No se encontraron productos"})
		}
		res.status(201).json(products)
	}))
})



module.exports = server;