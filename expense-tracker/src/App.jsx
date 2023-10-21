import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import SignupForm from './components/SignupForm';
import LoginForm from './components/LoginForm';
import Home from './components/Home';


function App() {
  return (
    <>
      {/* <Navbar/> */}
      <Routes>
        <Route path='/signup' element={<SignupForm/>} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path='/' element={<Home/>} />

      </Routes>
    </>
  )
}

export default App
