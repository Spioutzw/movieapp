import React, { createContext, useState } from 'react';

export const MediaContext = createContext();

export const MediaProvider = ({ children }) => {
  const [allMedia, setAllMedia] = useState([]);

  return (
    <MediaContext.Provider value={{ allMedia, setAllMedia }}>
      {children}
    </MediaContext.Provider>
  );
};
