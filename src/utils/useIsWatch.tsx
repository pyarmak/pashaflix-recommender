import { useGlobalState } from '../state/store';

const useIsWatch = () => {
  const {
    state: { userInfo },
  } = useGlobalState();

  const isWatched = (id: number, type: 'show' | 'movie') => {
    const property = `${type}s` as 'shows' | 'movies';
    return userInfo[property].watched.some(
      (i: any) => i[type].ids.trakt === id,
    );
  };

  const isWatchlist = (id: number, type: 'show' | 'movie') => {
    const property = `${type}s` as 'shows' | 'movies';
    return userInfo[property].watchlist.some(
      (i: any) => i[type].ids.trakt === id,
    );
  };

  const isRequested = (id: number, type: 'show' | 'movie') => {
    const property = `${type}s` as 'shows' | 'movies';
    return userInfo[property].requested.some((i: any) => i.theMovieDbId === id);
  };

  return {
    isWatched,
    isWatchlist,
    isRequested,
  };
};

export default useIsWatch;
