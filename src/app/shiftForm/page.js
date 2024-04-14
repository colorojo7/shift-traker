"use client";

import { buttonOutlinedStyle } from "@/ui/classNames";
import FrameForm from "@/ui/components/frames/FrameForm";
import FormShift from "@/ui/components/forms/FormShift";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function shiftForm() {
  return (
    <FrameForm title="SHIFT">
      <Link
        href="/dashboard"
        className={`${buttonOutlinedStyle} sm:w-16`}
      >
        <ArrowLeftCircleIcon className="w-6" />
      </Link>
      <FormShift />
    </FrameForm>
  );
} 
