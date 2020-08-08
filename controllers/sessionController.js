const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();

module.exports = {
    // newForm(req, res) {
    //     // return res.render('users/register'); 
    //     return res.render('sessions/new');
    // },

    // Create session upon login 
    async create(req, res) {
        try {
            const foundUser = await userRepository.find(req.body.username);
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                // return res.redirect('/');
                return res.json('Successfully created session for login');
            } else {
                throw new Error();
            }
        } catch (err) {
            return res.json({ err });
        }
    },

    // Destroy session upon logout
    destroy(req, res) {
        return req.session.destroy(() => {
            // res.redirect('/');
            res.json('Successfully destroyed session');
        });
    }
};