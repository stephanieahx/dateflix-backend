const userRepository = require('../repositories/userRepository');
const { validateUser } = require('../validator/userValidator'); 
const { validateProfile } = require('../validator/profileValidator'); 
const sessionController = require('./sessionController'); // don't know if this is required
const { find } = require('../repositories/userRepository'); // don't know if this is required / don't know what it is for

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

    // View all users
    async getAll(req, res) {
        const users = await userRepository.getAll();
        res.json(users)
    },

    // Update user profile - bio details
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

    // Update user profile - add movie to favourites
    async addFavMovie(req, res) {
        try {
            const result = await userRepository.addFavMovie(req.params.id, req.body);
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

