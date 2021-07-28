import React from "react";
import { View } from "react-native";
import Loader from ".";
import { LayoutStyles } from "../types";

export default function ButtonLayout() {
  return (
    <Loader>
      <View style={styles.button} />
    </Loader>
  );
}

const styles: LayoutStyles = {
  container: {
    margin: 10,
  },
  button: {
    marginHorizontal: 10,
    width: 150,
    height: 60,
    borderRadius: 15,
  },
};
