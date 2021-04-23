import React from "react";
import PropTypes from "prop-types";

const LoginForm = ({ handleSignUp, name, setName, username, setUsername, password, setPassword }) => (
    <form onSubmit={handleSignUp}>
        <div>
            <label htmlFor="name">Name: </label>
            <input type="text"
                value={name}
                name="Name"
                onChange={({ target }) => setName(target.value)}
            />
        </div>
        <div>
            <label htmlFor="username">Username: </label>
            <input type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
        </div>
        <div>
            <label htmlFor="password">Password: </label>
            <input type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
        </div>
        <button type="submit">Sign up</button>
    </form>
);

LoginForm.propTypes = {
    handleSignUp: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    setName: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
};

export default LoginForm;