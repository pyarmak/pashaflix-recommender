import React, { useEffect } from 'react';
import MoviesWatchlist from './MoviesWatchlist';
import MoviesWatched from './MoviesWatched';
import Emoji from '../../components/Emoji';
import { StringParam, useQueryParam } from 'use-query-params';
import Helmet from 'react-helmet';
import { useGlobalState } from '../../state/store';
import MoviesRecommended from './MoviesRecommended';

export default function Movies() {
  const [mode, setMode] = useQueryParam('mode', StringParam);

  const {
    state: {
      userInfo: { movies },
    },
  } = useGlobalState();

  useEffect(() => {
    if (!mode) {
      setMode('watchlist');
    }
    // eslint-disable-next-line
  }, []);

  const renderContent = (mode: string | undefined) => {
    if (!mode) return;
    switch (mode) {
      case 'watchlist':
        return <MoviesWatchlist />;
      case 'recommended':
        return <MoviesRecommended />;
      case 'watched':
        return <MoviesWatched />;
      default:
        return <MoviesRecommended />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Movies</title>
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
          <Emoji emoji="⏱" /> Pending ({movies.watchlist.length})
        </button>
        <button
          className={`border-b-2 py-2 w-full ${
            mode === 'watched' ? 'border-blue-300' : 'border-transparent'
          }`}
          onClick={() => setMode('watched')}
        >
          <Emoji emoji="📚" /> Watched ({movies.watched.length})
        </button>
        <button
          className={`border-b-2 py-2 w-full ${
            mode === 'recommended' ? 'border-blue-300' : 'border-transparent'
          }`}
          onClick={() => setMode('recommended')}
        >
          <Emoji emoji="📚" /> Recommended ({movies.recommended.length})
        </button>
      </div>
      <div className="py-3">{renderContent(mode)}</div>
    </>
  );
}
