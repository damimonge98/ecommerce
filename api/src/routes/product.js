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

module.exports = server;
