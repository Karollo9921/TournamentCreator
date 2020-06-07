const express = require('express');
const app = express();

const router = require('.//routes/creator.js');

app.use('/', router);

app.listen(3000);