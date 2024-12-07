import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {

    const auth = localStorage.getItem('user');
    const userId = JSON.parse(auth)._id;

    return (
        <div className='home-page'>
            <h1>Home Page</h1>
            <Link to={`/products/${userId}`} className='product-list-btn'>See Your ProductList</Link>
        </div>
    )
}

export default Home
