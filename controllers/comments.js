const Comment = require('../models/comment')
module.exports = (app) => {

    // NEW Comment
    app.post('/reviews/comments', (req, res) => {
      Comment.create(req.body).then(comment => {
        res.redirect(`/reviews/${comment.reviewID}`);
      }).catch((err) => {
        console.log(err.message);
      });
    });
}
