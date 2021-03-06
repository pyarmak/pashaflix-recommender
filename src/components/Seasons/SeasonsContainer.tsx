import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  getSeasonsApi,
  getSeasonEpisodesApi,
  getProgressApi,
} from '../../utils/api';
import AuthContext from '../../utils/AuthContext';
import Seasons from './Seasons';
import ModalContext from '../../utils/ModalContext';
import {
  Show,
  ShowProgress,
  Season,
  Episode,
  ShowWatched,
  ShowSeasonEpisodeRequestModel,
} from '../../models';
import { useGlobalState } from '../../state/store';

interface ISeasonsContainerProps {
  show: Show;
  showId: number;
}

const SeasonsContainer: React.FC<ISeasonsContainerProps> = ({
  show,
  showId,
}) => {
  const [selectedSeason, setSelectedSeason] = useState<Season>();
  const [unTrackedProgress, setUnTrackedProgress] = useState<ShowProgress>();
  const [unTrackedSeasons, setUnTrackedSeasons] = useState<Season[]>([]);
  const [localShow, setLocalShow] = useState<ShowWatched>();
  const { session } = useContext(AuthContext);
  const { toggle } = useContext(ModalContext);
  const {
    state: {
      userInfo: {
        shows: { watched, requested },
      },
    },
    actions: {
      addEpisodeWatched: addEpisodeWatchedAction,
      removeEpisodeWatched: removeEpisodeWatchedAction,
      addSeasonWatched: addSeasonWatchedAction,
      removeSeasonWatched: removeSeasonWatchedAction,
    },
  } = useGlobalState();

  useEffect(() => {
    if (!unTrackedProgress || !requested || requested.length < 1) return;
    for (
      let iseason = 0;
      iseason < unTrackedProgress.seasons.length;
      iseason++
    ) {
      let season = unTrackedProgress.seasons[iseason];
      let seasonId = season.number;
      if (!seasonId || seasonId === 0) continue;
      for (let iepisode = 0; iepisode < season.episodes.length; iepisode++) {
        let episode = season.episodes[iepisode];
        let episodeId = episode.number;
        let request = requested.find(j => {
          return j.tvDbId === show.ids.tvdb;
        });
        if (!request) continue;
        let requestedEpisodes = [] as ShowSeasonEpisodeRequestModel[];
        for (let ichild = 0; ichild < request.childRequests.length; ichild++) {
          let childRequest = request.childRequests[ichild];
          childRequest.seasonRequests.forEach(i => {
            i.episodes.forEach(k => {
              if (k.requested) requestedEpisodes.push(k);
            });
          });
        }
        let res = requestedEpisodes.find(
          i => i.episodeNumber === episodeId && i.seasonId === seasonId,
        );
        if (res) {
          episode.requested = res.requested;
          episode.approved = res.approved;
          episode.available = res.available;
        }
      }
    }
    setUnTrackedProgress(unTrackedProgress);
  }, [requested, show, unTrackedProgress]);

  const fullShowFn = useCallback(
    () => watched.find(w => w.show.ids.trakt === +showId),
    [watched, showId],
  );

  useEffect(() => {
    setLocalShow(fullShowFn());
    setSelectedSeason(undefined);
  }, [fullShowFn, showId, watched]);

  useEffect(() => {
    if (fullShowFn()) {
      return;
    }
    getSeasonsApi(showId).then(({ data }) => setUnTrackedSeasons(data));
    if (session) {
      getProgressApi(session, showId).then(({ data }) =>
        setUnTrackedProgress(data),
      );
    }
  }, [session, showId, fullShowFn]);

  useEffect(() => {
    if (!selectedSeason) {
      return;
    }
    if (selectedSeason && selectedSeason.episodes) {
      return;
    }
    getSeasonEpisodesApi(showId, selectedSeason.number).then(({ data }) => {
      if (!localShow) {
        setUnTrackedSeasons(us => {
          const i = us.findIndex(s => s.number === selectedSeason.number);
          us[i].episodes = data;
          return [...us];
        });
      } else {
        setLocalShow(ls => {
          if (!ls) {
            return;
          }
          const i = ls!.fullSeasons!.findIndex(
            s => s.number === selectedSeason.number,
          );
          ls!.fullSeasons![i].episodes = data;
          return { ...ls };
        });
      }
    });
  }, [selectedSeason, showId, localShow]);

  const localShowFullSeasonsRef = localShow?.fullSeasons;
  const localShowNextEpisodeRef = localShow?.progress?.next_episode;
  useEffect(() => {
    if (!localShowFullSeasonsRef || !localShowNextEpisodeRef) {
      return;
    }
    setSelectedSeason(
      localShowFullSeasonsRef.find(
        s => s.number === localShowNextEpisodeRef.season,
      ),
    );
  }, [localShowFullSeasonsRef, localShowNextEpisodeRef]);

  const addEpisodeWatched = (episode: Episode) => {
    const fullShow = fullShowFn();
    if (fullShow) {
      addEpisodeWatchedAction(fullShow, episode, session!);
    } else {
      addEpisodeWatchedAction(
        // fix for watching first episode and no ShowWatched is present yet
        ({
          show,
          progress: unTrackedSeasons,
          fullSeasons: unTrackedSeasons,
        } as unknown) as ShowWatched,
        episode,
        session!,
      );
    }
  };

  const removeEpisodeWatched = (episode: Episode) => {
    const fullShow = fullShowFn();
    removeEpisodeWatchedAction(fullShow!, episode, session!);
  };

  const addSeasonWatched = (season: Season) => {
    const fullShow = fullShowFn();
    if (fullShow) {
      addSeasonWatchedAction(fullShow, season, session!);
    } else {
      addSeasonWatchedAction(
        ({
          show,
          progress: unTrackedProgress,
          fullSeasons: unTrackedSeasons,
        } as unknown) as ShowWatched,
        season,
        session!,
      );
    }
  };
  const removeSeasonWatched = (season: Season) => {
    const fullShow = watched.find(w => w.show.ids.trakt === show.ids.trakt);
    removeSeasonWatchedAction(fullShow!, season, session!);
  };

  const showModal = ({
    title,
    overview,
  }: {
    title: string;
    overview: string;
  }) => {
    toggle({ title, text: overview });
  };

  const selectSeason = (season: Season) => {
    if (!season) {
      return;
    }
    if (!selectedSeason) {
      setSelectedSeason(season);
      return;
    }
    if (selectedSeason.ids.trakt === season.ids.trakt) {
      setSelectedSeason(undefined);
      return;
    }
    setSelectedSeason(season);
  };

  return (
    <Seasons
      seasons={fullShowFn()?.fullSeasons ?? unTrackedSeasons}
      progress={fullShowFn()?.progress ?? unTrackedProgress}
      addEpisodeWatched={addEpisodeWatched}
      removeEpisodeWatched={removeEpisodeWatched}
      addSeasonWatched={addSeasonWatched}
      removeSeasonWatched={removeSeasonWatched}
      selectedSeason={selectedSeason}
      setSelectedSeason={selectSeason}
      showModal={showModal}
      onlyView={!session}
    />
  );
};

export default SeasonsContainer;
