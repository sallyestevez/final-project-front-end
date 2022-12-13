import React, { useCallback, useEffect, useState } from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from '../components/CreatePostForm';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

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

    const createPost = useCallback(
        async (e) => {
            e.preventDefault();
            const db = getFirestore(app);

            const feeling = e.currentTarget.feeling.value;
            const content = e.currentTarget.content.value;
            const userId = userInformation.uid;
            const userName = userInformation.displayName;

            console.log(feeling, content, userId, userName);
            try {
                const docRef = await addDoc(collection(db, "posts"), {
                    content,
                    feeling,
                    userd: userId,
                    userName,
                });
                console.log("Document written with ID: ", docRef.id);
                setPostSuccessful(true);
            } catch (e) {
                // console.error("Error adding document: ", e);
            }
    }, [app, userInformation]);

    console.log(userInformation)
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
            <div className="PageWrapper CreatePostWrapper">
                <h1 className="PageTitle">Make a Post</h1>
                <div className="InputField">
                    <CreatePostForm createPost={createPost}/>
                </div>
            </div>
            {postSuccessful && <p class="SuccessConfirm">Posted &#x2713;</p>}
        </>
    );
}

export default CreatePost;