import { openGoogleMaps } from '@/lib/functions'
import { AtSymbolIcon, MapPinIcon, PhoneIcon, UserIcon } from '@heroicons/react/24/outline'
import React from 'react'

const DisplayClient = ({client}) => {
  return (
    <div type="clientInfo">
        <div>
          <h3 className="font-semibold mb-2 text-xl text-center">{client?.name}</h3>
          <h4 className="text-center">
            <span >ABN :</span>
            {client?.ABN}
          </h4>
        </div>

        <hr className="my-1" />

        <div>
        <button
           
            onClick={() => openGoogleMaps(client?.address)}
            className={`flex  grow items-center justify-center gap-1 rounded-md border border-blue-500 bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3`}
          >
            <div className="w-8 ">
              <MapPinIcon className="w-8 h-10"   />

            </div>
            <p className="md:block">{client?.address}</p>
          </button>
        

          <div className="flex justify-center">
          </div>
        </div>

        <hr className="my-2" />

        <div>
          <h1 className={` font-semibold mb-3 text-2xl text-center`}>Contact</h1>
          <div className="flex flex-col gap-1">
            <div className="flex gap-3">
              <UserIcon className="w-6" />
              <div>{client?.contactName}</div>
            </div>
            <div className="flex gap-3">
              <AtSymbolIcon className="w-6" />
              <div>{client?.contactEmail}</div>
            </div>
            <div className="flex gap-3">
              <PhoneIcon className="w-6" />
              <div>{client?.contactPhone}</div>
            </div>
          </div>
        </div>

        <hr className="my-2" />
        <div>
          <h1 className={` font-semibold mb-3 text-2xl text-center`}>Comments</h1>
          <div>{client?.comments}</div>
        </div>
      </div>
  )
}

export default DisplayClient