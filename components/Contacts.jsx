import Image from "next/image";
import React from "react";

function Contacts({ src, name }) {
  return (
    <div className="flex items-center space-x-3 relative hover:bg-gray-200 cursor-pointer p-2 rounded-xl group">
      <Image src={src} width={50} height={50} layout="fixed" className="rounded-full" />
    
    <p>{name}</p>
    <div className="absolute bottom-2 left-7 bg-green-400 h-3 w-3 rounded-full group-hover:animate-bounce" />
    </div>
  );
}

export default Contacts;
