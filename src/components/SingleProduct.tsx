import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Product } from "../types/products";

const SingleProduct = () => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const { productId } = useParams();
  //@ts-ignore
  // const products = useSelector((state) => state.products);
  // //@ts-ignore
  // setProduct(products.filter((product) => product.id === productId)[0]);

  useEffect(() => {
    fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
      .then((data) => data.json())
      .then((data) => setProduct(data));
  }, [productId]);

  return (
    <div>
      {product ? (
        <div>
          <img src={product.images[0]} alt="product" />
          <h5>{product.title}</h5>
          <p>{product.price}$</p>
        </div>
      ) : (
        <div>The product does not exist!</div>
      )}
    </div>
  );
};

export default SingleProduct;
