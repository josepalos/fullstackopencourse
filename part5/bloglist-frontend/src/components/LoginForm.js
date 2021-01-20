import React from 'react';

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

export default LoginForm
