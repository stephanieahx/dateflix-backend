const movieRepository = require('../repositories/movieRepository');
const sessionController = require('./sessionController')
const db = require('../db');
const fetch = require('node-fetch');
// const url = "https://api.typeform.com/forms/lpNLpXTj/responses";
// const accessKey = process.env.ACCESS_KEY || "ZWin8QmYEu5T65X6dTmm66uN1U8EwUCprkYrKXFBi4g";

module.exports = {
    async getAll(req, res) {
        const feedback = await feedbackRepository.getAll();
        console.log(feedback);
        res.render('feedback/index', { feedback });
    },

};
