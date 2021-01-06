const server = require('express').Router();
const  { User } = require('../db.js');
const cors = require('cors')
const multer = require('multer')
const {promisify} = require("util");
const fs = require("fs");
const bcript =require("bcrypt")

server.use(cors());

const upload= multer()
server.post("/",upload.single('file'),async(req, res) => {
	const {username, givenName, familyName, email, password, isAdmin } = req.body
	console.log(req.body)
	const hashPassword  =await bcript.hash(password,10)
	//Procesar archivo de imagen recibido
	const {file} = req;	
	if (file.detectedFileExtension != ".jpg" && file.detectedFileExtension != ".png") next(new Error("Invalid file type"));
	const fileName = 'userimg' + '_' + Date.now() + file.detectedFileExtension;
	var img = `http://localhost:3001/img-user/${fileName}`;//definiendo la url de la imagen que se va a guardar en la base de datos
	//guardar archivo de imagen en el servidor 
	const pipeline = promisify(require("stream").pipeline);
	await pipeline(file.stream,fs.createWriteStream(`${__dirname}/../upload/img-user/${fileName}`)).catch(e=>{console.log(e)});
	User.create({
        username,
        givenName,
        familyName,
        email,
        password:hashPassword,
        photoURL:img,
        isAdmin 
    })
		.then((newUser) => {
			
			res.send(newUser)
		}).catch((e) => {
            res.status(400)
            res.send(e)
		})
})
server.get('/', (req, res,) => {
	User.findAll({
		include: 
		{all:true}
	})
		.then(users => {
			res.send(users);
		})
});

server.delete("/:id", (req, res) => {

	const {id}= req.params
	User.findOne({
		where:{
			id:id
		}
	})
	.then((user) => {
	  if (!user) {
		res.json({ message: "El id especificado no existe o contiene errores." });
	  } else {
		user.destroy()
		return res.json({ message: "User Deleted" });
	  }

	});

});


server.put('/:id', (req, res) => {
	const {id} = req.params;
	const { username, email, givenName, familyName, password, photoURL, isAdmin } = req.body;
	User.update(
		{
			username,
			email,
			givenName,
			familyName,
			password,
			photoURL,
			isAdmin
		},
		{ returning: true, where: { id }}
	).then(updatedUser => {
		res.status(201).json(updatedUser)
	}).catch(e => {
		res.status(400).json( { MjsError: "Llene los campos obligatorios"} )
	})
});



 
module.exports = server;
