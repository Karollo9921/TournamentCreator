const express = require('express');
const app = express();

const path = require('path');

const homeRouter = require('.//routes/home.js');
const creatorRouter = require('.//routes/creator.js').router;
const tournamentRouter = require('.//routes/tournament.js').router;



app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', homeRouter);
app.use('/', creatorRouter);
app.use('/', tournamentRouter);


app.listen(3000);