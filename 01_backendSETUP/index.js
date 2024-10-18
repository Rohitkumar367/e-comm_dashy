
// importing express module for routing purpose
const express = require('express');
const app = express();
const cors = require('cors')

// connected our mongodb with nodejs
require('./db/config')

// imported our user model
const User = require('./db/User')

// resposible for converting the data into json format during post, put, delete requests
app.use(express.json());

// Allows resources from your Node.js server to be accessed by other domains or origins (e.g., from a frontend running on a different port or domain).
app.use(cors())


app.get('/', (req, resp) => {
    resp.send("hello mr_d_droid")
})

app.post('/register', async (req, res)=>{
    let user = new User(req.body);
    let result = await user.save();
    res.send(result)
})

app.listen(5000, ()=>{
    console.log('Backend Server is running at:-- http://localhost:5000')
})

