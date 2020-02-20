import { useGlobalState } from '../state/store';
import { ChildRequests, RequestedMovie, RequestedShow } from '../models';

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

  const isAvailable = (id: number, type: 'show' | 'movie') => {
    const property = `${type}s` as 'shows' | 'movies';
    const data = userInfo[property].requested;
    const isShowAvailable = (shows: RequestedShow[]) => {
      return shows.some((i: RequestedShow) =>
        i.childRequests.some((j: ChildRequests) => j.available),
      );
    };
    const isMovieAvailable = (movies: RequestedMovie[]) => {
      return movies.some(
        (i: RequestedMovie) => i.theMovieDbId === id && i.available,
      );
    };
    return type === 'movie'
      ? isMovieAvailable(data as RequestedMovie[])
      : isShowAvailable(data as RequestedShow[]);
  };

  // const isApproved = (id: number, type: 'show' | 'movie') => {
  //   const property = `${type}s` as 'shows' | 'movies';
  //   return userInfo[property].requested.some((i: any) => i.theMovieDbId === id);
  // };
  //
  // const isDenied = (id: number, type: 'show' | 'movie') => {
  //   const property = `${type}s` as 'shows' | 'movies';
  //   return userInfo[property].requested.some((i: any) => i.theMovieDbId === id);
  // };

  return {
    isWatched,
    isWatchlist,
    isRequested,
    isAvailable,
  };
};

export default useIsWatch;
