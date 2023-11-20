import { createStore,combineReducers,applyMiddleware,compose } from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import itemsReducer from "./item";


const rootReducer = combineReducers({
  session: sessionReducer,
  items: itemsReducer,
  counterOfItems: (state = 0, action) => {
    switch (action.type) {
      case 'INCREMENT_COUNTER':
        return state + action.payload; 
      case 'DECREMENT_COUNTER':
        return state - action.payload;
      default:
        return state;
    }
  },
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