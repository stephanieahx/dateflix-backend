const userRepository = require('../repositories/userRepository');
const { validateUser } = require('../validator/userValidator');
const { validateProfile } = require('../validator/profileValidator');
const sessionController = require('./sessionController'); // don't know if this is required
const { find } = require('../repositories/userRepository'); // don't know if this is required / don't know what it is for
const movieRepository = require('../repositories/movieRepository');
// const movieController = require('../controllers/movieController');

module.exports = {
    // Register a new user
    async create(req, res) {
        try {
            // userSchema(req.body);
            validateUser(req.body);
            await userRepository.create(req.body);
            res.json('User registered successfully.');
        } catch (err) {
            // res.json('errors/404', { err });
            res.json({ err });
        }
    },

    // getForm(req, res) {
    //     res.render('users/registration'); //res.redirect('users/registration')
    // },

    // View all users [FRONT END: explore button in nav bar]
    async getAll(req, res) {
        const users = await userRepository.getAll();
        res.json(users)
    },

    // Update user profile bio details *UPDATEDAT FIELD NOT WORKING* 
    async update(req, res) {
        try {
            const result = await userRepository.update(req.params.id, req.body);
            // const { result } = await userRepository.update(req.params.id, req.body);
            validateProfile(req.body);
            console.log(result)
            res.json({
                result
            });

        } catch (err) {
            console.log('error', err);
            res.json({
                "Error": err.message,
            })
        }
    },

    // User adds movie to favourites & movie is added to Dateflix database
    async addFavMovie(req, res) {
        try {
            const result = await userRepository.addFavMovie(req.params.id, req.body);
            movieRepository.create(req.body); 
            res.json({
                result
            });

        } catch (err) {
            console.log('error', err);
            res.json({
                "Error": err.message,
            })
        }
    },

    // Delete user profile 
    async delete(req, res) {
        try {
            const id = await userRepository.delete(req.params.id);
            res.json('deleted user. redirect to website landing page');
        } catch (err) {
            console.log('error', err);
        }
    },

};

