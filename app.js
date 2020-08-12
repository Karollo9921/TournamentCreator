const express = require('express');
const app = express();
const mongoose = require('mongoose');


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


const uri = require('./secret/secret.js');

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(3000)
        console.log('Connected to MongoDB by Mongoose !');
    }
});

