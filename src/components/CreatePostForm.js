import React from "react";

function CreatePostForm({ createPost }) {
    return (
        <form className="formElement" onSubmit={(e) => createPost(e)}>
            <textarea rows="5" cols="50"></textarea>
                    
                    <div className="ButtonWrapper">
                    <button type="submit" className="Button">
                        Post
                    </button>
                    </div>
        </form>
    );
}

export default CreatePostForm;