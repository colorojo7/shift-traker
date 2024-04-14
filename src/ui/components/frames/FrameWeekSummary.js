import React from "react";
import Frame from "../Frame";
import { CheckCircleIcon } from "@heroicons/react/20/solid";

const week = [
  {
    day: "Monday",
    dayShort: "Mon",
    dayLetter: "M",
  },
  {
    day: "Tuesday",
    dayShort: "Tue",
    dayLetter: "T",
  },
  {
    day: "Wednesday",
    dayShort: "Wed",
    dayLetter: "W",
  },
  {
    day: "Thursday",
    dayShort: "Thu",
    dayLetter: "T",
  },
  {
    day: "Friday",
    dayShort: "Fri",
    dayLetter: "F",
  },
  {
    day: "Saturday",
    dayShort: "Sat",
    dayLetter: "S",
  },
  {
    day: "Sunday",
    dayShort: "Sun",
    dayLetter: "S",
  },
];

const FrameWeekSummary = () => {
  return (
    <Frame className="md:max-w-96">
      <h2 className="text-center font-bold">Wheek summary</h2>
      <hr className="border-gray-400" />

      <div className="flex gap-1 md:gap-3 justify-between ">
        {week.map((day) => {
          return (
            <div
              key={day.day}
              className="basis-1/6 rounded-lg border border-gray-800"
            >
              <p className="text-center">{day.dayLetter}</p>
              <div className="flex justify-center">
                <CheckCircleIcon className="w-6 text-center text-green-400" />
              </div>
            </div>
          );
        })}
      </div>
      <hr className="border-gray-400" />

      <div className="flex">
        <div className="basis-1/2">
          <p className="text-center font-bold">Hrs</p>
          <div className="text-center font-bold text-3xl">33</div>
        </div>
        <div className="basis-1/2">
          <p className="text-center font-bold">AUD</p>
          <div className="text-center font-bold text-3xl">1250</div>
        </div>
      </div>
    </Frame>
  );
};

export default FrameWeekSummary;
