import React from "react";
import { Dimensions, StyleSheet, View, ViewStyle } from "react-native";
import Loader from ".";
import { CardWidth, ImageHeight, ImageRatio } from "../components/MangaCard";
import Colors from "../constants/Colors";
import { LayoutStyles } from "../types";
import ButtonLayout from "./ButtonLayout";

const { height, width } = Dimensions.get("window");

interface MangaInfoLayoutProps {
  style?: ViewStyle;
}

export default function MangaInfoLayout(props: MangaInfoLayoutProps) {
  const { style } = props;

  return (
    <Loader style={[styles.container, style]}>
      <View style={styles.imageBackground}>
        <View style={styles.imageBackground} />
        <View style={styles.image} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.title} />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          <TextIconLayout />
          <TextIconLayout />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 10,
          }}
        >
          <ButtonLayout />
          <ButtonLayout />
        </View>

        <View
          style={{
            marginVertical: 20,
          }}
        >
          <View style={{ width: width * 0.3, height: 22, marginBottom: 5 }} />
          <View style={{ width: width * 0.9, height: 100 }} />
        </View>
      </View>
    </Loader>
  );
}

const TextIconLayout = () => (
  <Loader>
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 20,
      }}
    >
      <View style={{ height: 20, width: 20, marginRight: 10 }} />
      <View style={{ height: 20, width: 100 }} />
    </View>
  </Loader>
);

const styles: LayoutStyles = {
  container: {
    flex: 1,
  },
  imageBackground: {
    height: height / 3,
    width,
    position: "relative",
  },
  image: {
    width: CardWidth,
    height: ImageHeight * ImageRatio,
    position: "absolute",
    bottom: -50,
    alignSelf: "center",
    borderRadius: 5,
    borderWidth: 10,
    borderColor: Colors.background,
  },
  infoContainer: {
    flex: 1,
    marginTop: 50,
    padding: 20,
    alignItems: "center",
  },
  title: {
    height: 25,
    width: width * 0.6,
  },
};
