const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
app.set('port', (process.env.PORT || 5000));
app.use(cors());
app.use(bodyParser.json());
// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
}
app.listen(PORT, () => {
    console.log('Server listening on port ' + PORT);
});

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://admin:fYC1BsmoZQI9SIUA@cluster0.mufuf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const url = 'mongodb+srv://RickLeinecker:COP4331Rocks@cluster0-4pisv.mongodb.net/COP4331?retryWrites=true&w=majority'
const client = new MongoClient(url);
client.connect();

var api = require('./api.js');
api.setApp( app, client );

// var firebase = require('firebase');
// var firebaseui = require('firebaseui');
