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
    
    // Update user profile
    app.put('/users/:id', userController.update);
    
    // Delete user profile
    app.delete('/users/:id', userController.delete);


    // MOVIES
    
    // View information of selected movie
    app.get('/movies/:id', movieController.viewOneSelected);
    
    // View information of selected movie
    app.get('/movies/:title', movieController.viewOneByTitle);
    
    // View all movies as posters
    app.get('/movies', movieController.getAll);

    // app.get('/feedback/submit', feedbackController.getForm);
    // app.get('/feedback/latest', feedbackController.refresh);
    // app.get('/feedback/:index', feedbackController.show);
    // app.put('/feedback/:id', feedbackController.update);
    // app.delete('/feedback/:id', feedbackController.delete);
}