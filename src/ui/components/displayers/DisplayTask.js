import { inputStyle } from '@/ui/classNames'
import { BanknotesIcon } from '@heroicons/react/24/outline'
import React from 'react'

const DisplayTask = ({task}) => {
  return (
    <div type="taskInfo">
      <div>
          <h1 className={` font-semibold mb-3 text-2xl text-center`}>Hrs & Wages</h1>
      </div>

        {/* hrs details */}
        <div>
          
          <div>
            <h1 className={`text-center font-medium underline mb-2`}>Normal hrs</h1>
          </div>

          <div className="flex gap-4">
            <div className="mb-4 basis-1/2">
              <label htmlFor="start" className="mb-2 block text-sm font-medium">
                Start
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <div className={inputStyle} >
                        {task.start}
                  </div>
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
                  <div className={inputStyle}>
                  {task.finish}
                  </div>
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
                  <div className={inputStyle}>
                      {task.unpaidBrakes}
                  </div>
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
                  <div className={`${inputStyle} bg-blue-200 text-center font-bold`}>
                    {task.hrsTotal}
                    </div>  
                </div>
              </div>
            </div>
          </div>
        </div>

         {/* $ details */}
         <div>
          <hr className="my-2" />

          <div className="grow">

          <div className="flex mb-4 gap-3">
              <BanknotesIcon className="w-6" />
              <div className="p-4">
                <p className=" text-sm font-medium me-2">
                  Pay On
                </p>

              </div>
              <div className="relative mt-2 rounded-md grow">
                <div className="relative">
                  <div className={inputStyle} >
                        {task.payOn}
                  </div>
                </div>
              </div>
            </div>
            
           
          </div>

          {/* normaltime */}

          <div className="flex gap-4">
            <div className="mb-4 basis-1/2">
              <label htmlFor="start" className="mb-2 block text-sm font-medium">
                Normal rate
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <div className={inputStyle} >
                        {task.rateNT}
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 basis-1/2">
              <label
                htmlFor="finish"
                className="mb-2 block text-sm font-medium"
              >
                Overtime
              </label>
              <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <div className={inputStyle}>
                  {task.overtime? task.rateOT : task.rateNT}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {task.overtime &&
          <div className="flex gap-4">
          <p
            className="block text-sm font-medium py-4"
          >
            Overtime apply after
          </p>
          <div className="w-20 mt-2 rounded-md">
              <div className={`${inputStyle} text-center pl-0`}>
              {task.hrsBasic}
            </div>
          </div>
          <p className="block text-sm font-medium py-4">hrs</p>
        </div> }

          <hr className="my-4" />
        </div>

      </div>
  )
}

export default DisplayTask