import { instance, next } from "./base"

export const retrieveMovies = async () => {
    const { data } = await instance().get(`films`).catch(e => next(e));
    return data;
}

export const retrieveMovieCharacters = async (characterId: string) => {
    const { data } = await instance().get(`/people/${characterId}`).catch(e =>e);
    return data;
}
