// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";

// const Paypal = () => {
//   const [paypalClick, setPaypalClick] = useState(false);
//   const location = useLocation();

//   // Access the state object from the location
//   // const { state } = location;
//   const rate = location?.state?.rate;

//   useEffect(() => {
//     window.paypal
//       .Buttons({
//         createOrder: (data, actions, err) => {
//           return actions.order.create({
//             intent: "CAPTURE",
//             purchase_units: [
//               {
//                 description: "Business Plan",
//                 amount: {
//                   currency_code: "USD",
//                   value: rate,
//                 },
//               },
//             ],
//           });
//         },
//         onApprove: async (data, actions) => {
//           const order = await actions.order.capture();
//         },
//       })
//       .render("#paypal__content");
//   }, []);

//   return (
//     <div>
//       <div className="form__input--section">
//         <button
//           className={"button__blue button__style paypal__button"}
//           value="submit"
//           onClick={() => setPaypalClick(true)}
//         >
//           Login
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Paypal;

import { useEffect, useRef } from "react";
import { successfulCheckout } from "./src/components/Tostify/Tostify";
import TostifyContainer from "./src/components/Tostify/TostifyContainer";

const Paypal = (rate) => {
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Business Plan",
                amount: {
                  currency_code: "USD",
                  value: rate,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          successfulCheckout();
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render("#paypal__content");
    console.log("rate: " + rate);
  }, []);

  return (
    <div>
      <div id="paypal__content" />
      <div className="form__input--section">
        {/* <button
          className={"button__blue button__style paypal__button"}
          value="submit"
          onClick={() => setPaypalClick(true)}
        >
          Login
        </button> */}
        <TostifyContainer />
      </div>
    </div>
  );
};

export default Paypal;
