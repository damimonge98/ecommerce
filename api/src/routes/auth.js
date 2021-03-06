const server = require('express').Router();
const  { User } = require('../db.js');
const cors = require('cors')
const bcript =require("bcrypt")
const passport = require('passport');
const jwt=require('jsonwebtoken');
require('../passport-config')(passport);

//login
server.post('/', (req, res,next) => {
	
	passport.authenticate("local",{session:false},(err,user,info)=>{
		if(err) throw err;
		if(!user) res.status(400).json({msg:'Email o Password incorrecto'})
		else{
			req.login(user,{session:false},err=>{
				if(err) throw err;
				//crear y asignar un token
				const body = { id: user.id, email: user.email }
				const token = jwt.sign({user:body},process.env.TOKEN_SECRET);
				res.header('auth-token',token).json({token});
			});
		}
	})(req,res,next);	
});


//Login con facebook
server.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
server.get('/auth/facebook/login_fb',
  passport.authenticate('facebook', { successRedirect: '/',
									  failureRedirect: '/login' }));
									  
module.exports = server