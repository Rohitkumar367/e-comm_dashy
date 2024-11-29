// This file is for database connectivity



// Imports the mongoose library, allows us do define schemas and iteract with MongoDB database in an organized and structured way.
const mongoose = require('mongoose')


//-> established a connection to database e-commerce using .connect()
mongoose.connect("mongodb://localhost:27017/e-commerce") 


