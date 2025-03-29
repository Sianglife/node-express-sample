const express = require('express');
const app = express();

app.get('/input/:name', (req, res) => {
    const name = req.params.name;
    res.send(`<div>Input: ${name}</div>`);
})

app.listen(3000)
