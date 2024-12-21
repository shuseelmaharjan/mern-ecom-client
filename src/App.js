import './App.css';
import Header from './components/Header/Header';
import { Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

function App() {
  return (
    <>
    
    <Header />
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Register />} />
        </Routes>
    </>
        
  );
}

export default App;
