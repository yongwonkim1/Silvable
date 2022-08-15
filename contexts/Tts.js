import React, { useState, createContext } from 'react';

const TtsContext = createContext({
    tts: { rate: null, pitch: null },
    dispatch: () => {},
  });

  const TtsProvider = ({ children }) => {
    const [tts, setTts] = useState({});
    const dispatch = ({ rate, pitch }) => {
      setTts({ rate, pitch });
    };
    const value = { tts, dispatch };
    return <TtsContext.Provider value={value}>{children}</TtsContext.Provider>;
  };
  
  export { TtsContext, TtsProvider };