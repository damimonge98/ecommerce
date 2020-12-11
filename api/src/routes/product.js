const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post("/", (req, res) => {
    const {name, description, price, Categories,stock,img} = req.body
       Product.create({
        name,
		description,
		price,
		stock,
		Categories,
		img
        })
            .then((newProduct)=>{
                res.status(201)
                res.send(newProduct)
            }).catch(()=>{
				res.status(400)
			})
})


//actualizar un producto
server.put('/:id', (req, res, next) => {
	const {id} = req.params;
	const {name,description,price,stock,img}=req.body;
	Product.update(
		{
			name,
			description,
			price,
			stock,
			img,
		},
		{returning: true, where: {id} }
		
	).then(updateProduct=>{
		res.status(201).json(updateProduct)
	}).catch((e)=>{
		res.status(400).json({MsjError:'Por favor llene los campos obligatorios'})
	})
		
});

// Ruta para cargar categoria a un producto

server.post("/:idProducto/category/:idCategoria", (req, res, next) => {
	let { idProducto, idCategoria } = req.params;
	Product.findOne({
	  where: {
		id: idProducto,
	  },
	})
	.then((product) => {
	  if (!product) {
		return res
		  .status(400)
		  .json({ message: "No se encontraron productos con ese id." });
	  }
	  product.addCategories(idCategoria);
	  res.status(201).json({ message: "Categoria agregada" });
	})
	.catch((err) => err);
   
  }
);

// Ruta para remover categoria a un producto

server.delete("/:idProducto/category/:idCategoria", (req, res, next) => {
	let { idProducto, idCategoria } = req.params;
	Product.findOne({
	  where: {
		id: idProducto,
	  },
	})
	  .then((product) => {
		if (!product) {
		  return res
			.status(400)
			.json({ message: "No se encontraron productos con ese id." });
		}
		product.removeCategories(idCategoria);
		res.status(201).json({ message: "Categoria borrada" });
	  })
	  .catch((err) => err);
  
});

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
		return res.json({ message: "PRODUCT DELETE" });
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

// //ruta para remover categoría a un producto- alternativa 2

// server.delete("/remove/:idProd/:idCat", (req, res) => {
//     const categoryId = req.params.idCat;
//     Product.findByPk(req.params.idProd)

//         .then(function (product) {
//             let prod = product;
//             prod.removeCategories(categoryId)
//         })
//         .then(function (deletedCategory) {
//             res.status(200).json({ message: "La categoria ha sido eliminada correctamente", data: deletedCategory })
//         })
//         .catch(function (err) {
//             res.status(400).json({ message: "No se agregó la categoría al producto", error: err })
//         })
// });


module.exports = server;
