const mongoose = require('mongoose');

let movieSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Rating: {type: String},
    Description: {type: String, required: true},
    Genre: {
        Name: String, 
        Description: String
    },
    Director: {
        Name: String,
        Bio: String,
        Birth: Date
    },
    ImagePath: String
});

let userSchema = mongoose.Schema({
    Username: {type: String, required: true},
    Password: {type: String, required: true},
    Email: {type: String, required: true},
    Birthday: Date,
    FavouriteMovies: [{type: mongoose.Schema.Types.ObjectId, ref: 'Movie'}]
});

let Movie = mongoose.model('Movie', movieSchema);
let User = mongoose.model('User', userSchema); 

module.exports.Movie = Movie;
module.exports.User = User; 

// // add a user
// app.post('/users', (req, res) => {
//     Users.findOne({ Username: req.body.Username })
//       .then((user) => {
//         if (user) {
//         return res.status(400).send(req.body.Username + 'already exists');
//         } else {
//           Users.create({
//               Username: req.body.Username,
//               Password: req.body.Password,
//               Email: req.body.Email,
//               Birthday: req.body.Birthday
//             })
//             .then((user) =>{res.status(201).json(user) })
//             .catch((error) => {
//                 console.error(error);
//                 res.status(500).send('Error: ' + error);
//               })
//             }
//           })
//           .catch((error) => {
//             console.error(error);
//             res.status(500).send('Error: ' + error);
//     });
// });

// // get all users
// app.get('/users', (req, res) => {
//     Users.find()
//     .then((users) => {
//         res.status(201).json(users);
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error: ' +err);
//     });
// });

// // Get a user by username 
// app.get('/users/:Username', (req, res) => {
//     Users.findOne({Username: req.params.Username})
//     .then((user) => {
//         res.json(user);
//     })
//     .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//     });
// });

// // Update username of user
// app.put('/users/:Username', (req, res) => {
//     Users.findOneAndUpdate({Username: req.params.Username}, 
//         {$set: {
//         Username: req.body.Username, 
//         Password: req.body.Password,
//         Email: req.body.Email,
//         Birthday: req.body.Birthday
//     }
//     },
//     {new: true}, 
//     (err, updatedUser) => {
//         if(err) {
//             console.error(err);
//             res.status(500).send('Error: ' + err);
//         } else {
//             res.json(updatedUser);
//         }
//     });
// });

// // Add a movie to a user's favourites
// app.post('/users/:Username/movies/:MovieID', (req, res) => {
//     Users.findOneAndUpdate({ Username: req.params.Username }, 
//         {$push: { FavoriteMovies: req.params.MovieID } },
//      { new: true }, // This line makes sure that the updated document is returned
//     (err, updatedUser) => {
//       if (err) {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//       } else {
//         res.json(updatedUser);
//       }
//     });
// });

// // Delete a user by username
// app.delete('/users/:Username', (req, res) => {
//     Users.findOneAndRemove({ Username: req.params.Username })
//       .then((user) => {
//         if (!user) {
//           res.status(400).send(req.params.Username + ' was not found');
//         } else {
//           res.status(200).send(req.params.Username + ' was deleted.');
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         res.status(500).send('Error: ' + err);
//       });
// });