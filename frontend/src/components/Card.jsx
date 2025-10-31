import React from "react";
import { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
function Card({ image }) {
  const {
    
    setBackendImage,

    setFrontendImage,
    selectedImage,
    setSelectedImage,
  } = useContext(UserDataContext);
  return (
    <div
      className={` w-[70px] h-[140px] lg:w-[150px] lg:h-[250px] bg-[#03036] border-2 border-[black]
         rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-950 
         cursor-pointer hover:border-4 hover:border-white ${selectedImage==image?"border-4 border-white shadow-2xl shadow-blue-950":null}`}
      onClick={() => {setSelectedImage(image)
        setBackendImage(null)
        setFrontendImage(null)}
      }
    >
      <img
        src={image}
        className="h-full object-cover
        "
      ></img>
    </div>
  );
}

export default Card;
