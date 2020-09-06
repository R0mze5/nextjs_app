import { takeLatest, put } from "redux-saga/effects";
import fetch from "isomorphic-unfetch";
import { tvmazeActions } from "../actions";
import { TvmazeSeasonsGetTriggerActionPayload } from "../types";
import { Action } from "redux-actions";
import { ITvmazeSeason } from "../../../../typings/tvmaze";

export function* tvmazeSeasonsGetWorker(
  action: Action<TvmazeSeasonsGetTriggerActionPayload>,
) {
  const id = action.payload.id;

  if (!id) return;

  const apiUrl = `http://api.tvmaze.com/shows/${id}/seasons`;

  const apiParams = {
    method: "GET",
  };

  const response: Array<ITvmazeSeason> = yield fetch(apiUrl, apiParams).then(
    (serverResponse) => {
      return serverResponse.json();
    },
  );

  yield put(tvmazeActions.tvmazeSeasonsSetAction({ id, seasons: response }));
}

export function* tvmazeSeasonsGetWatcher() {
  yield takeLatest(
    tvmazeActions.tvmazeSeasonsGetTriggerAction,
    tvmazeSeasonsGetWorker,
  );
}
