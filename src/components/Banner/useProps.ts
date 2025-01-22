import { useEffect, useState } from "react";
import axiosClient from "../../axios.ts";
import { requests } from "../../requests.ts";
import { Movie } from "../../types.ts";

export const useProps = () => {
  const [movie, setMovie] = useState<Movie>();
  useEffect(() => {
    async function fetchData() {
      const request = (await axiosClient.get(
        requests.fetchNetflixOriginals
      )) as unknown as {
        data: { results: Movie[] };
      };

      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);

  const truncate = (str: string | undefined, n: number): string => {
    if (!str) {
      return "";
    }
    return str.length > n ? str.substr(0, n - 1) + "..." : str;
  };

  return {
    movie,
    truncate,
  };
};
