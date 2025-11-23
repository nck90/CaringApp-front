import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function RecommendClear() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState([]);

  useEffect(() => {
    const mockData = [
      {
        id: 1,
        name: "사랑재 요양원",
        address: "서울시 광진구 자양로188",
        type: "요양원",
        possible: "입소 가능",
        tags: ["치매", "청결"],
        image:
          "https://images.unsplash.com/photo-1583912268181-f8f4b897a85f?q=80&w=800",
      },
      {
        id: 2,
        name: "효심노인센터",
        address: "서울시 강동구 천호동 22",
        type: "데이케어센터",
        possible: "예약 가능",
        tags: ["케어", "전문"],
        image:
          "https://images.unsplash.com/photo-1576765607924-b29c2b30d2a8?q=80&w=800",
      },
      {
        id: 3,
        name: "편안한 요양센터",
        address: "서울시 송파구 방이동 90",
        type: "요양원",
        possible: "입소 가능",
        tags: ["친절", "전문"],
        image:
          "https://images.unsplash.com/photo-1549576490-b0b4831ef60a?q=80&w=800",
      },
      {
        id: 4,
        name: "하늘정원케어",
        address: "서울시 중랑구 면목동",
        type: "요양원",
        possible: "대기 필요",
        tags: ["재활", "청결"],
        image:
          "https://images.unsplash.com/photo-1597216967864-3a2d5c8f376e?q=80&w=800",
      },
      {
        id: 5,
        name: "다솜노인복지관",
        address: "서울시 성동구 성수동",
        type: "복지관",
        possible: "상담 가능",
        tags: ["프로그램", "식단"],
        image:
          "https://images.unsplash.com/photo-1556379094-df7a5f5d864c?q=80&w=800",
      },
    ];

    setInstitutions(mockData);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>기관 추천이 완료됐어요!</Text>
        <Text style={styles.subtitle}>
          원하는 기관을 선택하여 바로 정보를 확인해보세요
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardScroll}
      >
        {institutions.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image
              source={{ uri: item.image }}
              style={styles.cardImage}
              resizeMode="cover"
            />

            <View style={styles.cardContent}>
              <Text style={styles.cardType}>{item.type}</Text>
              <Text style={styles.cardName}>{item.name}</Text>

              <View style={styles.row}>
                <Ionicons name="location-sharp" size={15} color="#5DA7DB" />
                <Text style={styles.address}>{item.address}</Text>
              </View>

              <View style={styles.row}>
                <Ionicons name="checkmark-circle" size={15} color="#5DA7DB" />
                <Text style={styles.address}>{item.possible}</Text>
              </View>

              <View style={styles.tagRow}>
                {item.tags.map((tag, idx) => (
                  <View key={idx} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.reasonBox}>
        <Text style={styles.reasonTitle}>기관 추천 이유</Text>
        <Text style={styles.reasonText}>
          회원님의 <Text style={styles.bold}>치매 케어 + 청결</Text> 조건과 가장 잘 맞는 기관입니다.
          사랑재 요양원은 <Text style={styles.bold}>치매 전문, 인지훈련</Text> 서비스를 제공하며{" "}
          리뷰에서는 <Text style={styles.bold}>청결함</Text>이 높게 평가되었습니다.
        </Text>
      </View>

      <View style={styles.bottomBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/screen/Home")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>확인했어요</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const CARD_WIDTH = width * 0.75;
const CARD_HEIGHT = 330;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F7FB",
  },

  header: {
    marginTop: 120,
    alignItems: "center",
    marginBottom: 30,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#5DA7DB",
    marginBottom: 5,
  },

  subtitle: {
    color: "#6B7B8C",
    fontSize: 16,
    textAlign: "center",
  },

  cardScroll: {
    paddingHorizontal: 20,
    marginTop: 0,
  },

  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    marginRight: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  cardImage: {
    width: "100%",
    height: 160,
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,
  },

  cardContent: {
    padding: 15,
  },

  cardType: {
    fontSize: 13,
    color: "#6B7B8C",
    marginBottom: 3,
  },

  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#162B40",
    marginBottom: 8,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },

  address: {
    marginLeft: 4,
    color: "#6B7B8C",
    fontSize: 13,
  },

  tagRow: {
    flexDirection: "row",
    marginTop: 10,
  },

  tag: {
    backgroundColor: "#F2F7FB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },

  tagText: {
    fontSize: 12,
    color: "#162B40",
  },

  reasonBox: {
    width: width * 0.88,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignSelf: "center",
    padding: 18,
    marginTop: 50,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  reasonTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#162B40",
    marginBottom: 10,
  },

  reasonText: {
    fontSize: 15,
    color: "#4A5568",
    lineHeight: 22,
  },

  bold: {
    fontWeight: "700",
    color: "#162B40",
  },

  bottomBox: {
    alignItems: "center",
    paddingBottom: 40,
    paddingTop: 30,
  },

  button: {
    backgroundColor: "#5DA7DB",
    width: width * 0.85,
    height: 52,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
