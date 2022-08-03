import { useDispatch, useSelector } from "react-redux";
import MenuCard from "./MenuCard";
import {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from "../../../redux/reducers/ordersReducer";

function Menu({ items, onClick }) {
  const orders = useSelector((state) => state.orderCart.orders);
  const dispatch = useDispatch();
  const handleInc = (item) => {
    // eslint-disable-next-line
    console.log(orders.findIndex((order) => order.id === item.id));
    if (orders.findIndex((order) => order.id === item.id) === -1) {
      dispatch(addToCart(item));
    } else {
      dispatch(increaseQuantity(item));
    }
  };
  const handleDec = (item) => {
    const removeOrder = orders.find((order) => order.id === item.id);
    if (removeOrder.quantity === 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decreaseQuantity(item));
    }
  };

  return (
    <div className="mt-4 mb-36">
      <div>
        {items.map((item) => (
          <MenuCard
            key={item.id}
            className="my-2"
            id={item.id}
            name={item.name}
            desc={item.desc}
            price={item.price}
            waitingTime={item.waitingTime}
            qty={item.qty}
            onInc={() => handleInc(item)}
            onDec={() => handleDec(item)}
            img={item.img}
            onClick={() => onClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

export default Menu;
