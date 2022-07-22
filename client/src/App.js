import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import './App.css';
import AddBook from './components/AddBook'
import ShowBook from './components/ShowBook'

function App() {


 

  return (
    <Router>
    <div className="App">
    <h1>Books</h1>
      <Routes>
        <Route path='/' element={<AddBook></AddBook>}> </Route>
        <Route path='/book/:book' element={<ShowBook></ShowBook>}></Route>
        <Route path='*' element={<h1>404: This is not the webpage you are looking for</h1>}> </Route>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
