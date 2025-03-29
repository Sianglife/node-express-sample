const express = require('express');
const cookieParser = require('cookie-parser');
const fs = require('node:fs');

const app = express();

app.use(cookieParser());

app.get('/login/:name', (req,res)=>{
    const name = req.params.name;
    const session_id = Math.round(Math.random()*500);
    try {
        fs.writeFileSync(`src/session/${name}`,`${session_id}\n`, {flag: 'w'});
        res.cookie('session_key', session_id, {maxAge:36000000});
        res.cookie('session_name', name, {maxAge:36000000});        
        res.send(`Hello ${name}, your session id is ${session_id}`);
        return;
    } catch (err) {
        console.error(err);
        res.send('Error');
        return;
    }
})


app.get('/', (req,res)=>{
    const session_name = req.cookies.session_name;
    if (!session_name){
        res.send('Please login first');
        return;
    }
    const session_id = req.cookies.session_key;
    try {
        const data = fs.readFileSync(`src/session/${session_name}`, 'utf8');
        res.send(`Hello ${session_name}, your session id is ${session_id}`);
        return;
    } catch (err) {
        console.error(err);
        res.send('Invalid session');
        return;
    }
})

app.get('/logout', (req,res)=>{
    const session_name = req.cookies.session_name;
    if (!session_name){
        res.send('Please login first');
        return;
    }
    res.clearCookie('session_key');
    res.clearCookie('session_name');
    try {
        fs.unlinkSync(`src/session/${session_name}`);
        res.send('Logged out successfully');
        return;
    } catch (err) {
        console.error(err);
        res.send('Invalid session');
        return;
    }
})

app.listen(3000,()=>{
    console.log('running at http://127.0.0.1:3000');
})
