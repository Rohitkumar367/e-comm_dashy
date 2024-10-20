import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        email: "",
        password: ""
    });

    // if user is already loged in and then if he tries to open login page, he will navigate to home page
    useEffect(() => {
        const auth = localStorage.getItem('user');
        if(auth)
        {
            navigate('/')
        }
    })

    function changeHandler(event)
    {
        setFormData({
            ...formData,
            [event.target.name]: [event.target.value]
        })
    }

    async function submitHandler()
    {
        console.log(formData)

        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

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
