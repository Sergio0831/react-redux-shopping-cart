import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsArrowLeft } from "react-icons/bs";
import styles from "./Cart.module.css";
import CartItem from "./CartItem";
import { clearCart, getTotal } from "./cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(getTotal());
  }, [cart, dispatch]);

  return (
    <section className={styles.cart}>
      <h2>Shopping Cart</h2>
      {cart.cartItems.length === 0 ? (
        <div>
          <p>Cart is empty</p>
          <Link to='/'>
            {" "}
            <BsArrowLeft />
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.cartItems?.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </tbody>
          </table>
          <div className={styles.summary}>
            <button className={styles.clear} onClick={handleClearCart}>
              Clear Cart
            </button>
            <div className={styles.subtotal}>
              <span className={styles.amount}>
                &euro;{cart.cartTotalAmount}
              </span>
              <p>Taxes and shipping calculated at checkout</p>
              <button className={styles.checkout}>Check Out</button>
              <Link to='/'>
                {" "}
                <BsArrowLeft />
                Continue Shopping
              </Link>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
