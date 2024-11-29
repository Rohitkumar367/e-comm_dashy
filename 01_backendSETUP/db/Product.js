// This file to define product's schema and model

// here collection is similar to the table in case of mySQL DBMS


const mongoose = require('mongoose');

// Defines a schema for the products collection, schema specifies the structure of the data in the collection
const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String
})


// mongoose.model('collection', schema) -> model is What you use to interact(create, read, update or delete) with the database.
// Model provides the actual interface to interact with the MongoDB collection based on the schema like: .create(), .find(), .updateOne(), deleteOne(), etc
module.exports = mongoose.model('products', productSchema);//-> productSchema ko products collections ke saath bind ker diye

