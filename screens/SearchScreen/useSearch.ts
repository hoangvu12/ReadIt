import { useQuery, UseQueryOptions } from "react-query";
import { searchManga } from "../../services/manga";
import { Manga } from "../../types";

export const useSearch = (
  keyword: string,
  options: UseQueryOptions<Manga[]>
) => {
  return useQuery<Manga[]>(
    ["search", keyword],
    () => searchManga(keyword),
    options
  );
};
