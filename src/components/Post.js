import React from 'react';

function TextPost({ 
    content, 
    feeling,
    userId, 
    userName 
}){
    return (
        <div className='PostCSS'>
            <div className='poster'>
                <p>Posted by: {" "}
                    {userName}
                </p>
            </div>
            <p className="Feeling">Feeling: {feeling}</p>
            <p className="PostContent">{content}</p>
        </div>
    );
}

export default TextPost;