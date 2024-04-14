import { UseUserContext } from "@/context/userContext";
import { format, parseISO } from "date-fns";
import Link from "next/link";
import React from "react";

const ShiftsCards = ({ shifts }) => {
  const { userTasks } = UseUserContext();
  return (
    <div className="flex flex-wrap-reverse gap-2">
      {/* Aca comienza el shifts.map de mobile */}
      {shifts?.map((shift) => (
        <Link
          href={`/dashboard/shifts/${shift.id}`}
          key={shift.id}
          className=" w-full rounded-md bg-white p-2 border border-grey-500"
        >
          <div className="flex items-center justify-between ">
            <div className="">
              <p>{format(parseISO(shift.date), "EEE dd")}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {
                  userTasks.find((task) => task.id === shift.taskId)
                    .clientNickname
                }
              </p>
            </div>
          </div>
          <div className="flex w-full items-center justify-between pt-4">
            <div>
              <p className=" font-medium pl-2">A$ {shift.audTotal}</p>
            </div>
            <div className="pr-2">
              {shift.hrsTotal} hrs
              {/* <div note="Link para editar shift" className="rounded-md hover:bg-gray-100"><PencilSquareIcon   className="w-5 text-blue-500" /></div> */}
              {/* <div note="Link para editar shift" className="rounded-md hover:bg-gray-100"><TrashIcon   className="w-5 text-red-500" /></div> */}
            </div>
          </div>
        </Link>
      ))}

      {/* Aca cierra el shifts.map */}
    </div>
  );
};

export default ShiftsCards;
