const express = require('express');
const app = express();
const fs = require('node:fs');

app.get('/get', (req, res) => {
    try {
        const data = fs.readFileSync('src/data.txt', 'utf8')
        console.log(data);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.send('File not found');
    }
})

app.listen(3000, () => {
    console.log('running at http://127.0.0.1:3000');
})
