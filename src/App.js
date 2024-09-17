import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Payment from "./Pages/Payment";
import PaymentHistory from "./Pages/PaymentHistory";
import CheckBalance from "./Pages/CheckBalance";
import OTPAuthentication from "./Pages/OTPAuthentication";
import PaymentSuccess from "./Pages/PaymentSuccess";
import PaymentFailure from "./Pages/PaymentFailure";
import { PaymentProvider } from "./security/PaymentContext";
import PaymentProtected from "./security/PaymentProtected";

/**
 * Router Configuration
 *
 * Defines the routing structure for the EZPay application.
 * The `PaymentProtected` component ensures that certain routes are protected and accessible
 * only after valid OTP authentication.
 *
 * Author: Deepak Reddy Bijivemula
 * Date: September 17, 2024
 */
const routerConfig = createBrowserRouter([
  { path: "/", element: <Home /> }, // Route for Home page
  { path: "/payment", element: <Payment /> }, // Route for Payment page
  { path: "/payment-history", element: <PaymentHistory /> }, // Route for Payment History page
  { path: "/check-balance", element: <CheckBalance /> }, // Route for Check Balance page
  {
    path: "/payment/otp-auth",
    element: (
      <PaymentProtected>
        <OTPAuthentication />
      </PaymentProtected>
    ), // Protected route for OTP Authentication
  },
  {
    path: "/payment/payment-success",
    element: (
      <PaymentProtected>
        <PaymentSuccess />
      </PaymentProtected>
    ), // Protected route for Payment Success page
  },
  {
    path: "/payment/payment-failure",
    element: (
      <PaymentProtected>
        <PaymentFailure />
      </PaymentProtected>
    ), // Protected route for Payment Failure page
  },
]);

/**
 * App Component
 *
 * This is the main component of the EZPay application.
 * It sets up the PaymentProvider context for handling payment state and
 * wraps the RouterProvider to handle navigation between different pages.
 */
function App() {
  return (
    <PaymentProvider>
      <div className="App">
        <RouterProvider router={routerConfig} />
      </div>
    </PaymentProvider>
  );
}

export default App;
