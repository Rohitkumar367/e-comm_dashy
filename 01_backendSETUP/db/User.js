
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String
    }
);

// mongoose.model('table_name', schema)
module.exports = mongoose.model('users', userSchema);

