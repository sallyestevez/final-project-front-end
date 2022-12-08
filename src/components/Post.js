import React from 'react';
import { Link } from 'react-router-dom';

function TextPost({ 
    content, 
    postData, 
    userId, 
    userName 
}){
    return (
        <div className='PostCSS'>
            <p>Posted by: {" "}
                <Link to={`user/${userId}`}>{userName}</Link>
            </p>
            <p className="PostContent">{content}</p>

        </div>
    );
}

export default TextPost;