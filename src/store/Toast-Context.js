import React, { createContext, useState } from 'react';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [isShowToast, setIsShowToast] = useState(false);
  const [toastData, setToastData] = useState({});

  const openToast = (data) => {
    setIsShowToast(true);
    setToastData(data);
  };

  const closeToast = () => {
    setIsShowToast(false);
  };

  const context = {
    isShowToast,
    toastData,
    openToast,
    closeToast,
  }

  return (
    <ToastContext.Provider value={context}>
      {children}
    </ToastContext.Provider>
  );
};
