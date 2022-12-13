import React from "react";

function CreatePostForm({ createPost }) {
    return (
        <form className="formElement" onSubmit={(e) => createPost(e)}>
            <label htmlFor="feeling">How are you feeling right now?</label>
            <input type="text" name="feeling" />
            <label htmlFor="postContent">What do you want to say?</label>
            <textarea name="content" rows="4" cols="50"></textarea>
            <div className="ButtonWrapper">
                <button type="submit" className="Button">
                    Post
                </button>
            </div>
        </form>
    );
}

export default CreatePostForm;