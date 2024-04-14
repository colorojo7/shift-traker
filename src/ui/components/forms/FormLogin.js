"use client";

import { UseUserContext } from "@/context/userContext";
import { GoogleButton } from "react-google-button";

export default function LoginForm() {
  const {googleSignIn } = UseUserContext();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <h1 className={` font-bold mb-3 text-2xl text-center`}>Login</h1>
      <div className="flex justify-center">
        <GoogleButton onClick={handleGoogleSignIn} />
      </div>
    </div>
  );
}
