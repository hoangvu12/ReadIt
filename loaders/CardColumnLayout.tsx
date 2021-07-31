import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";
import Loader from ".";
import { LayoutStyles } from "../types";
import MangaCardLayout from "./MangaCardLayout";

const arr = new Array(2).fill(null);

interface CardColumnProps {
  cardStyle?: StyleProp<ViewStyle>;
}

export default function CardColumnLayout(props: CardColumnProps) {
  return (
    <Loader>
      {arr.map((_, i) => (
        <View style={styles.cardContainer} key={i}>
          {arr.map((_, i) => (
            <MangaCardLayout style={[props.cardStyle]} key={i} />
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
