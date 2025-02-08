import React, { useState, useEffect } from "react";

const useGetTime = () => {
  const [time, setTime] = useState();

  function checkTime(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  }

  useEffect(() => {
    setInterval(() => {
      let dateObject = new Date();
      let hour = dateObject.getHours();
      let minute = dateObject.getMinutes();
      hour = checkTime(hour);
      minute = checkTime(minute);
      let currentTime = hour + " : " + minute;

      setTime(currentTime);
    }, 1000);
  }, []);

  return {
    time,
  };
};

export default useGetTime;
