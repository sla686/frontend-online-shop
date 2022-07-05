import { useParams } from "react-router-dom";

import imageNotFound from "../images/imageNotFound.png";
import useProduct from "../features/products/useProduct";

const SingleProduct = () => {
  const { productId } = useParams();
  const product = useProduct(productId);

  // const dispatch = useAppDispatch();

  return (
    <div>
      {product ? (
        <div className="singleProduct">
          <img
            src={product?.images?.[0]}
            //@ts-ignore
            onError={(e) => (e.target.src = imageNotFound)}
            alt="product"
          />
          <h5>{product?.title}</h5>
          <p>{product?.price}$</p>
        </div>
      ) : (
        <div>
          The product does not exist or it's unavailable to recieve the
          product's information!
        </div>
      )}
    </div>
  );
};

export default SingleProduct;
