// Top two lines added to decode line to connect to db
global.TextEncoder = require("util").TextEncoder;
global.TextDecoder = require("util").TextDecoder;

const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv/config');

// Middlewares
app.use(bodyParser.json());

// use middleware to check for auth

// Import routes
const postsRoute = require('./routes/posts');

app.use('/posts', postsRoute);
app.use(express.static('frontend/build'));

// Routes
app.get('/', (req, res) => {
    res.send('on home');
});

// Connect to db
mongoose.connect(process.env.DB_CONNECTION,
{useNewUrlParser: true},
() => console.log('connected to db')
);

// Listen to the server
app.listen(5000);