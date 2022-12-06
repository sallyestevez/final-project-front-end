import React from 'react';
import { Link } from 'react-router-dom';

function Post({ postData }){
    return (
        <div className='PostWrapper'>
            <p>Posted by:{" "} 
                {/* <Link to={`user/${postData.userId}`}>{postData.userId}</Link> */}
            </p>
            <p className="PostContent">Text</p>

        </div>
    )
}

export default Post;