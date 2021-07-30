import React from "react";
import { View } from "react-native";
import Loader from ".";
import { LayoutStyles } from "../types";
import MangaCardLayout from "./MangaCardLayout";

const arr = new Array(2).fill(null);

export default function CardColumnLayout() {
  return (
    <Loader>
      {arr.map((_, i) => (
        <View style={styles.cardContainer} key={i}>
          {arr.map((_, i) => (
            <MangaCardLayout key={i} />
          ))}
        </View>
      ))}
    </Loader>
  );
}

const styles: LayoutStyles = {
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
};
