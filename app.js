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

const userRouter = require('./routes/User');
app.use('/user', userRouter);

app.listen(port, () => { console.log(`Server is listening at http://localhost:${port}`)});