import { useContext } from 'react';
import { DarkModeContext } from "../context/DarkModeContext";

const useDarkMode = () => {
  const [state] = useContext(DarkModeContext);

    return {
      darkMode: state,
    }
};

export default useDarkMode;
