// import React, { useContext } from 'react';
// import { UserDataContext } from '../context/UserDataContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { useEffect } from 'react';

// function Home(){
//     const {userData,serverUrl,setUserData} = useContext(UserDataContext);
//     const navigate = useNavigate();
//     const handleLogOut = async ()=>{
//       try{
//         const result = await axios.get(`${serverUrl}/api/auth/logout` , {withCredentials:true});
//         navigate("/signin");
//         setUserData(null);
//       }catch(err){
//         console.log(err);
//         setUserData(null);
//       }
//     }

//     useEffect (()=>{
//       const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
//      const recognition = new SpeechRecognition();
//      recognition.continuous=true,
//      recognition.lang = 'en_US'

//      recognition.onresult = (e)

//      recognition.start()

//     },[])
   


//     return(
//         <div className="w-full min-h-screen bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center flex-col p-[20px]">
//           <button
//             className="
//   w-1/6
//   min-w-[150px] h-[60px]
//   bg-#32aacd
//   rounded-full
//   shadow-md
//   text-red-700
//   font-semibold
//   border border-blue-300
//   hover:bg-blue-100 hover:text-blue-900
//   transition-colors duration-200
//   focus:outline-none focus:ring-2 focus:ring-blue-400
//   absolute top-[20px] right-[20px]
//   text-[19px] px-[20px] py-[10px] 
// " onClick={handleLogOut}
//           >
//             Logout
//           </button>
//            <button
//             className="
//   w-1/6
//   min-w-[150px] h-[60px]
//   bg-#32aacd
//   rounded-full
//   shadow-md
//   text-blue-700
//   font-semibold
//   border border-blue-300
//   hover:bg-blue-100 hover:text-blue-900
//   transition-colors duration-200
//   focus:outline-none focus:ring-2 focus:ring-blue-400
//    absolute top-[80px] right-[20px]
//    text-[19px] px-[20px] py-[10px] mt-[10px]
// " onClick={()=>navigate("/customize")}
//           >
//             Customize Assistant
            
//           </button>
//           <div className='w-[300px] h-[400px] flex justify-centre items-center overflow-hidden rounded-4xl shadow-lg gap-20px mt-[50px] '>
            
//             <img src={userData?.assistantImage} className='h-full object-cover'  />
    

//           </div>
//           <h1 className="text-white text-[20px] mt-4">
//           I am {userData?.assistantName}
//         </h1>
//         </div>
//     )
// }

// export default Home;
import React, { useContext, useEffect } from 'react';
import { UserDataContext } from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const { userData, serverUrl, setUserData , getGeminiResponse } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      navigate("/signin");
      setUserData(null);
    } catch (err) {
      console.log(err);
      setUserData(null);
    }
  };
  const speak = (text)=>{
    const utterence = new SpeechSynthesisUtterance(text)
    
   
    window.speechSynthesis.speak(utterence)
  }

  useEffect(() => {
    // ✅ Safe SpeechRecognition setup
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length-1][0].transcript.trim();
      console.log("heard :" + transcript);
       if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
      const data = await getGeminiResponse(transcript);
      console.log(data);
      //  speak(data.response);
      if (data && data.response) {
  speak(data.response);
} else if (typeof data === "string") {
  speak(data);
} else {
  speak("Sorry, I could not understand the response.");
}
    }
    };
   

    recognition.start();
    

    // Stop recognition when leaving page
    // return () => {
    //   recognition.stop();
    // };
  }, []);

  return (
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
        "
        onClick={handleLogOut}
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
        "
        onClick={() => navigate('/customize')}
      >
        Customize Assistant
      </button>

      <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg gap-20px mt-[50px]">
        <img src={userData?.assistantImage} className="h-full object-cover" alt="Assistant" />
      </div>

      <h1 className="text-white text-[20px] mt-4">
        I am {userData?.assistantName}
      </h1>
    </div>
  );
}

export default Home;
