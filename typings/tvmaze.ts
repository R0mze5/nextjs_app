export type TTvmazeShowId = number;

export interface ITvmazeSeason {
  id: number;
  image: {
    medium: string;
    original: string;
  };
  url: string;
  name: string;
  type: string;
  language: string;
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  weight: number;
  webChannel: null;
  summary: string;
  updated: number;
}

interface ITvmazeSeasons {
  [key: number]: Array<ITvmazeSeason>;
}

export interface ITvmazeShow {
  id: TTvmazeShowId;
  image: {
    medium: string;
    original: string;
  };
  url: string;
  name: string;
  type: string;
  language: string;
  status: string;
  runtime: number;
  premiered: string;
  officialSite: string;
  weight: number;
  webChannel: null;
  summary: string;
  updated: number;
}

export interface ITvmaze {
  shows: Array<ITvmazeShow>;
  seasons: ITvmazeSeasons;
}
