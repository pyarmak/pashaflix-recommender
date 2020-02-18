import React, { useEffect } from 'react';
import Emoji from '../../components/Emoji';
import ShowsWatchlist from './ShowsWatchlist';
import ShowsWatched from './ShowsWatched';
import { StringParam, useQueryParam } from 'use-query-params';
import Helmet from 'react-helmet';
import { useGlobalState } from '../../state/store';
import MoviesWatchlist from '../movies/MoviesWatchlist';
import MoviesRecommended from '../movies/MoviesRecommended';
import MoviesWatched from '../movies/MoviesWatched';
import ShowsRecommended from './ShowsRecommended';

export default function Shows() {
  const [mode, setMode] = useQueryParam('mode', StringParam);

  const {
    state: {
      userInfo: {
        shows: { watchlist, watched, recommended },
      },
    },
  } = useGlobalState();

  useEffect(() => {
    if (!mode) {
      setMode('watched');
    }
    // eslint-disable-next-line
  }, []);

  const renderContent = (mode: string | undefined) => {
    if (!mode) return;
    switch (mode) {
      case 'watchlist':
        return <ShowsWatchlist />;
      case 'recommended':
        return <ShowsRecommended />;
      case 'watched':
        return <ShowsWatched />;
      default:
        return <ShowsRecommended />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Shows</title>
      </Helmet>
      <div
        className="flex w-full text-gray-600 lg:max-w-xl lg:m-auto"
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <button
          className={`border-b-2 py-2 w-full ${
            mode === 'watchlist' ? 'border-blue-300' : 'border-transparent'
          }`}
          onClick={() => setMode('watchlist')}
        >
          <Emoji emoji="⏱" /> Watchlist ({watchlist.length})
        </button>
        <button
          className={`border-b-2 py-2 w-full ${
            mode === 'watched' ? 'border-blue-300' : 'border-transparent'
          }`}
          onClick={() => setMode('watched')}
        >
          <Emoji emoji="📚" /> Watched ({watched.length})
        </button>
        <button
          className={`border-b-2 py-2 w-full ${
            mode === 'recommended' ? 'border-blue-300' : 'border-transparent'
          }`}
          onClick={() => setMode('recommended')}
        >
          <Emoji emoji="📚" /> Recommended ({recommended.length})
        </button>
      </div>
      <div className="py-3"> {renderContent(mode)} </div>
    </>
  );
}
