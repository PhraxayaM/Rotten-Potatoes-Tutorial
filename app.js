const methodOverride = require('method-override')
const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect('mongodb://localhost/rotten-potatoes');
// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

// OUR MOCK ARRAY OF PROJECTS
var reviews = [
  { title: "Great Review", movieTitle: "Batman II" },
  { title: "Awesome Movie", movieTitle: "Titanic" }
]

// INDEX
app.get('/', (req, res) => {
  Review.find()
    .then(reviews => {
      res.render('reviews-index', { reviews: reviews });
    })
    .catch(err => {
      console.log(err);
    })
})

app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})
// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

// CREATE
// app.post('/reviews', (req, res) => {
//   Review.create(req.body).then((review) => {
//     console.log(review);
//     res.redirect('/');
//   }).catch((err) => {
//     console.log(err.message);
//   })
// })
// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})
// CREATE
app.post('/reviews', (req, res) => {
  console.log(req.body);
  res.render('reviews-new', {});
})
app.listen(3000, () => {
  console.log('App listening on port 3000!')
})
