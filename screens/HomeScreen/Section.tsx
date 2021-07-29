import React from "react";
import { FlatList, StyleSheet, View, ViewStyle } from "react-native";
import MangaCard from "../../components/MangaCard";
import { Text } from "../../components/Themed";
import { Manga } from "../../types";
import { moderateScale } from "../../utils/scale";

interface SectionProps {
  data: Manga[];
  title: string;
  cardStyle?: ViewStyle;
  style?: ViewStyle;
}

const keyExtractor = (item: Manga) => item.id.toString();

export default function Section(props: SectionProps) {
  const handleRenderItem = ({ item }: { item: Manga }) => (
    <MangaCard style={props.cardStyle} {...item} />
  );

  return (
    <View style={[styles.container, props.style]}>
      <View
        style={{
          marginBottom: 10,
        }}
      >
        <Text style={styles.title}>{props.title}</Text>
      </View>

      <FlatList
        keyExtractor={keyExtractor}
        data={props.data}
        horizontal
        renderItem={handleRenderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  title: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginLeft: 5,
  },
});
