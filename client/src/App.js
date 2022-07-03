
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './Componentes/LandingPage';
import Home from './Componentes/Home';


function App() {
  return (
    <BrowserRouter>
    <div >
     <Routes>
      <Route path='/' element={<LandingPage />}/>
      <Route path='/home' element={<Home />}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
