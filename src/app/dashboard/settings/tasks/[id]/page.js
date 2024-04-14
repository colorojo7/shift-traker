"use client";

import { useClientContext } from "@/context/clientContext";
import { UseUserContext } from "@/context/userContext";
import { buttonDangerStyle, buttonOutlinedStyle } from "@/ui/classNames";
import DeletingWarning from "@/ui/components/DeletingWarning";
import Loading from "@/ui/components/Loading";
import DisplayTask from "@/ui/components/displayers/DisplayTask";
import DisplayClient from "@/ui/components/displayers/DisplayClient";
import FrameForm from "@/ui/components/frames/FrameForm";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Tasks = ({ params }) => {
  const [deleting, setDeleting] = useState(false);
  const [task, setTask] = useState();
  const [client, setClient] = useState();
  const { userTasks, setTaskToEdit } = UseUserContext();
  const { fetchClient } = useClientContext();

  const taskId = params.id;

  useEffect(() => {
    if (!userTasks) return;
    const taskFind = userTasks.find((task) => task.id === taskId);
    setTask(taskFind);
  // }, [userTasks]);
});

  useEffect(() => {
    if (!task) return;
    fetchClient(task.clientId)
      .then((res) => setClient(res))
      .catch((e) => console.log(e));
  // }, [task]);
});

  if (!userTasks || !client) {
    return (
      <FrameForm title="Task">
        <Loading />
      </FrameForm>
    );
  }

  return deleting ? (
    <DeletingWarning objetType="Task" name={client?.nickname} />
  ) : (
    <FrameForm title="Task">
      <DisplayClient client={client} />

      <hr className="my-3" />

      <DisplayTask task={task} />

      <hr className="my-1" />

      <div className="flex flex-wrap  justify-evenly">
        <div className="w-1/3">
          <button
            onClick={() => {
              setTaskToEdit(task);
              setDeleting(true);
            }}
            className={`${buttonDangerStyle}`}
          >
            <p className="w-full text-center">Delete</p>
          </button>
        </div>
        <div className="w-1/3">
          <Link onClick={() => {
              setTaskToEdit(task);
            }}
            href={`/taskForm`}
            className={buttonOutlinedStyle}>
              <p className="w-full text-center">Edit</p>
          </Link>
        </div>
      </div>
    </FrameForm>
  );
};

export default Tasks;
