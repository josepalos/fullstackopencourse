import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogsList = ({ blogs }) => {
    if (blogs.length === 0){
        return <span><i>No blogs found for this user</i></span>;
    }else{
        return (
            <ul>
                {blogs.map((blog) => <li key={blog.id}>{blog.name}</li>)}
            </ul>
        );
    }
};

const User = () => {
    // URL parameters
    const userId = useParams().id;
    const users = useSelector(state => state.user.allUsers);
    const user = users.find(u => u.id === userId);
    // TODO: redirect to a not found...
    // https://stackoverflow.com/questions/36052604/how-to-let-react-router-respond-with-404-status-code

    if (!user){
        return null;
    }

    return (
        <div>
            <h3>User {user.name}</h3>
            <h4>Added blogs:</h4>
            <BlogsList blogs={user.blogs} />
        </div>
    );
};

export default User;