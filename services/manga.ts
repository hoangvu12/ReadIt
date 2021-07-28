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
