import React from 'react';
import Counter from './Counter';

function TextPost({ 
    content, 
    feeling,
    userId, 
    userName,
}){
    return (
        <div className='PostCSS'>
            <div className='PosterFeeling'>
                <p>Posted by: {" "}
                    {userName}
                </p>
                <p>
                    Feeling: {feeling}
                </p>
            </div>
            <p className="PostContent">{content}</p>
            <div className='Count'>
                <Counter />
            </div>            
        </div>
    );
}

export default TextPost;