import './index.css';
import { Routes, Route } from "react-router-dom"
import Navbar from "./Compoments/Navbar"
import Store from "./pages/store/Store"
import Home from "./pages/home/Home"
import Description from './pages/description/Description';
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/store' element={<Store />} />
        <Route path='/description' element={<Description />} />
      </Routes >
    </>
  );
}

export default App;
