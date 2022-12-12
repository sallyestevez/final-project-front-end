import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth"; 

function Header({ isLoggedIn, setIsLoggedIn, setUserInformation }) {
    function logout() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUserInformation({});
                setIsLoggedIn(false);
            })
            .catch((error) => {
                console.warn(error);
            }); 
    }

    return (
        <header>
                <img 
                    src="https://web.archive.org/web/20171101163714im_/https://d13ph7xrk1ee39.cloudfront.net/img/menu-logo.png?HyDpkTF6yevjYj68w6Gl3g" 
                    alt="Miiverse" 
                    width="165" 
                    height="30"></img>
            <nav>
                {isLoggedIn && <Link to="/">
                    <p>Activity Feed</p>
                </Link>}
                {isLoggedIn && <Link to="/profile">
                    <p>Profile</p>
                </Link>}
                {!isLoggedIn && <Link to="/login">
                    <p>Login</p>
                </Link>}
                {!isLoggedIn && <Link to="/create">
                    <p>Create User</p>
                </Link>}
                {isLoggedIn && <Link to="/new-post">
                    <p>Create Post</p>
                </Link>}
                {isLoggedIn && <p onClick={() => logout()}>Log Out</p>}
            </nav>
        </header>
    );
}

export default Header;