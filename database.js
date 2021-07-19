const { MongoClient } = require("mongodb");

// Replace the uri string with your MongoDB deployment's connection string.
const uri ="mongodb+srv://admin:admin@cluster0.ga47f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const client = new MongoClient(uri);

async function run(inputQuery) {
    await client.connect();

    const database = client.db('sample_analytics');
    const accounts = database.collection('accounts');
    const query = { limit: parseInt(inputQuery) };

    let account = await accounts.findOne(query);
    return account;
}

module.exports = { run };