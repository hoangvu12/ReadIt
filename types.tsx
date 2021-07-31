/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { StyleProp, ViewStyle } from "react-native";

export type LayoutStyles = { [key: string]: StyleProp<ViewStyle> };

export interface Genre {
  name: string;
  slug: string;
}
export interface MangaInfo {
  title: string;
  updatedAt: string;
  author: string;
  genres: Genre[];
  altTitle: string;
  image: string;
  description: string;
  views: string;
  slug: string;
  id: number;
  chapters: Chapter[];
}
export interface Chapter {
  name: string;
  slug: string;
  id: number;
  url?: string;
  updatedAt?: string;
}

export interface Manga {
  image: string;
  url?: string;
  title: string;
  updatedAt?: string;
  slug: string;
  id: number;
  recentChapters?: Chapter[];
  latestChapter?: string;
  chapterIndex?: number;
}

export type RootStackParamList = {
  Root: undefined;
  InfoScreen: { slug: string; id: number };
  ReadScreen: {
    mangaSlug: string;
    mangaId: number;
    chapterIndex?: number;
    image: string;
    title: string;
  };
  NotFound: undefined;
  SearchScreen: undefined;
};

export type BottomTabParamList = {
  Home: undefined;
  Genre: undefined;
};

export type HomeParamList = {
  HomeScreen: undefined;
};

export type GenreParamList = {
  GenreScreen: undefined;
};
