import React from "react";
import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import SkeletonContent from "react-native-skeleton-content";

interface LoaderProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export default function Loader(props: LoaderProps) {
  return (
    <SkeletonContent
      isLoading={true}
      highlightColor="#333333"
      boneColor="#202020"
      containerStyle={[props.style]}
    >
      {props.children}
    </SkeletonContent>
  );
}
