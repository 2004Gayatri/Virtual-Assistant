import React, { useContext, useRef, useState } from "react";
import Card from "../components/Card";
// Images for the profile of assistant 
import image1 from "../assets/img1.jpg";
import image2 from "../assets/img2.jpg";
import image3 from "../assets/img3.jpg";
import image4 from "../assets/img4.jpg";
import image5 from "../assets/img5.jpg";
import image6 from "../assets/img6.jpg";
import image7 from "../assets/img7.jpg";
import { FcAddImage } from "react-icons/fc";
import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";



function Customize(){
     const{ serverUrl, userData, setUserData , backendImage , setBackendImage , frontendImage , setFrontendImage , selectedImage , setSelectedImage}
 = useContext(UserDataContext);   
     const inputImage = useRef();
     const navigate = useNavigate();
     const handleImage =(e)=>{
       const file = e.target.files[0];
       setBackendImage(file);
       setFrontendImage(URL.createObjectURL(file));
     }

    return(
        <div className="w-full min-h-screen bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center flex-col p-[20px] relative">
           <IoMdArrowRoundBack className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer " onClick={()=>navigate("/")} />
            <h1 className="text-white text-[30px] text-center mb-[30px] ">Select your <span className="text-blue-200">Assistant's Avtar</span> </h1>
            <div className="w-[90%] max-w-[60%] flex justify-center items-center flex-wrap gap-[15px]">
                 <Card image={image1}/>
                 <Card image={image2}/>
                 <Card image={image3}/>
                 <Card image={image4}/>
                 <Card image={image5}/>
                 <Card image={image6}/>
                 <Card image={image7}/>
                 <div className={`w-[70px] h-[140px] lg:w-[150px] lg:h-[250px]  bg-[#020236] 
                 border-2 border-[black] rounded-2xl overflow-hidden hover:shadow-2xl
                  hover:shadow-blue-950 cursor-pointer hover:border-4 hover:border-white flex
                   items-center justify-center ${selectedImage=="input"?"border-4 border-white shadow-2xl shadow-blue-950":null} `} onClick={() => { inputImage.current.click(); setSelectedImage("input"); }} >
                    {!frontendImage && <FcAddImage className="text-white w-[40px] h-[40px] " />}
                    {frontendImage && <img src={frontendImage} className="h-full object-cover" />}
        </div>
        <input type="file" accept="image/*" ref={inputImage} hidden 
        onChange={handleImage} />
            </div>
              {selectedImage && <button className="

  w-1/3
  min-w-[150px] h-[60px]
  bg-[#32aacd]
  rounded-full
  mt-[15px]
  shadow-md
  text-blue-700
  font-semibold
  border border-blue-300
  hover:bg-blue-100 hover:text-blue-900
  transition-colors duration-200
  cursor-pointer
  focus:outline-none focus:ring-2 focus:ring-blue-400 
" onClick={()=>navigate("/customize2")}>Next</button>}
        </div>
    )
}


export default Customize;
