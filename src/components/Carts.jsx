import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/cartSlice";
import TostifyContainer from "./Tostify/TostifyContainer";
import { removeNotify } from "./Tostify/Tostify";
import Checkout from "./Checkout/Checkout";

const Carts = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  console.log("products", products);

  const final = products?.map((item) => {
    return item.product;
  });
 

  console.log("final", final);

  const handleRemove = (productId) => {
    console.log("ProductId to be removed:", productId);
    dispatch(remove(productId));
    removeNotify();
  };

  

  return (
    <div className="wrapper">
      <div className="parent__cart">
        <div className="carts__collections__cartList">
          {final?.map((item) => (
            <div key={item.id} className="carts anim">
              <div className="rating__discount anim">
                <span className="rating "> ⭐:{item.rating} </span>
                <span className="discount ">Price: {item.price}</span>
              </div>

              <img
                src={item.thumbnail}
                alt="image"
                className="cart__image anim"
              />
              <h2 className="title anim" style={{ width: "300px" }}>
                {item.title}
              </h2>

              <button
                className="btn anim"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <Checkout />
      </div>
      <TostifyContainer />
    </div>
  );
};

export default Carts;
