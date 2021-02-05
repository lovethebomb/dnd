import React, { useState } from 'react'
import useDarkMode from 'use-dark-mode';

const DarkModeContext = React.createContext([{}, () => {}]);

const DarkModeProvider = (props) => {
  const darkMode = useDarkMode(false)
  return (
    <DarkModeContext.Provider value={[darkMode]}>
      {props.children}
    </DarkModeContext.Provider>
  );
};

export { DarkModeContext, DarkModeProvider };
