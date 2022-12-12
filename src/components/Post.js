import React from 'react';

function TextPost({ 
    content, 
    feeling,
    userId, 
    userName 
}){
    return (
        <div className='PostCSS'>
            <p className='poster'>Posted by: {" "}
                {userName}
            </p>
            <p className="Feeling">Feeling: {feeling}</p>
            <p className="PostContent">{content}</p>
        </div>
    );
}

export default TextPost;