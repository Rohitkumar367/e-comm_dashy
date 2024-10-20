import React, { useState } from 'react'

const Login = () => {

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

    function submitHandler()
    {
        console.log(formData)
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
