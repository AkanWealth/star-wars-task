import { instance, next } from "./base"

export const getMovies = async () => {
    const { data } = await instance().get(`/films`).catch(e => next(e));
    return data;
}

export const getCharacters = async (id: string) => {
    const { data } = await instance().get(`/people/${id}`).catch(e =>e);
    return data;
}
