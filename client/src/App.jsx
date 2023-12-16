import './App.css'
import {Route,Routes, Navigate} from "react-router-dom"
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";

function App() {


  var token=localStorage.getItem("token");
  

  return (
    <>
     <Routes>
     <Route
  path="/"
  element={!token ? <Navigate to="/login" replace /> :<Home /> }
/>
       <Route path="/signup" element={<SignUp/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
     </Routes>
    </>
  )
}

export default App
