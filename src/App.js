import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import Home from "./pages/Home";
import { productsData } from "./api/ProductsApi";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import OtpVerification from "./pages/OtpVerification";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home />, loader: productsData },
        { path: "/cart", element: <Cart /> },
      ],
    },
    { path: "/signin", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/otp-verification", element: <OtpVerification/>}
  ]);

  return (
    <div className="font-bodyFont bg-gray-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
