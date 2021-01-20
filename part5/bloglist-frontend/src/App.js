import React, { useState, useEffect, useRef } from 'react';

import Blogs from './components/Blogs';
import LoginForm from './components/LoginForm';
import SignUpForm from './components/SignUpForm';
import Notifications from './components/notifications/Notifications';
import Toggleable from './components/Toggleable';

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

  // Notifications
  const [notifications, setNotifications] = useState([]);

  // References
  const newBlogRef = useRef();

  const newNotification = (text, type) => {
    const id = Math.random().toString(36).substr(2, 9);

    const newArray = [...notifications, {
      id: id,
      text: text,
      type: type,
      time: new Date()
    }];
    console.log(newArray);
    setNotifications(newArray);

    setTimeout(() => removeNotification(id), 5000);

    return id;
  }

  const removeNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  }

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
      newNotification("Wrong credentials", "error");
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
      newNotification("Error creating the new user", "error");
    }
  }

  const handleNewBlog = async (title, author, url) => {
    try{
      await blogService.create(title, author, url);

      newNotification(`Created blog ${title}`, "success");
      console.log("Created new blog with title", title, ", author", author, "and url", url);
      newBlogRef.current.toggleVisibility();
    } catch (error){
      newNotification("Error creating the blog", "error");
    }


    // Reload the blogs list
    const blogs = await blogService.getAll();
    setBlogs(blogs);
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

  const renderForms = () => (
    <>
      <Toggleable showButtonLabel="Login" hideButtonLabel="Cancel">
        <h3>Login</h3>
        <LoginForm username={username}
          handleUsernameChange={({target}) => setUsername(target.value)}
          password={password}
          handlePasswordChange={({target}) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      </Toggleable>

      <Toggleable showButtonLabel="Sign up" hideButtonLabel="Cancel">
        <h3>Create a new user</h3>
        <SignUpForm name={signupName}
          setName={setSignupName}
          username={signupUsername}
          setUsername={setSignupUsername}
          password={signupPassword}
          setPassword={setSignupPassword}
          handleSignUp={handleSignUp}
        />
      </Toggleable>
    </>
  );

  const renderMainPage = () => (
    <div>
      <div>
        <h3>Logged in as {user.name}</h3><button onClick={logout}>Logout</button>
      </div>
      <div>
        <Blogs blogs={blogs} handleNewBlog={handleNewBlog} newBlogRef={newBlogRef} />
      </div>
    </div>
  );

  return (
    <div>
      <h2>blogs</h2>
      <Notifications notifications={notifications} />
      {user === null
        ? renderForms()
        : renderMainPage() }
    </div>
  )
}

export default App