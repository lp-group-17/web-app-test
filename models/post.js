const { ObjectId } = require('bson');
const mongoose = require ('mongoose');

const PostSchema = mongoose.Schema({

    _id: ObjectId,

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    daily: {
        "mood": int,
        "irritability": int,
        "anxiety": int,
        "suicidal": Boolean,
        "medication": {
            name: {
                "start": Date,
                "dosage": String,
                "changes": String,
                "taken": Boolean
            }
        },
        "journal": String
    }
});

module.exports = mongoose.model('Posts', PostSchema);