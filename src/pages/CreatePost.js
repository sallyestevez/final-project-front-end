import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';
import { addDoc, collection, getFirestore } from 'firebase/firestore';

function CreatePost({ 
    app, 
    isLoading, 
    isLoggedIn, 
    setIsLoggedIn, 
    setUserInformation, 
    userInformation 
}) {
    const [postSuccessful, setPostSuccessful] = useState(false);
    const navigate = useNavigate();

    const createPost = useCallback((e) => {
        e.preventDefault();
        const db = getFirestore(app);

        const content = e.currentTarget.content.value;
        const userId = userInformation.uid;
        const userName = userInformation.displayName;

        // db.collection("posts")
        //     .add({
        //         content,
        //         userId,
        //         userName,
        //     })

        // try {
        //     const docRef = await addDoc(collection(db, "posts"))
        // }
    });

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
                <h1>Make a Post</h1>
                <div class="PostInput">
                    <CreatePostForm />
                </div>
            </div>
        </>
    );
}

export default CreatePost;