import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  removeItemCart,
  addQuantity,
  removeQuantity,
} from "../features/cart/cartSlice";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

const Cart = () => {
  const dispatch = useAppDispatch();
  const cartList = useAppSelector((state) => state.cart.products);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const cartList = useAppSelector((state) => state.cart);
  // }, [cart]);
  const onDelete = (id: number) => {
    dispatch(removeItemCart(id));
  };

  const onChangeQuantity = (id: number, input: "more" | "less") => {
    if (input === "more") {
      dispatch(addQuantity(id));
    } else if (input === "less") {
      dispatch(removeQuantity(id));
    }
  };

  return (
    <div>
      {cartList.length ? (
        <div>
          <h2>Items in the cart: </h2>
          <div className="cart__list">
            {/* @ts-ignore */}
            {cartList.map((item) => (
              <div key={item.id} className="cart__item">
                <img
                  src={item.images[0]}
                  alt="product"
                  onClick={() => navigate(`../products/${item.id}`)}
                />
                <h5
                  className="cart__item__title"
                  onClick={() => navigate(`../products/${item.id}`)}
                >
                  {item.title}
                </h5>
                <div>
                  <LocalOfferIcon fontSize="large" />
                  <p>{item.price}$</p>
                </div>
                <div className="cart__quantity">
                  <p>Quantity: </p>
                  <div>
                    <IconButton
                      aria-label="increate quantity"
                      onClick={() => onChangeQuantity(item.id, "less")}
                      size="large"
                    >
                      <ChevronLeft fontSize="large" />
                    </IconButton>
                    <p>{item.quantity}</p>
                    <IconButton
                      aria-label="decrease quantity"
                      onClick={() => onChangeQuantity(item.id, "more")}
                      size="large"
                    >
                      <ChevronRight fontSize="large" />
                    </IconButton>
                  </div>
                </div>
                <div>
                  <p>Total:</p>
                  <p>{item.price * item.quantity}$</p>
                </div>
                <IconButton
                  aria-label="remove the item from the cart"
                  onClick={() => onDelete(item.id)}
                  size="large"
                >
                  <RemoveShoppingCartIcon fontSize="large" />
                </IconButton>
              </div>
            ))}
            <div>
              <h2>
                Total price is{" "}
                {cartList
                  .map((el) => el.price * el.quantity)
                  .reduce((prev, cur) => prev + cur, 0)}
                $
              </h2>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>Your cart is empty!</h2>
          <h2>Start shopping at the products page!</h2>
        </div>
      )}
    </div>
  );
};

export default Cart;
