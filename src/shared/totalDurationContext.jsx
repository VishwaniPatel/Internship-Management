// DataContext.js
import React, { createContext, useContext, useState } from "react";

const TotalDurationContext = createContext();

export const TotalDurationProvider = ({ children }) => {
  const [duration, setDuration] = useState(null);
  console.log("IN CONTEXT DURATION:", duration);
  return (
    <TotalDurationContext.Provider value={{ duration, setDuration }}>
      {children}
    </TotalDurationContext.Provider>
  );
};

export const useTotalDuration = () => useContext(TotalDurationContext);
