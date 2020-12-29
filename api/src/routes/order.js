const server = require('express').Router();
const { Order , User, LineOrder } = require('../db.js');
const Sequelize = require('sequelize');

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




//ruta para vaciar el carrito
server.delete('/user/:idUser/cart', (req, res) => {
	const userId = req.params.idUser;
	//encontrar orden que este en estado 'carrito'  y luego eliminar o todos los productos relacionados a esa orden y al usuarioid
	Order.findOne({ where: { userId, state:'carrito' } })
	.then(order=>{
		if(order){
			LineOrder.destroy({ where: { orderId: order.id }})
			.then(destroyProducts=>{
				if(destroyProducts){
					res.status(200).json({msg:'Carrito se vacio correctamente'})
				}
			}).catch(e=>{
				res.status(400).json(e)
			})
		}
	}).catch(e=>{
		res.status(400).json(e)
	})
});






module.exports = server;