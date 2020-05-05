const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const researchSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    abs: {
        type: String,
        requiered: true
    },
    authors: {
        type: Array,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    releaseDate: {
        type: Date,
        required: true
    },
    page: {
        type: Number,
        required: false
    }
})

mongoose.model('Researches', researchSchema);