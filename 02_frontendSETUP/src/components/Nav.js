import react from 'react';
import {Link, useNavigate} from 'react-router-dom'

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
            <ul className='nav-ul'>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/add">Add Product</Link></li>
                <li><Link to="/update">Update Product</Link></li>
                <li><Link to="/profile">Profile</Link></li>

                <li>
                    {/* if user signed up detail is empty then it means user has not signed up, so if auth is false(empty) then show signup link */}
                    { auth ?
                        <Link to="/signup" onClick={logout}>Log Out</Link> :
                        <Link to="/signup">Sign Up</Link>
                    }
                </li>

            </ul>
        </div>
    )
}

export default Nav;