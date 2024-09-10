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

// Define the router configuration
const routerConfig = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/payment", element: <Payment /> },
  { path: "/payment-history", element: <PaymentHistory /> },
  { path: "/check-balance", element: <CheckBalance /> },
  {
    path: "/payment/otp-auth",
    element: (
      <PaymentProtected>
        <OTPAuthentication />{" "}
      </PaymentProtected>
    ),
  },
  {
    path: "/payment/payment-success",
    element: (
      <PaymentProtected>
        <PaymentSuccess />{" "}
      </PaymentProtected>
    ),
  },
  {
    path: "/payment/payment-failure",
    element: (
      <PaymentProtected>
        <PaymentFailure />{" "}
      </PaymentProtected>
    ),
  },
]);

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
