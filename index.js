
const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();
const mongoose = require('mongoose');
const Models = require('./models.js');

const Movies = Models.Movie;
const Users = Models.User;  

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser:  true, useUnifiedTopology: true});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let users = [
    {
        id:1,
        Username: "Theo",
        Password: "123abc456",
        favouriteMovies: ["The Dark Knight", "Inside Out", "Jurassic Park"],
        Email: "theo@gmail.com",
        Birthday: "07/12/1993"
    },
    {
        id: 2,
        Username: "Caroline",
        Password: "abcdefg",
        favouriteMovies: ["12 Angry Men", "Inside Out", "Forrest Gump"],
        Email: "caroline@gmail.com",
        Birthday: "07/09/1993"
    },
    {
        id: 3,
        Username: "Kieran",
        Password: "poiuyt",
        favouriteMovies: ["Inside Out", "Forrest Gump", "A Clockwork Orange", "Star Wars"],
        Email: "Kieran@gmail.com",
        Birthday: "07/02/1994"
    },
    {
        id: 4,
        Username: "Andy",
        Password: "qwertykeys",
        favouriteMovies: ["A Clockwork Orange", "Star Wars"],
        Email: "andy@gmail.com",
        Birthday: "07/06/1980"
    },
    {
        id: 5,
        Username: "Greg",
        Password: "12349876",
        favouriteMovies: ["Star Wars", "Jurassic Park"],
        Email: "greg@gmail.com",
        Birthday: "07/08/1991"
    }
];

let movies = [
    {
        Title: "The Shawshank Redemption",
        Rating: "9.2/10",
        Description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
        Genre: {
            Name: "Drama",
            Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        Director: {
            Name: "Frank Darabont",
            Bio: "Three-time Oscar nominee Frank Darabont was born in a refugee camp in 1959 in Montbeliard, France, the son of Hungarian parents who had fled Budapest during the failed 1956 Hungarian revolution.",
            Birth: 1959
        },
        ImageURL: "https://www.imdb.com/title/tt0111161/mediaviewer/rm10105600/?ref_=tt_ov_i"
    },
    {
        Title: "The Godfather",
        Rating: "9.2/10",
        Description: "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
        Genre: {
            Name: "Drama",
            Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        Director: {
            Name: "Francis Ford Coppola",
            Bio: "Francis Ford Coppola was born in 1939 in Detroit, Michigan, but grew up in a New York suburb in a creative, supportive Italian-American family.",
            Birth: 1939
        },
        ImageURL:"https://www.imdb.com/title/tt0068646/mediaviewer/rm746868224/?ref_=tt_ov_i"
    },
    {
        Title: "The Dark Knight",
        Rating: "9.0/10",
        Description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
        Genre: {
            Name: "Action",
            Description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
        },
        Director: {
            Name: "Christopher Nolan",
            Bio: "Best known for his cerebral, often nonlinear, storytelling, acclaimed writer-director Christopher Nolan was born on July 30, 1970, in London, England. Over the course of 15 years of filmmaking, Nolan has gone from low-budget independent films to working on some of the biggest blockbusters ever made.",
            Birth: 1970
        },
        ImageURL:"https://www.imdb.com/title/tt0468569/mediaviewer/rm4023877632/?ref_=tt_ov_i"
    },
    {
        Title: "12 Angry Men",
        Rating: "9.0/10",
        Description: "The jury in a New York City murder trial is frustrated by a single member whose skeptical caution forces them to more carefully consider the evidence before jumping to a hasty verdict.",
        Genre: {
            Name: "Crime",
            Description: "Crime fiction, detective story, murder mystery, mystery novel, and police novel are terms used to describe narratives that centre on criminal acts and especially on the investigation, either by an amateur or a professional detective, of a crime, often a murder."
        },
        Director: {
            Name: "Sidney Lumet",
            Bio: "Sidney Lumet was a master of cinema, best known for his technical knowledge and his skill at getting first-rate performances from his actors -- and for shooting most of his films in his beloved New York. He made over 40 movies, often complex and emotional, but seldom overly sentimental.",
            Birth: 1924
        },
        ImageURL:"https://www.imdb.com/title/tt0050083/mediaviewer/rm2927108352/?ref_=tt_ov_i"
    },
    {
        Title: "Schindlers List",
        Rating: "8.9/10",
        Description: "In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.",
        Genre: {
            Name: "Biography",
            Description: "A biography, or simply bio, is a detailed description of a person's life. It involves more than just the basic facts like education, work, relationships, and death; it portrays a person's experience of these life events."
        },
        Director: {
            Name: "Steven Spielberg",
            Bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
            Birth: 1946
        },
        ImageURL:"https://www.imdb.com/title/tt0108052/mediaviewer/rm4180899840/?ref_=tt_ov_i"
    },
    {
        Title: "Jurassic Park",
        Rating: "8.2/10",
        Description: "A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
        Genre: {
            Name: "Action",
            Description: "Action film is a film genre in which the protagonist is thrust into a series of events that typically involve violence and physical feats."
        },
        Director: {
            Name: "Steven Spielberg",
            Bio: "One of the most influential personalities in the history of cinema, Steven Spielberg is Hollywood's best known director and one of the wealthiest filmmakers in the world.",
            Birth: 1946
        },
        ImageURL:"https://www.imdb.com/title/tt0107290/mediaviewer/rm3913805824/?ref_=tt_ov_i"
    },
    {
        Title: "Inside Out",
        Rating: "8.2/10",
        Description: "After young Riley is uprooted from her Midwest life and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust and Sadness - conflict on how best to navigate a new city, house, and school.",
        Genre: {
            Name: "Animation",
            Description: "Animation is a method by which still figures are manipulated to appear as moving images."
        },
        Director: {
            Name: "Pete Docter",
            Bio: "Pete Docter is the Oscar-winning director of many films and Chief Creative Officer at Pixar Animation Studios.",
            Birth: 1968
        },
        ImageURL: "https://www.imdb.com/title/tt2096673/mediaviewer/rm3662344960/?ref_=tt_ov_i"
    },
    {
        Title: "Forrest Gump",
        Rating: "8.8/10",
        Description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
        Genre: {
            Name: "Drama",
            Description: "In film and television, drama is a category or genre of narrative fiction (or semi-fiction) intended to be more serious than humorous in tone."
        },
        Director: {
            Name: "Robert Zemeckis",
            Bio: "A whiz-kid with special effects, Robert is from the Spielberg camp of film-making (Steven Spielberg produced many of his films).",
            Birth: 1951
        },
        ImageURL: "https://www.imdb.com/title/tt0109830/mediaviewer/rm1954748672/?ref_=tt_ov_i"
    },
    {
        Title: "A Clockwork Orange",
        Rating: "8.3/10",
        Description: "In the future, a sadistic gang leader is imprisoned and volunteers for a conduct-aversion experiment, but it doesn't go as planned.",
        Genre: {
            Name: "Sci-Fi",
            Description: "Science fiction (sometimes shortened to Sci-Fi or SF) is a genre of speculative fiction."
        },
        Director: {
            Name: "Stanley Kubrick",
            Bio: "Stanley Kubrick was born in Manhattan, New York City, to Sadie Gertrude (Perveler) and Jacob Leonard Kubrick, a physician. His family were Jewish immigrants (from Austria, Romania, and Russia). Stanley was considered intelligent, despite poor grades at school.",
            Birth: 1928
        },
        ImageURL: "https://www.imdb.com/title/tt0066921/mediaviewer/rm1351407872/?ref_=tt_ov_i"
    },
    {
        Title: "Star Wars",
        Rating: "8.6/10",
        Description: "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
        Genre: {
            Name: "Adventure",
            Description: "Adventure fiction is a type of fiction that usually presents danger, or gives the reader a sense of excitement."
        },
        Director: {
            Name: "George Lucas",
            Bio: "George Walton Lucas, Jr. was raised on a walnut ranch in Modesto, California. His father was a stationery store owner and he had three siblings. During his late teen years, he went to Thomas Downey High School and was very much interested in drag racing.",
            Birth: 1944
        },
        ImageURL: "https://www.imdb.com/title/tt0076759/mediaviewer/rm164871937/?ref_=tt_ov_i"
    }
];

app.get('/', (req, res) => {
    res.send('Welcome to my film app!');
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
app.get('/movies', (req, res) => {
    Movies.find()
    .then((movies) => {
        res.status(200).json(movies);
    })
    .catch((err) => {
        console.error(err);
        res.status(500).send('Error: ' + err);
    });
});

// READ get movie by title
app.get('/movies/:Title', (req, res) => {
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
app.get('/movies/genre/:Name', (req, res) => {
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
app.get('/movies/directors/:Name', (req, res) => {
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
app.post('/users', (req, res) => {
    Users.findOne({ Username: req.body.Username })
      .then((user) => {
        if (user) {
        return res.status(400).send(req.body.Username + 'already exists');
        } else {
          Users.create({
              Username: req.body.Username,
              Password: req.body.Password,
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
app.get('/users', (req, res) => {
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
app.get('/users/:Username', (req, res) => {
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
app.put('/users/:Username', (req, res) => {
    Users.findOneAndUpdate({Username: req.params.Username}, 
        {$set: {
        Username: req.body.Username, 
        Password: req.body.Password,
        Email: req.body.Email,
        Birthday: req.body.Birthday
    }
    },
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
app.post('/users/:Username/movies/:MovieID', (req, res) => {
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
app.post('/users/:Username/movies/:MovieID', (req, res) => {
    Users.findOneAndRemove({ Username: req.params.Username }, 
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
app.delete('/users/:Username', (req, res) => {
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
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});