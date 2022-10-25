export type IFilms = {
    count: number;
    next?: string;
    prev?: string;
    results: {
        url: string;
        title: string;
        edited: string;
        created: string;
        director: string;
        producer: string;
        planets: string[];
        species: string[];
        episode_id: number;
        starship: string[];
        vehicles: string[];
        characters: string[];
        release_date: string;
        opening_crawl: string;
    }[]
  }

export type IStore = {
    loading: boolean;
    characterDetails: {
        key: number;
        name: string;
        gender: string;
        height: string;
    }[];
    displayCharacters: boolean;
    movieSubDetails: {
        title: string;
        director: string;
        producer: string;
        release_date: string;
        opening_crawl: string;
    }
}
