import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ShoppingCarts from "./components/ShoppingCarts";
import Navbar from "./components/Navbar";
import Carts from "./components/Carts";
import Paypal from "../Paypal";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<ShoppingCarts />} />
          <Route path="cart" element={<Carts />} />
          <Route path="cart/paypal" element={<Paypal />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
