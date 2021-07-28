import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  ViewStyle,
  Image,
  TouchableOpacity,
} from "react-native";

import { Manga } from "../types";
import { Text, View } from "./Themed";

const { width: windowWidth } = Dimensions.get("window");

export const ImageWidth = 250;
export const ImageHeight = 340;

export const CardWidth = windowWidth * 0.5 - 5 * 2;
export const ImageRatio = CardWidth / ImageWidth;

export const CardMarginHorizontal = 5;

export const TitleFontSize = 20;
export const ChapterFontSize = 16;

interface MangaCardProps extends Manga {
  style?: StyleProp<ViewStyle>;
}

export default function MangaCard(props: MangaCardProps) {
  const { image, title, recentChapters, slug, id, style } = props;

  const navigation = useNavigation();

  const handleCardPress = () => navigation.navigate("InfoScreen", { slug, id });

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity onPress={handleCardPress}>
        <Image style={styles.image} source={{ uri: image }} />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.chapter}>{recentChapters[0].name}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "cover",
    width: "100%",
    height: ImageHeight * ImageRatio,
    borderRadius: 6,
  },
  container: {
    width: CardWidth,
    marginHorizontal: CardMarginHorizontal,
  },
  infoContainer: {
    marginTop: 10,
  },
  title: {
    fontSize: TitleFontSize,
    fontWeight: "400",
    marginBottom: 3,
  },
  chapter: {
    fontSize: ChapterFontSize,
    color: "gray",
  },
});
