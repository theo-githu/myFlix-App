const express = require('express'),
  bodyParser = require('body-parser'),
  uuid = require('uuid');

const app = express();

app.use(bodyParser.json());

let users = [
    {
        id: 1,
        name: "Theo",
        favouriteMovies: ["The Dark Knight", "Inside Out", "Jurassic Park"],
        email: "theo@gmail.com"
    },
    {
        id: 2,
        name: "Caroline",
        favouriteMovies: ["12 Angry Men", "Inside Out", "Forrest Gump"],
        email: "caroline@gmail.com"
    },
    {
        id: 3,
        name: "Harriet",
        favouriteMovies: ["Inside Out", "Forrest Gump", "A Clockwork Orange", "Star Wars"],
        email: "harriet@gmail.com"
    },
    {
        id: 4,
        name: "Andy",
        favouriteMovies: ["A Clockwork Orange", "Star Wars"],
        email: "andy@gmail.com"
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

// READ
app.get('/movies', (req, res) => {
    res.status(200).json(movies);
});

// READ 
app.get('/movies/:title', (req, res) => {
    const {title} = req.params;
    const movie = movies.find(movie => movie.Title === title);

    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(400).send('Movie does not exist');
    }
});

// READ 
app.get('/movies/genre/:genreName', (req, res) => {
    const {genreName} = req.params;
    const genre = movies.find(movie => movie.Genre.Name === genreName).Genre;

    if (genre) {
        res.status(200).json(genre);
    } else {
        res.status(400).send('Genre does not exist');
    }
});

// READ 
app.get('/movies/directors/:directorName', (req, res) => {
    const {directorName} = req.params;
    const director = movies.find(movie => movie.Director.Name === directorName).Director;

    if (director) {
        res.status(200).json(director);
    } else {
        res.status(400).send('Director does not exist');
    }
});

// CREATE
app.post('/users', (req, res) => {
    const newUser = req.body;

    if (newUser.name) {
        newUser.id = uuid.v4();
        users.push(newUser);
        res.status(201).json(newUser);
    } else {
        res.status(400).send('Users require names');
    }
});

// UPDATE
app.put('/users/:id', (req, res) => {
    const {id} = req.params;
    const updatedUser = req.body;

    let user = users.find(user => user.id == id);

    if (user) {
        user.name = updatedUser.name;
        res.status(200).json(user);
    } else {
        res.status(400).send('User does not exist');
    }
});

// CREATE
app.post('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favouriteMovies.push(movieTitle);
        res.status(200).send(`${movieTitle} has been added to user ${id}'s favourite movies`);
    } else {
        res.status(400).send('User does not exist');
    }
});

// DELETE
app.delete('/users/:id/:movieTitle', (req, res) => {
    const {id, movieTitle} = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        user.favouriteMovies = user.favouriteMovies.filter(title => title !== movieTitle);
        res.status(200).send(`${movieTitle} has been removed from user ${id}'s favourite movies`);
    } else {
        res.status(400).send('User does not exist');
    }
});

// DELETE
app.delete('/users/:id/', (req, res) => {
    const {id} = req.params;

    let user = users.find(user => user.id == id);

    if (user) {
        users = users.filter(user => user.id != id);
        res.status(200).send(`User ${id} has been deleted`);
    } else {
        res.status(400).send('User does not exist');
    }
});

// listen for requests
app.listen(8080, () => {
    console.log('Your app is listening on port 8080.');
});