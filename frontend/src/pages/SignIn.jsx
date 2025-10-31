import React, { useContext, useState } from "react";
import bg from "../assets/bg1.jpg";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserDataContext";
import axios from "axios";


function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
   const {serverUrl ,  setUserData }=useContext(UserDataContext);
  const navigate = useNavigate();
  
  const [email,setEmail] = useState("");
  const [loading,setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const[err,setErr]=useState("");
 

const handleSignIn = async(e)=>{
    e.preventDefault();
    setErr("");
    setLoading(true);
 try{
  
    let result = await axios.post(`${serverUrl}/api/auth/signin`,{
        email , password
    }, {withCredentials : true});
    setUserData(result.data);
    setLoading(false);
    navigate("/");
 }catch(error){
     console.log(error);
     setUserData(null);
     setErr(error.response.data.message);
      setLoading(false);
 }
}

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center bg-no-repeat flex justify-center items-start"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <form className="w-[90%] h-[500px] max-w-[500px] bg-[#0000060] backdrop-blur shadow-lg shadow-black-950 flex flex-col items-centre justify-center gap-[25px] px-[30px] mt-10 mb-10 "
      onSubmit={handleSignIn}>
        <h1 className="text-white text-[30px] font-semibold mb-[30px]">
          Sign in to <span className="text-blue-400">Virtual Assistant </span>
        </h1>
        
        <input
          type="text"
          placeholder="Email"
          className="w-[full] h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full"
           required
          onChange={(e)=>setEmail(e.target.value)
          }
          value = {email}
        ></input>

        <div className="relative w-[full] h-[60px] outline-none border-2 border-white bg-transparent  rounded-full">
          <input
            className="w-full h-full rounded-full  text-white placeholder-gray-300 px-[20px] py-[10px] "
            type={showPassword ? "text" : "password"}
            placeholder="password"
             required
          onChange={(e)=>setPassword(e.target.value)
          }
          value = {password}
          ></input>
          {!showPassword && (
            <FaEye
              className="absolute top-[15px] right-[20px] w-[40px] h-[25px] cursor-pointer text-[white]"
              onClick={() => {
                setShowPassword(true);
              }}
            />
          )}
          {showPassword && (
            <FaEyeSlash
              className="absolute top-[15px] right-[20px] w-[40px] cursor-pointer h-[25px] text-[white]"
              onClick={() => {
                setShowPassword(false);
              }}
            />
          )}
        </div>
        {err.length > 0 && <p className="text-red-500 text-[20px]">
          *{err}
          </p>}

        <div className="flex justify-center">
          {" "}

          <button
            className="
  w-1/2
  min-w-[150px] h-[60px]
  bg-#32aacd
  rounded-full
  shadow-md
  text-blue-700
  font-semibold
  border border-blue-300
  hover:bg-blue-100 hover:text-blue-900
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-400 
" disabled= {loading}          >
  
            {loading?"Loading...":" Sign In"}
          </button>
        </div>
        <div className="flex justify-center">
          <p className="text-[white] text-18px ">
            want to create a account ?
            <span
              className="text-[blue] cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              {" "}
              Sign Up
            </span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignIn;
