"use client";

import { useEffect, useState } from "react";
import { Suspense } from 'react'
import {
  format,
  isMonday,
  isSunday,
  nextMonday,
  nextSunday,
  previousMonday,
  previousSunday,
} from "date-fns";

import { UseUserContext } from "@/context/userContext";
import DisplayShifts from "@/ui/components/displayers/DisplayShifts";
import UserDataWarning from "@/ui/components/UserDataWarning";
import { CreateShiftBtn } from "@/ui/components/crudButtons";
import { buildWeek, today } from "@/lib/functions";
import { buttonOutlinedStyle } from "@/ui/classNames";
import { fetchShifts } from "@/lib/actionsFirebase";
import Loading from "@/ui/components/Loading";

export default function ShiftsList() {
  const [shiftsToShow, setShiftsToShow] = useState([]);
  const [weekStart, setWeekStart] = useState();
  const [weekEnd, setWeekEnd] = useState();
  const [weekToShow, setWeekToShow] = useState([]);
  const { userData } = UseUserContext();

  useEffect(() => {
    isMonday(today) ? setWeekStart(today) : setWeekStart(previousMonday(today));
    isSunday(today) ? setWeekEnd(today) : setWeekEnd(nextSunday(today));
  }, []);

  useEffect(() => {
    if (weekStart) {
      const week = buildWeek(weekStart);
      setWeekToShow(week);
    }
  }, [weekStart]);

  useEffect(() => {
    const obtenerShifts = async()=>{
    try {
      const data = await fetchShifts(["users", userData.uid, "shifts"], weekToShow);
      setShiftsToShow(data);
    } catch (e) {
      console.log(e);
    }}
    obtenerShifts() 
  }, [weekToShow, userData.uid]);

  console.log(weekStart, weekEnd);
  console.log(weekToShow);
  console.log(shiftsToShow);
  return (
    <>
      <div className="flex flex-row flex-wrap ">
        {!userData && <UserDataWarning />}
      </div>

      <div className="w-full">
        <div className=" md:w-2/12">
          <CreateShiftBtn />
        </div>
        <div className=" flex flex-wrap items-center gap-14 mt-4 md:mt-8 justify-center">
          <div className="w-full md:w-6/12 flex justify-between">
            <div className="md:w-3/12">
              <button
                className={`${buttonOutlinedStyle} flex justify-around`}
                onClick={() => {
                  setWeekStart(previousMonday(weekStart));
                  setWeekEnd(previousSunday(weekEnd));
                }}
              >
                <span>{" << "}</span>

                <span className="ml-2 hidden md:block">previous</span>
              </button>
            </div>
            <div className="md:w-4/12 text-center ">
              This Week ends
              <p className="text-xl font-bold">
                {weekEnd && format(weekEnd, "PPP")}
              </p>
            </div>
            <div className="md:w-3/12">
              <button
                className={`${buttonOutlinedStyle} flex justify-around`}
                onClick={() => {
                  setWeekStart(nextMonday(weekStart));
                  setWeekEnd(nextSunday(weekEnd));
                }}
              >
                <span className="mr-2 hidden md:block">next</span>
                <span>{" >> "}</span>
              </button>
            </div>
          </div>
        </div>
        <Suspense
          fallback={<Loading/>}
        >
          <DisplayShifts shifts={shiftsToShow} />
        </Suspense>
      </div>
    </>
  );
}
