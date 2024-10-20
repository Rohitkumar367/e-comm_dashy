import React, {useState, useEffect} from 'react' 
import {useNavigate} from 'react-router-dom'

const SignUp = () => {
    const navigate = useNavigate();

    const[formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // if user is already signed up and then if he tries to open signup page, he will navigate to home page
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
            [event.target.name]: event.target.value
        })
    }

    async function submitHandler()
    {
        console.log(formData);

        let result = await fetch('http://localhost:5000/register', {
            method: 'post',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        result = await result.json();
        
        console.log(result)

        // storing the user signed up data into local storage
        localStorage.setItem("user", JSON.stringify(result))

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
