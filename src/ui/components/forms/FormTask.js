import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'

import { buttonStyle, inputErrorStyle, inputStyle } from "../../classNames";
import {
  BanknotesIcon,
  BuildingStorefrontIcon
} from "@heroicons/react/24/outline";
//import { clients } from "@/lib/clients.js";
import { getTotalHrs } from "@/lib/functions";
import { addTask } from "@/lib/actionsFirebase";
import { UseUserContext } from "@/context/userContext";
import { useClientContext } from "@/context/clientContext";


const FormTask = () => {
  const router = useRouter();
  const [overtime, setOvertime] = useState(false);
  const {user, fetchUserTasks, taskToEdit, setTaskToEdit}=UseUserContext()
  const {clients, fetchClients} = useClientContext()
  
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: taskToEdit
  
  })
  
  useEffect(() => {
    !taskToEdit && fetchClients ()
  },[fetchClients, taskToEdit])
  
  const hrsTotal = parseFloat(getTotalHrs(watch("start"),watch("finish"), watch("unpaidBrakes")))

  useEffect(()=>{
      setValue("hrsTotal",hrsTotal)
  },[hrsTotal,setValue])

  
  const onSubmit = async (data) => {
    let clientNickname
    if (taskToEdit){
      clientNickname = taskToEdit.clientNickname
    }else{
      const client = clients.find((client)=> client.id === data.clientId)
      clientNickname = client.nickname
    }
    const completeData = {...data, hrsTotal,  clientNickname, isDeleted:false }
    console.log(completeData);
    try{
      await addTask(user.uid, completeData)
      await fetchUserTasks()
      setTaskToEdit(null)
      router.push('/dashboard/settings')
    }catch(e){
      console.log("FormUserData",e);
    }
  }

  return (
    <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grow">
            <label
              htmlFor="clientId"
              className="mb-2 block text-sm font-medium"
            >
              Client
            </label>
            <div className="relative">
              <BuildingStorefrontIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
              <select
                id="clientId"
                name="clientId"
                className={`select peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${errors.clientId && inputErrorStyle} `}
                aria-describedby="client-error"
                {...register("clientId", { required: true })}
                disabled={taskToEdit? true: false}
              >
                {!taskToEdit &&
                <>
                  <option value="" >
                    Select a client
                  </option> 
                  {clients?.map((client) => (
                    <option key={client.id} value={client.id}>
                      {client.nickname}
                    </option>
                  ))}
                </>
                }
                {taskToEdit &&
                  <option value={taskToEdit.clientId} >
                    {taskToEdit.clientNickname}
                  </option>}
                
              </select>
            </div>
          </div>

        {/* hrs details */}
        <div>
          <hr className="my-6" />
          <div>
            <h1 className={` font-bold text-2xl text-center`}>Normal hrs</h1>
            <p className="mb-3 text-sm text-center font-light">
              set your default working shift
            </p>
          </div>

          <div className="flex gap-4">
            <div className="mb-4 basis-1/2">
              <label htmlFor="start" className="mb-2 block text-sm font-medium">
                Start
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="start"
                    name="start"
                    type="time"
                    defaultValue={""}
                    className={inputStyle}
                    {...register("start", { required: true })}
                  />
                </div>
              </div>
            </div>

            <div className="mb-4 basis-1/2">
              <label
                htmlFor="finish"
                className="mb-2 block text-sm font-medium"
              >
                Finish
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="finish"
                    name="finish"
                    type="time"
                    defaultValue={""}
                    className={inputStyle}
                    {...register("finish", { required: true })}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="mb-4 basis-1/2">
              <label
                htmlFor="unpaidBrakes"
                className="mb-2 block text-sm font-medium"
              >
                Unpaid Brakes (minutes)
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="unpaidBrakes"
                    name="unpaidBrakes"
                    type="number"
                    defaultValue={0}
                    className={inputStyle}
                    {...register("unpaidBrakes", { 
                      required: true,
                      valueAsNumber: true 
                    })}
                  />
                </div>
              </div>
            </div>
            <div className="mb-4 basis-1/2 flex flex-col justify-between border  border-blue-300 rounded-lg p-2">
              <label
                htmlFor="hrsTotal"
                className="mb-2 block text-sm font-medium"
              >
                Daily HRS
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <input
                    id="hrsTotal"
                    name="hrsTotal"
                    type="number"
                    value={hrsTotal}
                    {...register("hrsTotal", { 
                      required: true,
                      valueAsNumber: true 
                    })}
                    
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
          <div>
            <h1 className={` font-bold mb-3 text-2xl text-center`}>AUD</h1>
            <p className="mb-3 text-sm text-center font-light">
              set your wages
            </p>
          </div>

          <div className="grow">
            
            <div className="relative">
              <select
                id="payOn"
                name="payOn"
                className={`select peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 ${errors.clientId && inputErrorStyle} `}
                aria-describedby="client-error"
                {...register("payOn", { required: true })}
              >
                <option value="" disabled>
                  Select payment type
                </option>
                  <option key="ABN" value="ABN">
                    ABN
                  </option>
                  <option key="TFN" value="TFN">
                    TFN
                  </option>
                  <option key="other" value="other">
                    other
                  </option>
              </select>
              <BanknotesIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
            </div>
          </div>

          {/* normaltime */}
          <div className="mb-1 flex gap-5 items-center ">
            <label
              htmlFor="rateNT"
              className="basis-1/2 font-bold block w-full  pl-1 text-sm outline-2 placeholder:text-gray-500"
            >
              Normal
            </label>

            <div className="relative mt-2 rounded-md">
              <div className="relative">
                <input
                  id="rateNT"
                  name="rateNT"
                  type="number"
                  step="any"
                  defaultValue={25}
                  className={`${inputStyle} pl-1 text-center`}
                  {...register("rateNT",{ 
                    required: true,
                    valueAsNumber: true 
                  })}
                />
              </div>
            </div>
          </div>

          {/* overtime */}
          <div className="  flex items-center ">
            <input
              id="overtime"
              name="overtime"
              type="checkbox"
              onClick={() => setOvertime(!overtime)}
              {...register("overtime")}
            />
            <label
              htmlFor="overtime"
              className="font-bold block w-full py-[9px] pl-1 text-sm outline-2 placeholder:text-gray-500"
            >
              Overtime
            </label>
          </div>

          {watch("overtime") && (
            <>
              <div className="mb-1 flex gap-5 items-center ">
                <label
                  htmlFor="hrsBasic"
                  className="basis-1/2 font-light block w-full  pl-1 text-sm outline-2 placeholder:text-gray-500"
                >
                  Basic hrs before getting overtime
                </label>

                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="hrsBasic"
                      name="hrsBasic"
                      type="number"
                      step="any"
                      defaultValue={hrsTotal}
                      className={`${inputStyle} pl-1 text-center`}
                      {...register("hrsBasic", { 
                        required: true,
                        valueAsNumber: true 
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="mb-1 flex gap-5 items-center ">
                <label
                  htmlFor="rateOT"
                  className="basis-1/2 font-light block w-full  pl-1 text-sm outline-2 placeholder:text-gray-500"
                >
                  AUD x hr
                </label>

                <div className="relative mt-2 rounded-md">
                  <div className="relative">
                    <input
                      id="rateOT"
                      name="rateOT"
                      type="number"
                      step="any"
                      className={`${inputStyle} pl-1 text-center`}
                      {...register("rateOT", { 
                        required: true,
                        valueAsNumber: true 
                      })}
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <hr className="my-4" />

        <div className="flex justify-center">
          <button  type="submit" className={buttonStyle}>
            {/* <input className="w-full text-center" onClick={()=>console.log("submit")} type="submit" value=   />*/}
            {taskToEdit? "Edit task":"Add Task" }
            
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormTask;
