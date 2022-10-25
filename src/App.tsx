import { IFilms } from './types';
import { notification } from 'antd';
import Logo from './assets/logo.png';
import { useQuery } from 'react-query';
import { retrieveMovies } from './server';
import useStore from './hooks/summitech.store';
import MovieDetails from './components/MovieDetails';
import MovieSelector from './components/MovieSelector';

const App = () => {
  const { director } = useStore((state) => state.movieSubDetails);
  const displayCharacters = useStore((state) => state.displayCharacters);
  const { data, isLoading } = useQuery<IFilms>('films', retrieveMovies, {
    onError: (error) => {
      notification.open({
        message: 'Error',
        description: error instanceof Error && error.message,
      });
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        {displayCharacters && (
          <img src={Logo} height="150" width="150" alt="star-war logo" />
        )}
        <div className="text-white hidden sm:block mr-5">
          <p>Directed By: {director}</p>
        </div>
      </div>

      <div>
        {displayCharacters ? (
          <div className="sm:mx-10 mx-2 my-5">
            <MovieDetails />
          </div>
        ) : (
          <img src={Logo} alt="star-war logo" />
        )}
      </div>

      <div className="sm:fixed left-0 bottom-0 w-full z-50 flex justify-center items-center mb-5">
        <MovieSelector loading={isLoading} data={data} />
      </div>
    </div>
  );
};

export default App;
