// PaymentProtected.js
import React, { useContext } from "react";
import { PaymentContext } from "./PaymentContext";
import { Navigate } from "react-router-dom";

const PaymentProtected = ({ children }) => {
  const { paymentState } = useContext(PaymentContext);

  // If no paymentState, redirect to home
  if (!paymentState) {
    return <Navigate to="/" replace />;
  }

  return children; // Render the page if valid state is present
};

export default PaymentProtected;
