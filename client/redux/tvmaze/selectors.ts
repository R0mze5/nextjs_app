import { IState } from "../../../typings/store";
import { ITvmazeShow, TTvmazeShowId } from "../../../typings/tvmaze";

export const getTvmazeShows = (state: IState): Array<ITvmazeShow> =>
  state.tvmaze.shows.slice(0, 20) || [];

export const getTvmazeSeasonsByShowId = (
  state: IState,
  showId: TTvmazeShowId,
): Array<ITvmazeShow> => state.tvmaze.seasons[showId] || null;

export const tvmazeSelectors = { getTvmazeShows, getTvmazeSeasonsByShowId };
