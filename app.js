const express = require('express');
const app = express();

const path = require('path');
const methodOverride = require('method-override');

const homeRouter = require('.//routes/home.js');
const creatorRouter = require('.//routes/creator.js');
const tournamentRouter = require('.//routes/tournament.js');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use('/', homeRouter);
app.use('/', creatorRouter);
app.use('/', tournamentRouter);


app.listen(3000);