import { useQuery } from "react-query";
import { getMangaImages } from "../services/manga";

interface useMangaImagesData {
  nameSlug: string;
  chapterId: number;
  chapterSlug: string;
}

const useMangaImages = ({
  nameSlug,
  chapterId,
  chapterSlug,
}: useMangaImagesData) => {
  return useQuery(["anime", { nameSlug, chapterId, chapterSlug }], () =>
    getMangaImages(nameSlug, chapterId, chapterSlug)
  );
};

export default useMangaImages;
