import { Ionicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  Modal,
  PanResponder,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const REGION_DATA = {
  서울특별시: {
    강남구: ["삼성동", "역삼동", "청담동"],
    서초구: ["서초동", "방배동"],
    마포구: ["서교동", "합정동"],
  },
  경기도: {
    수원시: ["영통구", "팔달구"],
    성남시: ["분당구", "수정구", "중원구"],
  },
};

export default function Search() {
  const [selectedType, setSelectedType] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // "region" | "nearby"
  const [isAvailable, setIsAvailable] = useState(false);
  const [price, setPrice] = useState(0);

  // 지역 선택 상태
  const [selectedSido, setSelectedSido] = useState(null);
  const [selectedGugun, setSelectedGugun] = useState(null);
  const [selectedDong, setSelectedDong] = useState(null);

  // 모달 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null); // "sido" | "gugun" | "dong"

  const TYPE_LIST = ["데이케어센터", "요양원", "재가 돌봄 서비스"];

  const SLIDER_WIDTH = width * 0.9;
  const HANDLE_RADIUS = 12;

  const handleX = useRef(0);
  const dragStartX = useRef(0);

  // 슬라이더 드래그 핸들러 (이전 위치에서 계속 이동)
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,

      onPanResponderGrant: () => {
        dragStartX.current = handleX.current;
      },

      onPanResponderMove: (_, gesture) => {
        let newX = dragStartX.current + gesture.dx;

        if (newX < 0) newX = 0;
        if (newX > SLIDER_WIDTH - HANDLE_RADIUS * 2) {
          newX = SLIDER_WIDTH - HANDLE_RADIUS * 2;
        }

        const ratio = newX / (SLIDER_WIDTH - HANDLE_RADIUS * 2);
        const newPrice = Math.round(ratio * 200); // 0~200만원

        handleX.current = newX;
        setPrice(newPrice);
      },
    })
  ).current;

  // 지역 선택용 리스트
  const sidoList = Object.keys(REGION_DATA);
  const gugunList =
    selectedSido && REGION_DATA[selectedSido]
      ? Object.keys(REGION_DATA[selectedSido])
      : [];
  const dongList =
    selectedSido && selectedGugun
      ? REGION_DATA[selectedSido][selectedGugun] || []
      : [];

  // 모달에 들어갈 제목/리스트/선택 핸들러
  let modalTitle = "";
  let modalItems = [];
  let onSelectItem = () => {};

  if (modalType === "sido") {
    modalTitle = "시/도 선택";
    modalItems = sidoList;
    onSelectItem = (item) => {
      setSelectedSido(item);
      setSelectedGugun(null);
      setSelectedDong(null);
    };
  } else if (modalType === "gugun") {
    modalTitle = "구/군 선택";
    modalItems = gugunList;
    onSelectItem = (item) => {
      setSelectedGugun(item);
      setSelectedDong(null);
    };
  } else if (modalType === "dong") {
    modalTitle = "동 선택";
    modalItems = dongList;
    onSelectItem = (item) => {
      setSelectedDong(item);
    };
  }

  const openRegionModal = (type) => {
    // 선택 가능한 상태일 때만 모달 열기
    if (type === "gugun" && !selectedSido) return;
    if (type === "dong" && (!selectedSido || !selectedGugun)) return;
    setModalType(type);
    setModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* 제목 */}
        <Text style={styles.title}>기관 검색</Text>

        {/* 검색창 */}
        <View style={styles.searchBox}>
          <TextInput
            placeholder="기관명을 검색하세요"
            placeholderTextColor="#C6CDD5"
            style={styles.searchInput}
          />
          <Ionicons name="search" size={20} color="#8A8A8A" />
        </View>

        {/* 필터 박스 */}
        <View style={styles.filterBox}>
          <Text style={styles.filterTitle}>맞춤형 필터</Text>

          {/* 요양시설 종류 */}
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

          {/* 위치 */}
          <Text style={styles.subTitle}>위치</Text>

          <View style={styles.radioGroup}>
            {/* 지역으로 검색 */}
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

            {/* 내 주변에서 검색 */}
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

          {/* 지역으로 검색 선택 시 시/도·구/군·동 3박스 표시 */}
          {selectedLocation === "region" && (
            <View style={styles.regionRow}>
              {/* 시/도 */}
              <TouchableOpacity
                style={styles.regionBox}
                onPress={() => openRegionModal("sido")}
              >
                <Text
                  style={[
                    styles.regionText,
                    !selectedSido && styles.regionPlaceholder,
                  ]}
                >
                  {selectedSido || "시/도"}
                </Text>
                <Ionicons
                  name="chevron-down"
                  size={16}
                  color="#A0A9B2"
                  style={styles.regionIcon}
                />
              </TouchableOpacity>

              {/* 구/군 */}
              <TouchableOpacity
                style={[
                  styles.regionBox,
                  !selectedSido && styles.regionBoxDisabled,
                ]}
                onPress={() => openRegionModal("gugun")}
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
                  style={styles.regionIcon}
                />
              </TouchableOpacity>

              {/* 동 */}
              <TouchableOpacity
                style={[
                  styles.regionBox,
                  (!selectedSido || !selectedGugun) &&
                    styles.regionBoxDisabled,
                ]}
                onPress={() => openRegionModal("dong")}
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
                  style={styles.regionIcon}
                />
              </TouchableOpacity>
            </View>
          )}

          {/* 가격 */}
          <Text style={styles.subTitle}>가격</Text>

          <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
            <Text style={styles.priceRangeRight}>0~200만원</Text>
          </View>

          <View style={[styles.priceContainer, { width: SLIDER_WIDTH }]}>
            <View style={styles.priceBar} />

            <View
              {...panResponder.panHandlers}
              style={[
                styles.priceHandle,
                { left: handleX.current },
              ]}
            />
          </View>

          <Text style={styles.priceValue}>{price}만원</Text>

          {/* 입소 가능 여부 */}
          <View style={styles.switchRow}>
            <Text style={styles.switchLabel}>입소 가능 여부</Text>

            <Switch
              value={isAvailable}
              onValueChange={setIsAvailable}
              trackColor={{ false: "#D9D9D9", true: "#5DA7DB" }}
              thumbColor="#FFFFFF"
            />
          </View>

          {/* 적용하기 버튼 */}
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyText}>적용하기</Text>
          </TouchableOpacity>
        </View>

        {/* 하단바 이미지 */}
        <Image
          source={require("../../assets/images/bottomsearch.png")}
          style={styles.bottomTab}
        />

        {/* 지역 선택 모달 */}
        <Modal
          visible={modalVisible}
          transparent
          animationType="fade"
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay}>
              <TouchableWithoutFeedback>
                <View style={styles.modalContent}>
                  <Text style={styles.modalTitle}>{modalTitle}</Text>

                  <View style={styles.modalList}>
                    {modalItems.map((item) => (
                      <TouchableOpacity
                        key={item}
                        style={styles.modalItem}
                        onPress={() => {
                          onSelectItem(item);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={styles.modalItemText}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={styles.modalCloseButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.modalCloseText}>닫기</Text>
                  </TouchableOpacity>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: 60,
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
    fontSize: 17,
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

  // 지역 선택 3박스
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

  regionIcon: {
    marginLeft: 4,
  },

  priceRangeRight: {
    fontSize: 14,
    color: "#5DA7DB",
  },

  priceContainer: {
    marginTop: 10,
    height: 40,
    position: "relative",
    justifyContent: "flex-start",
  },

  priceBar: {
    height: 5,
    backgroundColor: "#DCE8F2",
    borderRadius: 3,
    marginTop: 12,
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
    marginTop: 10,
    fontSize: 16,
    color: "#162B40",
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
    marginTop: -2,
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

  // 모달 스타일
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "80%",
    maxHeight: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 16,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#162B40",
    marginBottom: 15,
  },

  modalList: {
    marginBottom: 15,
  },

  modalItem: {
    paddingVertical: 10,
  },

  modalItemText: {
    fontSize: 16,
    color: "#162B40",
  },

  modalCloseButton: {
    alignSelf: "flex-end",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#E4E9EE",
  },

  modalCloseText: {
    fontSize: 14,
    color: "#162B40",
  },
});
