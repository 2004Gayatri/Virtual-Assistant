
import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserDataContext } from '../context/UserDataContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import aiImg from "../assets/ai.gif";
import userImg from "../assets/user1.gif";
function Home() {
  const { userData, serverUrl, setUserData , getGeminiResponse } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [listening,setListening]=useState(false);
  const [userText , setUserText] = useState("");
   const [aiText , setaiText] = useState("");

  const isSpeakingRef = useRef(false);
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

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
  const startRecognition=()=>{
    try{
      recognitionRef.current?.start();
      setListening(true);
    }catch(error){
      if(!error.message.includes("start")){
        console.error("Recognition error :",error);
      }
    }
  }
  const speak = (text)=>{
    const utterence = new SpeechSynthesisUtterance(text)
    isSpeakingRef.current = true;
    utterence.onend = ()=>{
      isSpeakingRef.current=false;
      startRecognition()
      
    }
    synth.speak(utterence)
  }
  const handleCommand=(data)=>{
    const {type ,userInput , response } = data;
    speak(response);
    if(type === 'google_search'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`,'_blank');
    };
    if(type === "calculator_open"){
      window.open(`https://www.google.com/search?q=calculator`,'_blank');
    }
    if(type === "instagram_open"){
      window.open(`https://www.instagram.com`,'_blank');
    }
    if(type==="facebook_open"){
      window.open(`https://www.facebook.com`,'_blank');
    }
    if(type==="weather_show"){
      window.open(`https://www.google.com/search?q=weather`,
        '_blank'
      );
    }
    if(type === 'youtube_search' || type==='youtube_play'){
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`,'_blank');
    }

    
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
    recognitionRef.current=recognition;
    const isRecognizingRef = {current:false};

    const safeRecognition = ()=>{

      try{
        if(!isSpeakingRef.current && !isRecognizingRef.current){
        recognition.start();
        console.log("Recognition request to start");
      }
      }catch(err){
        console.error("Start error : " , err);
      }
    };
    recognition.onstart=()=>{
      console.log("Recognition started ");
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend=()=>{
      console.log("Recognition end");
      isRecognizingRef.current=false;
      setListening(false);
    };
    if(!isSpeakingRef.current){
      setTimeout(()=>{
        safeRecognition();
      },1000);
    }

    recognition.onerror = (event)=>{
      console.warn("Recognition error:", event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if(event.error !=="aborted" && !isSpeakingRef.current){
        setTimeout(()=>{
          safeRecognition();
        },1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length-1][0].transcript.trim();
      console.log("heard :" + transcript);
       if(transcript.toLowerCase().includes(userData.assistantName.toLowerCase())){
        setaiText("");
        setUserText(transcript);
        
        isRecognizingRef.current = false;
        setListening(false)
      const data = await getGeminiResponse(transcript);
      console.log(data);
     setaiText(data.response);
     setUserText("")
      handleCommand(data);


    }
    };
   
  const fallback = setInterval(()=>{
    if(!isSpeakingRef.current && !isRecognizingRef.current){
      safeRecognition();
    }
  },10000);
  safeRecognition();

  return ()=>{
    recognition.stop();
    setListening(false);
    isRecognizingRef.current=false;
    clearInterval(fallback);
  }
    
    
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
      {!aiText && <img src={userImg} alt='' className='w-[200px]'></img>}
      {aiText && <img src={aiImg} alt='' className='w-[200px]'></img>}
    </div>
  );
}

export default Home;
