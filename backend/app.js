const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const app = express();

// Connecting To Mongodb
mongoose.connect('mongodb://localhost/inkredo-task', { useNewUrlParser: true }, (err) => {
  if (err) throw err;
  console.log('Connected to mongodb');
});


// Setting Paths
app.use('/static', express.static(path.join(__dirname, '/')));
app.use(cors())

// Setting views of the app
app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'pug');

// Essential Middlewares
app.use(bodyParser.json());


// Using middleware for passport
app.use(passport.initialize());
require('./modules/passport')(passport);

app.use('/api', require('./routers/api'));

app.listen(3001, () => {
  console.log('server is running on http://localhost:3001');
});