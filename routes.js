const userController = require('./controllers/userController');
const movieController = require('./controllers/movieController');
const sessionController = require('./controllers/sessionController')

module.exports = app => {

    // SESSIONS
    // app.get('/', (req, res) => {
    //     res.render(
    //         'index',
    //         { currentUser: req.session.currentUser })
    // })
    // 
    // app.get('/app', (req, res) => {
    //     if (req.session.currentUser) {
    //         res.render('app/index');
    //     } else {
    //         res.redirect('/')
    //     }
    // });

    app.post('/sessions', sessionController.create);
    // app.get('/sessions/new', sessionController.newForm);
    app.delete('/sessions', sessionController.destroy);


    // USERS
    // Register a new user
    app.post('/register', userController.create);

    // View all users
    app.get('/users', userController.getAll);

    // View all one user
    app.get('/users', userController.findOne);
    
    // Update user profile - bio details
    app.put('/users/:id', userController.update);
    
    // Add movie to favourites 
    app.put('/users/movies/:id', userController.addFavMovie);
    
    // Delete user profile
    app.delete('/users/:id', userController.delete);


    // MOVIES
    // Fetch list of popular movies from TMDB 
    app.get('/movies', movieController.getAllTMDB);


    // View all movies
    app.get('/favmovies', movieController.viewAll);

    // View information of selected movie
    app.get('/favmovies/:id', movieController.viewOneSelected);
    
    // Delete movie from favourites
    app.delete('/favmovies/:id', movieController.delete);
    
    // Find movie by title * NOT WORKING *
    app.post('/movies/search', movieController.viewOneByTitle);

    // /movie/favourites/:id - get favourite movies 
}