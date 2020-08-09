const MongoClient = require('mongodb').MongoClient;
const MONGO_URL =
    process.env.MONGODB_URI
// || 'mongodb://localhost:27017';
const DB_NAME = 'dateflix'

const COLLECTIONS = {
    USERS: 'users',
    MOVIES: 'movies',
}

const client = new MongoClient(MONGO_URL,
    {
        useUnifiedTopology: true
    }
);

module.exports = {
    async connect() {
        const connection = await client.connect();
        console.log('Connected to MongoDB.');
        const db = connection.db(DB_NAME);
        this.users = db.collection(COLLECTIONS.USERS);
        this.movies = db.collection(COLLECTIONS.MOVIES);
    },
    disconnect() {
        return client.close();
    },
};