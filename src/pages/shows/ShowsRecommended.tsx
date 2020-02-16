import React, { useState, useEffect } from 'react';
import ImageLink from '../../components/ImageLink';
import PaginationContainer from '../../components/Pagination/PaginationContainer';
import usePagination from '../../utils/usePagination';
import { useGlobalState } from '../../state/store';
import { RecommendedShow } from 'models';

const ShowsRecommended: React.FC = () => {
  const [orderedShows, setOrderedShows] = useState<RecommendedShow[]>([]);
  const {
    state: {
      userInfo: {
        shows: { recommended },
      },
    },
  } = useGlobalState();
  const { getItemsByPage } = usePagination(orderedShows);

  useEffect(() => {
    setOrderedShows(recommended);
  }, [recommended]);

  return (
    <div>
      <PaginationContainer items={orderedShows}>
        <ul className="flex flex-wrap p-2 items-stretch justify-center">
          {getItemsByPage().map(m => (
            <li
              key={m.ids.trakt}
              className="p-2"
              style={{ flex: '1 0 50%', maxWidth: '10em' }}
            >
              <ImageLink
                item={m}
                ids={m.ids}
                text={m.title}
                style={{ minHeight: '13.5em' }}
                type="show"
              />
            </li>
          ))}
        </ul>
      </PaginationContainer>
    </div>
  );
};

export default ShowsRecommended;
