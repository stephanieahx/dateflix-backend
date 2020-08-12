const userRepository = require('../repositories/userRepository');
const { validateUser } = require('../models/userValidator');
const { validateProfile } = require('../models/profileValidator');
const sessionController = require('./sessionController'); // don't know if this is required
const { find } = require('../repositories/userRepository'); // don't know if this is required / don't know what it is for
const movieRepository = require('../repositories/movieRepository');
// const movieController = require('../controllers/movieController');

module.exports = {
    // Register a new user
    async create(req, res) {
        try {
            validateUser(req.body);
            await userRepository.create(req.body);
            res.json('User registered successfully.');
        } catch (err) {
            res.json({ err });
        }
    },

    // View all users [FRONT END: explore button in nav bar]
    async getAll(req, res) {
        const users = await userRepository.getAll();
        res.json(users)
    },

    // View one user
    async getOne(req, res) {
        const user = await userRepository.getOne(req.params.id);
        res.json(user);
    },


    // View information of selected movie
    async getOne(req, res) {
        const movie = await movieRepository.getOneById(req.params.id);
        res.json(user);
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
            res.json({ err });
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

