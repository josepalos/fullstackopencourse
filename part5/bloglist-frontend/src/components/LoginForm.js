import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ 
  handleLogin,
  username,
  handleUsernameChange,
  password,
  handlePasswordChange
}) => (
    <form onSubmit={handleLogin}>
    <div>
      <label htmlFor="username">Username: </label>
      <input type="text"
             value={username}
             name="Username"
             onChange={handleUsernameChange}
      />
    </div>
    <div>
      <label htmlFor="password">Password: </label>
      <input type="password"
             value={password}
             name="Password"
             onChange={handlePasswordChange}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
}

export default LoginForm
