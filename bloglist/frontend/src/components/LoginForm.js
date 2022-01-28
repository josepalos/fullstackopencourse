import React from "react";
import { useDispatch } from "react-redux";

import { useField } from "../hooks/index";
import { loginUserByCredentials } from "../reducers/userReducer";

const LoginForm = () => {
    const dispatch = useDispatch();

    const username = useField("text");
    const password = useField("password");

    const handleLogin = (event) => {
        event.preventDefault();
        dispatch(loginUserByCredentials(username.value, password.value));

        username.clear();
        password.clear();
    };

    return (
        <form onSubmit={handleLogin} className="login-form">
            <div>
                <label htmlFor="username">Username: </label>
                {username.asFormField()}
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                {password.asFormField()}
            </div>
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
