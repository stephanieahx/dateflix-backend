const userRepository = require('../repositories/userRepository');
const sessionController = require('./sessionController');

module.exports = {
   // Register a new user
    async create(req, res) {
        try {
            // validate(req.body);
            await userRepository.create(req.body);
            res.json('User registered successfully.');
        } catch (err) {
            res.render('errors/404', { err });
        }
    },

    // getForm(req, res) {
    //     res.render('users/registration'); //res.redirect('users/registration')
    // },

    // View all users
    async getAll(req, res) {
        const users = await userRepository.get();
        res.json("Viewing all users.")
    },

    // Update user profile
    async update(req, res) {
        try {
            const { result } = await userRepository.update(req.params.id, req.body); // assigns the value of a key to a variable
            // console.log(id.message.documents[0]);
            res.json({ result });

        } catch (err) {
            console.log('error', err);
            res.json({
                "message": err.message,
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

