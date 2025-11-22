import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Search() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const TYPE_LIST = ["데이케어센터", "요양원", "재가 돌봄 서비스"];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }}>

        <Text style={styles.title}>기관 검색</Text>

        <View style={styles.searchBox}>
          <TextInput
            placeholder="기관명을 검색하세요"
            placeholderTextColor="#C6CDD5"
            style={styles.searchInput}
          />
          <Ionicons name="search" size={20} color="#8A8A8A" />
        </View>

        <View style={styles.filterBox}>
          <Text style={styles.filterTitle}>맞춤형 필터</Text>

          <Text style={styles.subTitle}>요양시설 종류</Text>
          <View style={styles.row}>
            {TYPE_LIST.map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.typeButton,
                  selectedType === item && styles.typeButtonActive,
                ]}
                onPress={() => setSelectedType(item)}
              >
                <Text
                  style={[
                    styles.typeText,
                    selectedType === item && styles.typeTextActive,
                  ]}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.subTitle}>위치</Text>

          <View style={styles.radioGroup}>
            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setSelectedLocation("region")}
            >
              <View
                style={[
                  styles.radioCircle,
                  selectedLocation === "region" && styles.radioCircleActive,
                ]}
              />
              <Text style={styles.radioLabel}>지역으로 검색</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.radioItem}
              onPress={() => setSelectedLocation("nearby")}
            >
              <View
                style={[
                  styles.radioCircle,
                  selectedLocation === "nearby" && styles.radioCircleActive,
                ]}
              />
              <Text style={styles.radioLabel}>내 주변에서 검색</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.subTitle}>가격</Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.priceRangeRight}>0~200만원</Text>
          </View>

          <View style={styles.priceBar} />
          <View style={styles.priceHandle} />
          <Text style={styles.priceValue}>0원</Text>

          <Text style={styles.subTitle}>입소 가능 여부</Text>

          <Switch
            value={isAvailable}
            onValueChange={setIsAvailable}
            trackColor={{ false: "#D9D9D9", true: "#5DA7DB" }}
            thumbColor="#FFFFFF"
            style={{ marginTop: 10 }}
          />

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>적용하기</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Image
        source={require("../../assets/images/bottomsearch.png")}
        style={styles.bottomTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#162B40",
    marginTop: 20,
    marginLeft: 20,
  },

  searchBox: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4E9EE",
    backgroundColor: "#F7F9FB",
    marginHorizontal: 20,
    marginTop: 15,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#162B40",
    marginRight: 10,
  },

  filterBox: {
    backgroundColor: "#F7F9FB",
    marginTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 25,
  },

  filterTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#162B40",
  },

  subTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#162B40",
    marginTop: 25,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    marginBottom: 10,
  },

  typeButton: {
    backgroundColor: "#E7EDF2",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginRight: 10,
  },

  typeButtonActive: {
    backgroundColor: "#5DA7DB",
  },

  typeText: {
    fontSize: 14,
    color: "#5F6F7F",
  },

  typeTextActive: {
    color: "#FFFFFF",
  },

  radioGroup: {
    marginTop: 5,
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 8,
  },

  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#C4C4C4",
    marginRight: 12,
  },

  radioCircleActive: {
    backgroundColor: "#5DA7DB",
    borderColor: "#5DA7DB",
  },

  radioLabel: {
    fontSize: 15,
    color: "#162B40",
  },

  priceRangeRight: {
    fontSize: 13,
    color: "#5DA7DB",
  },

  priceBar: {
    marginTop: 15,
    height: 5,
    backgroundColor: "#DCE8F2",
    borderRadius: 3,
  },

  priceHandle: {
    width: 24,
    height: 24,
    backgroundColor: "#5DA7DB",
    borderRadius: 12,
    position: "absolute",
    top: 330,
    left: 20,
  },

  priceValue: {
    marginTop: 10,
    fontSize: 14,
    color: "#162B40",
  },

  applyButton: {
    marginTop: 25,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#D2E4F2",
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    fontSize: 17,
    color: "#A7B9C7",
    fontWeight: "700",
  },

  bottomTab: {
    width: "100%",
    height: undefined,
    aspectRatio: 604 / 153,
    position: "absolute",
    bottom: 11,
    resizeMode: "contain",
  },
});
