const userRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();

module.exports = {
    newForm(req, res) {
        // return res.render('users/register'); 
        return res.render('sessions/new');
    },

    //create session for login 
    async create(req, res) {
        try {
            const foundUser = await userRepository.find(req.body.name);
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser;
                return res.redirect('/');
            } else {
                throw new Error();
            }
        } catch (err) {
            return res.send('<a href="/">Login credentials do not match records. Return.</a>');
            // return res.render('errors/BSIDFAOJNFA', { err });
        }
    },

    // destroy session for logout
    destroy(req, res) {
        return req.session.destroy(() => {
            res.redirect('/');
        });
    }
};