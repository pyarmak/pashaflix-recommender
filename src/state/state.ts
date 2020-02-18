import {
  MovieWatched,
  MovieWatchlist,
  ShowWatched,
  ShowWatchlist,
  ImgConfig, RecommendedMovie, RecommendedShow, RequestedMovie, RequestedShow,
} from '../models';

export const PAGE_SIZE = 40;

interface IUserInfo {
  movies: {
    ready: boolean;
    watched: MovieWatched[];
    watchlist: MovieWatchlist[];
    recommended: RecommendedMovie[];
    requested: RequestedMovie[];
  };
  shows: {
    ready: boolean;
    watched: ShowWatched[];
    watchlist: ShowWatchlist[];
    recommended: RecommendedShow[];
    requested: RequestedShow[];
  };
}

export interface IState {
  loading: {
    shows: { current: number; total: number };
  };
  userInfo: IUserInfo;
  config?: ImgConfig;
  language: string;
  PAGE_SIZE: number;
}

export const initialState: IState = {
  PAGE_SIZE,
  loading: {
    shows: { current: 0, total: 0 },
  },
  userInfo: {
    movies: {
      ready: false,
      watched: [],
      watchlist: [],
      recommended: [],
      requested: [],
    },
    shows: {
      ready: false,
      watched: [],
      watchlist: [],
      recommended: [],
      requested: [],
    },
  },
  language: 'en',
};
