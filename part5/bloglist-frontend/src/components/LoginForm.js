import React from 'react';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => (
    <form onSubmit={handleLogin}>
    <div>
      <label htmlFor="username">Username: </label>
      <input type="text"
             value={username}
             name="Username"
             onChange={({target}) => setUsername(target.value)}
      />
    </div>
    <div>
      <label htmlFor="password">Password: </label>
      <input type="password"
             value={password}
             name="Password"
             onChange={({target}) => setPassword(target.value)}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default LoginForm