import './App.css';
import About from './components/About';
import Home from './components/Home';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';


import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import NoteState from './context/notes/NoteState';
import { useState } from 'react';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  };

  return (
    <>
    <NoteState>
    <Router>
      
        <Navbar />
        <Alert alert={alert} message="This is a message"/>
        <div className="container">
      
        <Routes>
          <Route path="/" element={<Home showAlert={showAlert} />} />
          <Route path="/about" element={<About />} />
          <Route path="/Login" element={<Login showAlert={showAlert}/>} />
          <Route path="/Signup" element={<Signup showAlert={showAlert}/>} />
        </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
