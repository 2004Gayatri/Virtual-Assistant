import React, { useContext } from 'react';
import { UserDataContext } from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home(){
    const {userData,serverUrl,setUserData} = useContext(UserDataContext);
    const navigate = useNavigate();
    const handleLogOut = async ()=>{
      try{
        const result = await axios.get(`${serverUrl}/api/auth/logout` , {withCredentials:true});
        navigate("/signin");
        setUserData(null);
      }catch(err){
        console.log(err);
        setUserData(null);
      }
    }
    return(
        <div className="w-full min-h-screen bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center flex-col p-[20px]">
          <button
            className="
  w-1/6
  min-w-[150px] h-[60px]
  bg-#32aacd
  rounded-full
  shadow-md
  text-red-700
  font-semibold
  border border-blue-300
  hover:bg-blue-100 hover:text-blue-900
  transition-colors duration-200
  focus:outline-none focus:ring-2 focus:ring-blue-400
  absolute top-[20px] right-[20px]
  text-[19px] px-[20px] py-[10px] 
" onClick={handleLogOut}
          >
            Logout
          </button>
           <button
            className="
  w-1/6
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
   absolute top-[80px] right-[20px]
   text-[19px] px-[20px] py-[10px] mt-[10px]
" onClick={()=>navigate("/customize")}
          >
            Customize Assistant
            
          </button>
          <div className='w-[300px] h-[400px] flex justify-centre items-center overflow-hidden rounded-4xl shadow-lg gap-20px mt-[50px] '>
            
            <img src={userData?.assistantImage} className='h-full object-cover'  />
    

          </div>
          <h1 className="text-white text-[20px] mt-4">
          I am {userData?.assistantName}
        </h1>
        </div>
    )
}

export default Home;
