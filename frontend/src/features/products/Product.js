import { useDispatch } from "react-redux";
import { addToCart } from "../cart/cartSlice";
import styles from "./Product.module.css";
import "react-toastify/dist/ReactToastify.min.css";
import { useHistory } from "react-router";

const Product = ({ product }) => {
  const { name, description, price, image } = product;
  const dispatch = useDispatch();
  const history = useHistory();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    history.push("/cart");
  };

  return (
    <article className={styles.product}>
      <h2 className={styles.name}>{name}</h2>
      <img className={styles.img} src={image} alt={name} />
      <span className={styles.price}>&euro;{price}</span>
      <h4 className={styles.decr}>{description}</h4>
      <button
        className={styles.add}
        type='button'
        onClick={() => handleAddToCart(product)}
      >
        Add To Cart
      </button>
    </article>
  );
};

export default Product;
