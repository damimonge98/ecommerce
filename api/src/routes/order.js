const server = require('express').Router();
const { Order , User } = require('../db.js');
const cors = require('cors');
server.use(cors());

// Obtener todas las ordenes

server.get('/', (req, res, next) => {
	Order.findAll()
		.then(orders => {
			res.send(orders);
		})
		.catch(next);
});

// Ruta para obtener todas las ordenes de un usuario
server.get('user/:id/orders', (req, res,) => {
	const { userId } = req.params;
	Order.findAll ({
		include: {
			model: User, as: 'user',
			where: {id: userId}
		}
	})
		.then(orderUsers => {
			res.send(orderUsers);
		})
});



//ruta que retoma una orden en particular
server.get('/user/:id/orders', (req, res) => {
	const {id} = req.params;
	console.log(id)
	Order.findByPk(id)
	.then(order=>{
		if(order){
			res.status(200).json(order)
		}else{
			res.status(200).json({msj:`La orden con numero de id ${id} no existe`})
		}
	}).catch(e=>{
		res.status(400).json(e)
	})
});

module.exports = server;