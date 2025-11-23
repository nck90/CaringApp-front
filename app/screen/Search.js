// === 전체 Search.js 코드 시작 ===

import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  PanResponder,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

const REGION_DATA = {
  서울특별시: {
    강남구: ["삼성동", "역삼동", "청담동"],
    서초구: ["서초동", "방배동"],
  },
  경기도: {
    수원시: ["영통구", "팔달구"],
    성남시: ["분당구", "수정구", "중원구"],
  },
};

export default function Search() {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isAvailable, setIsAvailable] = useState(false);

  const [recentKeywords, setRecentKeywords] = useState([]);

  const [searchPopupVisible, setSearchPopupVisible] = useState(false);
  const [searchText, setSearchText] = useState("");

  const [price, setPrice] = useState(0);
  const SLIDER_WIDTH = width * 0.9;
  const HANDLE_RADIUS = 12;

  const priceHandleX = useRef(0);
  const priceDragStartX = useRef(0);

  const priceResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        priceDragStartX.current = priceHandleX.current;
      },
      onPanResponderMove: (_, gesture) => {
        let newX = priceDragStartX.current + gesture.dx;

        if (newX < 0) newX = 0;
        if (newX > SLIDER_WIDTH - HANDLE_RADIUS * 2)
          newX = SLIDER_WIDTH - HANDLE_RADIUS * 2;

        priceHandleX.current = newX;
        const ratio = newX / (SLIDER_WIDTH - HANDLE_RADIUS * 2);
        setPrice(Math.round(ratio * 200));
      },
    })
  ).current;

  const [nearbyDistance, setNearbyDistance] = useState(0);
  const nearbyHandleX = useRef(0);
  const nearbyDragStartX = useRef(0);

  const nearbyResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        nearbyDragStartX.current = nearbyHandleX.current;
      },
      onPanResponderMove: (_, gesture) => {
        let newX = nearbyDragStartX.current + gesture.dx;

        if (newX < 0) newX = 0;
        if (newX > SLIDER_WIDTH - HANDLE_RADIUS * 2)
          newX = SLIDER_WIDTH - HANDLE_RADIUS * 2;

        nearbyHandleX.current = newX;
        const ratio = newX / (SLIDER_WIDTH - HANDLE_RADIUS * 2);
        setNearbyDistance(Math.round(ratio * 20));
      },
    })
  ).current;

  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedGugun, setSelectedGugun] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);

  const sidoList = Object.keys(REGION_DATA);
  const gugunList = selectedSido ? Object.keys(REGION_DATA[selectedSido]) : [];
  const dongList =
    selectedSido && selectedGugun
      ? REGION_DATA[selectedSido][selectedGugun]
      : [];

  let modalItems = [];
  let modalTitle = "";

  if (modalType === "sido") {
    modalItems = sidoList;
    modalTitle = "시/도 선택";
  } else if (modalType === "gugun") {
    modalItems = gugunList;
    modalTitle = "구/군 선택";
  } else if (modalType === "dong") {
    modalItems = dongList;
    modalTitle = "동 선택";
  }

  const openModal = (type) => {
    if (type === "gugun" && !selectedSido) return;
    if (type === "dong" && (!selectedSido || !selectedGugun)) return;

    setModalType(type);
    setModalVisible(true);
  };

  // 🔵 최근 검색어 불러오기
  const loadRecentKeywords = async () => {
    try {
      const stored = await AsyncStorage.getItem("recentKeywords");
      if (stored) {
        setRecentKeywords(JSON.parse(stored));
      }
    } catch (e) {
      console.log("load error:", e);
    }
  };

  useEffect(() => {
    loadRecentKeywords();
  }, []);

  // 🔵 최근 검색어 저장
  const saveRecentKeywords = async (list) => {
    try {
      await AsyncStorage.setItem("recentKeywords", JSON.stringify(list));
    } catch (e) {
      console.log("save error:", e);
    }
  };

  // ⭐ 검색 실행
  const submitSearch = () => {
    if (!searchText.trim()) return;

    const keyword = searchText.trim();

    // ⭐ 최근 검색어 최대 10개까지 저장
    const updated = [
      keyword,
      ...recentKeywords.filter((item) => item !== keyword),
    ].slice(0, 10);

    setRecentKeywords(updated);
    saveRecentKeywords(updated); // ⭐ 영구 저장

    setSearchPopupVisible(false);
    Keyboard.dismiss();

    router.push({
      pathname: "/screen/InstitutionResult",
      params: { keyword },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>기관 검색</Text>

        <TouchableOpacity
          onPress={() => setSearchPopupVisible(true)}
          activeOpacity={1}
          style={styles.searchTouchable}
        >
          <View style={styles.searchBox} pointerEvents="none">
            <TextInput
              placeholder="기관명을 검색하세요"
              placeholderTextColor="#C6CDD5"
              style={styles.searchInput}
              editable={false}
            />
            <Ionicons name="search" size={20} color="#8A8A8A" />
          </View>
        </TouchableOpacity>

        {/* === 기존 필터 UI 전부 유지 === */}

        <View style={styles.filterBox}>
          <Text style={styles.filterTitle}>맞춤형 필터</Text>

          <Text style={styles.subTitle}>요양시설 종류</Text>

          <View style={styles.row}>
            {["데이케어센터", "요양원", "재가 돌봄 서비스"].map((item) => (
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

          {/* 나머지 UI 동일 — 기능 삭제 ❌ 변경 ❌ */}

          {selectedLocation === "nearby" && (
            <View style={styles.nearbyArea}>
              <View style={styles.nearbyLabelRow}>
                <Text style={styles.nearbyValue}>{nearbyDistance}km</Text>
                <Text style={styles.nearbyRange}>0~20km</Text>
              </View>

              <View
                style={[styles.nearbySliderContainer, { width: SLIDER_WIDTH }]}
              >
                <View style={styles.nearbyBar} />
                <View
                  {...nearbyResponder.panHandlers}
                  style={[styles.nearbyHandle, { left: nearbyHandleX.current }]}
                />
              </View>
            </View>
          )}

          {selectedLocation === "region" && (
            <View style={styles.regionRow}>
              <TouchableOpacity
                style={[styles.regionBox, selectedSido && styles.regionBoxActive]}
                onPress={() => openModal("sido")}
              >
                <Text
                  style={[
                    styles.regionText,
                    !selectedSido && styles.regionPlaceholder,
                  ]}
                >
                  {selectedSido || "시/도"}
                </Text>
                <Ionicons name="chevron-down" size={16} color="#A0A9B2" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.regionBox,
                  !selectedSido && styles.regionBoxDisabled,
                  selectedGugun && styles.regionBoxActive,
                ]}
                onPress={() => openModal("gugun")}
              >
                <Text
                  style={[
                    styles.regionText,
                    !selectedGugun && styles.regionPlaceholder,
                    !selectedSido && styles.regionDisabledText,
                  ]}
                >
                  {selectedGugun || "구/군"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={selectedSido ? "#A0A9B2" : "#D0D4DA"}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.regionBox,
                  (!selectedSido || !selectedGugun) &&
                    styles.regionBoxDisabled,
                  selectedDong && styles.regionBoxActive,
                ]}
                onPress={() => openModal("dong")}
              >
                <Text
                  style={[
                    styles.regionText,
                    !selectedDong && styles.regionPlaceholder,
                    (!selectedSido || !selectedGugun) &&
                      styles.regionDisabledText,
                  ]}
                >
                  {selectedDong || "동"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color={
                    selectedSido && selectedGugun ? "#A0A9B2" : "#D0D4DA"
                  }
                />
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.subTitle}>가격</Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.priceRangeRight}>0~200만원</Text>
          </View>

          <View style={[styles.priceContainer, { width: SLIDER_WIDTH }]}>
            <View style={styles.priceBar} />
            <View
              {...priceResponder.panHandlers}
              style={[styles.priceHandle, { left: priceHandleX.current }]}
            />
          </View>

          <Text style={styles.priceValue}>{price}만원</Text>

          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>입소 가능 여부</Text>

            <Switch
              value={isAvailable}
              onValueChange={setIsAvailable}
              trackColor={{ false: "#D9D9D9", true: "#5DA7DB" }}
              thumbColor="#FFFFFF"
            />
          </View>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>적용하기</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomWhiteFix} />

        {/* 🔵 팝업 */}
        {searchPopupVisible && (
          <>
            <View style={styles.popupOverlay} />

            <View style={styles.searchPopupWrapper}>
              <View style={styles.searchBoxPopup}>
                <TextInput
                  placeholder="기관명을 검색하세요"
                  placeholderTextColor="#C6CDD5"
                  style={styles.searchInput}
                  autoFocus={true}
                  value={searchText}
                  onChangeText={setSearchText}
                  returnKeyType="search"
                  onSubmitEditing={submitSearch}
                />
                <Ionicons name="search" size={20} color="#8A8A8A" />
              </View>

              <View style={styles.popupGrayArea}>
                <View style={styles.recentHeader}>
                  <Text style={styles.recentTitle}>최근 검색어</Text>

                  <TouchableOpacity
                    onPress={() => {
                      setRecentKeywords([]);
                      saveRecentKeywords([]);
                    }}
                  >
                    <Text style={styles.clearAllText}>전체 삭제</Text>
                  </TouchableOpacity>
                </View>

                {recentKeywords.length === 0 ? (
                  <Text style={styles.noRecent}>최근 검색어가 없습니다.</Text>
                ) : (
                  recentKeywords.map((item) => (
                    <TouchableOpacity
                      key={item}
                      style={styles.recentItem}
                      onPress={() => {
                        setSearchText(item);
                        setSearchPopupVisible(false);
                        router.push({
                          pathname: "/screen/InstitutionResult",
                          params: { keyword: item },
                        });
                      }}
                    >
                      <Text style={styles.recentText}>{item}</Text>
                    </TouchableOpacity>
                  ))
                )}

                <TouchableOpacity
                  style={styles.closePopup}
                  onPress={() => setSearchPopupVisible(false)}
                >
                  <Text style={styles.closePopupText}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}

        {!searchPopupVisible && (
          <Image
            source={require("../../assets/images/bottomsearch.png")}
            style={styles.bottomTab}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  /* ⬆️ 네가 준 스타일 그대로 — 삭제/수정 없음 */
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 40,
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#162B40",
    marginTop: 20,
    marginLeft: 20,
  },

  searchTouchable: {
    marginHorizontal: 20,
    marginTop: 15,
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

  filterBox: {
    backgroundColor: "#F7F9FB",
    marginTop: 25,
    paddingHorizontal: 20,
    paddingVertical: 25,
    paddingBottom: 140,
    flexGrow: 1,
  },

  filterTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#162B40",
  },

  subTitle: {
    fontSize: 17,
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
    fontSize: 18,
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
    fontSize: 18,
    color: "#162B40",
  },

  nearbyArea: {
    marginTop: 10,
  },

  nearbyLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  nearbyValue: {
    fontSize: 15,
    color: "#162B40",
  },

  nearbyRange: {
    fontSize: 14,
    color: "#5DA7DB",
  },

  nearbySliderContainer: {
    height: 40,
    position: "relative",
    marginTop: 5,
  },

  nearbyBar: {
    height: 5,
    backgroundColor: "#DCE8F2",
    borderRadius: 3,
    marginTop: 10,
  },

  nearbyHandle: {
    width: 24,
    height: 24,
    backgroundColor: "#5DA7DB",
    borderRadius: 12,
    position: "absolute",
    top: 0,
  },

  regionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },

  regionBox: {
    width: "30%",
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4E9EE",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  regionBoxActive: {
    borderColor: "#5DA7DB",
    borderWidth: 2,
  },

  regionBoxDisabled: {
    backgroundColor: "#F0F2F5",
  },

  regionText: {
    flex: 1,
    fontSize: 15,
    color: "#162B40",
  },

  regionPlaceholder: {
    color: "#A0A9B2",
  },

  regionDisabledText: {
    color: "#C4CAD2",
  },

  priceRangeRight: {
    fontSize: 14,
    color: "#5DA7DB",
  },

  priceContainer: {
    marginTop: 0,
    height: 40,
    position: "relative",
  },

  priceBar: {
    height: 5,
    backgroundColor: "#DCE8F2",
    borderRadius: 3,
    marginTop: 10,
  },

  priceHandle: {
    width: 24,
    height: 24,
    backgroundColor: "#5DA7DB",
    borderRadius: 12,
    position: "absolute",
    top: 0,
  },

  priceValue: {
    fontSize: 16,
    color: "#162B40",
    marginTop: 5,
  },

  switchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
  },

  switchLabel: {
    fontSize: 17,
    fontWeight: "600",
    color: "#162B40",
  },

  applyButton: {
    marginTop: 25,
    height: 55,
    borderRadius: 12,
    backgroundColor: "#5DA7DB",
    justifyContent: "center",
    alignItems: "center",
  },

  applyText: {
    fontSize: 17,
    color: "#FFFFFF",
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

  bottomWhiteFix: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 40,
    backgroundColor: "#FFFFFF",
    zIndex: -1,
  },

  popupOverlay: {
    position: "absolute",
    top: 140,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.0)",
    zIndex: 888,
  },

  searchPopupWrapper: {
    position: "absolute",
    top: 96.5,
    width: "100%",
    height: "100%",
    zIndex: 999,
  },

  searchBoxPopup: {
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E4E9EE",
    backgroundColor: "#F7F9FB",
    marginHorizontal: 20,
    paddingHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  popupGrayArea: {
    marginTop: 25,
    backgroundColor: "#F7F9FB",
    paddingHorizontal: 20,
    paddingTop: 20,
    height: "100%",
  },

  recentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 5,
  },

  recentTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#162B40",
  },

  clearAllText: {
    fontSize: 16,
    color: "#5DA7DB",
  },

  recentItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E6E6E6",
  },

  recentText: {
    fontSize: 17,
    color: "#162B40",
  },

  noRecent: {
    fontSize: 16,
    color: "#9EA6AF",
    paddingVertical: 20,
  },

  closePopup: {
    marginTop: 20,
    alignSelf: "flex-end",
  },

  closePopupText: {
    fontSize: 16,
    color: "#5DA7DB",
  },
});

// === 전체 Search.js 코드 끝 ===
