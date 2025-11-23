import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

const { width } = Dimensions.get("window");

// 하단바 전체 높이
const TAB_HEIGHT = 95;

// 돋보기 원형 크기
const CIRCLE_SIZE = 60;

// 패인 부분 너비 (기존 유지)
const CURVE_WIDTH = 135;

// 패인 깊이 (기존 유지)
const CURVE_DEPTH = 40;

// 모서리 둥글게 정도 (너가 요청한 그 기능)
const CURVE_SOFTEN = 30;

export default function BottomTabBar({ activeKey }) {
  const router = useRouter();
  const go = (path) => router.push(path);

  const ACTIVE = "#5DA7DB";
  const INACTIVE = "#C6CEDA";

  // === 기존 코드 그대로 ===
  const tabWidth = width / 5;
  const searchCenterX = tabWidth * 1.625;

  // === 패인데 곡선 계산 (내가 만든 부드러운 곡선) ===
  const startX = searchCenterX - CURVE_WIDTH / 2;
  const midX = searchCenterX;
  const endX = searchCenterX + CURVE_WIDTH / 2;

  return (
    <View style={styles.wrapper}>

      {/* === 패인데 곡선만 교체 === */}
      <Svg width={width} height={TAB_HEIGHT} style={styles.svg}>
        <Path
          d={`
            M0 0
            H${startX}

            C${startX + CURVE_SOFTEN} 0,
             ${midX - CURVE_SOFTEN} ${CURVE_DEPTH},
             ${midX} ${CURVE_DEPTH}

            C${midX + CURVE_SOFTEN} ${CURVE_DEPTH},
             ${endX - CURVE_SOFTEN} 0,
             ${endX} 0

            H${width}
            V${TAB_HEIGHT}
            H0
            Z
          `}
          fill="#FFFFFF"
        />
      </Svg>

      {/* === 아이콘 영역 (절대 수정 금지 영역) === */}
      <View style={styles.tabContainer}>

        {/* 1. 기관 추천 */}
        <TouchableOpacity style={styles.tabBtn} onPress={() => go("/screen/Recommend")}>
          <Ionicons name="star-outline" size={30} color={activeKey === "recommend" ? ACTIVE : INACTIVE} />
          <Text style={[styles.label, activeKey === "recommend" && styles.activeLabel]}>
            기관 추천
          </Text>
        </TouchableOpacity>

        {/* 2. 기관 검색 (원형 위치 그대로 유지) */}
        <TouchableOpacity style={styles.tabBtn} onPress={() => go("/screen/Search")}>

          {/* === 돋보기 원형: 네 코드 그대로 === */}
          <View style={styles.circleWrapper}>
            <View style={styles.circle}>
              <Ionicons name="search" size={32} color={ACTIVE} />
            </View>
          </View>

          <Text
            style={[
              styles.label,
              activeKey === "search" && styles.activeLabel,
              { marginTop: 38 }
            ]}
          >
            기관 검색
          </Text>
        </TouchableOpacity>

        {/* 3. 홈 */}
        <TouchableOpacity style={styles.tabBtn} onPress={() => go("/screen/Home")}>
          <Ionicons name="home-outline" size={30} color={activeKey === "home" ? ACTIVE : INACTIVE} />
          <Text style={[styles.label, activeKey === "home" && styles.activeLabel]}>홈</Text>
        </TouchableOpacity>

        {/* 4. 상담 */}
        <TouchableOpacity style={styles.tabBtn} onPress={() => go("/screen/Consult")}>
          <Ionicons name="people-outline" size={30} color={activeKey === "consult" ? ACTIVE : INACTIVE} />
          <Text style={[styles.label, activeKey === "consult" && styles.activeLabel]}>상담</Text>
        </TouchableOpacity>

        {/* 5. 마이페이지 */}
        <TouchableOpacity style={styles.tabBtn} onPress={() => go("/screen/Mypage")}>
          <Ionicons name="person-outline" size={30} color={activeKey === "mypage" ? ACTIVE : INACTIVE} />
          <Text style={[styles.label, activeKey === "mypage" && styles.activeLabel]}>마이페이지</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: TAB_HEIGHT,
    alignItems: "center",
  },
  svg: {
    position: "absolute",
    bottom: 0,
  },
  tabContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 8,
  },
  tabBtn: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: -2,
  },
  label: {
    fontSize: 15,
    color: "#C6CEDA",
    marginTop: 4,
  },
  activeLabel: {
    color: "#5DA7DB",
    fontWeight: "600",
  },

  /* === 돋보기 원형: 네 코드 그대로 유지 === */
  circleWrapper: {
    position: "absolute",
    top: -40,
    left: "50%",
    marginLeft: -(CIRCLE_SIZE / 2),
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
});
