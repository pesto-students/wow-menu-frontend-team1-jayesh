import io from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./URL";
import { setOrder } from "../store/reducers/orderReducer";

const socket = io.connect(BASE_URL);
export default function CustomerSocket() {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.order);
  useEffect(() => {
    socket.on(`${orders.id}`, (data) => {
      dispatch(setOrder(data));
    });
  }, [socket]);
}
