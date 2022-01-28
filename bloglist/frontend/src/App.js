import React, { useEffect, useRef } from "react";
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom";
import { useDispatch } from "react-redux";

import { showNotification, hideNotification } from "./reducers/notificationReducer";
import { initializeBlogs } from "./reducers/blogReducer";
import { loginUser, initializeUsers } from "./reducers/userReducer";

import Header from "./components/PageLayout/Header";
import Users from "./components/Users";
import User from "./components/User";
import Blogs from "./components/Blogs";
import Blog from "./components/Blog";


const App = () => {
    const dispatch = useDispatch();

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

    return (
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path="/users/:id">
                        <User />
                    </Route>
                    <Route path="/users">
                        <Users />
                    </Route>
                    <Route path="/blogs/:id">
                        <Blog />
                    </Route>
                    <Route>
                        <div>
                            <div>
                                <button onClick={() => newNotification("Hola", "success")}>
                                    Notify
                                </button>
                            </div>
                            <div>
                                <Blogs newBlogRef={newBlogRef} />
                            </div>
                        </div>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;