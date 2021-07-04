import React from "react";
import { useDispatch } from "react-redux";


import { useField } from "../hooks/index";
import usersService from "../services/users";
import { loginUser, signUpUser } from "../reducers/userReducer";

const LoginForm = () => {
    const dispatch = useDispatch();

    const name = useField("text");
    const username = useField("text");
    const password = useField("password");

    const handleSignUp = async (event) => {
        event.preventDefault();
        try{
            const newUser = await usersService.signUp(name.value, username.value, password.value);
            dispatch(loginUser(newUser));
            // TODO move the call to the service inside the reducer
            dispatch(signUpUser(newUser));
            console.log(newUser);

            name.clear();
            username.clear();
            password.clear();
        }catch (exception) {
            //newNotification("Error creating the new user", "error");
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <div>
                <label htmlFor="name">Name: </label>
                {name.asFormField()}
            </div>
            <div>
                <label htmlFor="username">Username: </label>
                {username.asFormField()}
            </div>
            <div>
                <label htmlFor="password">Password: </label>
                {password.asFormField()}
            </div>
            <button type="submit">Sign up</button>
        </form>
    );
};

export default LoginForm;