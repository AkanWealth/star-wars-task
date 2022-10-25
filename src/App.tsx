import { IFilms } from './types';
import store from './hooks/store';
import { notification } from 'antd';
import { useQuery } from 'react-query';
import StarWars from './assets/logo.png';
import { getMovies } from './server/service';
import FilmDetails from './components/MovieDetails';
import MovieOptions from './components/MovieOptions';

const App = () => {
  const { director } = store((state) => state.films);
  const showMovieCharacter = store((state) => state.characters);
  const { data, isLoading } = useQuery<IFilms>('films', getMovies, {
    onError: (error) => {
      notification.open({
        message: 'Error',
        description: error instanceof Error && error.message,
      });
    },
  });

  return (
    <>
    <div className="bg-black">
      <div className="lg:flex lg:justify-between lg:items-center">
        {showMovieCharacter && (
          <>
            <img
              src={StarWars}
              height="100"
              width="100"
              alt="star-war"
              className="ml-10 mt-5"
            />
            <div className="text-white sm:block m-10 text-center lg:text-right">
              <p>Directed By: {director}</p>
            </div>
          </>
        )}
      </div>

      <div className="bg-white mt-5">
        {showMovieCharacter ? (
          <div className="flex justify-center items-center mt-10 ">
            <MovieOptions loading={isLoading} data={data} />
          </div>
        ) : (
          <div className="flex justify-center items-center mt-10 bg-black">
            <MovieOptions loading={isLoading} data={data} />
          </div>
        )}

        <div className="bg-white">
          {showMovieCharacter ? (
            <div className="sm:mx-10 mx-2 my-5">
              <FilmDetails />
            </div>
          ) : (
            <img src={StarWars} alt="star-war logo" />
          )}
        </div>
      </div>
    </div>
    <div className="bg-white h-[400px]"></div>
    </>
  );
};

export default App;
