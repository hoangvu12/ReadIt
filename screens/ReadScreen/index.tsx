import { Picker } from "@react-native-picker/picker";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet } from "react-native";
import Image from "react-native-scalable-image";
import { useQueryClient } from "react-query";
import { Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { data as infoData } from "../../data/mangaInfo.json";
import useMangaImages from "../../hooks/useMangaImages";
import { Chapter, MangaInfo, RootStackParamList } from "../../types";

const { width } = Dimensions.get("screen");

type ReadScreenRouteProp = RouteProp<RootStackParamList, "ReadScreen">;
type ReadScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ReadScreen"
>;

type ReadScreenProps = {
  route: ReadScreenRouteProp;
  navigation: ReadScreenNavigationProp;
};

export default function ReadScreen({ route }: ReadScreenProps) {
  const queryClient = useQueryClient();
  const {
    mangaId,
    mangaSlug,
    chapterIndex: initialChapterIndex,
  } = route.params;

  const infoData = queryClient.getQueryData<MangaInfo>([
    "mangaInfo",
    { slug: mangaSlug, id: mangaId },
  ]);

  const [chapters] = useState<Chapter[]>(() => infoData!.chapters);
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex || 0);

  const { data, isLoading } = useMangaImages({
    nameSlug: mangaSlug,
    chapterId: chapters[chapterIndex].id,
    chapterSlug: chapters[chapterIndex].slug,
  });

  const handleRenderImage = ({ item }: { item: string }) => (
    <Image width={width} source={{ uri: item }} />
  );

  const onPickerChange = (value: number) => {
    setChapterIndex(
      chapters.findIndex((chapter) => chapter.id === Number(value))
    );
  };

  if (isLoading) return <Text>Loadinggggg</Text>;

  return (
    <View>
      <Picker
        selectedValue={chapters[chapterIndex].id}
        onValueChange={onPickerChange}
        style={styles.picker}
      >
        {chapters.map((chapter) => (
          <Picker.Item
            key={chapter.id}
            label={chapter.name}
            value={chapter.id}
          />
        ))}
      </Picker>

      <FlatList
        data={data}
        renderItem={handleRenderImage}
        keyExtractor={(_, i) => i.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  picker: {
    backgroundColor: Colors.background,
    height: 50,
    color: "white",
    flex: 1,
    borderWidth: 0,
    fontSize: 20,
    padding: 30,
  },
});
