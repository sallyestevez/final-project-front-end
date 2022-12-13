import React from "react";

function LoginForm({ loginUser }) {
    return (
        <form className="formElement" onSubmit={(e) => loginUser(e)}>
            <label htmlFor="email">Email</label>
            <input type="text" name="email" />

            <label htmlFor="password">Password</label>
            <input type="password" name="password" />

            <div className="CreateLoginButton">
                <button type="submit" className="Button">
                    <p>Login</p>
                </button>
            </div>
        </form>
    );
}

export default LoginForm;