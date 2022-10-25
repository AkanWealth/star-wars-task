import create from "zustand";
import { IStore } from "../types";

const useStore = create<IStore>(() => ({
    loading: false,
    movieSubDetails: {
        title: '',
        director: '',
        producer: '',
        release_date: '',
        opening_crawl: '',
    },
    characterDetails: [],
    displayCharacters: false,
}));

export default useStore;
