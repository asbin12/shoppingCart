import { useState, useEffect } from "react";
import Paypal from "../../../Paypal";

const Checkout = ({ uniqueProducts }) => {
  const [counters, setCounters] = useState({});
  const [overallPrices, setOverallPrices] = useState(0);


  useEffect(() => {
    const initialCounters = {};
    let totalPrices = 0;

    uniqueProducts.forEach((item) => {
      initialCounters[item.id] = item.quantity;
      totalPrices += item.price * item.quantity;
    });

    setCounters(initialCounters);
    setOverallPrices(totalPrices);
  }, [uniqueProducts]);

  const handleCounterAdd = (productId) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: prevCounters[productId] + 1,
    }));
  };

  const handleCounterSub = (productId) => {
    setCounters((prevCounters) => ({
      ...prevCounters,
      [productId]: Math.max(prevCounters[productId] - 1, 1),
    }));
  };

  0;

  return (
    <div className="checkout-box-wrapper">
      <div className="checkout-box">
        {uniqueProducts?.map((product) => (
          <div key={product.id} className="checkout__content">
            <p className="product__name">Product: {product.title}</p>

            <p className="button__wrapper">
              <button
                className=" btn-circle"
                onClick={() => handleCounterAdd(product.id)}
              >
                +
              </button>
              {counters[product.id]}
              <button
                className=" btn-circle"
                onClick={() => handleCounterSub(product.id)}
              >
                -
              </button>
            </p>

            <p className="checkout__price">Price: {product.price}</p>
            <p className="checkout__price">
              Total price of product:{product.price * counters[product.id]}
            </p>
          </div>
        ))}

        <div>
          <p className="overall__price">Overall Price:{overallPrices}</p>{" "}
        </div>
        {/* <Link to={{ pathname: "paypal", state: { rate: 15 } }}>
          <button className="btn">Checkout</button>
        </Link> */}
        <Paypal rate={overallPrices} />
      </div>
    </div>
  );
};

export default Checkout;
