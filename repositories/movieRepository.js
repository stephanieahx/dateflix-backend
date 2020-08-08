const db = require('../db');
const { ObjectId } = require('mongodb');
const fetch = require('node-fetch');
const accessKey = process.env.ACCESS_KEY;
const url = 'http://www.omdbapi.com/?i=tt3896198&apikey=' + accessKey

module.exports = {
    // View all movies as posters
    getAll() {
        return db.movies.find().toArray();
    },

    // View details of selected movie
    async getOneById(id) {
        const result = await db.movies.findOne(
            {
                "_id": ObjectId(id)
            }
        );
        return result;
    },

    // Find movie by title * NOT WORKING *
    async findOneByTitle(title) {
        const result = await db.movies.findOne(
            {
                title: "title"
            }
        );
        if (!result)
            throw new Error(`No movies found with title: ${title}`);
        return result;
    },

}