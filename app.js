const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
    res.send('Welcome to Tournament Creator! :)');
});

app.listen(3000);