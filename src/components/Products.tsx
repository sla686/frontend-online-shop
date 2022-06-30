import { useState } from "react";

import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import { fetchProducts } from "../features/products/productsSlice";

const Product = () => {
  const dispatch = useAppDispatch();
  const productsList = useAppSelector((state: RootState) => state.products);
  const [page, setPage] = useState(1);

  const limit = 10;

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
      <h2>List of products:</h2>
      <div className="products__list">
        {/* @ts-ignore */}
        {productsList.map((item) => (
          <div key={item.id} className="products__item">
            <img src={item.images[0]} alt="" />
            <h5>{item.title}</h5>
            <p>{item.price}$</p>
          </div>
        ))}
      </div>
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
    </>
  );
};

export default Product;
