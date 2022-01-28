import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer from "./reducers/blogReducer";
import userReducer from "./reducers/userReducer";

const reducer = combineReducers({
    notifications: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
});

const store = createStore(
    reducer,
    applyMiddleware(thunk)
);

store.subscribe(() => {
    const storeNow = store.getState();
    console.debug("Store now:", storeNow);
});

export default store;