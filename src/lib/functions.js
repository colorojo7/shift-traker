import { differenceInMinutes, parse } from 'date-fns';
import {
  format,
  nextFriday,
  nextSaturday,
  nextSunday,
  nextThursday,
  nextTuesday,
  nextWednesday,
} from "date-fns";


export const today = new Date();

export const openGoogleMaps = (address) => {
    if (address) {
      const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
      window.open(url, '_blank')
    } else {
      console.error("No address available to open Google Maps.")
    }
  }

export function getTotalHrs(start,finish, brakes, date =`1970-01-01` ){
    const startTime = start&& parse(start, 'HH:mm', new Date(date));
    const finishTime = finish&& parse(finish, 'HH:mm', new Date(date));

    const hoursDifference = differenceInMinutes(finishTime, startTime);
    const hrsTotal = parseFloat((hoursDifference-brakes)/60)
    
    if (hrsTotal>0){
        return hrsTotal.toFixed(2)
    }
    if(hrsTotal<0){
        return (hrsTotal+24).toFixed(2)
    }
    return 0
}

export const getNormalOvertimeHrs = (task, hrsTotal)=>{
  let normal
  let overtime
    if (task?.overtime===false) {
      normal = hrsTotal
    }
    if(task?.overtime===true){
      if(hrsTotal>task?.hrsBasic){
        normal = (task?.hrsBasic).toFixed(2)
        overtime = (hrsTotal-normal).toFixed(2)
      }
      if(hrsTotal<task?.hrsBasic){
        normal = hrsTotal
        overtime = 0
      }
    }
    return {normal, overtime}

}


export const buildWeek = (startDay) =>{
  const week = [
    format(startDay, "yyyy-MM-dd"),
    format(nextTuesday(startDay), "yyyy-MM-dd"),
    format(nextWednesday(startDay), "yyyy-MM-dd"),
    format(nextThursday(startDay), "yyyy-MM-dd"),
    format(nextFriday(startDay), "yyyy-MM-dd"),
    format(nextSaturday(startDay), "yyyy-MM-dd"),
    format(nextSunday(startDay), "yyyy-MM-dd"),
  ]
  return week
}

