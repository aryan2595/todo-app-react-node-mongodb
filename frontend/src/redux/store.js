import { configureStore } from "@reduxjs/toolkit"
import thunk from "redux-thunk";
import reducer from "./reducers";


const store = configureStore({
  reducer,
  middlewere:()=>[thunk]
})

export default store;