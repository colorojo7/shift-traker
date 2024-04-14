import React from 'react'

const page = ({ params }) => {
    const shiftId = params.id;
    
  return (
    <div>pageShift {shiftId}</div>
  )
}

export default page