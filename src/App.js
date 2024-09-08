import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import Payment from "./Pages/Payment";
import PaymentHistory from "./Pages/PaymentHistory";
import CheckBalance from "./Pages/CheckBalance";

// Define the router configuration
const routerConfig = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/payment", element: <Payment /> },
  { path: "/payment-history", element: <PaymentHistory /> },
  { path: "/check-balance", element: <CheckBalance /> },
]);

function App() {
  return (
    <div className="App">
      {/* Provide the router configuration */}
      <RouterProvider router={routerConfig} />
    </div>
  );
}

export default App;
