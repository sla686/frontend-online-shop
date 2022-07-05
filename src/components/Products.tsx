import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import {
  fetchProducts,
  deleteProduct,
  deleteProductAPI,
} from "../features/products/productsSlice";
import { addItemCart } from "../features/cart/cartSlice";
import avatarNotFound from "../images/imageNotFound.png";

const Product = () => {
  const [page, setPage] = useState(1);
  const [admin, setAdmin] = useState(false);
  const [logged, setLogged] = useState(false);

  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state: RootState) => state.products);
  const currentUser = useAppSelector((state) => state.currentUser.currentUser);

  const onDelete = (id: number) => {
    dispatch(deleteProduct(id));
    dispatch(deleteProductAPI(id));
  };

  const onAdd = (productId: number) => {
    // const existingItem = productsList.find((item) => item.id === id);
    if (productId) {
      fetch(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then((data) => data.json())
        .then((data) => {
          // This is a trick because actually the promise isn't rejected even after getting an error!!
          // So, I have to check if my data doesn't have any errors!
          if (Object.hasOwn(data, "error")) console.log("Error occured!");
          else dispatch(addItemCart(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const navigate = useNavigate();
  const limit = 10;

  useEffect(() => {
    if (currentUser) {
      setLogged(true);
      if (currentUser.role === "admin") {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
    } else setLogged(false);
  }, [currentUser]);

  const onChangePage = (input: "left" | "right") => {
    let dispatchCheck = false;
    if (page < 10 && input === "right") {
      setPage(page + 1);
      dispatchCheck = true;
    } else if (page > 1 && input === "left") {
      setPage(page - 1);
      dispatchCheck = true;
    }

    if (dispatchCheck)
      dispatch(
        fetchProducts({
          offset: page * limit,
          limit: limit,
        })
      );
  };

  return (
    <>
      {logged ? (
        <h2>You are logged in as {currentUser?.name}</h2>
      ) : (
        <h2>You are not logged in! You can log in on the profile page!</h2>
      )}
      {admin && <p>You can edit an item by opening item's page!</p>}
      <h2>List of products:</h2>
      <div className="products__number">
        <IconButton
          aria-label="go to the previous page"
          onClick={() => onChangePage("left")}
          size="large"
        >
          <ChevronLeft fontSize="large" />
        </IconButton>
        <p>{page}</p>
        <IconButton
          aria-label="go to the next page"
          onClick={() => onChangePage("right")}
          size="large"
        >
          <ChevronRight fontSize="large" />
        </IconButton>
      </div>
      <div className="products__list">
        {/* ts-ignore */}
        {productsList.map((item) => (
          <div key={item.id} className="products__item">
            <div onClick={() => navigate(`${item.id}`)}>
              <img
                src={item.images[0]}
                onError={(e) => {
                  //@ts-ignore
                  e.target.src = avatarNotFound;
                }}
                alt="product"
              />
              <h5>{item.title}</h5>
              <p>{item.price}$</p>
            </div>
            <div>
              <button onClick={() => onAdd(item.id)}>Add to Сart</button>
              {admin && (
                <button onClick={() => onDelete(item.id)}>Remove item</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Product;
