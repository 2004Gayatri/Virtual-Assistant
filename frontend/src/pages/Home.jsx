
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { UserDataContext } from '../context/UserDataContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import aiImg from "../assets/ai.gif";
// import { SlMenu } from "react-icons/sl";
// import userImg from "../assets/user1.gif";
// import { ImCross } from "react-icons/im";
// function Home() {
//   const { userData, serverUrl, setUserData , getGeminiResponse } = useContext(UserDataContext);
//   const navigate = useNavigate();
//   const [listening,setListening]=useState(false);
//   const [userText , setUserText] = useState("");
//    const [aiText , setaiText] = useState("");
// const isRecognizingRef = useRef(false);
// const [ham,setHam]=useState(false);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const synth = window.speechSynthesis;

//   const handleLogOut = async () => {
//     try {
//       const result = await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       navigate("/signin");
//       setUserData(null);
//     } catch (err) {
//       console.log(err);
//       setUserData(null);
//     }
//   };
//   const startRecognition=()=>{
//     try{
//       recognitionRef.current?.start();
//       setListening(true);
//     }catch(error){
//       if(!error.message.includes("start")){
//         console.error("Recognition error :",error);
//       }
//     }
//   }
//   const speak = (text)=>{
//     const utterence = new SpeechSynthesisUtterance(text)
//     isSpeakingRef.current = true;
//     utterence.onend = ()=>{
     
//       isSpeakingRef.current=false;
//       startRecognition()
      
//     }
//     synth.speak(utterence)
//   }
//   const handleCommand=(data)=>{
//     const {type ,userInput , response } = data;
//     speak(response);
//     if(type === 'google_search'){
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.google.com/search?q=${query}`,'_blank');
//     };
//     if(type === "calculator_open"){
//       window.open(`https://www.google.com/search?q=calculator`,'_blank');
//     }
//     if(type === "instagram_open"){
//       window.open(`https://www.instagram.com`,'_blank');
//     }
//     if(type==="facebook_open"){
//       window.open(`https://www.facebook.com`,'_blank');
//     }
//     if(type==="weather_show"){
//       window.open(`https://www.google.com/search?q=weather`,
//         '_blank'
//       );
//     }
//     if(type === 'youtube_search' || type==='youtube_play'){
//       const query = encodeURIComponent(userInput);
//       window.open(`https://www.youtube.com/results?search_query=${query}`,'_blank');
//     }

    
//   }

//   useEffect(() => {
//     // ✅ Safe SpeechRecognition setup
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

//     if (!SpeechRecognition) {
//       console.error("Speech Recognition is not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = 'en-US';
//     recognitionRef.current=recognition;
    

//     const safeRecognition = ()=>{

//       try{
//         if(!isSpeakingRef.current && !isRecognizingRef.current){
//         recognition.start();
//         console.log("Recognition request to start");
//       }
//       }catch(err){
//         console.error("Start error : " , err);
//       }
//     };
//     recognition.onstart=()=>{
//       console.log("Recognition started ");
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     recognition.onend=()=>{
//       console.log("Recognition end");
//       isRecognizingRef.current=false;
//       setListening(false);
//     };
//     if(!isSpeakingRef.current){
//       setTimeout(()=>{
//         safeRecognition();
//       },1000);
//     }

//     recognition.onerror = (event)=>{
//       console.warn("Recognition error:", event.error);
//       isRecognizingRef.current = false;
//       setListening(false);
//       if(event.error !=="aborted" && !isSpeakingRef.current){
//         setTimeout(()=>{
//           safeRecognition();
//         },1000);
//       }
//     };

//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length-1][0].transcript.trim();
//       console.log("heard :" + transcript);
//        if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
//         setaiText("");
//         setUserText(transcript);
        
//         isRecognizingRef.current = false;
//         setListening(false)
//       const data = await getGeminiResponse(transcript);
//       console.log(data);
//      setaiText(data.response);
//      setUserText("")
//       handleCommand(data);


//     }
//     };
   
//   const fallback = setInterval(()=>{
//     if(!isSpeakingRef.current && !isRecognizingRef.current){
//       safeRecognition();
//     }
//   },10000);
//   safeRecognition();

//   return ()=>{
//     recognition.stop();
//     setListening(false);
//     isRecognizingRef.current=false;
//     clearInterval(fallback);
//   }
    
    
//   }, []);

//   return (
//     <div className="w-full min-h-screen bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center flex-col p-[20px]">
//       <SlMenu className='lg:hidden text-white absolute top-[20px] right-[20px] w-[25px] h-[25px]' onClick={()=>{setHam(false)}}/>
//       <div className="absolute inset-0 bg-[#00000073] backdrop-blur-xl flex flex-col justify-center items-center space-y-6 p-6">
//   <ImCross
//     className={`text-white absolute top-4 right-4 w-7 h-7 cursor-pointer hover:text-red-400 transition-all duration-300 ${ham?"translate-x-0":"translate-x-full"}`}
//   />

//   {/* Logout Button */}
//   <button
//     onClick={handleLogOut}
//     className="
//       w-[80%] sm:w-[60%] md:w-[40%]
//       py-3
//       rounded-full
//       border border-blue-300
//       text-red-700
//       font-semibold
//       shadow-lg
//       hover:scale-105 hover:shadow-xl hover:opacity-90
//       hover:bg-blue-100 hover:text-blue-900
//       transition-all duration-300 ease-in-out
//       focus:outline-none focus:ring-2 focus:ring-blue-400
//       text-lg
//     "
//   >
//     Logout
//   </button>

//   {/* Customize Button */}
//   <button
//     onClick={() => navigate('/customize')}
//     className="
//       w-[80%] sm:w-[60%] md:w-[40%]
//       py-3
//       rounded-full
//       border border-blue-300
//       text-blue-700
//       font-semibold
//       shadow-lg
//       hover:scale-105 hover:shadow-xl hover:opacity-90
//       hover:bg-blue-100 hover:text-blue-900
//       transition-all duration-300 ease-in-out
//       focus:outline-none focus:ring-2 focus:ring-blue-400
//       text-lg
//     "
//   >
//     Customize Assistant
//   </button>
//   <div className='w-full h-[2px] bg-gray-400'></div>
//   <h1 className='text-white font-semibold text-[19px]'>History</h1>
//   <div className='w-full h-[60%] overflow-auto flex flex-col gap[20px]'>
//     {userData?.history?.map((his, index) => (
//   <span className='text-gray-200 text-[18px] ' key={index}>{his}</span>
// ))}

//   </div>
// </div>

//       <button
//         className="
//           w-1/6
//           min-w-[150px] h-[60px]
//           rounded-full
//           shadow-md
//           hidden lg:block
//           text-red-700
//           font-semibold
//           border border-blue-300
//           hover:bg-blue-100 hover:text-blue-900
//           transition-colors duration-200
//           focus:outline-none focus:ring-2 focus:ring-blue-400
//           absolute top-[20px] right-[20px]
//           text-[19px] px-[20px] py-[10px]
//         "
//         onClick={handleLogOut}
//       >
//         Logout
//       </button>

//       <button
//         className="
//           w-1/6
//           min-w-[150px] h-[60px]
//           bg-#32aacd
//           rounded-full
//           shadow-md
//           text-blue-700
//           font-semibold
//           hidden lg:block
//           border border-blue-300
//           hover:bg-blue-100 hover:text-blue-900
//           transition-colors duration-200
//           focus:outline-none focus:ring-2 focus:ring-blue-400
//           absolute top-[80px] right-[20px]
//           text-[19px] px-[20px] py-[10px] mt-[10px]
//         "
//         onClick={() => navigate('/customize')}
//       >
//         Customize Assistant
//       </button>

//       <div className="w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-4xl shadow-lg gap-20px mt-[50px]">
//         <img src={userData?.assistantImage} className="h-full object-cover" alt="Assistant" />
//       </div>

//       <h1 className="text-white text-[20px] mt-4">
//         I am {userData?.assistantName}
//       </h1>
//       {!aiText && <img src={userImg} alt='' className='w-[200px]'></img>}
//       {aiText && <img src={aiImg} alt='' className='w-[200px]'></img>}
//       <h1 className='text-white text-[20px] font-semibold text-wrap '>{userText?userText:aiText?aiText:null}</h1>
//     </div>
//   );
// }

// export default Home;
// import React, { useContext, useEffect, useRef, useState } from 'react';
// import { UserDataContext } from '../context/UserDataContext';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import aiImg from "../assets/ai.gif";
// import userImg from "../assets/user1.gif";
// import { SlMenu } from "react-icons/sl";
// import { ImCross } from "react-icons/im";

// function Home() {
//   const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(UserDataContext);
//   const navigate = useNavigate();

//   const [listening, setListening] = useState(false);
//   const [userText, setUserText] = useState("");
//   const [aiText, setAiText] = useState("");
//   const [ham, setHam] = useState(false);

//   const isRecognizingRef = useRef(false);
//   const isSpeakingRef = useRef(false);
//   const recognitionRef = useRef(null);
//   const synth = window.speechSynthesis;

//   // 🔹 Logout handler
//   const handleLogOut = async () => {
//     try {
//       await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
//       navigate("/signin");
//       setUserData(null);
//     } catch (err) {
//       console.log(err);
//       setUserData(null);
//     }
//   };

//   // 🔹 Speech start
//   const startRecognition = () => {
//     if(!isSpeakingRef.current && !isRecognizingRef.current){
//       try {
//       recognitionRef.current?.start();
//       setListening(true);
//     } catch (error) {
//       if (!error.message.includes("start")) console.error("Recognition error:", error);
//     }
//     }
//   };

//   // 🔹 Speak text
//   const speak = (text) => {
//     const utterance = new SpeechSynthesisUtterance(text);
//     isSpeakingRef.current = true;
//     utterance.onend = () => {
//       isSpeakingRef.current = false;
//       setTimeout(()=>{
//         startRecognition();
//       },800)
//     };
//     synth.cancel();
//     synth.speak(utterance);
//   };

//   // 🔹 Handle assistant actions
//   const handleCommand = (data) => {
//     const { type, userInput, response } = data;
//     speak(response);

//     const open = (url) => window.open(url, '_blank');

//     switch (type) {
//       case 'google_search':
//         open(`https://www.google.com/search?q=${encodeURIComponent(userInput)}`);
//         break;
//       case 'calculator_open':
//         open('https://www.google.com/search?q=calculator');
//         break;
//       case 'instagram_open':
//         open('https://www.instagram.com');
//         break;
//       case 'facebook_open':
//         open('https://www.facebook.com');
//         break;
//       case 'weather_show':
//         open('https://www.google.com/search?q=weather');
//         break;
//       case 'youtube_search':
//       case 'youtube_play':
//         open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`);
//         break;
//       default:
//         break;
//     }
//   };

//   // 🔹 Voice recognition setup
//   useEffect(() => {
//     const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//     if (!SpeechRecognition) {
//       console.error("Speech Recognition not supported in this browser.");
//       return;
//     }

//     const recognition = new SpeechRecognition();
//     recognition.continuous = true;
//     recognition.lang = 'en-US';
//     recognition.interimResults = false;
//     recognitionRef.current = recognition;

//     let isMounted = true;
//     const startTimeout = setTimeout(()=>{
//       if(isMounted && !isSpeakingRef.current && !isRecognizingRef.current){
//       try{
//         recognition.start();
//         console.log("recognition requested to start");
//       }
//       catch(e){
//          if(e.name !== "InvalidStateError"){
//           console.error(e);
//          }
//       }
//     }
//     },1000);

//     recognition.onstart = () => {
//       console.log("Recognition started");
//       isRecognizingRef.current = true;
//       setListening(true);
//     };

//     recognition.onend = () => {
//       isRecognizingRef.current = false;
//       setListening(false);
//       if(isMounted && !isSpeakingRef.current
//       ){
//         setTimeout(()=>{
//           if(isMounted){
//             try{
//               recognition.start();
//               console.log("Recognition restarted");
//             }catch(e){
//               if(e.name !== "InvalidStateError");
//               console.log(e);
//             }
//           }
//         },1000);
//       }
//     };

//     recognition.onerror = (event) => {
//       console.warn("Recognition error:", event.error);
//       isRecognizingRef.current = false;
//       setListening(false);
//       if (event.error !== "aborted" && "aborted" && !isSpeakingRef.current) {
//         setTimeout(()=>{
//           if(isMounted){
//             try{
//               recognition.start();
//               console.log("Recognition restarted after error");
//             }catch(e){
//               if(e.name !=="InvalidStateError");
//               console.log(e);
//             }
//           }
//         },1000);
//       }
//     };

//     recognition.onresult = async (e) => {
//       const transcript = e.results[e.results.length - 1][0].transcript.trim();
//       console.log("Heard:", transcript);

//       if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
//         setAiText("");
//         setUserText(transcript);
//         isRecognizingRef.current = false;
//         setListening(false);

//         const data = await getGeminiResponse(transcript);
//         handleCommand(data);
//         console.log(data);
//         setAiText(data.response);
//         setUserText("");
        
//       }
//     };

//     const greeting = new SpeechSynthesisUtterance(`Hello ${userData.name} , I am your virtual assistant , how can i help you ?`);
//     greeting.lang = 'en-US';
//     window.speechSynthesis.speak(greeting);

//     return ()=>{
//       isMounted = false;
//       clearTimeout(startTimeout);
//       recognition.stop();
//       setListening(false);
//       isRecognizingRef.current = false;
//     };

    
//   }, []);

//   return (
//     <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-[#020236] flex flex-col justify-center items-center p-5">

//       {/* ☰ Menu button */}
//       <SlMenu
//         className="lg:hidden text-white absolute top-5 right-5 w-7 h-7 cursor-pointer hover:text-blue-400 transition-all"
//         onClick={() => setHam(true)}
//       />

//       {/* 🔹 Blur overlay (hamburger menu) */}
//       {ham && (
//         <div className="absolute inset-0 bg-[#00000073] backdrop-blur-xl flex flex-col justify-center items-center space-y-6 p-6 z-20 animate-fadeIn">
//           <ImCross
//             onClick={() => setHam(false)}
//             className="text-white absolute top-5 right-5 w-7 h-7 cursor-pointer hover:text-red-400 transition-all"
//           />

//           <button
//             onClick={handleLogOut}
//             className="w-[80%] sm:w-[60%] md:w-[40%] py-3 rounded-full border border-blue-300 text-red-700 font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:bg-blue-100 hover:text-blue-900 transition-all duration-300"
//           >
//             Logout
//           </button>

//           <button
//             onClick={() => navigate('/customize')}
//             className="w-[80%] sm:w-[60%] md:w-[40%] py-3 rounded-full border border-blue-300 text-blue-700 font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:bg-blue-100 hover:text-blue-900 transition-all duration-300"
//           >
//             Customize Assistant
//           </button>

//           <div className='w-full h-[2px] bg-gray-400'></div>
//           <h1 className='text-white font-semibold text-[19px]'>History</h1>
//           <div className='w-full h-[60%] overflow-auto flex flex-col gap-3'>
//             {userData?.history?.length ? (
//               userData.history.map((his, i) => (
//                 <span key={i} className='text-gray-200 text-[18px]'>{his}</span>
//               ))
//             ) : (
//               <span className='text-gray-400 text-[16px]'>No history yet...</span>
//             )}
//           </div>
//         </div>
//       )}

//       {/* 🔹 Desktop buttons */}
//       <button
//         className="hidden lg:block absolute top-5 right-5 w-1/6 h-[55px] rounded-full border border-blue-300 text-red-700 font-semibold hover:bg-blue-100 hover:text-blue-900 transition-all mb-[10px]"
//         onClick={handleLogOut}
//       >
//         Logout
//       </button>

//       <button
//         className="hidden lg:block absolute top-[70px] right-5 w-1/6 h-[55px] rounded-full border border-blue-300 text-blue-700 font-semibold hover:bg-blue-100 hover:text-blue-900 transition-all mt-[20px]"
//         onClick={() => navigate('/customize')}
//       >
//         Customize Assistant
//       </button>

//       {/* 🔹 Assistant Display */}
//       <div className="mt-[60px] w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg">
//         <img
//           src={userData?.assistantImage}
//           className="h-full object-cover"
//           alt="Assistant"
//         />
//       </div>

//       <h1 className="text-white text-[20px] mt-4">I am {userData?.assistantName}</h1>

//       {!aiText && <img src={userImg} alt="" className="w-[200px]" />}
//       {aiText && <img src={aiImg} alt="" className="w-[200px]" />}

//       <h1 className="text-white text-[20px] font-semibold text-center mt-2 px-4">
//         {userText || aiText || ''}
//       </h1>
//     </div>
//   );
// }

// export default Home;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDataContext } from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user1.gif";
import { SlMenu } from "react-icons/sl";
import { ImCross } from "react-icons/im";

function Home() {
  const { userData, serverUrl, setUserData, getGeminiResponse } = useContext(UserDataContext);
  const navigate = useNavigate();

  const [listening, setListening] = useState(false);
  const [userText, setUserText] = useState("");
  const [aiText, setAiText] = useState("");
  const [ham, setHam] = useState(false);

  const isRecognizingRef = useRef(false);
  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

  // 🔹 Logout handler
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      navigate("/signin");
      setUserData(null);
    } catch (err) {
      console.log(err);
      setUserData(null);
    }
  };

  // 🔹 Speak text
  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;

    utterance.onend = () => {
      isSpeakingRef.current = false;
      setTimeout(() => {
        if (!isRecognizingRef.current) {
          try {
            recognitionRef.current?.start();
            console.log("🎤 Restarted recognition after speaking");
          } catch (err) {
            console.warn("Restart failed:", err);
          }
        }
      }, 800);
    };

    synth.cancel();
    synth.speak(utterance);
  };

  // 🔹 Handle assistant actions
  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    const open = (url) => window.open(url, '_blank');

    switch (type) {
       case 'google_search': {
  // Clean up the spoken text before searching
  let query = userInput
    .replace(/(go to|search|google|for|and|yes|no)/gi, "")
    .trim();

  open(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
  break;
}
      case 'calculator_open':
        open('https://www.google.com/search?q=calculator');
        break;
      case 'instagram_open':
        open('https://www.instagram.com');
        break;
      case 'facebook_open':
        open('https://www.facebook.com');
        break;
      case 'weather_show':
        open('https://www.google.com/search?q=weather');
        break;
      case 'youtube_search':
      case 'youtube_play':
        open(`https://www.youtube.com/results?search_query=${encodeURIComponent(userInput)}`);
        break;
      default:
        break;
    }
  };
  

  // 🔹 Voice recognition setup
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    let restartTimeout;

    recognition.onstart = () => {
      console.log("🎧 Recognition started");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log("🛑 Recognition ended");
      isRecognizingRef.current = false;
      setListening(false);

      if (!isSpeakingRef.current) {
        clearTimeout(restartTimeout);
        restartTimeout = setTimeout(() => {
          try {
            recognition.start();
            console.log("🔁 Recognition restarted safely");
          } catch (err) {
            console.warn("Restart failed:", err);
          }
        }, 1200);
      }
    };

    recognition.onerror = (event) => {
      console.warn("⚠️ Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== "aborted") {
        clearTimeout(restartTimeout);
        restartTimeout = setTimeout(() => {
          try {
            recognition.start();
            console.log("Restarted after error");
          } catch (err) {
            console.warn("Error restart failed:", err);
          }
        }, 1500);
      }
    };

    recognition.onresult = async (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript.trim();
      console.log("🎤 Heard:", transcript);

      if (transcript.toLowerCase().includes(userData.assistantName.toLowerCase())) {
        setAiText("");
        setUserText(transcript);
        recognition.stop();

        const data = await getGeminiResponse(transcript);
        handleCommand(data);
        console.log("🤖 Gemini Response:", data);

        setAiText(data.response);
        setUserText("");
      }
    };

    // Initial greeting
    const greeting = new SpeechSynthesisUtterance(
      `Hello ${userData.name}, I am your virtual assistant. How can I help you today?`
    );
    greeting.lang = 'en-US';
    synth.speak(greeting);

    greeting.onend = () => {
      try {
        recognition.start();
      } catch (e) {
        console.error("Initial recognition start error:", e);
      }
    };

    return () => {
      clearTimeout(restartTimeout);
      recognition.stop();
      synth.cancel();
      isRecognizingRef.current = false;
      setListening(false);
    };
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-t from-black to-[#020236] flex flex-col justify-center items-center p-5">

      {/* ☰ Menu button */}
      <SlMenu
        className="lg:hidden text-white absolute top-5 right-5 w-7 h-7 cursor-pointer hover:text-blue-400 transition-all"
        onClick={() => setHam(true)}
      />

      {/* 🔹 Blur overlay menu */}
      {ham && (
        <div className="absolute inset-0 bg-[#00000073] backdrop-blur-xl flex flex-col justify-center items-center space-y-6 p-6 z-20">
          <ImCross
            onClick={() => setHam(false)}
            className="text-white absolute top-5 right-5 w-7 h-7 cursor-pointer hover:text-red-400 transition-all"
          />

          <button
            onClick={handleLogOut}
            className="w-[80%] sm:w-[60%] md:w-[40%] py-3 rounded-full border border-blue-300 text-red-700 font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:bg-blue-100 hover:text-blue-900 transition-all"
          >
            Logout
          </button>

          <button
            onClick={() => navigate('/customize')}
            className="w-[80%] sm:w-[60%] md:w-[40%] py-3 rounded-full border border-blue-300 text-blue-700 font-semibold shadow-lg hover:scale-105 hover:shadow-xl hover:bg-blue-100 hover:text-blue-900 transition-all"
          >
            Customize Assistant
          </button>

          <div className="w-full h-[2px] bg-gray-400"></div>
          <h1 className="text-white font-semibold text-[19px]">History</h1>
          <div className="w-full h-[60%] overflow-auto flex flex-col gap-3">
            {userData?.history?.length ? (
              userData.history.map((his, i) => (
                <span key={i} className="text-gray-200 text-[18px]">{his}</span>
              ))
            ) : (
              <span className="text-gray-400 text-[16px]">No history yet...</span>
            )}
          </div>
        </div>
      )}

      {/* 🔹 Desktop buttons */}
      <button
        className="hidden lg:block absolute top-5 right-5 w-1/6 h-[55px] rounded-full border border-blue-300 text-red-700 font-semibold hover:bg-blue-100 hover:text-blue-900 transition-all"
        onClick={handleLogOut}
      >
        Logout
      </button>

      <button
        className="hidden lg:block absolute top-[70px] right-5 w-1/6 h-[55px] rounded-full border border-blue-300 text-blue-700 font-semibold hover:bg-blue-100 hover:text-blue-900 transition-all mt-[20px]"
        onClick={() => navigate('/customize')}
      >
        Customize Assistant
      </button>

      {/* 🔹 Assistant Display */}
      <div className="mt-[60px] w-[300px] h-[400px] flex justify-center items-center overflow-hidden rounded-3xl shadow-lg">
        <img
          src={userData?.assistantImage}
          className="h-full object-cover"
          alt="Assistant"
        />
      </div>

      <h1 className="text-white text-[20px] mt-4">I am {userData?.assistantName}</h1>

      {!aiText && <img src={userImg} alt="User animation" className="w-[200px]" />}
      {aiText && <img src={aiImg} alt="AI animation" className="w-[200px]" />}

      <h1 className="text-white text-[20px] font-semibold text-center mt-2 px-4">
        {userText || aiText || ''}
      </h1>
    </div>
  );
}

export default Home;
