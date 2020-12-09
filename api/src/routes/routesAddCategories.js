const server = require('express').Router();
const { Categories } = require('../db.js');

//agrego el get a categorías para probar la funcionalidad del put y el delete
server.get('/', (req, res, next) => {
    Categories.findAll()
        .then(categories => {
            res.send(categories);
        })
        .catch(next);
});

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

server.delete(`/:id`, (req, res) => {
    Categories.destroy(
		{where: {id: req.params.id}
    })
        .then((deletedCategory) => {
            if (!deletedCategory) {
                return res.status(404).send({ error: 'No user' });
            }
            res.status(200).send('Removed Successfully');
        });
})

module.exports = server;