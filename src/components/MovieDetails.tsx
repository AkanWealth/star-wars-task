import { Spin } from "antd";
import CharacterTable from "./CharacterTable";
import useStore from "../hooks/summitech.store";

const MovieDetails = () => {
  const loading = useStore((state) => state.loading);
  const { title, opening_crawl } = useStore((state) => state.movieSubDetails);

  return (
    <>
    {loading ?
    <div className="grid place-items-center h-screen">
        <Spin size="large" />
    </div>
    :
    <>
      <h3 className="text-white text-lg font-bold">
       {title}
      </h3>
      <p className="text-white animate-pulse text-justify">{opening_crawl}</p>
      <CharacterTable />
    </>
    }
    </>
  );
};

export default MovieDetails;
