const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const Comment = require('./models/comment')
const Review = require('./models/review')
const reviews = require('./controllers/reviews')(app);
const comments = require('./controllers/comments')(app);

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.listen(port);

// mongoose.connect('mongodb://localhost/rotten-potatoes');
// override with POST having ?_method=DELETE or ?_method=PUT
module.exports = app;

//review.js




app.listen(4000, () => {
  console.log('App listening on port 4000!')
})
