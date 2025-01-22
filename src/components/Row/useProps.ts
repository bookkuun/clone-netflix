import { useEffect, useState } from "react";
import axiosClient from "../../axios";
import { Movie } from "../../types";
import { requests } from "../../requests";

export const useProps = (fetchUrl: string) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string | null>("");

  useEffect(() => {
    async function fetchData() {
      const request = (await axiosClient.get(fetchUrl)) as unknown as {
        data: { results: Movie[] };
      };

      const movies = request.data.results.map((movie: Movie) => ({
        id: movie.id,
        name: movie.name,
        poster_path: movie.poster_path,
        backdrop_path: movie.backdrop_path,
        overview: movie.overview,
      }));

      setMovies(movies);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const handleClick = async (movie: Movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      const moviePlayUrl = (await axiosClient.get(
        requests.fetchMovieVideos(movie.id)
      )) as unknown as {
        data: { results: Movie[] };
      };
      setTrailerUrl(moviePlayUrl.data.results[0].key);
    }
  };

  return { movies, trailerUrl, handleClick };
};
