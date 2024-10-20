
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

app.post('/register', async (req, res) => {
    let user = new User(req.body);// to send data to database we first formed the object of that data based on User model
    let result = await user.save();// .save() is used to send the data, we can't use .select with .save so we manually delete the password in result variable
    result = result.toObject();
    delete result.password;

    res.send(result)
})

app.post('/login', async (req, resp) => {

    console.log(req.body)

    // to check user has sent both password and email
    if (req.body.password && req.body.email) 
    {
        let user = await User.findOne(req.body).select("-password"); // findOne is used to find the data in database and .select("-password") used to fetch data without password

        if(user) 
        {
            resp.send(user);
        }
        else 
        {
            resp.send({ result: 'no user found' })
        }
    }
    else
    {
        resp.send({result: 'please input password and email both'})
    }

})

app.listen(5000, () => {
    console.log('Backend Server is running at:-- http://localhost:5000')
})

