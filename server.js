const express = require('express');
const mongoose = require('mongoose');
const requireDir = require('require-dir');
const fetch = require('node-fetch');

//Initialize app
app = express();
app.listen(3001);

//Initialize DataBase
mongoose.connect(
    'mongodb://localhost:27017/API_COVID19',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);
requireDir('./src/models');

const Research = mongoose.model('Researches')

const getAuthors = (authors) => {
    const authorName = authors.author_name;
    return authorName;
}

const formatOutput = (data, index) => {
    return {
        abs: data.rel_abs,
        authors: data.rel_authors.map(getAuthors),
        date: data.rel_date,
        link: data.rel_link,
        title: data.rel_title,
        page: Math.floor(index/50 + 1)
    }
}

const getInfo = async () => {
    const res = await fetch('https://connect.biorxiv.org/relate/collection_json.php?grp=181');
    const out = await res.json();
    
    const formattedOut = out.rels.map(formatOutput);
    
    const outArray = [];
    for (let i in formattedOut) {
        //console.log(`index: ${i}`);
        outArray.push(formattedOut[i]);
    }

    return outArray;
}

const saveToDB = (data, index) => {
    Research.create({
        title: data.title,
        abs: data.abs,
        authors: data.authors,
        link: data.link,
        releaseDate: data.date,
        page: data.page
    })
}








app.get('/', (req, res) => {

    const saveData = async () => {
        const info = await getInfo();
        mongoose.connection.collections['researches'].drop(() => {console.log("collection dropped")});
        info.map(saveToDB);
        console.log(info);
        res.send(info);
    }
    saveData();
    
})

