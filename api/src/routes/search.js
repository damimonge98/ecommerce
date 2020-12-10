const server = require('express').Router();
const { Product } = require('../db.js');

server.get('/?', (req, res) => {
    const name = req.query.name;
    Product.findAll({
        where: {
            name: name
        }
    })
        .then((products) => {
            return res.send(products);
        })
})

module.exports = server;