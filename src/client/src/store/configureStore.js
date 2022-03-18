import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducers";

// I need to create a custom API middleware.

export default function () {
  return configureStore({ reducer, middleware: [...getDefaultMiddleware()] });
}
