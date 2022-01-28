import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "./style.css";
import Notifications from "../notifications/Notifications";
import { logoutUser } from "../../reducers/userReducer";
import LoginForm from "../LoginForm";
import SignUpForm from "../SignUpForm";
import Toggleable from "../Toggleable";


const UserForms = () => (
    <>
        <span>Not logged in</span>
        <Toggleable showButtonLabel="Login" hideButtonLabel="Cancel">
            <h3>Login</h3>
            <LoginForm />
        </Toggleable>

        <Toggleable showButtonLabel="Sign up" hideButtonLabel="Cancel">
            <h3>Create a new user</h3>
            <SignUpForm />
        </Toggleable>
    </>
);

const UserInfo = () => {
    const dispatch = useDispatch();
    const loggedUser = useSelector(state => state.user.loggedUser);

    const logout = () => {
        dispatch(logoutUser());
    };

    if(loggedUser===null){
        return <UserForms />;
    }

    return <>
        <span>Logged in as {loggedUser.name}</span>
        <button className="logoutBtn" onClick={logout}>Logout</button>
    </>;
};

const Header = () => (
    <div className="header">
        <h1>Blogs App</h1>
        <div>
            <Link className="menu_entry" to="/">Blogs</Link>
            <Link className="menu_entry" to="/users">Users</Link>
            <UserInfo />
        </div>
        <Notifications />
    </div>
);

export default Header;