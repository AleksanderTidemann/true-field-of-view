import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { preloadedState } from "./testData";
import reducer from "../store/reducers";
import api from "../store/api/api-middleware";

//testStateEyepiece
//testStateCamera
// or just return the state.

const customRender = (component, options) => {
  const store = configureStore({
    reducer,
    middleware: [...getDefaultMiddleware(), api],
    preloadedState,
  });

  const reduxProvider = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  const element = render(component, {
    wrapper: reduxProvider,
    ...options,
  });

  return { element, store };
};

export default customRender;
