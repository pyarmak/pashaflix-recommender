interface IGenre {
  name: string;
  emoji: string;
}
const genres: {
  [key: string]: IGenre;
} = {
  action: {
    name: 'Action',
    emoji: '👊',
  },
  adventure: {
    name: 'Adventure',
    emoji: '🗺',
  },
  animation: {
    name: 'Animation',
    emoji: '👾',
  },
  anime: {
    name: 'Anime',
    emoji: '🇯🇵',
  },
  comedy: {
    name: 'Comedy',
    emoji: '😆',
  },
  crime: {
    name: 'Crime',
    emoji: '💣',
  },
  documentary: {
    name: 'Documentary',
    emoji: '🗃',
  },
  drama: {
    name: 'Drama',
    emoji: '👥',
  },
  family: {
    name: 'Family',
    emoji: '👨‍👩‍👧‍👦',
  },
  fantasy: {
    name: 'Fantasy',
    emoji: '🐲',
  },
  history: {
    name: 'Historical',
    emoji: '📜',
  },
  holiday: {
    name: 'Holiday',
    emoji: '🏖',
  },
  horror: {
    name: 'Horror',
    emoji: '👹',
  },
  music: {
    name: 'Music',
    emoji: '🎤',
  },
  musical: {
    name: 'Musical',
    emoji: '🎶',
  },
  mystery: {
    name: 'Mystery',
    emoji: '🔍',
  },
  none: {
    name: 'None',
    emoji: '❌',
  },
  romance: {
    name: 'Romance',
    emoji: '💕',
  },
  'science-fiction': {
    name: 'Science-Fiction',
    emoji: '🚀',
  },
  short: {
    name: 'Short',
    emoji: '🎥',
  },
  'sporting-event': {
    name: 'Sports',
    emoji: '⚽️',
  },
  superhero: {
    name: 'Superhero',
    emoji: '💪🏻',
  },
  suspense: {
    name: 'Suspense',
    emoji: '⏸',
  },
  thriller: {
    name: 'Thriller',
    emoji: '🔪',
  },
  war: {
    name: 'War',
    emoji: '⚔️',
  },
  western: {
    name: 'Western',
    emoji: '🏜',
  },
};

export default function getGenre(genre: string) {
  return (
    genres[genre] || {
      name: genre,
      emoji: '❓',
    }
  );
}
