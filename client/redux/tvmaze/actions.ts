import { createAction } from "redux-actions";
import {
  TvmazeShowSetActionPayload,
  TvmazeSeasonsGetTriggerActionPayload,
  TvmazeSeasonsSetActionPayload,
} from "./types";

// shows

const tvmazeShowsGetTriggerAction = createAction(
  "tvmaze/SHOWS->GET_TRIGGER",
  () => ({}),
);

const tvmazeShowsSetAction = createAction<
  TvmazeShowSetActionPayload,
  TvmazeShowSetActionPayload
>("tvmaze/SHOWS->SET", ({ shows }) => ({ shows }));

// seasons

const tvmazeSeasonsGetTriggerAction = createAction<
  TvmazeSeasonsGetTriggerActionPayload,
  TvmazeSeasonsGetTriggerActionPayload
>("tvmaze/SEASONS->GET_TRIGGER", ({ id }) => ({ id }));

const tvmazeSeasonsSetAction = createAction<
  TvmazeSeasonsSetActionPayload,
  TvmazeSeasonsSetActionPayload
>("tvmaze/SEASONS->SET", ({ id, seasons }) => ({ id, seasons }));

export const tvmazeActions = {
  // shows
  tvmazeShowsGetTriggerAction,
  tvmazeShowsSetAction,
  // seasons
  tvmazeSeasonsGetTriggerAction,
  tvmazeSeasonsSetAction,
};
