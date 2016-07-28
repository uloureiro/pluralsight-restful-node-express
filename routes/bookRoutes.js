var express = require('express');

var routes = function (Book) {
    var bookRouter = express.Router();

    //Route to manipulate all books or filter by genre using query string
    bookRouter.route('/Books')
        .post(function (req, res) { /* HTTP POST */
            var book = new Book(req.body);
            book.save();
            res.status(201).send(book);
        })
        .get(function (req, res) { /* HTTP GET */

            var query = {};

            if (req.query.genre)
                query.genre = req.query.genre;

            Book.find(query, function (err, books) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        });

    //Route to get books by id
    bookRouter.route('/Books/:bookId')
        .get(function (req, res) {
            Book.findById(req.params.bookId, function (err, books) {
                if (err)
                    res.status(500).send(err);
                else
                    res.json(books);
            });
        })
        .put(function (req,res) {
            Book.findById(req.params.bookId, function (err, books) {
                if (err)
                    res.status(500).send(err);
                else
                    book.title = req.body.title;
                    book.author = req.body.author;
                    book.genre = req.body.genre;
                    book.read = req.body.read;
                    
                    res.json(book);
            });
        });

        return bookRouter;
};

module.exports = routes;