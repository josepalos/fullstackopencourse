import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const useCredentials = (user) => {
    setUser(user);
    blogService.setToken(user.token);
  }
  
  const handleLogin = (event) => {
    event.preventDefault();
    try{
      const user = loginService.login({username, password});
      useCredentials(user);

      window.localStorage.setItem('loggedBlogsappUser', JSON.stringify(user));

      // Reset the fields of the form
      setUsername("");
      setPassword("");
    } catch (exception) {
      // setErrorMessage('Wrong credentials');
      // setTimeout(() => {setErrorMessage(null)}, 5000);
      console.error("Wrong credentials");
    }
    
  }

  const logout = () => {
    useCredentials(null);
    window.localStorage.removeItem('loggedBlogsappUser');
  }

  // Fetch the blogs
  useEffect(() => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  }, []);

  // Try to fetch the logged user
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogsappUser');
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON);
      useCredentials(user);
    }
  }, []);

  const renderLoginForm = () => <LoginForm setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />;
  const renderMainPage = () => (
    <div>
      <div>
        <h3>Logged in as {user.name}</h3><button onClick={logout} />
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
      {user === null ? renderLoginForm() : renderMainPage() }
    </div>
  )
}

export default App