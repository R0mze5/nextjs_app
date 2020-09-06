import { takeLatest, put } from "redux-saga/effects";
import fetch from "isomorphic-unfetch";
import { tvmazeActions } from "../actions";

export function* tvmazeShowsGetWorker() {
  const apiUrl = "http://api.tvmaze.com/shows";

  const apiParams = {
    method: "GET",
  };

  const response = yield fetch(apiUrl, apiParams).then((serverResponse) => {
    return serverResponse.json();
  });

  yield put(tvmazeActions.tvmazeShowsSetAction({ shows: response }));
}

export function* tvmazeShowsGetWatcher() {
  yield takeLatest(
    tvmazeActions.tvmazeShowsGetTriggerAction,
    tvmazeShowsGetWorker,
  );
}
