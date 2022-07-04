
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './Componentes/LandingPage';
import Home from './Componentes/Home';
import Detail from './Componentes/Detail';
import CreateForm from './Componentes/CreateForm';


function App() {
  return (
    <BrowserRouter>
    <div >
     <Routes>
      <Route path='/' element={<LandingPage />} />
      <Route path='/home' element={<Home />} />
      <Route path='/home/:id' element={<Detail />} />
      <Route path='/new-videogame' element={<CreateForm />} />
     </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
