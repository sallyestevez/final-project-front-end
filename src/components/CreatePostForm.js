import React from "react";

function CreatePostForm({ createPost }) {
    return (
        <form className="formElement" onSubmit={(e) => createPost(e)}>
            <label htmlFor="feeling">Feeling</label>
            <input type="text" name="feeling" />
            <label htmlFor="postContent">What do you want to say?</label>
            <input type="text" name="content" />
            <div className="ButtonWrapper">
                <button type="submit" className="Button">
                    Post
                </button>
            </div>
        </form>
    );
}

export default CreatePostForm;