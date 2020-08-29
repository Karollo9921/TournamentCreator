const express = require('express');
const app = express();
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const MONGODB_URI = require('./secret/secret.js');

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

const path = require('path');
const methodOverride = require('method-override');

const homeRouter = require('.//routes/home.js');
const creatorRouter = require('.//routes/creator.js');
const tournamentRouter = require('.//routes/tournament.js');
const authRouter = require('./routes/authentication.js');
const userRouter = require('./routes/user.js');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));
app.use(
    session({
        secret: 'my secret', 
        resave: false, 
        saveUninitialized: false,
        store: store
    })
);


app.use('/', homeRouter);
app.use('/', creatorRouter);
app.use('/', tournamentRouter);
app.use('/', authRouter);
app.use('/', userRouter);


mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(3000)
        console.log('Connected to MongoDB by Mongoose !');
    }
});

