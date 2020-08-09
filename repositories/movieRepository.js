const db = require('../db');
const { ObjectId } = require('mongodb');


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
    
    // View all movies as posters
    getAll() {
        // get id and poster
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

    // Find movie by title * NOT WORKING. 9 Aug - TO BE FETCHED FROM FRONT END*
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