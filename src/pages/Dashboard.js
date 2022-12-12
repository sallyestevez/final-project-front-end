import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import TextPost from '../components/Post';
import { collection, getDocs, getFirestore } from "firebase/firestore";

const queryData = async (app) => {
    if (!app) return [];
    const db = getFirestore(app);
    const querySnapshot = await getDocs(collection(db, "posts"));
    const data = [];
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
};

function Dashboard({ 
    app,
    isLoading, 
    isLoggedIn, 
    setIsLoggedIn, 
    setUserInformation, 
    userInformation 
}){
    const navigate = useNavigate();
    const [postData, setPostData] = useState([]);

    // if not logged in & not loading navigate to login page
    useEffect(() => {
        if(!isLoggedIn && !isLoading) navigate("/login");
    }, [isLoading, isLoggedIn, navigate]);

    useEffect(() => {
        if(!app) return;
        queryData(app).then(setPostData);
    }, [app]);

    return (
        <>
            <Header 
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn} 
                setUserInformation={setUserInformation}
            />
            <div className="PageWrapper">
                <h1>Activity Feed</h1>
                <div className="PostWrapper">
                    { postData.map((post) => (
                        <TextPost 
                            content={post.content}
                            feeling={post.feeling}
                            userId={post.userId}
                            userName={post.userName}
                        />  
                    ))}
                    
                </div>  
            </div>
        </>
    );
}

export default Dashboard;