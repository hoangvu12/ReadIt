import React from "react";
import { View, Dimensions } from "react-native";
import Loader from ".";
import { LayoutStyles } from "../types";

const { width, height } = Dimensions.get("window");

export default function MangaImageLayout() {
  return (
    <Loader>
      <View style={styles.image} />
    </Loader>
  );
}

const styles: LayoutStyles = {
  image: {
    width,
    height,
  },
};
