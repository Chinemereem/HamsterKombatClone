import React, {createContext, useState, useContext, useEffect} from 'react';

const TimerContext = createContext();

export const TimerProvider = ({children}) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds

  useEffect(() => {
    let timer;
    if (isTimerActive) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 0) {
            clearInterval(timer);
            setIsTimerActive(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isTimerActive && timeLeft !== 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [isTimerActive]);

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
  
    return `${minutes < 10 ? '0' : ''}${minutes}`;
  };

  return (
    <TimerContext.Provider
      value={{isTimerActive, setIsTimerActive, timeLeft, formatTime}}>
      {children}
    </TimerContext.Provider>
  );
};

export const useTimer = () => useContext(TimerContext);
