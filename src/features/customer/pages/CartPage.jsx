import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, updateQty, removeItem, clearCart } from "../../../redux/cartSlice";
import { useAuth } from "../../../components/context/AuthContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart } = useSelector((state) => state.cart);
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user?.user_id) {
      dispatch(fetchCart(user.user_id));
    }
  }, [dispatch, user, loading]);

  if (loading) return <div className="p-6">Loading user...</div>;
  if (!user) return <div className="p-6">Please login first</div>;
  if (!cart) return <div className="p-6">Loading cart...</div>;

  const shipping_fee = (cart.subTotal || 0) > 4500 ? 0 : 40;
  const final_total = (cart.grandTotal  || 0)+ shipping_fee;

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-10 text-center min-h-screen flex items-center
        justify-center flex-col">
        <div className="text-4xl mb-3 bg-green-500 py-6 px-5 rounded-full">🛒</div>
        <h2 className="text-2xl font-bold mb-4"> Your Cart is Empty </h2>
        <p className="text-gray-500">Looks like you haven't added anything yet.</p>
        <button
            onClick={() => navigate(-1)}
            className="bg-white px-3 py-2 mt-5 rounded-full shadow cursor-pointer"
          >
            Go Back To Home
          </button>
      </div>
    );
  }

  return (
    <div className="bg-(--light-bg) min-h-screen p-4 md:p-8">
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
        <div className="relative flex items-center justify-center h-14 px-4">
          {/* <button
            onClick={() => navigate(-1)}
            className="absolute left-4 bg-white p-2 rounded-full shadow"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button> */}

          <div className="flex items-start justify-center gap-6 text-sm font-semibold w-fit mx-auto">
            {/* STEP 1 */}
            <div className=" mt-1 flex flex-col items-center ml-5">
              <div className="w-7 h-7 flex items-center justify-center rounded-full bg-[rgb(1,135,144)] text-white">
                1
              </div>
              <span className=" text-[rgb(1,135,144)]">Cart</span>
            </div>

            <div className="w-10 h-0.5 bg-gray-300 mt-3"></div>

            {/* STEP 2 */}
            <div className="mt-1 flex flex-col items-center">
              <div className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-400">
                2
              </div>
              <span className="">Review</span>
            </div>

            <div className="w-10 h-0.5 bg-gray-300 mt-3"></div>

            {/* STEP 3 */}
            <div className="mt-1 flex flex-col items-center">
              <div className="w-7 h-7 flex items-center justify-center rounded-full border-2 border-gray-300 text-gray-400">
                3
              </div>
              <span className=" text-gray-400">Payment</span>
            </div>
          </div>
        </div>
      </div>
      {/* Back Button */}
      <button
        onClick={() => navigate("/customer")}
        className="fixed top-2 left-4 z-50 bg-white shadow-md rounded-full p-2 hover:bg-gray-100"
      >
        <ArrowLeftIcon className="w-6 h-6 text-gray-700" />
      </button>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-10">

        {/* CART ITEMS */}
        <div className="md:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <div key={item.product_id._id} className="flex gap-4 bg-white p-4 rounded-xl shadow-sm">
              <img
                src={item.product_id.images?.[0]?.url}
                className="w-24 h-24 object-cover rounded-lg"
              />

              <div className="flex-1">
                <h3 className="font-bold text-(--dark-teal)">{item.productName}</h3>
                <p className="text-sm text-gray-500">₹{item.price}</p>

                <div className="flex items-center gap-3 mt-2">
                  <button
                    onClick={() =>
                      dispatch(updateQty({
                        user_id: user.user_id,
                        product_id: item.product_id._id,
                        quantity: item.quantity - 1,
                      }))
                    }
                    className="px-3 py-1 bg-red-100 text-red-600 rounded"
                  >
                    −
                  </button>

                  <span className="font-semibold">{item.quantity}</span>

                  <button
                    onClick={() =>
                      dispatch(updateQty({
                        user_id: user.user_id,
                        product_id: item.product_id._id,
                        quantity: item.quantity + 1,
                      }))
                    }
                    className="px-3 py-1 bg-green-100 text-green-700 rounded"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={() =>
                  dispatch(removeItem({ user_id: user.user_id, product_id: item.product_id._id }))
                }
                className="text-red-500 font-semibold hover:underline"
              >
                Remove
              </button>
            </div>
          ))}


        </div>




        {/* order summary */}
        <div className="bg-white p-6 rounded-xl shadow-md h-fit">
          <h2 className="font-bold text-lg mb-4 text-(--dark-teal)">Order Summary</h2>

          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{cart.subTotal?.toFixed(2) || "0.00"}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Tax</span>
            <span>₹{cart.tax?.toFixed(2) || "0.00"}</span>
          </div>

          <div className="flex justify-between mb-2">
            <span>Discount</span>
            <span>₹{cart.discount?.toFixed(2) || "0.00"}</span>
          </div>

          {/* <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span>{shipping_fee === 0 ? "Free" : `₹${shipping_fee}`}</span>
          </div> */}

          <hr className="my-3" />

          <div className="flex justify-between font-bold text-lg text-(--mid-teal)">
            <span>Total</span>
            <span>₹{final_total?.toFixed(2) || "0.00"}</span>
          </div>

          <button
  onClick={() => navigate("/customer/product/reviewcart")}
  className="cursor-pointer w-full bg-blue-500 text-white py-3 rounded-lg mt-4 hover:bg-blue-300 transition"
>
  Place Order
</button>

          <button
            onClick={() => dispatch(clearCart(user.user_id))}
            className="cursor-pointer w-full bg-red-100 text-red-600 py-2 rounded-lg mt-3 hover:bg-red-200 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
