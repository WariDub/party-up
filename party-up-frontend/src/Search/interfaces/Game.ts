export interface Game {
  id: string;
  cover: GameCover;
  genres: { [key: string]: string };
  name: string;
  rating: number;
}

interface GameCover {
  url: string;
}
