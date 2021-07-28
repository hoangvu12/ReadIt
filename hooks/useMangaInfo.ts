import { useQuery } from "react-query";
import { getMangaInfo } from "../services/manga";

interface useMangaInfoData {
  slug: string;
  id: number;
}

const useMangaInfo = ({ slug, id }: useMangaInfoData) => {
  return useQuery(["mangaInfo", { slug, id }], () => getMangaInfo(slug, id));
};

export default useMangaInfo;
