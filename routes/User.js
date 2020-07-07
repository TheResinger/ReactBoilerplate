const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const JWT = require('jsonwebtoken');

const passportConfig = require('../passport');
const User = require('../models/User');
const Todo = require('../models/Todo');

const signToken = userID => {
    return JWT.sign({ 
        iss : "Resinger",
        sub : userID
    }, "#q5^BWnuH=nXzJDYqz9U%f9Sp#7#p%", { expiresIn : "1h" });
}

userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if(err)
            res.status(500).json({ message : { msgBody : "A Database Error has Occured", msgError : true }});
        if(user)
            res.status(500).json({ message : { msgBody : "Username already exists.", msgError : true }});
        else {
            const newUser = new User({ username, password, role });
            newUser.save(err => {
                if(err) 
                    res.status(500).json({ message : { msgBody : "An Error saving the user has occured", msgError : true }});
                else
                    res.status(201).json({ message : { msgBody : "Account sucessfully created", msgError : false }});
            })
        }
    })
});

userRouter.post('/login', passport.authenticate('local', { session : false }), (req, res) => {
    if(req.isAuthenticated()){
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly : true, sameSite : true });
        res.status(200).json({ isAuthenticated : true, user : { username, role }});
    }
});

userRouter.get('/logout', passport.authenticate('jwt', { session : false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user : { username : "", role : ""}, success : true });
});

userRouter.post('/todo', passport.authenticate('jwt', { session : false }), (req, res) => {
    const todo = new Todo(req.body);
    todo.save( err => {
        if(err)
            res.status(500).json({ message : { msgBody : "A Database Error has Occured", msgError : true }}); 
        else {
            req.user.todos.push(todo);
            req.user.save(err => {
                if(err)
                    res.status(500).json({ message : { msgBody : "A Database Error has Occured", msgError : true }});
                else
                    res.status(201).json({ message : { msgBody : "Todo sucessfully created", msgError : false }});
            })
        }
    })
});

userRouter.get('/todos', passport.authenticate('jwt', { session : false }), (req, res) => {
    User.findById({ _id : req.user._id }).populate('todos').exec( (err, document) => {
        if(err)
            res.status(500).json({ message : { msgBody : "A Database Error has Occured", msgError : true }});
        else
            res.status(200).json({ todos : document.todos , authenticated : true});
    })
});

userRouter.get('/admin', passport.authenticate('jwt', { session : false }), (req, res) => {
    if(req.user.role === 'admin')
        res.status(200).json({ message : { msgBody : "You are an admin", msgError : false }});
    else
        res.status(403).json({ message : { msgBody : "You are not an admin", msgError : true }});
});

userRouter.get('/authenticated', passport.authenticate('jwt', { session : false }), (req, res) => {
    const { username, role } = req.user;
    res.status(200).json({ isAuthenticated : true, user : { username, role }});
});

module.exports = userRouter;