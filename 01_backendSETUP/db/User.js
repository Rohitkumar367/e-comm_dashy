// This file to define user's schema and model

// here collection is similar to the table in case of mySQL DBMS


const mongoose = require('mongoose')

// Defines a schema for the users collection, schema specifies the structure of the data in the collection
const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
    }
);


// mongoose.model('collection', schema) -> model is What you use to interact(create, read, update or delete) with the database.
// Model provides the actual interface to interact with the MongoDB collection based on the schema like: .create(), .find(), .updateOne(), deleteOne(), etc
module.exports = mongoose.model('users', userSchema); //-> userSchema ko users collections ke saath bind ker diye


