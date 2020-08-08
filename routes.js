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
    
    // Update user profile - bio details
    app.put('/users/:id', userController.update);
    
    // Update user profile - add movie to favourites
    app.put('/users/movies/:id', userController.addFavMovie);
    
    // Delete user profile
    app.delete('/users/:id', userController.delete);


    // MOVIES
    // View all movies as posters
    app.get('/movies', movieController.getAll);

    // View information of selected movie
    app.get('/movies/:id', movieController.viewOneSelected);
    
    // Find movie by title * NOT WORKING *
    app.post('/movies/search', movieController.viewOneByTitle);
    

    // app.get('/feedback/submit', feedbackController.getForm);
    // app.get('/feedback/latest', feedbackController.refresh);
    // app.get('/feedback/:index', feedbackController.show);
    // app.put('/feedback/:id', feedbackController.update);
    // app.delete('/feedback/:id', feedbackController.delete);
}