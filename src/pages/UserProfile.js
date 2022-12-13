import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import TextPost from '../components/Post';
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";


function UserProfilePage({ app, isLoading, isLoggedIn, setIsLoggedIn, setUserInformation, userInformation }) {
    const queryData = async (app) => {
        if (!app) return [];
        const db = getFirestore(app);
        const postsRef = collection(db, "posts");
        const p = query(postsRef, where("userd", "==", userInformation.uid));
        const querySnapshot = await getDocs(p);
        const data = [];
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        return data;
    };

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
                <h1 className='PageTitle'>User Profile</h1>
                <div class="UserProfile">
                    <div className=''>
                        <p>
                            <strong>Name: </strong>
                            {userInformation.displayName}
                        </p>
                        <p>
                            <strong>Email: </strong>
                            {userInformation.email}
                        </p>
                        <p>
                            <strong>ID: </strong>
                            {userInformation.uid}
                        </p>
                    </div>
                </div>
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

export default UserProfilePage;