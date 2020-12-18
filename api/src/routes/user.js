const server = require('express').Router();
const  {User} = require('../db.js');
const cors = require('cors')
server.use(cors());

server.post("/", (req, res) => {
	const {username, givenName, familyName, email, password, photoURL, isAdmin } = req.body
	User.create({
        username,
        givenName,
        familyName,
        email,
        password,
        photoURL,
        isAdmin 
    })
		.then((newUser) => {
			
			res.send(newUser)
		}).catch(() => {
            res.status(400)
            res.send("error")
		})
})
server.get('/', (req, res,) => {
	User.findAll()
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
		return res.json({ message: "User Delete" });
	  }

	});

});

module.exports = server;