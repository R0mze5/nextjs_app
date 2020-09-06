import { createStore, applyMiddleware, compose, StoreEnhancer } from "redux";
import { MakeStore, createWrapper, Context } from "next-redux-wrapper";
import createSagaMiddleware from "redux-saga";
import { createRootReducer } from "./rootReducer";
import { rootSaga } from "./rootSaga";
// import Router from "next/router";
import { IState, SagaStore } from "../../typings/store";
// import { AppContext } from "next/app";
// import { format } from "url";

import { composeWithDevTools } from "redux-devtools-extension";
import {
  createRouterMiddleware,
  // initialRouterState,
} from "connected-next-router";

const reducer = createRootReducer();

export const makeStore: MakeStore<IState> = (context: Context) => {
  // 0: Create initial State

  // const { asPath, pathname, query } =
  //   (context as AppContext).ctx || Router.router || {};

  // console.log(Router.router);
  // console.log({ asPath, pathname, query });

  // let initialState;

  // if (asPath) {
  //   const url = format({ pathname, query });
  //   initialState = {
  //     router: initialRouterState(url, asPath),
  //   };
  // }

  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware();
  const routerMiddleware = createRouterMiddleware();

  let storeEnhancer: StoreEnhancer;

  const middlewares = [sagaMiddleware, routerMiddleware];

  if (process.env.NODE_ENV === "production") {
    storeEnhancer = compose(applyMiddleware(...middlewares));
  } else {
    storeEnhancer = composeWithDevTools(applyMiddleware(...middlewares));
  }

  // 2: Add an extra parameter for applying middleware:
  const store: SagaStore = createStore(
    reducer,
    /* initialState, */ storeEnhancer,
  );

  // 3: Run your sagas on server

  store.runSaga = () => {
    // Avoid running twice
    if (store.sagaTask) return;
    store.sagaTask = sagaMiddleware.run(rootSaga);
  };

  // store.stopSaga = async () => {
  //   // Avoid running twice
  //   if (!store.saga) return;
  //   store.dispatch(END);
  //   await store.saga.done;
  //   store.saga = null;
  // };

  // store.execSagaTasks = async (isServer, tasks) => {
  //   // run saga
  //   store.runSaga();
  //   // dispatch saga tasks
  //   tasks(store.dispatch);
  //   // Stop running and wait for the tasks to be done
  //   await store.stopSaga();
  //   // Re-run on client side
  //   if (!isServer) {
  //     store.runSaga();
  //   }
  // };

  // // Initial run
  store.runSaga();

  // 4: now return the store:
  return store;
};

export const wrapper = createWrapper<IState>(makeStore, { debug: false });
