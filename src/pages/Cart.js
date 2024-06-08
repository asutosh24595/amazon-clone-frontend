import { Checkbox } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import primeLogo from "../assets/primeLogo.jpg";
import { amazonSliceActions } from "../store/AmazonSlice";

export default function Cart() {
  const cartItems = useSelector((state) => state.amazon.items);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full p-4">
      <div className="lg:container w-full mx-auto h-auto grid md:grid-cols-5 lg:gap-5 gap-2">
        <div className="w-full bg-white px-4 md:col-span-4">
          <div className="flex justify-between items-center font-titleFont border-b-[1px] border-b-gray-400 py-3">
            <h2 className="md:text-3xl text-xl font-medium">
              {cartItems.length === 0
                ? "Your Amazon Cart is empty."
                : "Shopping Cart"}
            </h2>
            <h4 className="md:text-xl text-base mr-4">
              {" "}
              {cartItems.length === 0 ? "" : "Price"}
            </h4>
          </div>
          <div>
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="w-full border-b-[1px] border-b-gray-300 p-4 flex items-center gap-6"
              >
                <div className="w-1/5">
                  <img
                    className="w-full h-44 object-contain"
                    src={item.image}
                    alt="cartItem"
                  />
                </div>
                <div className="flex flex-grow items-start justify-between">
                  <div className="flex flex-col w-4/5">
                    <h2 className="md:text-lg text-base mb-2">{item.title}</h2>
                    <p className="text-blue-900 text-xs">In Stock</p>
                    <p className="text-xs">
                      <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
                      This is a gift{" "}
                      <span className="text-blue-900 cursor-pointer hover:underline hover:text-orange-700 hidden md:inline">
                        Learn more
                      </span>
                    </p>
                    <div className="lg:flex items-center gap-4">
                      <div
                        className="lg:bg-[#F0F2F2] flex items-center justify-center gap-1 md:w-24 w-10 py-1
                    text-center drop-shadow-lg rounded-md"
                      >
                        <p className="md:inline hidden">Qty: </p>
                        <p
                          className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                          onClick={() =>
                            dispatch(
                              amazonSliceActions.removeFromCart({
                                id: item.id,
                              })
                            )
                          }
                        >
                          -
                        </p>
                        <p>{item.quantity}</p>
                        <p
                          className="cursor-pointer bg-gray-200 px-1 rounded-md hover:bg-gray-400 duration-300"
                          onClick={() =>
                            dispatch(
                              amazonSliceActions.addToCart({
                                id: item.id,
                              })
                            )
                          }
                        >
                          +
                        </p>
                      </div>
                      <p className="text-xs flex gap-4 text-blue-900 mt-4">
                        <span
                          className="cursor-pointer hover:underline"
                          onClick={() =>
                            dispatch(
                              amazonSliceActions.deleteItem({
                                id: item.id,
                              })
                            )
                          }
                        >
                          Delete
                        </span>
                        <span className="cursor-pointer hover:underline">
                          Save for later
                        </span>
                        <span className="cursor-pointer hover:underline hidden lg:inline">
                          Compare with similar items
                        </span>
                        <span className="cursor-pointer hover:underline hover:text-orange-700 hidden lg:inline">
                          Share
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="py-4 text-end hidden md:block">
              <p>
                Subtotal (
                {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                items):{" "}
                <span className="text-md font-semibold">
                  ${totalPrice.toFixed(2)}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {cartItems.length > 0 && (
            <div className="w-full h-40 bg-white">
              <div className="flex flex-col p-2">
                <p className="lg:text-sm md:text-[12px]">
                  Subtotal (
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}{" "}
                  items):{" "}
                  <span className="text-md font-semibold">
                    ${totalPrice.toFixed(2)}
                  </span>
                </p>
                <div className="flex items-center">
                  <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 18 } }} />
                  <p className="lg:text-xs sm:text-xs md:text-[10px]">This order contains a gift</p>
                </div>
                <div className="">
                <button
                  className="w-full font-titleFont font-medium bg-gradient-to-tr from-yellow-400
                to-yellow-200 border hover:from-yellow-300 hover:to-yellow-400 border-yellow-500 hover:border-yellow-700
                active:bg-gradient-to-bl active:from-yellow-400 active:to-yellow-500 duration-200 py-1.5 rounded-2xl md:text-[8px] lg:text-sm  mt-3 "
                >
                  Proceed to checkout
                </button>
                </div>
              </div>
            </div>
          )}
          <div className="w-full h-40 bg-white lg:flex items-center justify-center hidden">
            <div className="-mt-20">
              <img className="w-20 h-20" src={primeLogo} alt="" />
            </div>
            <div className="flex flex-col items-start gap-3">
              <p className="text-xs font-bold w-36">
                Free fast delivery. No order minimum. Exclusive savings. Start
                your 30-day free trial of Prime.
              </p>
              <button className="text-sm border border-black p-1.5 rounded-2xl">
                Join Prime
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
