const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
app.listen(port);
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
// mongoose.connect('mongodb://localhost/rotten-potatoes');
// override with POST having ?_method=DELETE or ?_method=PUT
module.exports = app;

//review.js
const Comment = require('./models/comment')
const Review = require('./models/review')

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
const reviews = require('./controllers/reviews')(app);

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
