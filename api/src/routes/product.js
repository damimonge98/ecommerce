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

module.exports = server;
