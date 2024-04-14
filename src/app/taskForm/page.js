"use client";

import { UseUserContext } from "@/context/userContext";
import { buttonOutlinedStyle } from "@/ui/classNames";
import FrameForm from "@/ui/components/frames/FrameForm";
import FormTask from "@/ui/components/forms/FormTask";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function taskForm() {
  const {setTaskToEdit}= UseUserContext()
  return (
    <FrameForm title="TASK">
      <Link
        href="/dashboard/settings"
        onClick={()=> setTaskToEdit(null) } 
        className={`${buttonOutlinedStyle} sm:w-16`}
      >
        <ArrowLeftCircleIcon className="w-6" />
      </Link>
      <FormTask />
    </FrameForm>
  );
}
