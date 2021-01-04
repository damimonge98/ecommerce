const server = require('express').Router();
const { Order , User, LineOrder, Product } = require('../db.js');
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
server.get('/users/:id', (req, res,) => {
	const { id } = req.params;
	Order.findAll({
		where: { userId: id }
	})
		.then(orderUsers => {
			res.send(orderUsers);
		})
});



//ruta para vaciar el carrito
server.delete('/users/:idUser/cart', (req, res) => {
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

//editar cantidades del carrito 
server.put('/users/:idUser/cart', (req, res) => {
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

//ruta que retoma una orden en particular
server.get('/users/:id/orders', (req, res) => {
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

//Ruta para crear una orden nueva o agregar un producto a una que ya existe
server.post('/users/:idUser/cart', (req, res) => {
	const userId = req.params.idUser;
	const { productId } = req.body;
	// Busca una orden que no este "creada", por eso esta en carrito
	Order.findOne({ where: { userId: userId, state: 'carrito' } })
		.then(order => {
			// console.log(order);
			// Si no hay nada en el carrito, crea una orden en ese estado
			if (!order) {
				Order.create({
					state: 'carrito',
					userId: userId
				}).then(newOrder => {
					// Busca el producto pasado por body y crea una nueva linea de orden con el
					Product.findByPk(productId).then(product => {
						LineOrder.create({
							price: product.price,
							cantidad: 1,
							productId: productId,
							orderId: newOrder.id
						}).then(lineOrder => res.json(lineOrder));
					});
				});
			} else {
				// Si ya existe un carrito, busca el producto
				Product.findByPk(productId).then(product => {
					LineOrder.findOne({
						where: { productId: product.id, orderId: order.id }
					}).then(lineorder => {
						// Si no existe una linea de orden de ese producto en ese carrito, crea una nueva
						// console.log(lineorder)
						if(!lineorder) {
							LineOrder.create({
								price: product.price,
								productId: product.id,
								orderId: order.id
							}).then(lineOrder => res.json(lineOrder));
						} 
						else {
							// Aumenta en uno la cantidad de ese producto si ya existía una linea de orden creada
							lineorder.update({ cantidad: Number(lineorder.cantidad) + 1, price: Number(lineorder.price) + lineorder.price }).then(lineOrder => res.json(lineOrder));
						}
					});
				});
			}
		});
});

server.get("/users/:userId/cart", (req, res) => {
	const id = req.params.userId
	Order.findOne({
		where: { userId: id }
	})
		.then(orderUser => {
			LineOrder.findAll()
			.then(lineorder => {
				res.send(lineorder)
			})
		})
})

server.put("/:id", (req,res) => {
	const id = req.params.id
	const state = req.body.state
	if (id) {
		Order.update ({
			state:state},
			{where: {id:id}}
		)
		.then (orderUpdated => res.status(201).json("Estado de orden actualizado"))
		.catch (error => res.send(error))
	}

})

module.exports = server;
