'use client';

import { createContext, useContext, useState } from 'react';

type ViewContextType = {
  isFullscreen: boolean;
  setIsFullscreen: (value: boolean) => void;
};

const ViewContext = createContext<ViewContextType | undefined>(undefined);

export const ViewProvider = ({ children }: { children: React.ReactNode }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <ViewContext.Provider value={{ isFullscreen, setIsFullscreen }}>
      {children}
    </ViewContext.Provider>
  );
};

export const useView = () => {
  const ctx = useContext(ViewContext);
  if (!ctx) throw new Error('useView must be used inside ViewProvider');
  return ctx;
};