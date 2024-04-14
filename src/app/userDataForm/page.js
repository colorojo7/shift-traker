import { buttonOutlinedStyle } from "@/ui/classNames";
import FrameForm from "@/ui/components/frames/FrameForm";
import { FormUserData } from "@/ui/components/forms/FormUserData";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import React from "react";
//  <FormFrame title="PROFILE DATA">
{
  /* </FormFrame> */
}

const userDataForm = () => {
  return (
    <FrameForm title="PROFILE DATA">
      <Link href="/dashboard/settings" className={`${buttonOutlinedStyle} sm:w-16`}>
        <ArrowLeftCircleIcon className="w-6" />
      </Link>
      <FormUserData />
    </FrameForm>
  );
};

export default userDataForm;
