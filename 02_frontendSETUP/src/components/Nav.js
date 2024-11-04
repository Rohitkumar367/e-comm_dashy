import react from 'react';
import {Link, useNavigate} from 'react-router-dom'
import logo from '../assets/logo/e-comm_logo.png'

const Nav = () =>{

    // getting user signed up detail
    const auth = localStorage.getItem('user');

    const navigate = useNavigate();

    // if user clicks on logout, the localStorage gets cleard and the page navigate to signup page
    const logout = () => {
        localStorage.clear();
        navigate('/signup')
    }

    return (
        <div>

        <img src={logo} alt='logo_img' className='logo'/>

        {/* if user is not signed up or loged in then only sign up and login link will be showed */}
        { auth ?
            <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>

                {/* JSON.parse() converts json string into a javacript object */}
                <li><Link to="/signup" onClick={logout}>
                    LogOut ({JSON.parse(auth).name})
                </Link></li>

            </ul>
            :
            <ul className='nav-ul nav-right'>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        }
        </div>
    )
}

export default Nav;