// import { useDispatch, useSelector } from "react-redux";
// import { remove } from "../store/cartSlice";
// import TostifyContainer from "./Tostify/TostifyContainer";
// import { removeNotify } from "./Tostify/Tostify";
// import Checkout from "./Checkout/Checkout";

// const Carts = () => {
//   const products = useSelector((state) => state.cart);

//   // const uniqueProducts = [...new Set(products)];
//   const dispatch = useDispatch();
//   // console.log("products", products);

//   // const productsName = products.map((item) => item.title);
//   // const productsPrice = products.map((item) => item.price);
//   // console.log("******", products.title, products.price);
//   // console.log("productsName", productsPrice);

//   const handleRemove = (product) => {
//     dispatch(remove(product));
//     removeNotify();
//   };
//   return (
//     <div className="wrapper">
//       <div className="parent__cart">
//         <div className="carts__collections__cartList">
//           {products?.map((item) => (
//             <div key={item.id} className="carts anim">
//               <div className="rating__discount anim">
//                 <span className="rating "> ⭐:{item.rating} </span>
//                 <span className="discount ">Price: {item.price}</span>
//               </div>

//               <img
//                 src={item.images[0]}
//                 alt="image"
//                 className="cart__image anim"
//               />
//               <h2 className="title anim" style={{ width: "300px" }}>
//                 {item.title}
//               </h2>

//               <button
//                 className="btn anim"
//                 onClick={() => handleRemove(item.id)}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}
//         </div>
//         <Checkout uniqueProducts={products} />
//       </div>
//       <TostifyContainer />
//     </div>
//   );
// };

// export default Carts;

import { useDispatch, useSelector } from "react-redux";
import { remove } from "../store/cartSlice";
import TostifyContainer from "./Tostify/TostifyContainer";
import { removeNotify } from "./Tostify/Tostify";
import Checkout from "./Checkout/Checkout";

// ... (same imports)

const Carts = () => {
  const products = useSelector((state) => state.cart);
  console.log("products", products);
  const dispatch = useDispatch();

  const getUniqueProducts = () => {
    const uniqueProducts = [];
    const productQuantities = {};

    for (const item of products) {
      const productId = item.id;

      if (productQuantities[productId] === undefined) {
        // First occurrence of the product
        productQuantities[productId] = 1;
        uniqueProducts.push({ ...item, quantity: 1 });
      } else {
        // Product already exists, update quantity
        productQuantities[productId]++;
        // Find the product in uniqueProducts and update its quantity
        const existingProductIndex = uniqueProducts.findIndex(
          (p) => p.id === productId
        );
        uniqueProducts[existingProductIndex].quantity =
          productQuantities[productId];
      }
    }

    return uniqueProducts;
  };

  const handleRemove = (productId) => {
    dispatch(remove(productId));
    removeNotify();
  };

  const uniqueProducts = getUniqueProducts();

  return (
    <div className="wrapper">
      <div className="parent__cart">
        <div className="carts__collections__cartList">
          {uniqueProducts.map((item) => (
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

              <button
                className="btn anim"
                onClick={() => handleRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <Checkout uniqueProducts={uniqueProducts} />
      </div>
      <TostifyContainer />
    </div>
  );
};

export default Carts;
