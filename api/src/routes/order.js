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

module.exports = server;