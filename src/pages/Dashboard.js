import React, { useEffect } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';

function Dashboard({ isLoading, isLoggedIn, setIsLoggedIn, setUserInformation, userInformation }){
    const navigate = useNavigate();

    // if not logged in & not loading navigate to login page
    useEffect(() => {
        if(!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]);

    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} 
                setUserInformation={setUserInformation}
            />
            <div className="PageWrapper">
            <Post />
            </div>
        </>
    );
}

export default Dashboard;