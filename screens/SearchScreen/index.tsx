import React, { useState } from "react";
import { useRef } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Manga } from "../../types";
import { moderateScale } from "../../utils/scale";
import { useSearch } from "./useSearch";

import MangaCard from "../../components/MangaCard";
import CardColumnLayout from "../../loaders/CardColumnLayout";

const handleRenderItem = ({ item }: { item: Manga }) => (
  <MangaCard style={styles.cardStyle} {...item} />
);
const keyExtractor = (item: Manga) => item.id.toString();

export default function SearchScreen() {
  const [keyword, setKeyword] = useState("");
  const timeout = useRef<NodeJS.Timeout | null>(null);

  const { data, isLoading } = useSearch(keyword, {
    enabled: Boolean(keyword),
  });

  const onChange = (text: string) => {
    if (timeout.current) {
      clearTimeout(timeout.current);

      timeout.current = null;
    }

    timeout.current = setTimeout(() => setKeyword(text), 1500);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Tìm kiếm"
        style={styles.input}
        onChangeText={onChange}
        placeholderTextColor="gray" 
      />

      {isLoading ? (
        <CardColumnLayout />
      ) : data?.length === 0 ? (
        <Text style={styles.errorText}>Không tìm thấy kết quả</Text>
      ) : (
        <FlatList
          data={data!}
          keyExtractor={keyExtractor}
          renderItem={handleRenderItem}
          numColumns={2}
          key="search"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    color: "white",
    width: "100%",
    fontSize: moderateScale(20),
    textAlign: "center",
    backgroundColor: "black",
    padding: 15,
    marginBottom: 20,
  },
  cardStyle: {
    marginBottom: 10,
  },
  errorText: {
    textAlign: "center",
    fontSize: moderateScale(20),
    color: "white",
  },
});
