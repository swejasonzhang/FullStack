import { createStore,combineReducers,applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import itemsReducer from "./item";
import cartItemsReducer from "./cartitems";
import reviewsReducer from "./itemReviews";
import categoryReducer from "./category";
import termReducer from "./searchterm";


const rootReducer = combineReducers({
  session: sessionReducer,
  items: itemsReducer,
  cartItems: cartItemsReducer,
  reviews: reviewsReducer,
  category: categoryReducer,
  term: termReducer,
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore; 