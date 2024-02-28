import { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useDispatch } from "react-redux";
import { addMultipleItems } from "../store/cartSlice";
import { addToCartNotify } from "./Tostify/Tostify";
import TostifyContainer from "./Tostify/TostifyContainer";
import { Link } from "react-router-dom";

const ShoppingCarts = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    dummyApi();
    setLoading(false);
  }, []);
  const dummyApi = async () => {
    const res = await axios.get("https://dummyjson.com/products");
    setData(res.data.products);
  };
  const handleAdd = (product) => {
    dispatch(
      addMultipleItems({
        product,
        id: product.id,
        quantity: 1,
        price: product.price,
      })
    );
    addToCartNotify();
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 8;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordsPerPage);

  const numbers = [...Array(nPage + 1).keys()].slice(1);
  const prePage = (e) => {
    if (currentPage === 1) {
      e.preventDefault();
      // setCurrentPage(1);
    } else if (currentPage !== 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeCPage = (id) => {
    setCurrentPage(id);
  };
  const nextPage = (e) => {
    if (currentPage === nPage) {
      e.preventDefault();
    } else if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <h1 className="cart__heading"> Products List </h1>
      {loading ? (
        <h1 className="loading">Loading Data...........</h1>
      ) : (
        <div className="wrapper">
          <div className="carts__collections">
            {records.map((item) => (
              <div key={item.id} className="carts anim">
                <div className="rating__discount anim">
                  <span className="rating "> ⭐:{item.rating} </span>
                  <span className="discount ">Price: {item.price}</span>
                </div>

                <img
                  src={item.images[0]}
                  alt="image"
                  className="cart__image anim"
                />
                <h2 className="title anim" style={{ width: "300px" }}>
                  {item.title}
                </h2>
                <button className="btn anim" onClick={() => handleAdd(item)}>
                  Add to carts
                </button>
              </div>
            ))}
          </div>
          <div>
            <ul className="pagination anim">
              {/* */}
              <li className="page-item">
                <Link className="page-link" onClick={prePage}>
                  Prev
                </Link>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${currentPage === n ? `active` : ""}`}
                  key={i}
                >
                  <Link className="page-link" onClick={() => changeCPage(n)}>
                    {n}
                  </Link>
                </li>
              ))}
              <li className="page-item">
                <Link className="page-link" onClick={nextPage}>
                  Next
                </Link>
              </li>
            </ul>
          </div>
          <TostifyContainer />
        </div>
      )}
    </>
  );
};

export default ShoppingCarts;
