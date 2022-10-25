import { IFilms } from '../types';
import store from '../hooks/store';
import { useCallback } from 'react';
import { Avatar, Select } from 'antd';
import { getCharacters } from '../server/service';

const { Option } = Select;

type Props = {
  loading: boolean;
  data?: IFilms;
};

const MovieOptions = ({ loading, data }: Props) => {
  const movie = useCallback(async (values: string) => {
    const movie = JSON.parse(values);
    store.setState({ loading: true, characters: true });
    const characters = movie.characters as string[];
    const urls: Promise<any>[] = [];
    for (let i = 0; i < characters.length; i++) {
      urls.push(getCharacters(characters[i].split('/')[5]));
    }

    const allCharacters = await Promise.all(urls);
    const movieCharacter = allCharacters.map((character, index) => {
      return {
        key: index,
        name: character?.name,
        gender:
          (character?.gender === 'male' && 'M') ||
          (character?.gender === 'female' && 'F') ||
          'N/A',
        height: character?.height,
      };
    });

    store.setState({
      characterDetails: movieCharacter,
      films: {
        title: movie.title,
        director: movie.director,
        producer: movie.producer,
        release_date: movie.release_date,
        opening_crawl: movie.opening_crawl,
      },
    });
    store.setState({ loading: false });
  }, []);

  return (
    <Select
      defaultValue="Choose a star wars movies"
      loading={loading}
      className="sm:w-[300px] w-full h-10 mx-5 sm:mx-0 rounded-xl mt-5"
      onChange={movie}
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

export default MovieOptions;
