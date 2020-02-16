import React, { useState, useEffect } from 'react';
import ImageLink from 'components/ImageLink';
import PaginationContainer from 'components/Pagination/PaginationContainer';
import usePagination from 'utils/usePagination';
import { useGlobalState } from 'state/store';
import { RecommendedMovie } from 'models';

const MoviesRecommended: React.FC = () => {
  const [orderedMovies, setOrderedMovies] = useState<RecommendedMovie[]>([]);
  const {
    state: {
      userInfo: {
        movies: { recommended },
      },
    },
  } = useGlobalState();
  const { getItemsByPage } = usePagination(orderedMovies);

  useEffect(() => {
    setOrderedMovies(recommended);
  }, [recommended]);

  return (
    <PaginationContainer items={orderedMovies}>
      <ul className="flex flex-wrap p-2 items-stretch justify-center">
        {getItemsByPage().map(m => (
          <li
            key={m.ids.trakt}
            className="p-2"
            style={{ flex: '1 0 50%', maxWidth: '10em' }}
          >
            <ImageLink
              text={m.title}
              ids={m.ids}
              item={m}
              style={{ minHeight: '13.5em' }}
              type="movie"
            />
          </li>
        ))}
      </ul>
    </PaginationContainer>
  );
};

export default MoviesRecommended;
