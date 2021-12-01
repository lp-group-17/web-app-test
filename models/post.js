const mongoose = require('mongoose');
//const { ObjectId } = require('bson');
const PostSchema = mongoose.Schema({

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
        "mood": {
            type: Number,
        },
        "irritability": {
            type: Number,
        },
        "anxiety": {
            type: Number,
        },
        "suicidal": Boolean,
        "medication": {
            "name": {
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