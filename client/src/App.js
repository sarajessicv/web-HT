import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import './index.css'
import Login from './components/Login'
import Register from './components/Register'
import Footer from './components/Footer'
import NavBar from './components/NavBar'
import ForgotPassWord from './components/ForgotPassWord';

function App() {


 

  return (
    <Router>
    <div className="App">
      <NavBar></NavBar>
    <h1>Frontpage</h1>
      <Routes>
        <Route path='/' element={<h3>Posts here</h3>}> </Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/register' element={<Register></Register>}></Route>
        <Route path='/login/forgotpassword' element={<ForgotPassWord></ForgotPassWord>}></Route>
        <Route path='*' element={<h1>404: This is not the webpage you are looking for</h1>}> </Route>
      </Routes>
    <Footer></Footer>
    </div>
    </Router>
  );
}

export default App;
