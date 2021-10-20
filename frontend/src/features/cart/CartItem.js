import { useDispatch } from "react-redux";
import styles from "./CartItem.module.css";
import { addToCart, decreaseCarItem, removeFromCart } from "./cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { name, image, price, quantity, description } = item;
  const total = price * quantity;

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseItem = (item) => {
    dispatch(decreaseCarItem(item));
  };

  const handleIncreaseItem = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <tr>
      <th className={styles.product}>
        <img className={styles.img} src={image} alt={name} />
        <div>
          <p className={styles.name}>{name}</p>
          <p className={styles.description}>{description}</p>
          <button
            className={styles.remove}
            onClick={() => handleRemoveItem(item)}
          >
            Remove
          </button>
        </div>
      </th>
      <th className={styles.price}>&euro;{price}</th>
      <th>
        <div className={styles.quantity}>
          <button onClick={() => handleDecreaseItem(item)}>-</button>
          <span className={styles.count}>{quantity}</span>
          <button onClick={() => handleIncreaseItem(item)}>+</button>
        </div>
      </th>
      <th>&euro;{total.toFixed(2)}</th>
    </tr>
  );
};

export default CartItem;
