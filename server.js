const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const homeRouter = require('./routes/home');
const userRouter = require('./routes/user');
const movieRouter = require('./routes/movies');

const mongooseEndpoint = 'mongodb+srv://Colin:banana1234@kinhou17cluster.5knp0.mongodb.net/movie_review_app?retryWrites=true&w=majority';

mongoose.connect(mongooseEndpoint, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const cors = require('cors');
const auth_middleware = require('./routes/middleware/auth_middleware');

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: '*',
}));

app.use('/api/home', homeRouter);
app.use('/api/user', userRouter);
app.use('/api/movies', movieRouter);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

  app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server');
  });