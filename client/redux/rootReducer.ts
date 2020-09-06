import { combineReducers, AnyAction, Reducer } from "redux";
import { HYDRATE } from "next-redux-wrapper";

import { routerReducer } from "connected-next-router";

import { tvmazeReducer } from "./tvmaze";

import { IState } from "../../typings/store";

export const createRootReducer = (): Reducer<IState, AnyAction> => {
  const combinedReducer = combineReducers({
    tvmaze: tvmazeReducer,
    router: routerReducer,
  });

  // после завершения описания типов заменить на IStore
  const reducer: Reducer<IState, AnyAction> = (state, action) => {
    if (action.type === HYDRATE) {
      const nextState = {
        ...state, // use previous state
        ...action.payload, // apply delta from hydration
      };
      // if (state.count) nextState.count = state.count; // preserve count value on client side navigation
      return nextState;
    }

    return combinedReducer(state, action);
  };

  return reducer;
};
