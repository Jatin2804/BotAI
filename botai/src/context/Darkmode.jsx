import React from "react";
import { createContext, useContext, useState } from "react";

const DarkmodeContext = createContext();

export const DarkmodeProvider = ({children}) => {
    const [darkMode, setdarkMode] = useState(false);

    const toggleMode = () =>{
        setdarkMode((prev)=> !prev)
    }
  return(
  <DarkmodeContext.Provider value={{darkMode,toggleMode}}>
    {children}
  </DarkmodeContext.Provider>
);
};

export const useDarkmode =()=> useContext(DarkmodeContext);
 
