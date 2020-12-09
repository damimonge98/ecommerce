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


server.put("/:id", (req,res) => {
	const id = req.params.id;
	const name = req.body.name;
	const description = req.body.description;

	Categories.update ({
	name,
	description},
	{where: {id:id}}) 

	.then ((updateCategorie)=> {
		res.status(201)
		res.send("Categoria actualizada")
	})
})

module.exports = server;