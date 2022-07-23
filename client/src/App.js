import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import './index.css'

import Footer from './components/Footer'
import NavBar from './components/NavBar'
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FrontPage from './pages/FrontPage';
import LogOutPage from './pages/LogOutPage';

function App() {


 

  return (
    <Router>
    <div className="App">
      <NavBar></NavBar>    
      <Routes>
        <Route path='/' element={<FrontPage />}> </Route>
        <Route path='/login' element={<LoginPage/>}></Route>
        <Route path='/register' element={<RegisterPage/>}></Route>
        <Route path='/logout' element={<LogOutPage/>}></Route>
        <Route path='/login/forgotpassword' element={<ForgotPasswordPage/>}></Route>
        <Route path='*' element={<h1>404: This is not the webpage you are looking for</h1>}> </Route>
      </Routes>
    <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
