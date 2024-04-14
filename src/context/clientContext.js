'use client'

import { fetchCollection, fetchDoc } from "@/lib/actionsFirebase.js";
import React, { createContext, useContext, useState } from "react";


const ClientContext = createContext();

export default function ClientContextProvider({ children }) {
const [ clients , setClients]= useState()

const fetchClients = async ()=>{
    try {
        const clientsArr = await fetchCollection(['clients'])
        setClients(clientsArr)
    } catch (e) {
        console.log("fetchClients()", e);
    } 
}

const fetchClient = async(clientId)=>{
    try{
        return await fetchDoc(["clients"], clientId)
      }
      catch(e){
        console.log("fetchClient", e)
      }
}


    return (
        <ClientContext.Provider
            value={{
                fetchClients,
                fetchClient,
                clients
            }}
        >
            {children}
        </ClientContext.Provider>
    )
}

export const useClientContext = () => {
    return useContext(ClientContext);
  };