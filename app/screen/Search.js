import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Search() {
  const router = useRouter();
  const [institutions, setInstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 백엔드 API 호출
  useEffect(() => {
    async function fetchInstitutions() {
      try {
        // 📌 실제 API 사용 시
        // const res = await fetch("https://api/기관찾기");
        // const data = await res.json();
        // setInstitutions(data);

        // 🔥 지금은 테스트용 mock (10개로 늘림 → 스크롤 확인 쉽게)
        const mockData = Array.from({ length: 12 }).map((_, i) => ({
          id: i + 1,
          name: `기관 이름 ${i + 1}`,
          address: "서울시 어딘가 ○○동",
          type: i % 2 === 0 ? "요양원" : "데이케어센터",
        }));

        setInstitutions(mockData);
      } catch (err) {
        console.log("API Error: ", err);
      } finally {
        setLoading(false);
      }
    }

    fetchInstitutions();
  }, []);

  return (
    <View style={styles.container}>

      {/* --------------------------------------- */}
      {/* 🔥 기관 리스트 영역 */}
      {/* --------------------------------------- */}
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#5DA7DB" />
        ) : institutions.length === 0 ? (
          <Text style={styles.emptyText}>검색된 기관이 없습니다.</Text>
        ) : (
          institutions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              activeOpacity={0.85}
              onPress={() =>
                router.push(`/screen/InstitutionDetail/${item.id}`)
              }
            >
              <View style={styles.cardInside}>
                <Text style={styles.name}>{item.name}</Text>

                <View style={styles.row}>
                  <Ionicons name="location-sharp" size={15} color="#5DA7DB" />
                  <Text style={styles.address}>{item.address}</Text>
                </View>

                <Text style={styles.type}>{item.type}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      {/* --------------------------------------- */}
      {/* 🔥 하단 탭바 */}
      {/* --------------------------------------- */}
      <View style={styles.bottomBarContainer}>
        <Image
          source={require("../../assets/images/bottomsearch.png")}
          style={styles.bottomImage}
        />

        <View style={styles.iconHitboxes}>
          <TouchableOpacity
            style={[styles.iconButton, { left: "10%" }]}
            onPress={() => router.push("/screen/Recommend")}
          />
          <TouchableOpacity style={[styles.centerButton, { left: "30%" }]} />
          <TouchableOpacity
            style={[styles.iconButton, { left: "50%" }]}
            onPress={() => router.push("/screen/Home")}
          />
          <TouchableOpacity
            style={[styles.iconButton, { left: "70%" }]}
            onPress={() => router.push("/screen/People")}
          />
          <TouchableOpacity
            style={[styles.iconButton, { left: "90%" }]}
            onPress={() => router.push("/screen/Mypage")}
          />
        </View>
      </View>

    </View>
  );
}

/* --------------------------------------- */
/* 스타일 */
/* --------------------------------------- */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
  },

  // 🔥 리스트가 너무 위에서 시작해서 아래로 내림
  content: {
    paddingTop: 80,      // ⬅⬅⬅ 여기 추가됨
    paddingHorizontal: 25,
    paddingBottom: 160,  // 하단바 가리지 않도록
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: "#999",
    marginTop: 50,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  cardInside: {
    flexDirection: "column",
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: "#162B40",
    marginBottom: 5,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  address: {
    marginLeft: 4,
    fontSize: 13,
    color: "#6B7B8C",
  },

  type: {
    marginTop: 5,
    fontSize: 13,
    color: "#5DA7DB",
  },

  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 120,
    paddingBottom: 15,
    alignItems: "center",
  },

  bottomImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 604 / 153,
    position: "absolute",
    bottom: 11,
    resizeMode: "contain",
  },

  iconHitboxes: {
    position: "absolute",
    bottom: 18,
    width: "100%",
    height: 55,
  },

  iconButton: {
    position: "absolute",
    width: 55,
    height: 55,
    marginLeft: -27,
  },

  centerButton: {
    position: "absolute",
    width: 65,
    height: 65,
    marginLeft: -32,
  },
});
