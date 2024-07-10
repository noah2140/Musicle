const mongoose = require('mongoose');

const puzzleSchema = new mongoose.Schema({
    prompt: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        required: true,
    },
    audio: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
        unique: true,
    }
});

module.exports = mongoose.model('Puzzle', puzzleSchema);
