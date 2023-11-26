import './App.css';
import LoginPage from './pages/LoginPage';
import { Route, Routes } from 'react-router';
import Page2 from './pages/Page2';
import Climat from './pages/Climat';
import Browser from './pages/Browser';


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/Page2" element={<Page2 />} />
        <Route path="/Climat" element={<Climat />} />
        <Route path='/Browser' element={<Browser/>}/>
      </Routes>
    </div>
  );
}

export default App;
