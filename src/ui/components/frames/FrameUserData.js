"use client";

import Frame from "@/ui/components/Frame";
import { UseUserContext } from "@/context/userContext";
import {
  EnvelopeIcon,
  PencilSquareIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const FrameUserData = () => {
  const { user, userData } = UseUserContext();
  return (
    <div>
      <Frame>
        <div className="flex flex-col md:flex-row  grow items-center justify-center gap-3">
          
          {user.photoURL ? (
            <>
              <img
                src={user?.photoURL}
                alt="User image"
                className="h-24 w-24 rounded-lg border border-blue-300"
              />
            </>
          ) : (
            <UserIcon className="h-24 w-24 rounded-lg border border-blue-300"/>
          )}
       
          <div>
            {userData ? (
              <div>
                <div className="text-center md:text-left font-bold text-lg">
                  {userData.fullName}
                </div>
                <div className="text-center md:text-left flex">
                  <EnvelopeIcon className="w-6 mx-4" />
                  {userData.email}
                </div>
                <div className="text-center md:text-left flex">
                  <PhoneIcon className="w-6 mx-4" />
                  {userData.phone}
                </div>
                <div className="text-center md:text-left flex text-xs">
                  <p className="w-6 mx-4 font-semibold">DOB</p>
                  {userData.DOB}
                </div>
              </div>
            ) : (
              <div>
                <div className="text-center md:text-left font-bold text-lg">
                  {user?.displayName}
                </div>
                <div className="text-center md:text-left">{user?.email}</div>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end">
          <Link href="/userDataForm">
            <PencilSquareIcon className="w-6 text-blue-500" />
          </Link>
        </div>
      </Frame>
    </div>
  );
};

export default FrameUserData;
