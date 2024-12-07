import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        email: "",
        password: ""
    });

    function changeHandler(event)
    {
        setFormData({
            ...formData,
            [event.target.name]: [event.target.value]
        })
    }


    // if user is already loged in and then if he tries to open login page, he will navigate to home page
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    })


    async function submitHandler()
    {
        console.log(formData)

        // POST request to the backend API(5000/login) using fetch API
        // fetch() function, which is used to make an HTTP request from the client to the server
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // .json() takes the raw JSON string of result and converts it into javaScript object
        result = await result.json();

        console.log(result)

        if(result.name)
        {
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/')
        }
        else
        {
            alert(result.result)
        }

    }

    return (
        <div className='login'>

            <h1>Login</h1>

            <input 
                type='text' 
                placeholder='Enter Email' 
                className='inputBox'
                name='email'
                value={formData.email}
                onChange={changeHandler}
            />

            <input 
                type='password' 
                placeholder='password' 
                className='inputBox'
                name='password'
                value={formData.password}
                onChange={changeHandler}
            />

            <button
                type='button'
                onClick={submitHandler}
            >
                Login
            </button>
        </div>
    )
}

export default Login
