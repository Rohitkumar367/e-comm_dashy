import React, {useState, useEffect} from 'react' 
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    function changeHandler(event)
    {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        })
    }

    // if user is already signed up and then if he tries to open signup page, he will navigate to home page
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    })

    
    // post req to save new user starts inside this submitHandler
    async function submitHandler()
    {
        console.log(formData);

        // POST request to the backend API(5000/register) using fetch API
        // fetch() function, which is used to make an HTTP request from the client to the server
        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        // .json() takes the raw JSON string of result and converts it into javaScript object
        result = await result.json();
        
        console.log(result)

        // storing the user signed up data into local storage in JSON-formatting string with key-value pair
        localStorage.setItem("user", JSON.stringify(result.result))
        localStorage.setItem("token", JSON.stringify(result.auth))

        if(result) navigate('/');
    }

    return (
        <div className='signup'>

            <h1>Register</h1>

            <input
                className='inputBox'
                type="text"
                placeholder='Enter Name'
                name='name'
                value={formData.name}
                onChange={changeHandler}
            ></input>

            <input
                className='inputBox'
                type="email"
                placeholder='Enter Email'
                name='email'
                value={formData.email}
                onChange={changeHandler}
            ></input>

            <input
                className='inputBox'
                type="password"
                placeholder='Enter Password'
                name='password'
                value={formData.password}
                onChange={changeHandler}
            ></input>

            <button
                type='button'
                onClick={submitHandler}
            >
                Sign Up
            </button>
            
        </div>
    )
}

export default SignUp
