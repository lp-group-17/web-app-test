// app.post('/api/addcard', async (req, res, next) => {
//     // incoming: userId, color
//     // outgoing: error
//     const { userId, card } = req.body;
//     const newCard = { Card: card, UserId: userId };
//     var error = '';
//     try {
//         const db = client.db();
//         const result = db.collection('Cards').insertOne(newCard);
//     }
//     catch (e) {
//         error = e.toString();
//     }
//     cardList.push(card);
//     var ret = { error: error };
//     res.status(200).json(ret);
// });

const { Timestamp } = require("bson");

// app.post('/api/login', async (req, res, next) => {
//     // incoming: login, password
//     // outgoing: id, firstName, lastName, error
//     var error = '';
//     const { login, password } = req.body;
//     const db = client.db();
//     const results = await
//         db.collection('Users').find({ Login: login, Password: password }).toArray();
//     var id = -1;
//     var fn = '';
//     var ln = '';
//     if (results.length > 0) {
//         id = results[0].UserId;
//         fn = results[0].FirstName;
//         ln = results[0].LastName;
//     }
//     var ret = { id: id, firstName: fn, lastName: ln, error: '' };
//     res.status(200).json(ret);
// });
// app.post('/api/searchcards', async (req, res, next) => {
//     // incoming: userId, search
//     // outgoing: results[], error
//     var error = '';
//     const { userId, search } = req.body;
//     var _search = search.trim();

//     const db = client.db();
//     const results = await db.collection('Cards').find({ "Card": { $regex: _search + '.*', $options: 'r' } }).toArray();

//     var _ret = [];
//     for (var i = 0; i < results.length; i++) {
//         _ret.push(results[i].Card);
//     }

//     var ret = { results: _ret, error: error };
//     res.status(200).json(ret);
// });
// const Post = require('models/Posts');
const express = require('express');
const router = express.Router();

exports.setApp = function (app, client) {
  app.post('/api/adduser', async (req, res, next) => {
    // incoming: id, firstname, lastname, email, username
    // outgoing: error

    const { firstname, lastname, username, email, password } = req.body;

    const newUser = { Firstname: firstname, Lastname: lastname, Email: email, Username: username, Password: password, Verified: false };
    var error = {};
    let ret;
    let result;
    let existingUser;

    // Check if user already exists
    try {
      const db = client.db();
      existingEmail = await db.collection('Users').find({ Email: email }).toArray();
      existingUsername = await db.collection('Users').find({ Username: username }).toArray();
    } catch (err) {
      error = err.toString();
    }

    if (existingEmail.length > 0) {
      error.emailUsed = 'Email already in use';
      ret = { error: error };
    }

    if (existingUsername.length > 0) {
      error.usernameTaken = 'Username taken';
      ret = { error: error };
    }

    if (existingUsername.length == 0 && existingEmail.length == 0) {
      try {
        const db = client.db();
        result = await db.collection('Users').insertOne(newUser);
      }
      catch (e) {
        error = e.toString();
      }
      error = '';
      ret = { ID: result.insertedId, error: error };
    }
    res.status(200).json(ret);
  });

  app.post('/api/login', async (req, res, next) => {
    // incoming: email, password, verified
    // outgoing: id, name, email, error

    var error = '';

    const { loginID, password } = req.body;

    const db = client.db();
    const results = await
      db.collection('Users').find(
        {
          $and: [
            {
              $or: [
                { Email: loginID },
                { Username: loginID }
              ]
            },
            { Password: password }
          ]
        }
      ).toArray();

    let response = {};

    if (results.length > 0) {
      response = results[0];
      delete response.Password;
    } else
      error = 'User not found';

    var ret = { User: response, error: '' };
    res.status(200).json(ret);
  });

  app.post('/api/searchmedications', async (req, res, next) => {
    // incoming: id, medication
    // outgoing: results[], error

    var error = '';

    const { id, search } = req.body;

    var _search = search.trim();

    const db = client.db();
    const results = await
      db.collection('Users').find({
        "medication": {
          $regex: _search + '.*',
          $options: 'r'
        }
      }).toArray();

    var _ret = [];
    for (var i = 0; i < results.length; i++) {
      _ret.push(results[i].medication);
    }

    var ret = { results: _ret, error: error };
    res.status(200).json(ret);
  });

}