import { Spin } from 'antd';
import Table from './shared/Table';
import useStore from '../hooks/store';

const FilmDetails = () => {
  const isLoading = useStore((state) => state.loading);
  const { title, opening_crawl } = useStore((state) => state.films);

  return (
    <>
      {isLoading ? (
        <div className="grid place-items-center h-screen">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <div className="flex justify-center mx-2 lg:mx-20">
            <div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-justify">
                {opening_crawl}
              </p>
            </div>
          </div>
          <Table />
        </>
      )}
    </>
  );
};

export default FilmDetails;
