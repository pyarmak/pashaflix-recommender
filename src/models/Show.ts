import { Ids } from './Ids';

export interface ShowWatched {
  last_updated_at: string;
  last_watched_at: string;
  plays: number;
  reset_at: string;
  listed_at: string;
  seasons: Array<{
    episodes: Array<{
      last_watched_at: string;
      number: number;
      plays: number;
    }>;
    number: number;
  }>;
  show: Show;
  type: 'show';
  progress?: ShowProgress;
  fullSeasons?: Season[];
}

export interface ShowWatchlist {
  id?: number;
  listed_at?: string;
  rank?: number;
  type: 'show';
  show: Show;
}

export type RecommendedShow = {
  ids: Ids;
  title: string;
  year: number;
};

export type RequestedShow = {
  tvDbId: number;
  imdbId: string;
  title: string;
  childRequests: ChildRequests[];
};

export type ChildRequests = {
  title: string;
  approved: boolean;
  markedAsApproved: string;
  requestedDate: string;
  available: boolean;
  markedAsAvailable: string;
  requestedUserId: string;
  denied: boolean;
  seasonRequests: ShowSeasonRequestModel[];
};

export type ShowSeasonRequestModel = {
  seasonNumber: number;
  episodes: ShowSeasonEpisodeRequestModel[];
};

export type ShowSeasonEpisodeRequestModel = {
  episodeNumber: number;
  available: boolean;
  approved: boolean;
  seasonId: number;
  requested: boolean;
};

export type ShowRequestModel = {
  requestAll: boolean;
  latestSeason: boolean;
  firstSeason: boolean;
  tvDbId: number;
  seasons: ShowRequestSeasonModel[];
};

export type ShowRequestSeasonModel = {
  seasonNumber: number;
  episodes: ShowRequestEpisodeModel[];
};

export type ShowRequestEpisodeModel = {
  episodeNumber: number;
};

export interface Show {
  aired_episodes: number;
  airs: {
    day: string;
    time: string;
    timezone: string;
  };
  available_translations: string[];
  certification: string;
  comment_count: number;
  country: string;
  first_aired: string;
  genres: string[];
  homepage: string;
  ids: Ids & {
    tvrage: any;
    tvdb: number;
  };
  language: string;
  network: string;
  overview: string;
  rating: number;
  runtime: number;
  status:
    | 'returning series'
    | 'in production'
    | 'planned'
    | 'canceled'
    | 'ended';
  title: string;
  trailer: string;
  updated_at: string;
  votes: number;
  year: number;
}

interface SmallEpisode {
  ids: Ids;
  number: number;
  season: number;
  title: string;
}

export interface Episode {
  ids: Ids;
  number: number;
  number_abs: 14;
  season: number;
  title: string;
  overview: string;
  available_translations: string[];
  translations: {
    title: string;
    overview: string;
    tagline: string;
    language: string;
  }[];
  completed: boolean;
  comment_count: number;
  first_aired: string;
  rating: number;
  runtime: number;
  updated_at: string;
  votes: string;
  requested?: boolean;
  approved?: boolean;
  available?: boolean;
}

export interface Season {
  episodes: Episode[];
  ids: Ids;
  number: number;
  completed: number;
}

export interface ShowProgress {
  aired: number;
  completed: number;
  hidden_seasons: any[];
  last_episode: SmallEpisode;
  last_watched_at: string;
  next_episode?: SmallEpisode;
  reset_at: string;
  seasons: Season[];
}
