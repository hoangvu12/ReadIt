import React from "react";
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Colors from "../constants/Colors";
import { moderateScale } from "../utils/scale";

interface ButtonProps {
  style?: ViewStyle;
  text: string;
  textStyle?: TextStyle;
  onPress?: () => void;
}

export default function Button(props: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, props.style]}
      onPress={props.onPress}
    >
      <Text style={[styles.text, props.textStyle]}>{props.text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: Colors.primary,
    borderRadius: 30,
  },
  text: {
    fontWeight: "600",
    fontSize: moderateScale(14),
  },
});
