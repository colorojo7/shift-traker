import React from 'react'
import Frame from './Frame'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { buttonStyle } from '../classNames'
import Link from 'next/link'

const UserDataWarning = () => {
  return (
    <Frame>
        <div className="flex flex-col">
            <div>
              <div className="text-center font font-bold text-xl">
                Complete your profile information.
              </div>
              <div className="flex text-red-400 justify-center gap-2">
                <ExclamationTriangleIcon className="w-6" />
                <p>Complete before submit any shift </p>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <Link href="/userDataForm" className={buttonStyle}> <p className="w-full text-center">Complete profile</p></Link>
            </div>
          </div>
    </Frame>
  )
}

export default UserDataWarning