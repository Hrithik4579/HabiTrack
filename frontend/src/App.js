import './App.css';
import { useState } from 'react';
import About from './components/About';
import AddNote from './components/AddNote';
import Notes from './components/Notes';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from './context/notes/NoteState'
import Alert from './components/Alert';
import SignUp from './components/Signup';
import Login from './components/Login';
import Suggestions from './components/Suggestions';
import Progresstrack from './components/Progresstrack';

function App() {
  
  const [alert, setAlert]=useState(null);
  const showAlert=(msg,type)=>{
    setAlert({
      msg:msg,
      type:type,
    }) ;
    setTimeout(()=>{
      setAlert(null)
    }, 2500)
}
const getUserId = () => {
  return localStorage.getItem('user_id');
};


  return (
    <div className='app'>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Alert alert={alert} />
     
          <div className='container my-4'>
            <Routes>
              <Route path="/notes" element={<Notes showAlert={showAlert} />} />
              <Route path="/" element={<AddNote showAlert={showAlert} />} />
              <Route path="/about" element={<About showAlert={showAlert}/>} />
              <Route path="/login" element={<Login showAlert={showAlert} />} />
              <Route path="/signup" element={<SignUp showAlert={showAlert}/>} />
              <Route path="/suggestions" element={<Suggestions userId={getUserId()} />} />
              <Route path="/progress" element={<Progresstrack userId={getUserId()} />} />
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </div>
  );
}

export default App;
