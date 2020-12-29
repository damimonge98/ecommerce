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

//editar cantidades del carrito 
server.put('/user/:idUser/cart', (req, res) => {
	const userId = req.params.idUser;
	const {productId,cantidad }=req.body;
	//encontrar orden que este en estado 'carrito'  y luego modificar la cantidad de cierto producto
	Order.findOne({ where: { userId, state:'carrito' } })
	.then(order=>{
		if(order){
			LineOrder.update({
				cantidad,
			},{ where: { orderId:order.id, productId  } },)
			.then(updateCantidad=>{
				if(updateCantidad){
					res.status(200).json({msg:'cantidad actualizada correctamente'})
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