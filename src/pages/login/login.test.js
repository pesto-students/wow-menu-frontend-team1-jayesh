import "./matchMedia";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import user from "@testing-library/user-event";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../../store/configureStore";
import Login from "./index";

test("user can login", async () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Login />
      </BrowserRouter>
      ,
    </Provider>,
  );
  const username = screen.getByPlaceholderText("Email/Username");
  const password = screen.getByPlaceholderText("Password");
  userEvent.type(username, "TestUsername");
  userEvent.type(password, "TestPassword");

  userEvent.click(screen.getByRole("button", { name: "" }));

  await waitFor(() => {
    // eslint-disable-next-line no-console
    console.log("Success!");
  });
});
