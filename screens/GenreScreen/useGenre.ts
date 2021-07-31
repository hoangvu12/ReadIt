import { useInfiniteQuery } from "react-query";
import { GenreMangaResponse } from "../../services/manga";
import { getGenreManga } from "../../services/manga";

interface GenreProps {
  sort: string;
  status: string;
  slug: string;
}

const useGenre = (props: GenreProps) => {
  const fetchGenre = ({ pageParam = 1 }) =>
    getGenreManga({ ...props, page: pageParam });

  return useInfiniteQuery<GenreMangaResponse>(
    ["genre", { ...props }],
    fetchGenre,
    {
      getNextPageParam: (lastPage) =>
        lastPage.currentPage < lastPage.nextPage
          ? lastPage.nextPage
          : undefined,
    }
  );
};

export default useGenre;
