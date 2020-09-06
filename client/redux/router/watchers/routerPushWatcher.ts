import { takeEvery, put } from "redux-saga/effects";

import { Action } from "redux-actions";

import { push } from "connected-next-router";

import { routerActions } from "../actions";
import { IRouterPushTriggerActionPayload } from "../types";

function* routerPushWorker(action: Action<IRouterPushTriggerActionPayload>) {
  const { payload } = action;

  const url = payload.path.toLowerCase();
  yield put(push(url));
}

export function* routerPushWatcher() {
  yield takeEvery(routerActions.routerPushTriggerAction, routerPushWorker);
}
