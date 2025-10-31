import React from "react";

import SignUp from "./pages/SignUp.jsx";
import { Routes , Route , Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn.jsx";
import Customize from "./pages/Customize.jsx";
import Customize2 from "./pages/Customize2.jsx";
import { useContext } from "react";
import { UserDataContext } from "./context/UserDataContext.jsx";
import Home from "./pages/Home.jsx";

function App(){
  const {userData}=useContext(UserDataContext);
  return(
    <Routes>
      <Route path='/' element={(userData?.assistantImage && userData.assistantName)? <Home/> : <Navigate to = {"/customize"}/> }/>
      <Route path='/signup' element={!userData? <SignUp/>: <Navigate to = {"/customize"}/> } />
      <Route path="/signin" element={!userData? <SignIn/>: <Navigate to = {"/"}/> } />
      <Route path="/customize" element={userData?<Customize/>: <Navigate to = {"/signup"}/>} />
       <Route path="/customize2" element={userData?<Customize2/>: <Navigate to = {"/signup"}/>} />
    </Routes>
  )
}
export default App;
