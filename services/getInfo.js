import fetch from 'node-fetch';

const getAuthors = (authors) => {
    const authorName = authors.author_name;
    return authorName;
}

const formatOutput = (data) => {
    return {
        abs: data.rel_abs,
        authors: data.rel_authors.map(getAuthors),
        date: data.rel_date,
        link: data.rel_link,
        title: data.rel_title
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

module.exports = { getInfo };