import React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { moderateScale } from "../utils/scale";
import { Text, TextProps, View } from "./Themed";

interface TextIconProps {
  icon: JSX.Element;
  text: string;
  style?: ViewStyle;
  textStyle?: TextStyle;
  textProps?: TextProps;
}

export default function TextIcon(props: TextIconProps) {
  return (
    <View style={[styles.container, props.style]}>
      {props.icon}
      <Text style={[styles.textStyle, props.textStyle]} {...props.textStyle}>
        {props.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  textStyle: { fontSize: moderateScale(16), marginLeft: 5 },
});
