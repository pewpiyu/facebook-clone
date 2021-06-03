import Image from "next/image";
import React from "react";
import {signIn} from "next-auth/client"

const Login = () => {
  return (
    <div className="grid place-items-center">
      <Image
        src="https://links.papareact.com/t4i"
        width={400}
        height={400}
        objectFit="contain"
      />
      <h1 onClick={signIn} className="p-5 cursor-pointer rounded-full text-white text-center bg-blue-500">Login with Facebook</h1>
    </div>
  );
};

export default Login;
