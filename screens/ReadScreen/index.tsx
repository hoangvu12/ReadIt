import { AntDesign } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { RouteProp } from "@react-navigation/native";
// @ts-ignore
import Drawer from "react-native-drawer-menu";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Image from "react-native-scalable-image";
import { useQueryClient } from "react-query";
import { ScrollView, Text, View } from "../../components/Themed";
import Colors from "../../constants/Colors";
import useMangaImages from "../../hooks/useMangaImages";
import MangaImageLayout from "../../loaders/MangaImageLayout";
import { Chapter, MangaInfo, RootStackParamList } from "../../types";
import { moderateScale } from "../../utils/scale";
import Storage from "../../utils/storage";

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

const handleRenderImage = ({ item }: { item: string }) => (
  <Image width={width} source={{ uri: item }} />
);

const keyExtractor = (_: any, i: number) => i.toString();

const storageKey = "visited";

export default function ReadScreen({ route }: ReadScreenProps) {
  const queryClient = useQueryClient();
  const {
    mangaId,
    mangaSlug,
    chapterIndex: initialChapterIndex = 0,
    image,
    title,
  } = route.params;

  const infoData = queryClient.getQueryData<MangaInfo>([
    "mangaInfo",
    { slug: mangaSlug, id: mangaId },
  ]);

  const [chapters] = useState<Chapter[]>(() => infoData!.chapters);
  const [chapterIndex, setChapterIndex] = useState(initialChapterIndex);

  useEffect(() => {
    const storeData = async () => {
      Storage.update(
        storageKey,
        { id: mangaId },
        {
          slug: mangaSlug,
          id: mangaId,
          chapterIndex,
          image,
          title,
          recentChapters: [chapters[chapterIndex]],
        }
      );
    };

    storeData();
  }, [chapterIndex]);

  const { data: images, isLoading } = useMangaImages({
    nameSlug: mangaSlug,
    chapterId: chapters[chapterIndex].id,
    chapterSlug: chapters[chapterIndex].slug,
  });

  const handleArrowLeftPress = () => {
    setChapterIndex((index) => index + 1);
  };

  const handleArrowRightPress = () => {
    setChapterIndex((index) => index - 1);
  };

  const onChange = (value: number) => {
    setChapterIndex(
      chapters.findIndex((chapter) => chapter.id === Number(value))
    );
  };

  const isLeftPressDisabled = chapterIndex + 1 >= chapters.length;
  const isRightPressDisabled = chapterIndex === 0;

  const drawerContent = (
    <View style={styles.drawerContainer}>
      <FlatList
        data={chapters}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onChange(item.id)}>
            <View style={styles.drawerTextContainer}>
              <Text style={[styles.drawerText]}>{item.name}</Text>
              <Text style={[styles.drawerText, { color: "gray" }]}>
                {item.updatedAt}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );

  return (
    <Drawer
      type={Drawer.types.Overlay}
      drawerPosition={Drawer.positions.Right}
      drawerWidth={width * 0.8}
      drawerContent={drawerContent}
    >
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <TouchableOpacity
            onPress={handleArrowLeftPress}
            disabled={isLeftPressDisabled}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color={isLeftPressDisabled ? "gray" : "white"}
            />
          </TouchableOpacity>
          <Picker
            selectedValue={chapters[chapterIndex].id}
            onValueChange={onChange}
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
          <TouchableOpacity
            onPress={handleArrowRightPress}
            disabled={isRightPressDisabled}
          >
            <AntDesign
              name="arrowright"
              size={24}
              color={isRightPressDisabled ? "gray" : "white"}
            />
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <MangaImageLayout />
        ) : (
          <FlatList
            data={images}
            renderItem={handleRenderImage}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    </Drawer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pickerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  picker: {
    flex: 1,
    backgroundColor: Colors.background,
    height: 50,
    color: "white",
    borderWidth: 0,
    fontSize: moderateScale(20),
  },
  drawerContainer: {
    flex: 1,
    padding: 20,
  },
  drawerText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
  },
  drawerTextContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
  },
});
