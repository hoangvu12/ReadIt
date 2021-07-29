import React from "react";
import { View, Dimensions, StyleProp, ViewStyle } from "react-native";
import Loader from "./";
import { CardWidth } from "../components/MangaCard";

import MangaCardLayout from "./MangaCardLayout";
import { LayoutStyles } from "../types";

const { width } = Dimensions.get("window");

const arr = new Array(2).fill(null);

interface SectionLayoutProps {
  style?: ViewStyle;
}

export default function SectionLayout(props: SectionLayoutProps) {
  return (
    <Loader style={props.style}>
      <View style={styles.text} />

      <View style={styles.cardContainer}>
        {arr.map((_, i) => (
          <MangaCardLayout cardStyle={{ width: CardWidth - 10 }} key={i} />
        ))}
      </View>
    </Loader>
  );
}

const styles: LayoutStyles = {
  text: {
    height: 16,
    width: width * 0.7,
    marginBottom: 10,
    marginLeft: 5,
  },

  cardContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
};
