
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './Componentes/LandingPage';


function App() {
  return (
    <BrowserRouter>
    <div >
     <Routes>
      <Route path='/' element={<LandingPage />}/>
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
