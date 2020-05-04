const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

//Initialize app
app = express();

//Initialize DataBase
mongoose.connect(
    'mongodb://localhost:27017/API_COVID19_JSON',
    { 
        useNewUrlParser: true , 
        useUnifiedTopology: true
    }
);
requireDir('./src/models/Researches');

const Research = mongoose.model('Research')


app.get('/', (req, res) => {
    Research.create({
        title: 'title',
        abs: 'abs',
        authors: 'authors',
        link: 'https://www.google.com',
        releaseDate: Date.now
    })

    return res.send('req');
})

app.listen(3001);