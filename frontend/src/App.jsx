import Home from "./pages/home/Home"
import { Navigate, Route, Routes } from "react-router-dom"
import Login from "./pages/login/Login"
import SignUp from "./pages/signup/Signup"
import { Toaster } from "react-hot-toast"
import { useAuthContext } from "./context/AuthContext"

export default function App() {
  const {authUser} = useAuthContext()
  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path="/" element={authUser ? <Home /> : <Navigate to='/login' />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/" />} />
        <Route />
        <Route />
      </Routes>
      <Toaster />
    </div>
  )
}  
