import React, { useContext } from 'react';
import { Movie } from '../models';
import { useGlobalState } from '../state/store';
import AuthContext from '../utils/AuthContext';
import useIsWatch from '../utils/useIsWatch';
import { LoginButton } from '../components/LoginButton';

interface IWatchButtonProps {
  item: Movie;
}

const WatchButton: React.FC<IWatchButtonProps> = ({ item }) => {
  const {
    actions: {
      addMovieWatched,
      removeMovieWatched,
      addMovieWatchlist,
      removeMovieWatchlist,
    },
  } = useGlobalState();
  const { isWatchlist, isWatched } = useIsWatch();

  const { session } = useContext(AuthContext);

  return (
    <div className="flex justify-around my-8">
      {session ? (
        <>
          {isWatched(item.ids.trakt, 'movie') ? (
            <button
              className="bg-green-400 py-3 px-12 rounded-full text-white font-bold"
              onClick={() => removeMovieWatched(item, session)}
            >
              ✓ Watched
            </button>
          ) : (
            <button
              className="bg-gray-200 py-3 px-12 rounded-full text-gray-700 font-light"
              onClick={() => addMovieWatched(item, session)}
            >
              Watched
            </button>
          )}
          {isWatchlist(item.ids.trakt, 'movie') ? (
            <button
              className="bg-blue-400 py-3 px-12 rounded-full text-white font-bold"
              onClick={() => removeMovieWatchlist(item, session)}
            >
              WatchList
            </button>
          ) : (
            <button
              className="bg-gray-200 py-3 px-12 rounded-full text-gray-700 font-light"
              onClick={() => addMovieWatchlist(item, session)}
            >
              WatchList
            </button>
          )}
        </>
      ) : (
        <LoginButton />
      )}
    </div>
  );
};
export default WatchButton;
