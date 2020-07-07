const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const app = express();
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

// Change connection string to PROCESS.ENV.
const dbConnectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernauth';

mongoose.connect(dbConnectionString, {useNewUrlParser : true, useUnifiedTopology: true}).then(() => console.log('MongoDB Connected')).catch((err) => console.log(err));

// Test code for new user being added
// const User = require('./models/User');
// const userInput = {
//     username : "TestGuy123",
//     password : "1234567",
//     role : "admin"
// }

// const user = new User(userInput);
// user.save((err, document) => {
//     if(err) console.log(err);
//     console.log(document);
// })

app.listen(port, () => { console.log(`Server is listening at http://localhost:${port}`)});