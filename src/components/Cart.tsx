import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  removeItemCart,
  addQuantity,
  removeQuantity,
} from "../features/cart/cartSlice";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";

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
                  <p>Price:</p>
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
                  <p>Total price:</p>
                  <p>{item.price * item.quantity}$</p>
                </div>
                <button onClick={() => onDelete(item.id)}>
                  Remove from Сart
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Your cart is empty!</div>
      )}
    </div>
  );
};

export default Cart;
