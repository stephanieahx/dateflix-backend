const db = require('../db');
const { ObjectId } = require('mongodb');

// const { default: fetch } = require('node-fetch');
const fetch = require('node-fetch');
const accessKey = process.env.TMDB_ACCESS_KEY;
const url = 'https://api.themoviedb.org/3/movie/popular?' + 'api_key=' + accessKey + '&language=en-US&page=1'

module.exports = {
    // Add movie to dateflix database
    async create(data) {
        try {
            const { insertedCount } = await db.movies.insertOne(data);
            if (!insertedCount) throw new Error('insertion failure');
            return true;
        } catch (err) {
            throw new Error(`Due to ${err.message}, you are not allowed to insert this item ${JSON.stringify}`)
        }
    },

    // View all popular movies from TMDB
    async getAllTMDB(req, res) {
        const response = await fetch(url);
        const result = await response.json().results;
        res.json(result);

    },

    // View all favourite movies in Dateflix database
    getAll() {
        return db.movies.find().toArray();
    },

    // View info of selected movie
    async getOneById(id) {
        const result = await db.movies.findOne(
            {
                "_id": ObjectId(id)
            }
        );
        return result;
    },

    // Update description of selected movie
    update(id, body) {
        return db.movies.updateOne(
            {
                "_id": ObjectId(id)
            },
            {
                $set: body
            }
        );
    },

    // Delete movie from Dateflix database
    // // TROUBLESHOOTING - DELETE ONE BY ID
    delete(id) {
        return db.movies.deleteOne(
            {
                "_id": ObjectId(id)
            }
        );
    },
    // TROUBLESHOOTING - DELETE ONE BY TITLE - param is still called 'id' instead of 'title'
    // delete(id) {
    //     return db.movies.remove(
    //         {
    //             "title": "id",
    //         },
    //         {
    //             justOne: true,
    //         }
    //     );
    // },
    
}