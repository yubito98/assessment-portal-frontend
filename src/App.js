import "./App.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='*' element={<p>Not Found</p>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;
