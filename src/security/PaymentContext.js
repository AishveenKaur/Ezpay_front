// PaymentContext.js
import React, { createContext, useState } from 'react';

// Create a Context for Payment State
export const PaymentContext = createContext();

// Create a provider component
export const PaymentProvider = ({ children }) => {
  const [paymentState, setPaymentState] = useState(null);

  return (
    <PaymentContext.Provider value={{ paymentState, setPaymentState }}>
      {children}
    </PaymentContext.Provider>
  );
};
