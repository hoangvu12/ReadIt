import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import {
  CardMarginHorizontal,
  CardWidth,
  ImageHeight,
  ImageRatio,
  ChapterFontSize,
  TitleFontSize,
} from "../components/MangaCard";
import Loader from "./";

interface MangaCardLayoutProps {
  style?: StyleProp<ViewStyle>;
  cardStyle?: StyleProp<ViewStyle>;
}

const MangaCardLayout = ({ style, cardStyle }: MangaCardLayoutProps) => (
  <Loader style={style}>
    <View style={[styles.container, cardStyle]}>
      <View style={styles.thumbnail} />
      <View style={styles.title} />
      <View style={styles.studios} />
    </View>
  </Loader>
);

export default MangaCardLayout;

const styles = {
  container: {
    width: CardWidth,
    marginHorizontal: CardMarginHorizontal,
  },
  thumbnail: {
    width: "100%",
    height: ImageHeight * ImageRatio,
    marginBottom: 10,
  },
  title: {
    height: TitleFontSize,
    width: CardWidth * 0.7,
    marginBottom: 5,
  },
  studios: {
    height: ChapterFontSize,
    width: CardWidth * 0.4,
  },
};
