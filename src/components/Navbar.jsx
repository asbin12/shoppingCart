import { Link } from "react-router-dom";
import "./style.css";
import { FaHome } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { useSelector } from "react-redux";
const Navbar = () => {
  const noOfProducts = useSelector((state) => state.cart);
  const uniqueProducts = [...new Set(noOfProducts)];
  return (
    <header className="header">
      <Link to="/">
        {" "}
        <h1 className="heading__header">
          <span className="logo__first__part">Hamro</span>
          <span className="logo__second__part">Store</span>
        </h1>
      </Link>
      <div className="navLinks">
        <Link to="/">
          <FaHome />
        </Link>
        <Link to="cart" className="carts__item">
          <span className="no__of__items"> {uniqueProducts.length}</span>
          <FaCartShopping />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
