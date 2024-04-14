import React, { useState } from "react";
import Frame from "../Frame";
import { UseUserContext } from "@/context/userContext";
import Link from "next/link";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import Loading from "../Loading";
import LoadingSpiner from "../LoadingSpiner";

const FrameTasks = () => {
  const { userTasks, fetchUserTasks } = UseUserContext();

  const [isLoading, setIsLoading] = useState(false);

  const fetchTasks = async () => {
    setIsLoading(true);
    await fetchUserTasks();
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };
  return (
    <Frame classNameBox="justify-between px-6">
      <h3 className="text-center font-bold">Your Tasks</h3>
      <div className="flex flex-wrap gap-1">
        {userTasks?.map((task) => (
          <Link
            href={`/dashboard/settings/tasks/${task.id}`}
            key={task.id}
            className="inline px-2 py-1 border rounded-lg  border-blue-300 hover:border-transparent bg-transparent hover:bg-blue-500  text-blue-600 hover:text-white"
          >
            {task.clientNickname}
          </Link>
        ))}
      </div>
      <div className="flex justify-between gap-2 max-h-6">
        <Link
          href="/taskForm"
          className="text-xs text-center rounded-lg  border-blue-300 bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white px-2 py-1 border hover:border-transparent"
        >
          +
        </Link>
        <button onClick={() => fetchTasks()} disabled={isLoading}>
          {isLoading ? <LoadingSpiner /> : <ArrowPathIcon className="w-6" />}
        </button>
      </div>
    </Frame>
  );
};

export default FrameTasks;
