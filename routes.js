const userController = require('./controllers/userController');
const movieController = require('./controllers/movieController');
const sessionController = require('./controllers/sessionController')

module.exports = app => {
    // app.get('/', (req, res) => {
    //     res.render('index', { currentUser: req.session.currentUser })
    // })
    // app.get('/app', (req, res) => {
    //     if (req.session.currentUser) {
    //         res.render('app/index');
    //     } else {
    //         res.redirect('/')
    //     }
    // });

    app.get('/sessions/new', sessionController.newForm);
    app.post('/sessions', sessionController.create);
    app.delete('/sessions', sessionController.destroy);

    // app.get('/register', userController.getForm); //app.get('/users/register', userController.getForm)
    
    // Register a new user
    app.post('/register', userController.create);
    // View all users
    app.get('/users', userController.getAll);
    // Update user profile
    app.put('/users/:id', userController.update);
    // Delete user profile
    app.delete('/users/:id', userController.delete);
    
    // app.get('/feedback', feedbackController.getAll);
    // app.post('/feedback', feedbackController.create);
    // app.get('/feedback/submit', feedbackController.getForm);
    // app.get('/feedback/latest', feedbackController.refresh);
    // app.get('/feedback/:index', feedbackController.show);
    // app.put('/feedback/:id', feedbackController.update);
    // app.delete('/feedback/:id', feedbackController.delete);
}