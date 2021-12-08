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
    const db = client.db();
    const { firstname, lastname, username, email, password } = req.body;

    const newUser = {
      Firstname: firstname,
      Lastname: lastname,
      Email: email,
      Username: username,
      Password: password,
      Verified: false
    };
    var error = { emailUsed: false, usernameTaken: false };
    let ret;
    let result;

    // Check if user already exists
    try {
      existingEmail = await db.collection('Users').find({ Email: email }).toArray();
      existingUsername = await db.collection('Users').find({ Username: username }).toArray();
    } catch (err) {
      error = err.toString();
    }

    if (existingEmail.length > 0) {
      error.emailUsed = true;
      ret = { error: error };
    }

    if (existingUsername.length > 0) {
      error.usernameTaken = true;
      ret = { error: error };
    }

    if (existingUsername.length == 0 && existingEmail.length == 0) {
      try {
        result = await db.collection('Users').insertOne(newUser);
      }
      catch (e) {
        error = e.toString();
      }
      ret = { ID: result.insertedId, error: error };
    }
    res.status(200).json(ret);
  });

  app.post('/api/login', async (req, res, next) => {
    // incoming: email, password, verified
    // outgoing: id, name, email, error
    const db = client.db();
    var error = '';

    const { loginID, password } = req.body;

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

    var ret = { User: response, error: error };
    res.status(200).json(ret);
  });

  app.post('/api/addEvent', async (req, res, next) => {
    const db = client.db();
    let error = '';
    try {
      db.collection('Events').insertOne(req.body);
    } catch (err) {
      error = err.toString();
    }

    res.status(200).json({ error: error });
  });

  app.post('/api/getEvents', async (req, res, next) => {
    const db = client.db();
    let error = '';
    let { User } = req.body;
    let events = {};
    try {
      events = await db.collection('Events').find({ User: User }).toArray();
    } catch (err) {
      error = err.toString();
    }

    res.status(200).json({ Events: events, error: error });
  });

  app.post('/api/addEntry', async (req, res, next) => {
    const db = client.db();
    let error = '';
    try {
      db.collection('Entries').insertOne(req.body);
    } catch (err) {
      error = err.toString();
    }

    res.status(200).json({ error: error });
  });

  app.post('/api/getEntries', async (req, res, next) => {
    const db = client.db();
    let error = '';
    let { User } = req.body;
    let entries = {};
    try {
      entries = await db.collection('Entries').find({ User: User }).toArray();
    } catch (err) {
      error = err.toString();
    }

    res.status(200).json({ Entries: entries, error: error });
  });

  app.post('/api/verify', async (req, res, next) => {
    const db = client.db();
    let error = '';
    var ObjectId = require('mongodb').ObjectId;
    let { ID } = req.body;
    const updateDocument = {
      $set: {
        Verified: true,
      },
    };

    try {
      const result = await db.collection('Users').updateOne({ _id: ObjectId(ID) }, updateDocument);
    } catch (err) {
      error = err.toString();
    }
    res.status(200).json({ error: error });
  });

  // Checks verification for verifcation mobile page
  app.post('/api/checkVerification', async (req, res, next) => {
    const db = client.db();
    let error = '';
    let result = false;
    var ObjectId = require('mongodb').ObjectId;
    let { ID } = req.body;

    try {
      result = await db.collection('Users').findOne(
        { _id: ObjectId(req.body.ID) },
        { _id: 0, Verified: 1 }
      );
    } catch (err) {
      error = err.toString();
    }
    res.status(200).json({ Verified: result.Verified, error: error });
  });

  // TODO: Sendgrid stuff to send email with link to reset page
  app.post('/api/sendReset', async (req, res, next) => {

  });

  // Resets the password
  app.post('/api/resetPassword', async (req, res, next) => {
    const db = client.db();
    let error = '';
    var ObjectId = require('mongodb').ObjectId;
    let { ID, Password } = req.body;
    const updateDocument = {
      $set: {
        Password: Password,
      },
    };

    try {
      const result = await db.collection('Users').updateOne({ _id: ObjectId(ID) }, updateDocument);
    } catch (err) {
      error = err.toString();
    }
    res.status(200).json({ error: error });
  });

  // TODO: changePassword endpoint using a check for old password
  app.post('/api/changePassword', async (req, res, next) => {
    const db = client.db();
    let error = '';
    var ObjectId = require('mongodb').ObjectId;
    let { ID, OldPassword, Password } = req.body;
    const updateDocument = {
      $set: {
        Password: Password,
      },
    };

    try {
      const result = await db.collection('Users').updateOne({ _id: ObjectId(ID) }, updateDocument);
    } catch (err) {
      error = err.toString();
    }
    res.status(200).json({ error: error });
  });

  // TODO: delete entry

  // TODO: delete event
  app.post('/api/deleteEvent', async (req, res, next) => {
    const db = client.db();
    let error = '';
    let { User, Title, Descrip, From, To, AllDay } = req.body;
    try {
      await db.collection('Events').deleteOne({
        $and: [
          { User: User },
          { Title: Title },
          { Descrip: Descrip },
          { From: From },
          { To: To },
          { AllDay: AllDay }]
      });
    } catch (err) {
      error = err.toString();
    }

    res.status(200).json({ error: error });
  });

  app.post('/api/deleteEntry', async (req, res, next) => {
    const db = client.db();
    let error = '';
    let { User, Date, Descrip, Q1, Q2, Q3, Q4 } = req.body;
    try {
      await db.collection('Entries').deleteOne({
        $and: [
          { User: User },
          { Date: Date },
          { Descrip: Descrip },
          { Q1: Q1 },
          { Q2: Q2 },
          { Q3: Q3 },
          { Q4: Q4 }]
      });
    } catch (err) {
      error = err.toString();
    }

    res.status(200).json({ error: error });
  });

  app.post('/api/getEmail', async (req, res, next) => {
    // incoming: email, password, verified
    // outgoing: id, name, email, error
    const db = client.db();
    var error = '';

    const { loginID } = req.body;

    const results = await
      db.collection('Users').findOne(
        {
          Username: loginID
        }
      );

    var ret = { Email: results.Email, error: error };
    res.status(200).json(ret);
  });
}