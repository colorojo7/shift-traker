import { UseUserContext } from "@/context/userContext";
import { format, parseISO } from "date-fns";
import React, { useState } from "react";
import { DeleteShiftBtn, UpdateShiftBtn } from "./crudButtons";
import { EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ShiftsTable = ({ shifts }) => {
  const { userTasks } = UseUserContext();

  return (
    <table className="min-w-full text-gray-900 table">
      <thead className="rounded-lg text-left text-sm font-normal">
        <tr>
          <th scope="col" className=" px-4 py-5 font-medium sm:pl-6">
            Date
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Client
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Start
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Finish
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            HRS
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            AUD
          </th>
          <th scope="col" className="px-3 py-5 font-medium">
            Status
          </th>
          <th scope="col" className="relative py-3 pl-6 pr-3">
            <span className="sr-only">Edit</span>
          </th>
        </tr>
      </thead>

      <tbody className="bg-white">
        {shifts?.map((shift) => (
          <tr
            key={shift.id}
            className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
          >
            <td className="whitespace-nowrap py-3 pl-6 pr-3">
              {format(parseISO(shift.date), "EEE dd")}
            </td>
            <td className="whitespace-nowrap py-3 px-3">
              {
                userTasks.find((task) => task.id === shift.taskId)
                  .clientNickname
              }
            
            </td>
            <td className="whitespace-nowrap px-3 py-3">{shift.hrStart}</td>
            <td className="whitespace-nowrap px-3 py-3">{shift.hrFinish}</td>
            <td className="whitespace-nowrap px-3 py-3">{shift.hrsTotal}</td>
            <td className="whitespace-nowrap px-3 py-3">{shift.audTotal}</td>
            <td className="whitespace-nowrap px-3 py-3">{shift.status}</td>

            <td className="whitespace-nowrap py-3 pl-2 pr-3">
              <div className="flex justify-end gap-3">
                <Link
                  href={`/dashboard/shifts/${shift.id}`}
                  
                  className="rounded-md border p-2 hover:bg-gray-100"
                >
                <EyeIcon className="w-6"/>
                </Link>
                <UpdateShiftBtn id={"1"} />
                <DeleteShiftBtn id={"1"} />
              </div>
            </td>

            <td>
              <div></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ShiftsTable;
