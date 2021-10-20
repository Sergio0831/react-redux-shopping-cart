import Loader from "../../components/Loader";
import Product from "./Product";
import { useGetProductsQuery } from "./productsApi";
import styles from "./ProductsList.module.css";

const ProductsList = () => {
  const { data, isLoading } = useGetProductsQuery();

  return (
    <section className={styles.productsList}>
      {isLoading && <Loader />}
      {data &&
        data.map((product) => <Product key={product.id} product={product} />)}
    </section>
  );
};

export default ProductsList;
