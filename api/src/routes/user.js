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

module.exports = server;