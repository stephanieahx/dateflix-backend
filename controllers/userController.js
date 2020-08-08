const userRepository = require('../repositories/userRepository');
const { validateUser } = require('../validator/userValidator'); 
const { validateProfile } = require('../validator/profileValidator'); 
const sessionController = require('./sessionController');
const { find } = require('../repositories/userRepository');

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

    // Update user profile
    async update(req, res) {
        try {
            const { result } = await userRepository.update(req.params.id, req.body);
            validateProfile(req.body);
            // console.log(message.documents[0]);
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

