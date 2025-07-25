import "./App.scss";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login/Login";
import SignUp from "./pages/Login/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import CandidateLogin from "./pages/CandidateLogin/CandidateLogin";
import CandidateDashboard from "./pages/CandidateDashboard/CandidateDashboard";
import CandidateDetail from "./pages/CandidateDetail/CandidateDetail";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/candidate/login' element={<CandidateLogin />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/dashboard/:id' element={<CandidateDetail />} />
            <Route path='/candidate/dashboard' element={<CandidateDashboard />} />
            <Route path='*' element={<p>Not Found</p>}/>
      </Routes>
    </BrowserRouter>

    </>
  )
}

export default App;
