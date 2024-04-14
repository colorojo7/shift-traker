import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { UseUserContext } from "@/context/userContext";

import { buttonOutlinedStyle, buttonStyle, inputErrorStyle, inputStyle } from "../../classNames";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { getNormalOvertimeHrs, getTotalHrs, today } from "@/lib/functions";
import { createShift } from "@/lib/actionsFirebase";


const FormShift = () => {
  const router = useRouter();
  const shiftToEdit= false
  const {userTasks, userData}=UseUserContext()

  let audNormal 
  let audOvertime 
  let audTotal 

  let hrsTotal 
  let hrsNormal
  let hrsOvertime
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues:  {
      date: today&& format(today, "yyyy-MM-dd"),
      hrFinish: today&& format(today, "HH:mm"),      
    },
  });

  const taskId = watch("taskId")
  const task = userTasks?.find(task=> task.id ==taskId)
  
  
  useEffect(()=>{
    if(task){
      setValue("hrStart", task?.start);
      setValue("hrUnpaidMinutes", task?.unpaidBrakes);
      setValue("rateNT", task?.rateNT);
      setValue("rateOT", task?.rateOT)
    }
  },[taskId, setValue, task])
  
  
  hrsTotal = (getTotalHrs(watch("hrStart"),watch("hrFinish"), watch("hrUnpaidMinutes"), watch("date")))

  if(task){
    const hrs = getNormalOvertimeHrs(task, hrsTotal)
    hrsNormal = hrs.normal
    hrsOvertime = hrs.overtime
  }
    audNormal = parseFloat((watch("rateNT")*hrsNormal).toFixed(2))
    audOvertime =  parseFloat((watch("rateOT")*hrsOvertime).toFixed(2) )
    audTotal = ((audNormal) + (audOvertime?audOvertime:0 )).toFixed(2)
      
      const onSubmit = async (data) => {
        hrsNormal= parseFloat(hrsNormal)
        hrsOvertime= parseFloat(hrsOvertime)
        hrsTotal= parseFloat(hrsTotal)
        audTotal= parseFloat(audTotal)
        let isDeleted = false
        const id = `${data.date}_${taskId}`

        const compleatData = {id, ...data,hrsNormal, hrsOvertime, hrsTotal, audNormal , audOvertime, audTotal,isDeleted }
        
        try {
          await createShift(userData.uid, compleatData)
          router.push('/dashboard')
        } catch (e) {
          console.log("onSubmit", e);
        }
        
      }
      console.log("antes return");
      return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="mb-4 flex justify-between items-end gap-3">
            <div className="grow">
              <label
                htmlFor="taskId"
                className="mb-2 block text-sm font-medium"
              >
                Task
              </label>
              <div className="relative">
                <select
                  id="taskId"
                  name="taskId"
                  {...register("taskId", { required: true })}
                  className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                  defaultValue=""
                  aria-describedby="customer-error"
                >
                  <option value="" disabled>
                    Select the task
                  </option>
                  {userTasks?.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.clientNickname}
                    </option>
                  ))}
                </select>
                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              </div>
            </div>
            <div className="">
              <Link href="/taskForm" className={buttonOutlinedStyle}>
                +
              </Link>
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="date" className="mb-2 block text-sm font-medium">
              Date
            </label>
            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="date"
                  name="date"
                  {...register("date", { required: true })}
                  type="date"
                  className={`${inputStyle} pl-5`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* hrs details */} 
        <div>
          <hr className="my-6" />

          <h1 className={` font-bold mb-3 text-2xl text-center`}>Worked hrs</h1>



          <div className="min-h-8 p-2">
            <p className="text-red-500 text-sm ">
              {errors?.hrStart || errors?.hrFinish ? "5 minutes step" : "" }
            </p>
          </div>

          <div className="flex gap-4">
            <div className="mb-4 basis-1/2">
              <label htmlFor="hrStart" className="mb-2 block text-sm font-medium">
                Start
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="hrStart"
                    name="hrStart"
                    {...register("hrStart", { 
                        required: true,
                        pattern:{
                          value:/^(0[0-9]|1[0-9]|2[0-3]):([0-5][05])$/,
                          message:"5 minutes step"
                        } })}
                    type="time"
                    defaultValue={""}
                    className={`${inputStyle} pl-5 ${errors.hrStart && inputErrorStyle} `}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4 basis-1/2">
              <label
                htmlFor="hrFinish"
                className="mb-2 block text-sm font-medium"
              >
                Finish
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="hrFinish"
                    name="hrFinish"
                    {...register("hrFinish", { 
                      required: true,
                      pattern:{
                        value:/^(0[0-9]|1[0-9]|2[0-3]):([0-5][05])$/,
                        message:"5 minutes step"
                      }          
                    })}
                    type="time"
                   
                    defaultValue={""}
                    className={`${inputStyle} pl-5 ${errors.hrFinish && inputErrorStyle} `}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mb-4 basis-1/2">
              <label
                htmlFor="hrUnpaidMinutes"
                className="mb-2 block text-sm font-medium"
              >
                Unpaid Brakes (minutes)
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="hrUnpaidMinutes"
                    name="hrUnpaidMinutes"
                    {...register("hrUnpaidMinutes", { required: true })}
                    type="number"
                    defaultValue={0}
                    className={`${inputStyle} pl-5`}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 basis-1/2 flex flex-col justify-between border  border-blue-300 rounded-lg p-2">
              <label
                htmlFor="hrsTotal"
                className="mb-2 block text-sm font-medium"
              >
                TOTAL HRS
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="hrsTotal"
                    name="hrsTotal"
                    {...register("hrsTotal")}
                    type="number"
                    value={!isNaN(hrsTotal) ? hrsTotal :0}
                    className={`${inputStyle} bg-blue-200 text-center font-bold`}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* $ details */}
        <div>
          <hr className="my-6" />

          <h1 className={` font-bold mb-3 text-2xl text-center`}>AUD</h1>

          <div className="mb-1 flex gap-2">

            <div className="w-3/12">
              <div className="mb-2 block text-sm font-medium text-transparent"> .. </div>
              <label
                htmlFor="rateNT"
                className="font-bold block w-full py-[9px] pl-1 text-sm outline-2 placeholder:text-gray-500"
              >
                Normal
              </label>
            </div>

            <div className="w-3/12">
              <div className="mb-2 block text-sm font-medium text-center">AUD</div>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="rateNT"
                    name="rateNT"
                    {...register("rateNT", { required: true, valueAsNumber: true  })}
                    type="number"
                    className={`${inputStyle}  px-0 text-center`}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="w-4/12">
              <div className="mb-2 block text-sm font-medium text-center">hrs</div>
              <div
                className={` ${inputStyle} text-center border-none pl-0`}
                disabled
              >
                x <span className="mx-1">{hrsNormal}</span> =
              </div>
            </div>

            <div className="w-2/12">
              <div className="mb-2 block text-sm font-medium">subtotal</div>
              <div
                className={`${inputStyle} pl-0 text-center border-none font-bold`}
                disabled
              >
                { !isNaN(audNormal) ? audNormal:0 }
              </div>
            </div>

          </div>

          {task?.overtime && hrsTotal> task.hrsBasic  && 

          <div className=" mb-1 flex gap-2 items-center">

            <div className="w-3/12">
              <label
                htmlFor="rateOT"
                className="font-bold block w-full py-[9px] pl-1 text-sm outline-2 placeholder:text-gray-500"
              >
                Overtime
              </label>
            </div>

            <div className="w-3/12">
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="rateOT"
                    name="rateOT"
                    type="number"
                    {...register("rateOT", { required: true, valueAsNumber: true  })}
                    defaultValue={task?.rateOT}
                    className={`${inputStyle}  px-0 text-center`}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div className="w-4/12">
            <div
                className={`${inputStyle} pl-0 text-center border-none`}
                disabled
              >
                x <span className="mx-2">{!isNaN(hrsOvertime)&& hrsOvertime}</span> =
              </div>
            </div>

            <div className="w-2/12">
              <div
                className={`${inputStyle} pl-0 text-center border-none font-bold`}
                disabled
              >
                {!isNaN(audOvertime) ?audOvertime : 0}
              </div>
            </div>
          </div>
                    }
          <hr className="mb-4" />

          <div className="mb-4flex gap-4">
           
            <div className="mb-4 basis-1/2 flex flex-col justify-between border  border-blue-300 rounded-lg p-2">
              <label htmlFor="audTotal" className="mb-1  block text-sm font-medium text-center">
                TOTAL AUD
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="audTotal"
                    name="audTotal"
                    {...register("audTotal", { valueAsNumber: true  })}
                    type="number"
                    value={!isNaN(audTotal) && audTotal}
                    className={`${inputStyle} bg-blue-200 pl-0 text-center font-bold`}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
                  
                  
        <hr className="my-4" />

        <div className="flex justify-center">
          <button  className={buttonStyle}>
            <input className="w-full text-center" type="submit" value={shiftToEdit? "Edit shift":"Create shift" }/>
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormShift;
