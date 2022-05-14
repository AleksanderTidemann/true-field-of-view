import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { preloadedState } from "./testData";
import reducer from "../store/reducers";
import api from "../store/api/api-middleware";

const storeForTests = configureStore({
  reducer,
  middleware: [...getDefaultMiddleware(), api],
  preloadedState,
});

const reduxProvider = ({ children }) => (
  <Provider store={storeForTests}>{children}</Provider>
);

const customRender = (component, options) =>
  render(component, { wrapper: reduxProvider, ...options });

export default customRender;
