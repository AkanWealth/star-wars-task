import create from "zustand";
import { IStore } from "../types";

const store = create<IStore>(() => ({
    loading: false,
    films: {
        title: '',
        director: '',
        producer: '',
        release_date: '',
        opening_crawl: '',
    },
    characterDetails: [],
    characters: false,
}));

export default store;
