import React, { useContext } from "react";
import { PaymentContext } from "./PaymentContext";
import { Navigate } from "react-router-dom";

/**
 * PaymentProtected Component
 *
 * Protects routes by ensuring that the user has a valid payment state before accessing certain pages.
 * If the payment state is invalid or missing, it redirects the user to the home page.
 * If the payment state is valid, it renders the children components.
 *
 * Author: Deepak Reddy Bijivemula
 * Date: September 10, 2024
 */
const PaymentProtected = ({ children }) => {
  const { paymentState } = useContext(PaymentContext);

  // Check if paymentState is invalid or missing
  // If invalid, redirect to home page
  if (!paymentState) {
    return <Navigate to="/" replace />;
  }

  // Render the child components if paymentState is valid
  return children;
};

export default PaymentProtected;
