import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css';
import './index.css'
import { useState, useEffect } from 'react';

import Footer from './components/Footer'
import NavBar from './components/NavBar'
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FrontPage from './pages/FrontPage';
import LogOutPage from './pages/LogOutPage';
import AddPostPage from './pages/AddPostPage';
import NeedToLoginPage from './pages/NeedToLoginPage';
import PostPage from './pages/PostPage';

function App() {

  const [token, setToken] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    setToken(localStorage.getItem("auth_token"));
    if (token === null) {
      setUser(null);
    } else {
      setUser(JSON.parse(Buffer.from(token.split(".")[1], "base64").toString()));
    }
  }, []);


  return (
    <Router>
      <div className="App">
        <NavBar token={token} />
        <Routes>
          <Route path='/' element={<FrontPage />}> </Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/logout' element={<LogOutPage />}></Route>
          <Route path='/login/forgotpassword' element={<ForgotPasswordPage />}></Route>
          <Route path='/addPost' element={<AddPostPage />}></Route>
          <Route path='/post/:id' element={<PostPage />}></Route>
          <Route path='/needToLogin' element={<NeedToLoginPage />}></Route>
          <Route path='*' element={<h1>404: This is not the webpage you are looking for</h1>}> </Route>
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
