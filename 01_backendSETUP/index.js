
// importing express module for routing purpose
const express = require('express');
const cors = require('cors')
const app = express();


// connecting our database using mongoose
require('./db/config')


// imported our models
const User = require('./db/User');
const Product = require('./db/Product')

// resposible for converting the data into json format during post, put, delete requests, without it the req.body would be a raw string
app.use(express.json());

// Allows resources from your Node.js server to be accessed by other domains or origins (e.g., from a frontend running on a different port or domain).
app.use(cors())


app.get('/', (req, resp) => {
    resp.send("hello mr_d_droid")
})

app.post('/register', async (req, res) => {

    let user = new User(req.body);// to save new user to database we first form the object of our data based on User model.

    let result = await user.save();// .save() is used to send the data to database, we can't use .select with .save, So we manually delete the password in result variable

    // .toObject converts the mongoose document into a plain object
    result = result.toObject();
    delete result.password;

    console.log(result);

    res.send(result)
})

app.post('/login', async (req, resp) => {

    // to check user has sent both password and email
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password"); // findOne is used to find the data in database and .select("-password") used to fetch data without password

        if (user) {
            console.log(user);
            resp.send(user);
        }
        else {
            resp.send({ result: 'no user found' })
        }
    }
    else {
        resp.send({ result: 'please input password and email both' })
    }

})

// similar to signup page
app.post('/add-product', async(req, resp) => {

    let product = new Product(req.body);

    let result = await product.save();

    console.log(result);
    
    resp.send(result);
})


app.get("/products", async (req, resp)=>{

    let products = await Product.find();

    if(products.length>0){
        resp.send(products);
    }
    else{
        resp.send({result: "No Products found"})
    }
})

app.delete('/product/:id', async (req, resp)=>{
    const result = Product.deleteOne({_id: req.params.id});
    resp.send(result)
})




app.listen(5000, () => {
    console.log('Backend Server is running at:-- http://localhost:5000')
})

