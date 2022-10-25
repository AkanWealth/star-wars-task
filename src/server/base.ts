import axios, { AxiosError } from 'axios';

export const instance = () => axios.create({
    baseURL: 'https://swapi.dev/api',
    timeout: 30000000,
    headers: {
        "Content-Type": "application/json",
        Accept: 'application/json',
    }
});

export const next = (e: AxiosError) => {
    //@ts-ignore
    throw new Error(e?.response?.data ? e.response?.data.message : 'Something went wrong');
}
