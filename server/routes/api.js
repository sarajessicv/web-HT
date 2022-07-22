
var express = require('express');
var router = express.Router();
const Book = require('../models/Book');


router.post('/book', (req, res, next) => {
  Book.create(
    {
        name: req.body.name,
        author: req.body.author,
        pages: req.body.pages
    },
    (error, ok) => {
        if (error) throw error;
        return res.send("ok");
    }
  )
});


router.get('/:book', (request, response, next) => {
  Book.findOne({name: request.params.book}, (error, book) => {
    if(error) throw error
    else {
      return response.json(book);
    }
  })
})

module.exports = router;
