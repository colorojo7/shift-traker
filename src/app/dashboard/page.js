"use client";
import { UseUserContext } from "@/context/userContext";
import Frame from "@/ui/components/Frame";
import FrameWeekSummary from "@/ui/components/frames/FrameWeekSummary";
import UserDataWarning from "@/ui/components/UserDataWarning";
import { CreateShiftBtn } from "@/ui/components/crudButtons";

export default function dashboard() {
  const { userData } = UseUserContext();

  return (
    <div className="flex flex-row flex-wrap justify-center ">
      {!userData && <UserDataWarning />}

      {userData &&
      <>
      <Frame className="max-w-64" classNameBox="items-center bg-transparent border border-blue-500 ">
        <CreateShiftBtn/>
      </Frame>

      <FrameWeekSummary/>

      </>


        

      
      
      }
    {/* <Frame className="md:max-w-96">
      <h2 className="text-center font-bold">Wheek summary</h2>
      <hr className="border-gray-400"/>

      <div className="flex gap-1 md:gap-3 justify-between ">
        <div className="basis-1/6 rounded-lg border border-gray-800"><p className="text-center">M</p><div className="flex justify-center"><CheckCircleIcon className="w-6 text-center text-green-400"/> </div></div>
        <div className="basis-1/6 rounded-lg border border-gray-800"><p className="text-center">T</p><div className="flex justify-center"><CheckCircleIcon className="w-6 text-center text-green-400"/> </div></div>
        <div className="basis-1/6 rounded-lg border border-gray-800"><p className="text-center">W</p><div className="flex justify-center"><CheckCircleIcon className="w-6 text-center text-green-400"/> </div></div>
        <div className="basis-1/6 rounded-lg border border-gray-800"><p className="text-center">T</p><div className="flex justify-center"><CheckCircleIcon className="w-6 text-center text-green-400"/> </div></div>
        <div className="basis-1/6 rounded-lg border border-gray-800"><p className="text-center">F</p><div className="flex justify-center"><CheckCircleIcon className="w-6 text-center text-green-400"/> </div></div>
        <div className="basis-1/6 rounded-lg border border-gray-800"><p className="text-center">S</p><div className="flex justify-center"><CheckCircleIcon className="w-6 text-center text-green-400"/> </div></div>
        <div className="basis-1/6 rounded-lg border border-gray-800"><p className="text-center">S</p><div className="flex justify-center"><CheckCircleIcon className="w-6 text-center text-green-400"/> </div></div>



      </div>
      <hr className="border-gray-400"/>

      <div className="flex">
        <div className="basis-1/2">
          <p className="text-center font-bold">Hrs</p>
          <div className="text-center font-bold text-3xl">33</div>
          </div>
        <div className="basis-1/2">
          <p className="text-center font-bold">AUD</p>
          <div className="text-center font-bold text-3xl">1250</div>
          </div>
      </div>
      
    </Frame> */}

    </div>
  );
}
