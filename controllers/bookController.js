var bookController = function (Book) {
    var post = function (req, res) { /* HTTP POST */
        var book = new Book(req.body);

        if (!req.body.title) {
            res.status(400);
            res.send('Title is required');
        }
        else {
            book.save();
            res.status(201);
            res.send(book);
        }
    };

    var get = function (req, res) { /* HTTP GET */
        var query = {};

        if (req.query.genre)
            query.genre = req.query.genre;

        Book.find(query, function (err, books) {
            if (err) {
                res.status(500);
                res.send(err);
            }
            else
                res.json(books);
        });
    };

    return {
        post: post,
        get: get
    };
}

module.exports = bookController;