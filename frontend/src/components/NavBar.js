import { GiSmartphone } from "react-icons/gi";
import { BsHandbag } from "react-icons/bs";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import { useSelector } from "react-redux";

const NavBar = () => {
  const cartTotal = useSelector((state) => state.cart.cartTotalQuantity);

  return (
    <nav className={styles.navbar}>
      <Link to='/'>
        <div className={styles.logo}>
          <h2>SmartShop</h2>
          <GiSmartphone />
        </div>
      </Link>
      <Link to='/cart'>
        <div className={styles.bag}>
          <BsHandbag />
          <span className={styles.quantity}>{cartTotal}</span>
        </div>
      </Link>
    </nav>
  );
};

export default NavBar;
