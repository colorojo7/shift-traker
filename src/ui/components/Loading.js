import React from "react";
import LoadingSpinner from "./LoadingSpiner";

const Loading = () => {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex flex-wrap h-36 w-full items-end rounded-lg bg-blue-500 p-3 ">
          <div className="w-full text-white font-black text-3xl text-center ">
            LOADING...
          </div>
        </div>
        <LoadingSpinner/>
      </div>
    </main>
  );
};

export default Loading;
