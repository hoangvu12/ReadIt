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
import { moderateScale } from "../utils/scale";
import { Text, View } from "./Themed";

const { width: windowWidth } = Dimensions.get("window");

export const ImageWidth = 250;
export const ImageHeight = 340;

export const CardWidth = windowWidth * 0.5 - 5 * 2;
export const ImageRatio = CardWidth / ImageWidth;

export const CardMarginHorizontal = 5;

export const TitleFontSize = moderateScale(14);
export const ChapterFontSize = moderateScale(13);

interface MangaCardProps extends Manga {
  style?: StyleProp<ViewStyle>;
}

function MangaCard(props: MangaCardProps) {
  const { image, title, recentChapters, slug, id, latestChapter, style } =
    props;

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
          <Text style={styles.chapter}>
            {recentChapters ? recentChapters[0].name : latestChapter!}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(MangaCard);

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
