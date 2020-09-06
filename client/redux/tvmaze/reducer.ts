import { handleActions } from "redux-actions";

import { tvmazeActions } from "./actions";
import { ITvmaze } from "../../../typings/tvmaze";
import { AnyAction } from "redux";

const initialState: ITvmaze = {
  shows: [],
  seasons: {},
};

export const tvmazeReducer = handleActions<ITvmaze, AnyAction>(
  {
    // shows
    [tvmazeActions.tvmazeShowsGetTriggerAction.toString()]: undefined,
    [tvmazeActions.tvmazeShowsSetAction.toString()]: (state, action) => ({
      ...state,
      shows: action.payload.shows,
    }),

    // seasons
    [tvmazeActions.tvmazeSeasonsGetTriggerAction.toString()]: undefined,
    [tvmazeActions.tvmazeSeasonsSetAction.toString()]: (state, action) => ({
      ...state,
      seasons: {
        ...state.seasons,
        [action.payload.id]: action.payload.seasons,
      },
    }),
  },
  initialState,
);
