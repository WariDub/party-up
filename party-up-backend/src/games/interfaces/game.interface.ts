export interface Game {
    id: number;
    cover: { [key: string]: string };
    genres: { [key: string]: string };
    name: string;
    rating: number;
}
