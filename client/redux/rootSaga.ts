import { fork, call, all } from "redux-saga/effects";

import { tvmazeWatchers } from "./tvmaze";
import { routerWatchers } from "./router";

const watchers = [...tvmazeWatchers, ...routerWatchers];

export function* rootSaga() {
  yield call(console.log, "client saga started");

  yield all(
    watchers.map((watcher) => {
      return fork(watcher);
    }),
  );
}
