"use client"

import { UseUserContext } from "@/context/userContext";
import FrameTasks from "@/ui/components/frames/FrameTasks";
import FrameUserData from "@/ui/components/frames/FrameUserData";
import UserDataWarning from "@/ui/components/UserDataWarning";

export default function Settings() {
  const { userData} = UseUserContext();

  return (
    <div className="flex flex-row flex-wrap text-sm ">
      <FrameUserData />

      {!userData && <UserDataWarning />}

      {userData && (
        <>
          <FrameTasks/>
        </>
      )}
    </div>
  );
}
