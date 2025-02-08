import React from "react";

function useConvertDate({ data, dueMonthIndex }) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const isoDate = data?.createdAt;
  const actualDate = new Date(isoDate);
  const dayName = days[actualDate.getDay()];
  const date = actualDate.getDate();
  const monthIndex = actualDate.getMonth();
  const month = monthNames[monthIndex];
  const dueMonth = monthNames[dueMonthIndex - 1];
  const year = actualDate.getFullYear();

  return {
    date,
    month,
    year,
    dayName,
    dueMonth,
  };
}

export default useConvertDate;
