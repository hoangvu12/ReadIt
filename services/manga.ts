import originalAxios from "axios";
import { Manga, MangaInfo } from "../types";

const axios = originalAxios.create({
  baseURL: "https://nguyenvu-stuff.glitch.me/nettruyen",
});

export const getManga = async (
  type: "latest" | "recommended" = "recommended"
): Promise<Manga[]> => {
  const { data } = await axios.get(`/?type=${type}`);

  return data.data;
};

export const getMangaInfo = async (
  slug: string,
  id: number
): Promise<MangaInfo> => {
  const { data } = await axios.get(`/info?slug=${slug}&id=${id}`);

  return data.data;
};

export const getMangaImages = async (
  nameSlug: string,
  chapterId: number,
  chapterSlug: string
): Promise<string[]> => {
  const { data } = await axios.get(
    `/images?nameSlug=${nameSlug}&chapterId=${chapterId}&chapterSlug=${chapterSlug}`
  );

  return data.data.map(getImageUrl);
};

const getImageUrl = (image: string) => {
  return `https://nguyenvu-stuff.glitch.me/nettruyen/image/${encodeURIComponent(
    image
  )}`;
};

export const searchManga = async (keyword: string): Promise<Manga[]> => {
  const { data } = await axios.get("/search", { params: { keyword } });

  return data.data;
};

interface GenreMangaData {
  sort: string;
  status: string;
  slug: string;
  page: number;
}

export interface GenreMangaResponse {
  success: true;
  data: Manga[];
  totalPage: number;
  currentPage: number;
  nextPage: number;
}

export const getGenreManga = async (
  props: GenreMangaData
): Promise<GenreMangaResponse> => {
  const { data } = await axios.get("/genre", { params: props });

  return data;
};
