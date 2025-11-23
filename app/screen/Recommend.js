import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import BottomTabBar from "../../components/BottomTabBar"; // ⭐ 추가 (경로는 너 프로젝트 기준)

const { width, height } = Dimensions.get("window");

const CARD_HEIGHT = height / 1.4;
const CARD_WIDTH = width * 0.7;
const CARD_SPACING = CARD_WIDTH / 100;

const H_PADDING = (width - CARD_WIDTH) / 7;

export default function Recommend() {
  const router = useRouter();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      const initialOffset =
        H_PADDING + (CARD_WIDTH + CARD_SPACING) - (width - CARD_WIDTH) / 2;

      scrollRef.current.scrollTo({
        x: initialOffset,
        animated: false,
      });
    }
  }, []);

  return (
    <LinearGradient colors={["#FFFFFF", "#D7EEFF"]} style={styles.container}>

      {/* 상단 문구 */}
      <View style={styles.header}>
        <Text style={styles.title}>
          더 나은 선택을 위해{"\n"}기관을 추천해드릴게요
        </Text>
        <Text style={styles.subtitle}>
          어르신과 보호자 모두 만족할 수 있는{"\n"}기관을 찾기 어렵다면 시작해보세요
        </Text>
      </View>

      {/* 카드 스크롤 */}
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        bounces={false}
        directionalLockEnabled={true}
        scrollEnabled={true}
        nestedScrollEnabled={false}
        contentContainerStyle={styles.scrollArea}
      >
        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../assets/images/price.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../assets/images/institution.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <TouchableOpacity style={styles.card}>
          <Image
            source={require("../../assets/images/distance.png")}
            style={styles.cardImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </ScrollView>

      {/* 시작하기 버튼 */}
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.push("/screen/RecommendText")}
      >
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>

      {/* ⭐ 새로운 하단바 (recommend 활성화) */}
      <BottomTabBar activeKey="recommend" />

    </LinearGradient>
  );
}

const HEADER_DOWN = 60;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
  },

  header: {
    alignItems: "center",
    marginTop: HEADER_DOWN,
    marginBottom: 25,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#5DA7DB",
    textAlign: "center",
    lineHeight: 34,
  },

  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "#6B7B8C",
    textAlign: "center",
    lineHeight: 20,
  },

  scrollArea: {
    paddingHorizontal: H_PADDING,
    marginBottom: 40,
    marginTop: -60,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: CARD_SPACING,
    justifyContent: "center",
    alignItems: "center",
  },

  cardImage: {
    width: "100%",
    height: "100%",
  },

  startButton: {
    backgroundColor: "#5DA7DB",
    width: "85%",
    height: 55,
    borderRadius: 12,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
  },

  startButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
