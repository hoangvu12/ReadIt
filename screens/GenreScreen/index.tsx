import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import { StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";

import genres, { sorts, statuses } from "../../constants/Genres";
import { Manga } from "../../types";
import { moderateScale } from "../../utils/scale";
import useGenre from "./useGenre";

import MangaCard, { CardWidth } from "../../components/MangaCard";
import CardColumnLayout from "../../loaders/CardColumnLayout";

const handleRenderItem = ({ item }: { item: Manga }) => (
  <MangaCard {...item} style={styles.cardStyle} />
);
const keyExtractor = (item: Manga) => item.id.toString();

const loadingComponent = (
  <View
    style={{
      padding: 10,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <ActivityIndicator color="white" />
  </View>
);

export default function GenreScreen() {
  const [selectedGenre, setSelectedGenre] = useState(genres[0].slug);
  const [selectedSort, setSelectedSort] = useState(sorts[0].value);
  const [selectedStatus, setSelectedStatus] = useState(statuses[0].slug);

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGenre({
    slug: selectedGenre,
    sort: selectedSort,
    status: selectedStatus,
  });

  const handleEndReached = () => {
    if (isFetchingNextPage || isLoading || !hasNextPage) {
      return;
    }

    fetchNextPage();
  };

  if (isError) {
    return (
      <Text style={{ textAlign: "center", color: "white" }}>
        Lỗi, vui lòng khởi động lại app
      </Text>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.selectsContainer}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Picker
            selectedValue={selectedGenre}
            onValueChange={setSelectedGenre}
            dropdownIconColor="white"
            style={styles.picker}
          >
            {genres.map((genre) => (
              <Picker.Item
                key={genre.slug}
                label={genre.name}
                value={genre.slug}
              />
            ))}
          </Picker>

          <Picker
            selectedValue={selectedSort}
            onValueChange={setSelectedSort}
            style={styles.picker}
            dropdownIconColor="white"
          >
            {sorts.map((sort) => (
              <Picker.Item
                key={sort.value}
                label={sort.name}
                value={sort.value}
              />
            ))}
          </Picker>
        </View>

        <Picker
          selectedValue={selectedStatus}
          onValueChange={setSelectedStatus}
          style={styles.picker}
          dropdownIconColor="white"
        >
          {statuses.map((status) => (
            <Picker.Item
              key={status.slug}
              label={status.name}
              value={status.slug}
            />
          ))}
        </Picker>
      </View>

      <View style={{ flex: 1 }}>
        {isLoading ? (
          <CardColumnLayout cardStyle={styles.cardStyle} />
        ) : (
          <FlatList
            data={data?.pages.map(({ data }) => data).flat()}
            renderItem={handleRenderItem}
            keyExtractor={keyExtractor}
            key="genre"
            numColumns={2}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.05}
            ListFooterComponentStyle={{ opacity: isFetchingNextPage ? 1 : 0 }}
            ListFooterComponent={loadingComponent}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  selectsContainer: {
    paddingVertical: 10,
    backgroundColor: Colors.background,
  },
  picker: {
    height: 50,
    color: "white",
    // borderWidth: 0,
    fontSize: moderateScale(14),
    padding: 10,
    margin: 5,
    flex: 1,
  },
  cardStyle: {
    width: CardWidth - 10,
    marginBottom: 10,
  },
});
