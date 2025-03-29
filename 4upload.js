const express = require('express');
const fs = require('node:fs');
var fileUpload = require("express-fileupload");

const app = express();

app.set('view engine', 'ejs');

const UPLOAD_FOLDER = './src/uploads/'
app.use(fileUpload({
    createParentPath: true
}));

app.post('/upload', (req, res) => {
    const file = req.files?.file;
    if (file) {
        file.mv(UPLOAD_FOLDER + file.name);
    }
    res.send('uploaded');
})

app.get('/upload', (req, res) => {
    res.render('4upload');
})

app.listen(3000, () => {
    console.log('running at http://127.0.0.1:3000');
})
