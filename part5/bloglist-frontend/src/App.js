import React, { useState, useEffect } from 'react';

import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';

import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);

  // Login state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const resetForms = () => {
    setUsername("");
    setPassword("");
    setSignupName("");
    setSignupUsername("");
    setSignupPassword("");
  }
  
  const handleLogin = async (event) => {
    event.preventDefault();
    try{
      const user = await loginService.login(username, password);
      setUser(user);
      blogService.setToken(user.token);
      console.log(user);

      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user));
      resetForms();
    } catch (exception) {
      console.error("Wrong credentials");
    }
    
  }

  const handleSignUp = async (event) => {
    event.preventDefault();
    try{
      const newUser = await loginService.signUp(signupName, signupUsername, signupPassword);
      setUser(newUser);
      blogService.setToken(user.token);
      console.log(user);

      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user));
      resetForms();
    }catch (exception) {
      console.error("Error creating the new user:", exception);
    }
  }

  const logout = () => {
    setUser(null);
    blogService.setToken(null);
    window.localStorage.removeItem('loggedBlogsappUser');
  }

  // Fetch the blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    }
    fetchBlogs();
  }, []);

  // Try to fetch the logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const renderLoginForm = () => <LoginForm username={username}
                                           setUsername={setUsername}
                                           password={password}
                                           setPassword={setPassword}
                                           handleLogin={handleLogin} />;
  const renderSignUpForm = () => <SignUpForm name={signupName}
                                             setName={setSignupName}
                                             username={signupUsername}
                                             setUsername={setSignupUsername}
                                             password={signupPassword}
                                             setPassword={setSignupPassword}
                                             handleSignUp={handleSignUp} />;

  const renderForms = () => (
    <>
      <div>
        <h3>Login</h3>
        {renderLoginForm()}
      </div>
      <div>or</div>
      <div>
        <h3>Create a new user</h3>
        {renderSignUpForm()}
      </div>
    </>
  );

  const renderMainPage = () => (
    <div>
      <div>
        <h3>Logged in as {user.name}</h3><button onClick={logout}>Logout</button>
      </div>
      <div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      {user === null
        ? renderForms()
        : renderMainPage() }
    </div>
  )
}

export default App