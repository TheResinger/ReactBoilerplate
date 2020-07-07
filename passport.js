const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const jwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');

const cookieExtractor = req => {
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

// Authorization
passport.use(new jwtStrategy({
    jwtFromRequest : cookieExtractor,
    secretOrKey : "#q5^BWnuH=nXzJDYqz9U%f9Sp#7#p%" 
}, (payload, done) => {
    User.findById({_id : payload.sub}, (err, user) => {
        if(err) return done(err, false);
        if(user) return done(null, user);
        else return done(null, false);
    })
}))

// Authenticated local strategy using username and password
passport.use(new localStrategy( (username, password, done) => {
    User.findOne({ username }, (err, user) => {
        // Error with database
        if(err) return done(err);

        // No user found
        if(!user) return done(null, false);

        // User found, compare password with hashed password in db
        user.comparePassword(password, done);

    })
}));
