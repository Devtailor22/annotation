import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./annotationSlice";
import logger from "redux-logger";
import tableReducer from "./crudTableSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    tableCrud: tableReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
