import { AntDesign, Ionicons } from "@expo/vector-icons";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Button from "../../components/Button";
import { CardWidth, ImageHeight, ImageRatio } from "../../components/MangaCard";
import TextIcon from "../../components/TextIcon";
import { ScrollView, Text } from "../../components/Themed";
import useMangaInfo from "../../hooks/useMangaInfo";
import MangaInfoLayout from "../../loaders/MangaInfoLayout";
import { Manga, RootStackParamList } from "../../types";
import { moderateScale } from "../../utils/scale";
import Storage from "../../utils/storage";

const { height } = Dimensions.get("window");

type InfoScreenRouteProp = RouteProp<RootStackParamList, "InfoScreen">;
type InfoScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "InfoScreen"
>;

type InfoScreenProps = {
  route: InfoScreenRouteProp;
  navigation: InfoScreenNavigationProp;
};

export default function InfoScreen({ route, navigation }: InfoScreenProps) {
  const [visitedChapterIndex, setVisitedChapterIndex] = useState<
    number | undefined
  >(undefined);

  const { slug, id } = route.params;

  useEffect(() => {
    const getVisitedChapterIndex = async () => {
      const visitedInfo = await Storage.findOne<Manga>("visited", { id });

      setVisitedChapterIndex(visitedInfo?.chapterIndex);
    };

    getVisitedChapterIndex();
  }, []);

  const { data, isLoading } = useMangaInfo({ slug, id });

  if (isLoading) return <MangaInfoLayout />;

  const handleButtonPress =
    (chapterIndex: number = 0) =>
    () => {
      navigation.navigate("ReadScreen", {
        mangaId: id,
        mangaSlug: slug,
        image: data!.image,
        title: data!.title,
        chapterIndex,
      });
    };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <ImageBackground
          style={styles.imageBackground}
          source={{ uri: data?.image }}
          blurRadius={10}
        >
          <View style={[StyleSheet.absoluteFill, styles.overlay]} />
          <TouchableOpacity
            style={{ top: 10, left: 10 }}
            onPress={() => navigation.goBack()}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Image style={styles.image} source={{ uri: data?.image }} />
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>{data?.title}</Text>
          {!!data?.author && (
            <TextIcon
              style={styles.author}
              text={data?.author}
              textStyle={{ color: "gray" }}
              icon={<AntDesign name="user" size={24} color="gray" />}
            />
          )}
          <View style={styles.statisticsContainer}>
            {!!data?.views && (
              <TextIcon
                text={data?.views!}
                textStyle={{ color: "gray" }}
                icon={
                  <Ionicons name="ios-eye-outline" size={24} color="gray" />
                }
              />
            )}

            {!!data?.chapters[0].name && (
              <TextIcon
                style={{ marginLeft: 10 }}
                text={data?.chapters[0].name!}
                textStyle={{ color: "gray" }}
                icon={<Ionicons name="menu-outline" size={24} color="gray" />}
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <Button
              text="Đọc từ đầu"
              style={{ marginRight: 10 }}
              onPress={handleButtonPress(data?.chapters.length! - 1)}
            />
            <Button text="Đọc mới nhất" onPress={handleButtonPress(0)} />
          </View>

          {(!!visitedChapterIndex || visitedChapterIndex === 0) && (
            <Button
              text={data?.chapters[visitedChapterIndex].name!}
              onPress={handleButtonPress(visitedChapterIndex)}
            />
          )}

          <View style={{ marginVertical: 20, alignSelf: "flex-start" }}>
            <Text
              style={{
                fontSize: moderateScale(14),
                fontWeight: "500",
                marginBottom: 10,
              }}
            >
              Nội dung
            </Text>

            <Text style={{ fontSize: moderateScale(15), color: "gray" }}>
              {data?.description}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    height: height / 3,
    position: "relative",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  infoContainer: {
    flex: 1,
    marginTop: 50,
    padding: 20,
    alignItems: "center",
  },
  image: {
    resizeMode: "cover",
    width: CardWidth,
    height: ImageHeight * ImageRatio,
    position: "absolute",
    bottom: -50,
    alignSelf: "center",
    borderRadius: 5,
    zIndex: 10,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    textAlign: "center",
  },
  author: {
    marginTop: 10,
    marginBottom: 5,
  },
  statisticsContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
