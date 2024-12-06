
// importing express module for routing purpose
const express = require('express');
const app = express();

// Imprts CORS(cross-origin resource sharing) middleware, which allows your server to handle cross-origin requests (e.g., from a frontend running on a different port or domain).
const cors = require('cors')

// connecting to the database server
require('./db/config')


// imports User model to interact with the users collection
const User = require('./db/User');

// imports Product model to interact with the products collection
const Product = require('./db/Product')

// resposible for converting the data into json format during post, put, delete requests, without it the req.body would be a raw string
app.use(express.json());


//This allows your backend to handle requests from a different origin (e.g., a React front end running on a different server).
app.use(cors())


app.get('/', (req, resp) => {
    resp.send("hello mr_d_droid")
})


// for signup, we are going to save() new user in our database w.r.t the req.body passed using post request
app.post('/register', async (req, res) => {

    let user = new User(req.body);// to save new data to database we first pass it to the User model so that the input matches to the defined User's schema, this prevent invalid data or any extra field from being stored in the database.

    let result = await user.save();// .save() is used to save the new data to the database, we can't use .select with .save, So we manually delete the password in result variable

    // .toObject converts the "mongoose document" into a plain javascript object.
    // .json() is for sending a response, It doesn’t provide you with a new copy of the data to work with.
    result = result.toObject();
    delete result.password;

    console.log(result);

    // sending result to client
    res.send(result)
})


// for login, we are going to strict find() a specific user in our database w.r.t the req.body passed using post request
app.post('/login', async (req, resp) => {
    // to check user has sent both password and email
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select("-password"); // findOne is used to find the data in database and .select("-password") used to fetch data without password.

        if(user){
            console.log(user);
            resp.send(user);
        }
        else{
            resp.send({ result: 'no user found' })
        }
    }
    else{
        resp.send({ result: 'please input password and email both' })
    }

})


// to add product in database, adding product means saving data in database, so we are going to save() new product in our database w.r.t the req.body passed using post request
app.post('/add-product', async(req, resp) => {

    let product = new Product(req.body);

    let result = await product.save();

    console.log(result);
    
    resp.send(result);
})


// to get all the products from database, we are going to find() all products from our database using get request
app.get("/products", async (req, resp)=>{

    let products = await Product.find();

    if(products.length>0){
        resp.send(products);
    }
    else{
        resp.send({result: "No Products found"})
    }
})


// to delete product, we are going to strictly delete a specefic product from our database w.r.t id passed in url using delete request
app.delete('/product/:id', async (req, resp)=>{
    const result = await Product.deleteOne({_id: req.params.id});
    resp.send(result);
    console.log(result);
})


// to update product, first we need to get the details of particular id's product, so we are going to strict find() a specific product from our database w.r.t the id passed in url using get request
app.get("/product/:id", async (req, resp)=> {
    try{
        let result = await Product.findOne({_id: req.params.id});
    
        if(result){
            resp.send(result)
        }
        else{
            resp.send({result: "No record found"})
        }
    }
    catch(error)
    {
        resp.send({result: "Sorry! No record found"})
    }
})


// now to update the product, we are going to strict update a specific product in our database w.r.t the id passed in url using put request
app.put('/product/:id', async (req, resp)=>{
    let result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set: req.body
        }
    )

    resp.send(result);
})


// search router, we are going to regex find() our data from the database w.r.t the key passed in the url using get request
app.get("/search/:key", async (req, resp) => {
    // we are using regex search instead of find({name: req.params.key}) because find() is a strict search, it searches for exact match. But regex allows flexible search, it can search a subString also.
    let result = await Product.find(
        {
            //-> $or is the operator which is going to search the data from the mongodb database that satisfy at least one of the below conditions
            "$or": [
                //-> the $regex operator is used to search for string that matches with  the req.params.key as a whole string or substring also.
                {name: {$regex: req.params.key}},
                {company: {$regex: req.params.key}},
                {category: {$regex: req.params.key}}
            ]
        }
    );
    resp.send(result);
})

app.listen(5000, () => {
    console.log('Backend Server is running at:-- http://localhost:5000')
})

