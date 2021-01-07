const  {User} = require('./db.js');
const bcrypt = require('bcrypt');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require('passport-jwt');
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
const FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function (passport){
   
    passport.use(
        new LocalStrategy({
            usernameField: 'email'
          },(email,password,done)=>{
              console.log(email)
            User.findOne({where:{email:email}})
            .then(user=>{
               
                if(!user) return done(null,false);
                bcrypt.compare(password, user.password,(err,result) =>{
                    if (err) throw err;
                    if (result===true){
                        return done(null,user);
                    }else{
                        return done(null,false);
                    }
                })
            }).catch(e=>{
                console.log(e);
            })
        })
    );

    passport.use(
        new JWTStrategy({
            secretOrKey: process.env.TOKEN_SECRET,
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
        },async (token,done)=>{
            try {
                return done(null,token.user);
            } catch (error) {   
                done(error);
            }
        })
    );   
    
    
    passport.use(new FacebookStrategy({
        clientID: process.env.CLIENT_ID_FB,
        clientSecret: process.env.CLIENT_SECRET_FB,
        callbackURL: "http://localhost:3001/user/login_fb"
      },
      function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({id:profile.id}, function(err, user) {
          if (err) { return done(err); }
          done(null, user);
        });
      }
    ));

}