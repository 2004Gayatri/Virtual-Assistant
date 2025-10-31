import React, { useContext, useState } from "react";
import axios from "axios";
import { IoMdArrowRoundBack } from "react-icons/io";

import { UserDataContext } from "../context/UserDataContext";
import { useNavigate } from "react-router-dom";

function Customize2() {
  const { userData, backendImage, selectedImage, serverUrl, setUserData } =
    useContext(UserDataContext);
  const [assistantName, setAssistantName] = useState(
    userData?.assistantName || ""
  );
  const [loading , setLoading]=useState(false);
  const navigate = useNavigate();

 const handleUpdateAssistant = async () => {
  try {
    let formData = new FormData();
    formData.append("assistantName", assistantName);

    if (backendImage instanceof File) {
      formData.append("assistantImage", backendImage);
    } else if (selectedImage) {
      formData.append("imageUrl", selectedImage);
    }

    // 🧠 Log all outgoing data
    console.log("🧾 Data being sent:");
    console.log({
      assistantName,
      backendImage,
      selectedImage,
    });
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const result = await axios.post(
      `${serverUrl}/api/user/update`,
      formData,
      { withCredentials: true }
    );

    

    setUserData(result.data);
  } catch (error) {
    console.log( error);
    console.log( error.response?.data || error.message);
  }
};

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-[black] to-[#020236] flex justify-center items-center flex-col p-[20px] relative">
      <IoMdArrowRoundBack className="absolute top-[30px] left-[30px] text-white w-[25px] h-[25px] cursor-pointer " onClick={()=>navigate("/customize")} />
      <h1 className="text-white text-[30px] text-center mb-[30px] ">
       
        Enter your <span className="text-blue-200">Assistant Name</span>
      </h1>
      <input
        type="text"
        placeholder="eg.Sifra"
        className="w-1/3 h-[60px] outline-none border-2 border-white bg-transparent text-white placeholder-gray-300 px-[20px] py-[10px] rounded-full"
        required
        onChange={(e) => setAssistantName(e.target.value)}
        value={assistantName}
      ></input>
      {assistantName && (
        <button
          className="

  w-1/4
  min-w-[150px] h-[60px]
  bg-#32aacd
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
" disabled={loading}
          onClick={() => {
            handleUpdateAssistant();
          }}
        >
          {!loading?"Create your Assistant":"loading..."}
        </button>
      )}
    </div>
  );
}

export default Customize2;
