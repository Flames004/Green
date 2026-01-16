import { Home, ShoppingBag } from "lucide-react";
import CartCard from "../components/CartCard";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios"
import { Loader } from "../components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../redux/cartSlice";

const Cart = () => {

  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items || []);
  const loading = useSelector((state) => state.cart.loading);

  useEffect(() =>{
    dispatch(getCart());
  },[dispatch]);

    if(loading){
      return <div className="flex items-center min-h-screen mx-auto justify-center"><Loader /></div>;
    }

  return (
    <div className="min-h-screen  mx-auto pb-24">
      <div
        className="flex items-center justify-between gap-2 sm:gap-3 px-3 py-4 sm:p-5 border-b border-gray-200">
        <Link to="/" ><Home className="text-emerald-800" size={22}  /></Link>
        <h1 className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-800">
          Shopping Cart
        </h1>
        <Link to="/checkout/cart"><ShoppingBag className="text-blue-800" size={22}  /></Link>
      </div>

      <div className=" flex flex-col md:flex-row gap-5 md:gap-20 p-0 md:p-10 ">
       
        <div className="md:min-w-2xl max-w-lg flex-1">
          {items.map((item) =>(
             <CartCard key={item._id} name={item.productId.name} image={item.productId.thumbnail.url} title={item.productId.title} price={item.productId.price}  quantity={item.quantity} size={item.productId.size} productId={item.productId._id}/>
          ))}
           
            


        </div>
        <div className="md:w-96  bg-white p-4 sm:p-6 lg:p-6 shadow-md md:h-fit md:rounded">
            <h1 className="font-medium">Order Summary</h1>
            <div className="flex justify-between mt-4 border-b border-gray-300 pb-4">
                <div className="flex flex-col gap-2 mt-2">
                    <p className="p">Subtotal</p>
                    <p className="p">Shipping</p>
                    <p className="p">Tax</p>
                </div>
                <div className="flex flex-col items-start gap-2 mt-2">
                    <p className="font-medium">404</p>
                    <p className="font-medium">40</p>
                    <p className="font-medium">4</p>
                </div>
            </div>
            <div className="flex items-center justify-between mt-4">
                <span className="font-semibold md:text-lg">Total Amount</span>
                <span className="font-semibold md:text-lg">448</span>
            </div>

        <button className="w-full bg-emerald-800 p-2 rounded mt-2 md:mt-4 text-white ">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
