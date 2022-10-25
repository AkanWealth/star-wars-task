import { Select } from "antd";
import { useCallback } from "react";
import useStore from "../hooks/summitech.store";
import { retrieveMovieCharacters } from "../server";
import { IFilms } from "../types";

const { Option } = Select;

type Props = {
  loading: boolean;
  data?: IFilms;
};

const MovieSelector = ({ loading, data }: Props) => {
  const changeMovie = useCallback(async (values: string) => {
    const movie = JSON.parse(values);
    useStore.setState({ loading: true, displayCharacters: true });
    const characters = movie.characters as string[];
    const urls: Promise<any>[] = [];
    for(let i = 0; i < characters.length; i++) {
        urls.push(retrieveMovieCharacters(characters[i].split('/')[5]))
    }

    const allCharacters = await Promise.all(urls);
    const charactersToUse = allCharacters.map((character, index) => {
        return {
            key: index,
            name: character?.name,
            gender: (character?.gender === "male" && 'M') || (character?.gender === "female" && 'F') || 'N/A',
            height: character?.height,
        }
    });

    useStore.setState({
      characterDetails: charactersToUse,
      movieSubDetails: {
        title: movie.title,
        director: movie.director,
        producer: movie.producer,
        release_date: movie.release_date,
        opening_crawl: movie.opening_crawl,
      },
    });
    useStore.setState({ loading: false })
  }, []);

  return (
    <Select
      defaultValue="Select a movie"
      loading={loading}
      className="sm:w-[200px] w-full mx-5 sm:mx-0"
      onChange={changeMovie}
    >
      {data &&
        data?.results
          ?.sort(
            (a, b) =>
              new Date(b.release_date).getTime() -
              new Date(a.release_date).getTime()
          )
          ?.map((film) => (
            <Option key={film?.episode_id} value={JSON.stringify(film)}>
              {film?.title}
            </Option>
          ))}
    </Select>
  );
};

export default MovieSelector;
