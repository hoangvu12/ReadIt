import * as React from "react";
import { StyleSheet } from "react-native";
import { CardWidth } from "../../components/MangaCard";
import { ScrollView, View } from "../../components/Themed";
import useManga from "../../hooks/useManga";
import SectionLayout from "../../loaders/SectionLayout";
import { Manga } from "../../types";
import Storage from "../../utils/storage";
import Section from "./Section";

const cardStyle = { width: CardWidth - 10 };

export default function HomeScreen() {
  const { data: recommendedList, isLoading: isRecommendedLoading } =
    useManga("recommended");
  const { data: latestList, isLoading: isLatestLoading } = useManga("latest");

  const [visitedManga, setVisitedManga] = React.useState<Manga[]>([]);

  React.useEffect(() => {
    const getVisitedManga = async () => {
      const visitedManga = await Storage.find<Manga>("visited");

      setVisitedManga(visitedManga || []);
    };

    getVisitedManga();
  }, []);

  return (
    <ScrollView style={styles.container}>
      {visitedManga.length > 0 && (
        <Section
          title="Đọc gần đây"
          data={visitedManga!}
          cardStyle={cardStyle}
        />
      )}

      {isRecommendedLoading ? (
        <SectionLayout style={{ marginBottom: 20 }} />
      ) : (
        <Section
          title="Truyện đề cử"
          data={recommendedList!}
          cardStyle={cardStyle}
        />
      )}

      {isLatestLoading ? (
        <SectionLayout />
      ) : (
        <Section
          title="Truyện mới nhất"
          data={latestList!}
          cardStyle={cardStyle}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});
