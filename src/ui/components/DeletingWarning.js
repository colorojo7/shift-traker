import React from "react";
import FrameForm from "./frames/FrameForm";
import { buttonDangerOutlinedStyle, buttonDangerStyle, buttonOutlinedStyle } from "../classNames";
import { updateTask } from "@/lib/actionsFirebase";
import { UseUserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";

const DeletingWarning = ({objetType, name }) => {
  const router = useRouter();
  const {setTaskToEdit,taskToEdit, user, fetchUserTasks}= UseUserContext()
  sconsole.log("DeletingWarning",user.uid, taskToEdit);
  return (
    <FrameForm className={"bg-red-500"} title="Deleting">
      <h1 className={` font-semibold mb-3 text-xl text-center px-2`}>
        Are you sure you want to delete the {objetType}
      </h1>
      <h2 className={` font-semibold mb-3 text-2xl text-center`}>
        {name}
      </h2>
      
      <div className="flex  gap-2 justify-center">
      <button
            onClick={() => {
              location.reload()
            }}
            className={`${buttonOutlinedStyle}`}
        >
            <p className="w-full text-center">Back</p>
        </button>
        <button
            onClick={async () => {
              await updateTask(user.uid,taskToEdit.id,{isDeleted:true})
              await fetchUserTasks()
              setTaskToEdit(null)
              router.push("/dashboard/settings")
            }}
            className={`${buttonDangerOutlinedStyle}`}
        >
            <p className="w-full text-center">Delete</p>
        </button>

      </div>
    </FrameForm>
  );
};

export default DeletingWarning;
