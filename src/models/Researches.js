const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    abs: {
        type: String,
        requiered: true
    },
    authors: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    }
})

mongoose.model('Research', researchSchema);