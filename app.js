const methodOverride = require('method-override')
const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
app.listen(port);
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes');
// mongoose.connect('mongodb://localhost/rotten-potatoes');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))
module.exports = app;

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));
const reviews = require('./controllers/reviews')(app);

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
