import { useDispatch, useSelector } from "react-redux";
import Paypal from "../../../Paypal";
import { updateQuantity } from "../../store/cartSlice";

const Checkout = () => {
  const quantity = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  let sum = 0;
   quantity.map((item) => (sum = sum + item.totalPrice));

  const handleCounterAdd = (productId, currentQuantity) => {
    console.log(productId, currentQuantity);
    dispatch(updateQuantity({ productId, quantity: currentQuantity + 1 }));
  };

  const handleCounterSub = (productId, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(updateQuantity({ productId, quantity: currentQuantity - 1 }));
    }
  };

  return (
    <div className="checkout-box-wrapper">
      <div className="checkout-box">
        {quantity?.map((product, i) => (
          <div key={product.id || i} className="checkout__content">
            <p className="product__name">Product: {product.product.title}</p>

            <div className="button__wrapper">
              <button
                className=" btn-circle"
                onClick={() =>
                  handleCounterAdd(product.product.id, product.quantity)
                }
              >
                +
              </button>

              <p> {product.quantity}</p>

              <button
                className=" btn-circle"
                onClick={() =>
                  handleCounterSub(product.product.id, product.quantity)
                }
              >
                -
              </button>
            </div>

            <p className="checkout__price">Price: {product.product.price}</p>
            <p className="checkout__price">
              Total price of product:{product.totalPrice}
            </p>
          </div>
        ))}
        <div>
          <p>overall price is:{sum}</p>
        </div>

        <Paypal rate={sum} />
      </div>
    </div>
  );
};

export default Checkout;
