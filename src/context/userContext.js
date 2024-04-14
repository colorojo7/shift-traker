"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "@/lib/firebaseConfig";
import { fetchCollection, fetchDoc} from "@/lib/actionsFirebase.js";
import { setUserDataLS, setUserTasksLS } from "@/lib/actionsLocalStorage.js";

const UserContext = createContext();

export default function UserContextProvider({ children }) {
  
  const [user, setUser] = useState(undefined);
  const [userData, setUserData] = useState();
  const [userTasks, setUserTasks] =  useState([]);
  const [taskToEdit, setTaskToEdit]= useState(null);

  const googleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider);
  };

  const logOut = () => {
    signOut(auth);
  };


  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribed();
  }, []);

  
  //fetch userData
  const fetchUserData = async ()=>{
    if (user){
      try{
        const docData = await fetchDoc(["users"],user?.uid)
        setUserData(docData)
        setUserDataLS(docData.uid,docData)
        console.log("fetchUserData()");
      }
      catch(e){
        console.log("fetchUserData",e)
      }
    }
  }

  //bring userData from LocalStorage. If there is non fetch them from db
  useEffect(() => { 
    const LSuserData =  localStorage.getItem(`userData-${user?.uid}`)
      if (LSuserData !== "" && LSuserData !== "undefined"){
        const docData = JSON.parse(LSuserData) 
        setUserData(docData)
      }
      if (!LSuserData || LSuserData === "" || LSuserData === "undefined" || userData?.uid ==! user?.uid ){
        fetchUserData()
     }
  }, [user,fetchUserData,userData?.uid]);


  //fetch users Tasks
  const fetchUserTasks = async ()=>{
    if (user){
      try{
        const tasksArr = await fetchCollection(['users',user.uid, "tasks"])
        setUserTasks( tasksArr )
        setUserTasksLS(user.uid, tasksArr)
        console.log("terminado el fetchUserTasks()");
      }catch(e){
        console.log(e);
      }   
    }
  }

  useEffect(()=>{
    const LSuserTasks =  localStorage.getItem(`userTasks-${user?.uid}`)
      if (LSuserTasks !== "" && LSuserTasks !== "undefined" ){
        const TasksData = JSON.parse(LSuserTasks) 
        setUserTasks(TasksData)
      }
      if (!LSuserTasks || LSuserTasks === "" || LSuserTasks === "undefined" ){
        fetchUserTasks()
     }   
  },[user,fetchUserTasks])

  const fetchTask = async (taskId)=>{
    try{
      const cllectionTasksPath = ["users",user.uid,"tasks"]
      return await fetchDoc(cllectionTasksPath,taskId )

    }
    catch(e){
      console.log("fetchTasks", e)
    }
  }

        return (
          <UserContext.Provider
      value={{
        googleSignIn,
        logOut,
        //selectAccountType,
        user,
        fetchUserData,
        userData,
        setUserData,
        fetchUserTasks,
        fetchTask,
        userTasks,
        taskToEdit, setTaskToEdit

      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const UseUserContext = () => {
  return useContext(UserContext);
};
