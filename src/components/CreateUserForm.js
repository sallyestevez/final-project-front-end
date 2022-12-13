import React from "react";

function CreateUserForm({ signUpUser }) {
    return (
        <form className="formElement" onSubmit={(e) => signUpUser(e)}>

            <label htmlFor="username">Name</label>
            <input type="text" name="displayName" />

            <label htmlFor="email">Email</label>
            <input type="email" name="email" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" />

            <div className="ButtonWrapper CreateLoginButton">
                <button type="submit" className="Button">
                    <p>Create</p>
                </button>
            </div>
        </form>
    );
}

export default CreateUserForm;