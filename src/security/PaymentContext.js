import React, { createContext, useState } from "react";

/**
 * PaymentContext
 *
 * This context provides a global state for managing payment-related data across the application.
 * It allows components to access and update the payment state without prop drilling.
 *
 * Author: Deepak Reddy Bijivemula
 * Date: September 10, 2024
 */

// Create a Context for Payment State
export const PaymentContext = createContext();

/**
 * PaymentProvider
 *
 * This provider component wraps around parts of the application that need access to the payment state.
 * It manages the `paymentState` and provides a method to update it (`setPaymentState`).
 */
export const PaymentProvider = ({ children }) => {
  const [paymentState, setPaymentState] = useState(null); // Initialize payment state

  return (
    <PaymentContext.Provider value={{ paymentState, setPaymentState }}>
      {children}
    </PaymentContext.Provider>
  );
};
