import {
  ITvmazeShow,
  TTvmazeShowId,
  ITvmazeSeason,
} from "../../../typings/tvmaze";

export interface TvmazeShowSetActionPayload {
  shows: Array<ITvmazeShow>;
}

export interface TvmazeSeasonsGetTriggerActionPayload {
  id: TTvmazeShowId;
}

export interface TvmazeSeasonsSetActionPayload {
  id: TTvmazeShowId;
  seasons: Array<ITvmazeSeason>;
}
