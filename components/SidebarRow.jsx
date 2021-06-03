import Image from "next/image";
import React from "react";

const SidebarRow = ({ src, Icon, title }) => {
  return (
    <div className="flex items-center space-x-2 p-4 rounded-xl hover:bg-gray-100 cursor-pointer">
      {src && (
        <div className="flex">
          <Image
            className="rounded-full"
            src={src}
            width="30"
            height="30"
            layout="fixed"
          />
          <p className="hidden md:inline-flex font-medium ml-5">{title}</p>
        </div>
      )}
      {Icon && (
        <div className="flex">
          <Icon className="w-8 h-8 text-blue-500 mr-6" />
          <p className="hidden md:inline-flex font-medium">{title}</p>
        </div>
      )}
    </div>
  );
};

export default SidebarRow;
