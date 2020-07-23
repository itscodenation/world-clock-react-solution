import React, { useEffect, useState } from "react";
import "./App.css";

function getNewTime(time) {
  let hours = time.hours;
  let minutes = time.minutes;
  let seconds = time.seconds;
  seconds += 1;
  if (seconds >= 60) {
    seconds = 0;
    minutes += 1;
  }
  if (minutes >= 60) {
    minutes = 0;
    hours += 1;
  }
  if (hours >= 13) {
    hours = 1;
  }
  return {
    hours,
    minutes,
    seconds,
  };
}

async function getNYTime(callback) {
  const response = await fetch(
    "http://worldtimeapi.org/api/timezone/America/New_York"
  );
  const result = await response.json();

  const time = parseTime(result.datetime);
  callback(time);
}

function App() {
  const initialTime = {
    hours: 0,
    minutes: 0,
    seconds: 0,
  };
  let time;

  const useClock = () => {
    [time, setTime] = useState(initialTime);

    useEffect(() => {
      const id = setInterval(() => {
        setTime(() => getNewTime(time));
      }, 1000);
      return () => clearInterval(id);
    }, []);

    return time;
  };
  const currentTime = useClock();
  return (
    <div className="App">
      {(currentTime && currentTime.hours) || 0}:
      {(currentTime && currentTime.minutes) || 0}:
      {(currentTime && currentTime.seconds) || 0}
    </div>
  );
}

function parseTime(time) {
  let hours = new Date(time).getHours();
  hours = hours % 12 || 12;
  let minutes = new Date(time).getMinutes();
  let seconds = new Date(time).getSeconds();

  return {
    hours,
    minutes,
    seconds,
  };
}

export default App;
