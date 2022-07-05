import { useEffect, useState } from "react";

import { Product } from "../../types/products";

const useProduct = (productId: string | undefined) => {
  const [product, setProduct] = useState<Product | undefined>(undefined);
  useEffect(() => {
    if (productId) {
      fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then((data) => data.json())
        .then((data) => {
          // This is a trick because actually the promise isn't rejected even after getting an error!!
          // So, I have to check if my data doesn't have any error!
          if (Object.hasOwn(data, "error")) setProduct(undefined);
          else setProduct(data);
        })
        .catch((err) => {
          console.log(err);
          setProduct(undefined);
        });
    }
  }, [productId]);
  return product;
};

export default useProduct;
