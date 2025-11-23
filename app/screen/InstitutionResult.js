import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BottomTabBar from "../../components/BottomTabBar";

const { width } = Dimensions.get("window");

export default function InstitutionResult() {
  const router = useRouter();
  const { keyword } = useLocalSearchParams();
  const [searchText, setSearchText] = useState(keyword || "");
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!keyword) return;

    const fetchData = async () => {
      const mockData = [
        {
          id: 1,
          name: "사랑재 요양원",
          address: "서울시 광진구 자양로188",
          type: "요양원",
          available: true,
          imageUrl:
            "https://cdn.pixabay.com/photo/2020/01/28/12/38/building-4803763_1280.jpg",
          tags: ["치매", "청결"],
        },
        {
          id: 2,
          name: "행복노인센터",
          address: "서울시 강남구 테헤란로 123",
          type: "데이케어센터",
          available: false,
          imageUrl:
            "https://cdn.pixabay.com/photo/2016/11/29/02/02/architecture-1867426_1280.jpg",
          tags: ["위생"],
        },
      ];
      setResults(mockData);
    };

    fetchData();
  }, [keyword]);

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() =>
            router.push(`/screen/Search?keyword=${searchText}`)
          }
        >
          <Ionicons name="chevron-back" size={26} color="#162B40" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>검색 결과</Text>
      </View>

      <View style={styles.searchBoxWrapper}>
        <View style={styles.searchBox}>
          <TextInput
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            placeholder="기관명을 검색하세요"
            placeholderTextColor="#C6CDD5"
            returnKeyType="search"
            onSubmitEditing={() =>
              router.push(`/screen/InstitutionResult?keyword=${searchText}`)
            }
          />
          <Ionicons name="search" size={20} color="#8A8A8A" />
        </View>
      </View>

      <View style={styles.grayBackground} />

      <ScrollView
        style={styles.resultScroll}
        showsVerticalScrollIndicator={false}
      >
        {results.map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={() =>
              router.push(`/screen/Institution?id=${item.id}&keyword=${keyword}`)
            }
            activeOpacity={0.9}
          >
            <View style={styles.card}>
              <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />

              <View style={styles.cardInfo}>
                <Text style={styles.typeText}>{item.type}</Text>
                <Text style={styles.nameText}>{item.name}</Text>

                <View style={styles.row}>
                  <Ionicons name="location-outline" size={18} color="#5DA7DB" />
                  <Text style={styles.addressText}>{item.address}</Text>
                </View>

                <View style={styles.row}>
                  <Ionicons
                    name="home-outline"
                    size={18}
                    color={item.available ? "#5DA7DB" : "#A0A9B2"}
                  />
                  <Text
                    style={[
                      styles.availableText,
                      !item.available && { color: "#A0A9B2" },
                    ]}
                  >
                    {item.available ? "입소 가능" : "입소 불가능"}
                  </Text>
                </View>

                <View style={styles.tagRow}>
                  {item.tags.map((t) => (
                    <View key={t} style={styles.tagBox}>
                      <Text style={styles.tagText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 140 }} />
      </ScrollView>

      {/* 🔥 새 하단바 적용 */}
      <BottomTabBar activeKey="search" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#162B40",
    marginLeft: 5,
  },
  searchBoxWrapper: {
    marginHorizontal: 20,
    marginTop: 15,
    zIndex: 10,
  },
  searchBox: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4E9EE",
    backgroundColor: "#F7F9FB",
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: "#162B40",
    marginRight: 10,
  },
  grayBackground: {
    position: "absolute",
    top: 155,
    width: "100%",
    height: "100%",
    backgroundColor: "#F7F9FB",
    zIndex: -1,
  },
  resultScroll: {
    marginTop: 15,
    paddingHorizontal: 20,
    backgroundColor: "#F7F9FB",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 14,
    elevation: 2,
    marginTop: 18,
  },
  cardImage: {
    width: 145,
    height: 145,
    borderRadius: 14,
  },
  cardInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "center",
  },
  typeText: {
    fontSize: 16,
    color: "#5DA7DB",
    marginBottom: 4,
  },
  nameText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#162B40",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
  },
  addressText: {
    fontSize: 16,
    color: "#162B40",
    marginLeft: 4,
  },
  availableText: {
    fontSize: 16,
    color: "#162B40",
    marginLeft: 4,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  tagBox: {
    backgroundColor: "#6B7B8C11",
    borderColor: "#6B7B8C",
    borderWidth: 1,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 12,
    marginRight: 8,
    marginTop: 4,
  },
  tagText: {
    fontSize: 15,
    color: "#2C3E50",
  },
});
