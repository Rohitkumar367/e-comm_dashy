
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: String,
    category: String,
    userId: String,
    company: String
})

// mongoose.model('table_name', schema)
module.exports = mongoose.model('products', productSchema);

