"use client";
import React from "react";
import { useForm } from "react-hook-form"
import { buttonStyle, inputErrorStyle, inputStyle } from "../../classNames";
import { UseUserContext } from "@/context/userContext";
import { updateUserData } from "@/lib/actionsFirebase";
import { useRouter } from 'next/navigation'

export const FormUserData = () => {
  const { user, userData, fetchUserData } = UseUserContext();
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    const uid = user.uid
    const email = user.email
    const completeData = {...data, uid, email }
    try{
      await updateUserData(completeData)
      await fetchUserData()
      router.push('dashboard/settings')
    }catch(e){
      console.log("FormUserData",e);
    }
  }
  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Personal info */}
        <div>
          <h1 className={` font-bold mb-3 text-2xl text-center`}>
            Personal info
          </h1>

          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="mb-2 block text-sm font-medium"
            >
              Full name
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  defaultValue={userData?.fullName || user?.displayName}
                  className={`${inputStyle} ${errors.fullName && inputErrorStyle}`}
                  {...register("fullName", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="DOB" className="mb-2 block text-sm font-medium">
              Date of birth
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="DOB"
                  name="DOB"
                  type="date"
                  defaultValue={userData?.DOB || "Date of birth"}
                  className={`${inputStyle} ${errors.DOB && inputErrorStyle}`}
                  {...register("DOB", { required: true })}
                />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">
              Phone
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  defaultValue={userData?.phone || "Mobile number"}
                  className={inputStyle}
                  {...register("phone")}
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="mb-4" />
        <div className="flex justify-center">
        <button className={buttonStyle}>
          <p className="w-full text-center"> Submit</p>
        </button>

        </div>
      </form>
    </div>
  );
};
