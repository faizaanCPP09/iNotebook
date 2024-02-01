//This File deals with Notes Schema's Architecture

const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    },
    //Referring to another schema in mongoose
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }

}
);
module.exports = mongoose.model('notes', notesSchema)