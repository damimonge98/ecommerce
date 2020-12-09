const server = require('express').Router();
const { Categories } = require('../db.js');

server.post("/", (req, res) => {
    const {name, description} = req.body
        Categories.create({
        name,
        description
        })
            .then((newCategorie)=>{
                res.status(201)
                res.send(newCategorie)
            })
})

module.exports = server;