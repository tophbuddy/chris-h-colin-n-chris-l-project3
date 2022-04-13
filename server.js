const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const app = express();

const pokemonRoute = require('./routes/pokemon');
const homeRouter = require('./routes/home');

const mongooseEnpoint = 'mongodb://127.0.0.1/pokemons_app';

mongoose.connect(mongooseEnpoint, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const cors = require('cors');

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*',
}));

app.use('/api/home', homeRouter);
app.use('/pokemon', pokemonRoute);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

  app.listen(process.env.PORT || 8000, () => {
    console.log('Starting server');
  });