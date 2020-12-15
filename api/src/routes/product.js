const server = require('express').Router();
const { Product , Categories} = require('../db.js');
const Sequelize = require('sequelize');
var cors = require('cors')

server.get('/', cors(), (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post("/", (req, res) => {
	const { name, description, price, genre, stock, img } = req.body
	Product.create({
		name,
		description,
		price,
		stock,
		genre,
		img
	})
		.then((newProduct) => {
			res.status(201)
			res.send(newProduct)
		}).catch(() => {
			res.status(400)
		})
})

//actualizar un producto
server.put('/:id', (req, res, next) => {
	const { id } = req.params;
	const { name, description, price, stock, img } = req.body;
	Product.update(
		{
			name,
			description,
			price,
			stock,
			img,
		},
		{ returning: true, where: { id } }

	).then(updateProduct => {
		res.status(201).json(updateProduct)
	}).catch((e) => {
		res.status(400).json({ MsjError: 'Por favor llene los campos obligatorios' })
	})

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

server.delete("/:id", (req, res) => {

	const {id}= req.params
	Product.findOne({
		where:{
			id:id
		}
	})
	.then((product) => {
	  if (!product) {
		res.json({ message: "El id especificado no existe o contiene errores." });
	  } else {
		product.destroy()
		return res.json({ message: "Product Delete" });
	  }

	});

});

//opción 2

//   router.delete('/delete/:id', (req, res) => {
//     const id = req.params.id;
//     Product.findByPk(id)
//         .then((result) => {
//             return Product.destroy({
//                 where: { id: id }
//             }).then((product) => {
//                 res.status(200).json({ mensaje: "El producto ha sido eliminado correctamente", data: result })
//             })
//         })

// });

//Ruta para obtener detalles de un ID específico
server.get('/:id', (req, res) => {
	Product.findOne({
		where: {
			id: req.params.id
		}
	})
		.then(products => {
			res.send(products)
		})
});

//Ruta para obtener todos los productos de X categoría
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
