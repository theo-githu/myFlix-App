
const express = require('express'),
bodyParser = require('body-parser'),
uuid = require('uuid');

const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;  

// mongoose.connect('mongodb://localhost:27017/test', 
// {useNewUrlParser:  true, useUnifiedTopology: true});

mongoose.connect(process.env.CONNECTION_URI, 
{useNewUrlParser:  true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const cors = require('cors');
app.use(express.static('public'));
app.use(cors());

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

const {check, validationResult} = require('express-validator'); 

app.get('/', (req, res) => {
    res.send();
});

app.get('/documentation', (req, res) => {
    res.sendFile('public/documentation.html', {root: __dirname});
});

app.use('/documentation', express.static('public'));

app.use((err,req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something has gone wrong!');
});

// READ get all movies
app.get('/movies', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.find()
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});
// 

// READ get movie by title
app.get('/movies/:Title', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({Title: req.params.Title})
    .then((movie) => {
        res.status(200).json(movie);
    })
    .catch((error) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// READ get genre by name
app.get('/movies/genre/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({"Genre.Name": req.params.Name})
    .then((movies) => {
        res.send(movies.Genre);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// READ get director by name 
app.get('/movies/directors/:Name', passport.authenticate('jwt', {session: false}), (req, res) => {
    Movies.findOne({"Directors.Name": req.params.Name})
    .then((movies) => {
        res.send(movies.Director);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// add a user
app.post('/users',
[ 
    check('Username', 'Username is required').isLength({min: 4}),
    check('Username', 'Username contains non alphanumeric characters - this is not allowed').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()  
], (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422). json({errors: errors.array()});
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users.create({
              Username: req.body.Username,
              Password: hashedPassword,
              Email: req.body.Email,
              Birthday: req.body.Birthday
            })
            .then((user) =>{res.status(201).json(user) })
            .catch((error) => {
                console.error(error);
                res.status(500).send('Error: ' + error);
              })
            }
          })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
    });
});

// CREATE get all users
app.get('/users', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.find()
    .then((users) => {
        res.status(201).json(users);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Get a user by username 
app.get('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOne({Username: req.params.Username})
    .then((user) => {
        res.json(user);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// Update username of user
app.put('/users/:Username',
[ 
    check('Username', 'Username is required').isLength({min: 4}),
    check('Username', 'Username contains non alphanumeric characters - this is not allowed').isAlphanumeric(),
    check('Password', 'Password is required').not().isEmpty(),
    check('Email', 'Email does not appear to be valid').isEmail()
    // check('Birthday', 'Birthday must be entered as a date').isDate()
],  passport.authenticate('jwt', {session: false}),  (req, res) => {

    let errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422). json({errors: errors.array()});
    }

    let hashedPassword = Users.hashPassword(req.body.Password);
    Users.findOneAndUpdate({Username: req.params.Username}, 
        {$set: {
        Username: req.body.Username, 
        Password: hashedPassword,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    } },
    {new: true}, 
    (err, updatedUser) => {
        if(err) {
            console.error(err);
            res.status(500).send('Error: ' + err);
        } else {
            res.json(updatedUser);
        }
    });
});

// Add a movie to a user's favourites
app.post('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, 
        {$push: { FavoriteMovies: req.params.MovieID } },
     { new: true }, // This line makes sure that the updated document is returned
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Delete a movie from a user's favourites
app.delete('/users/:Username/movies/:MovieID', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndUpdate({ Username: req.params.Username }, 
        {$pull: { FavoriteMovies: req.params.MovieID } },
     { new: true }, 
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

// Delete a user by username
app.delete('/users/:Username', passport.authenticate('jwt', {session: false}), (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username })
      .then((user) => {
        if (!user) {
          res.status(400).send(req.params.Username + ' was not found');
        } else {
          res.status(200).send(req.params.Username + ' was deleted.');
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
      });
});

// listen for requests
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
    console.log('Listening on Port ' + port);
});