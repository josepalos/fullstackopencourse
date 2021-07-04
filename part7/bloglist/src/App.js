import React, { useEffect, useRef } from "react";
import {
    BrowserRouter as Router,
    Switch, Route, Link
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { showNotification, hideNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser, logoutUser, initializeUsers } from "./reducers/userReducer";

import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import Notifications from "./components/notifications/Notifications";
import Toggleable from "./components/Toggleable";

const App = () => {
    const dispatch = useDispatch();

    const loggedUser = useSelector(state => state.user.loggedUser);

    // References
    const newBlogRef = useRef(); // It was used by the form to toggle its visibility before thunk.

    const newNotification = (text, type) => {
        const id = Math.random().toString(36).substr(2, 9);

        dispatch(showNotification(id, text, type));

        setTimeout(() =>
            dispatch(hideNotification(id))
        , 5000);

        return id;
    };

    const logout = () => {
        dispatch(logoutUser());
    };

    // Fetch the blogs and all the users
    useEffect(() => {
        dispatch(initializeBlogs());
        dispatch(initializeUsers());
    }, [dispatch]);

    // Try to fetch the logged user
    useEffect(() => {
        // Duplicated code with userReducer
        const loggedUserJSON = window.localStorage.getItem("loggedBlogsappUser");
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON);
            dispatch(loginUser(user));
        }
    }, []);

    const renderForms = () => (
        <>
            <Toggleable showButtonLabel="Login" hideButtonLabel="Cancel">
                <h3>Login</h3>
                <LoginForm/>
            </Toggleable>

            <Toggleable showButtonLabel="Sign up" hideButtonLabel="Cancel">
                <h3>Create a new user</h3>
                <SignUpForm/>
            </Toggleable>
        </>
    );

    const renderMainPage = () => (
        <div>
            <div>
                <h3>Logged in as {loggedUser.name}</h3><button onClick={logout}>Logout</button>
            </div>
            <div>
                <button onClick={() => newNotification("Hola", "success")}>
                    Notify
                </button>
            </div>
            <div>
                <Blogs newBlogRef={newBlogRef} />
            </div>
        </div>
    );

    const padding = {
        padding: 5
    };

    return (
        <Router>
            <div>
                <h2>Blogs</h2>
                <div>
                    <Link style={padding} to="/">Blogs</Link>
                    <Link style={padding} to="/users">Users</Link>
                </div>
                <Notifications />
                <Switch>
                    <Route path="/users/:id">
                        <User />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route>
                        {loggedUser === null
                            ? renderForms()
                            : renderMainPage() }
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;