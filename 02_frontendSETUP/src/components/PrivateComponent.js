import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateComponent = () => {
    
    // if the user has signed up then it means its data is present in local storage
    const auth = localStorage.getItem('user');

    return (
        //Outlet is used to show the children component of private component. If the user data is empty it means user has not signed up thus if user tries to open any other page, he will navigate to the signed up page
        auth ? <Outlet/> : <Navigate to='/signup'/>
    )
}

export default PrivateComponent
