// import React, { useEffect, useState } from "react";
// import { UserDataContext } from "./UserDataContext";
// import axios from "axios";


// function UserContext({ children }) {
//   // You can add more global values here later (like user info, tokens, etc.)
//   const serverUrl = "http://localhost:8000";

//   const [userData , setUserData]= useState(null);
//   const [frontendImage , setFrontendImage] = useState(null);
//   const [backendImage , setBackendImage] = useState(null);
//   const [selectedImage , setSelectedImage]=useState(null);

//   const handleCurrentUser = async ()=>{
//     try{
//        const result = await axios.get(`${serverUrl}/api/user/current`,{withCredentials:true});
//        setUserData(result.data);
//        console.log(result.data);
//     }catch(error){
//       console.log(error);

//     }
//   }

//   const getGeminiResponse = async (command)=>{
//     try{
//       const result = await axios.post(`${serverUrl}/api/user//asktoassistant` , {command} , {withCredentials : true});
//       return result.data

//     }catch(error){
//       console.log(error);
//     }
 
//   }

//   useEffect(() => {
//   handleCurrentUser();
// }, []);

//   const value = { serverUrl, userData, setUserData , backendImage , setBackendImage , frontendImage , setFrontendImage , selectedImage , setSelectedImage , getGeminiResponse };


//   return (
//     <UserDataContext.Provider value={value}>
//       {children}
//     </UserDataContext.Provider>
//   );
// }

// export default UserContext;
// frontend/src/context/UserContext.jsx
import React, { useEffect, useState } from "react";
import { UserDataContext } from "./UserDataContext";
import axios from "axios";

function UserContext({ children }) {
  const serverUrl = "https://virtual-assistant-backend-4k7q.onrender.com";

  const [userData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // ✅ Fetch current logged-in user
  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log("✅ Current user:", result.data);
    } catch (error) {
      console.error("❌ Error fetching current user:", error);
    }
  };

  // ✅ Send command to Gemini assistant
  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(
        `${serverUrl}/api/user/asktoassistant`,
        { command },
        { withCredentials: true }
      );
      return result.data;
    } catch (error) {
      console.error("❌ Error in getGeminiResponse:", error);
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    userData,
    setUserData,
    backendImage,
    setBackendImage,
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;

