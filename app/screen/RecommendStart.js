import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { getInstitutionList } from "../api/institution/profile.api";
import { getPreferenceTags } from "../api/member/member.api";

export default function RecommendStart() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // 진행률 0 → 1
  const progress = useRef(new Animated.Value(0)).current;

  const circleSize = 90;
  const strokeWidth = 8;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 선호 태그를 기관 유형으로 매핑
  const TAG_TO_INSTITUTION_TYPE = {
    16: "DAY_CARE_CENTER", // 주간보호 -> 데이케어센터
    18: "NURSING_HOME", // 장기요양 -> 요양원
    22: "HOME_CARE_SERVICE", // 재가돌봄 -> 재가 돌봄 서비스
  };

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // 1. 선호 태그 조회
        const tagsResponse = await getPreferenceTags();
        const tags = tagsResponse.data.data?.tags || [];
        const tagIds = tags.map((tag) => tag.id);

        // 2. 선호 태그를 기관 유형으로 변환
        const institutionTypes = tagIds
          .map((tagId) => TAG_TO_INSTITUTION_TYPE[tagId])
          .filter(Boolean);

        // 3. 기관 목록 조회 (선호 태그 기반)
        const institutionParams = {
          page: 0,
          size: 10,
          sort: "name,asc",
          isAdmissionAvailable: true,
        };

        // 선호 태그가 있으면 첫 번째 유형으로 필터링
        if (institutionTypes.length > 0) {
          institutionParams.institutionType = institutionTypes[0];
        }

        const institutionsResponse = await getInstitutionList(institutionParams);
        const institutions = institutionsResponse.data.data?.content || [];

        // 4. 추천 결과를 RecommendClear로 전달
        router.push({
          pathname: "/screen/RecommendClear",
          params: {
            institutions: JSON.stringify(institutions),
            tagIds: JSON.stringify(tagIds),
          },
        });
      } catch (error) {
        console.log("Recommendation error:", error);
        // 에러 발생 시 빈 결과로 이동
        router.push({
          pathname: "/screen/RecommendClear",
          params: {
            institutions: JSON.stringify([]),
            tagIds: JSON.stringify([]),
          },
        });
      }
    };

    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: true,
    }).start(() => {
      fetchRecommendations();
    });
  }, []);

  useEffect(() => {
    setTimeout(() => setStep(1), 750);
    setTimeout(() => setStep(2), 1500);
    setTimeout(() => setStep(3), 2250);
  }, []);

  const strokeDashoffset = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      
      <Svg width={circleSize} height={circleSize}>
        <Circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke="#D6EAF8"
          strokeWidth={strokeWidth}
          fill="none"
        />

        <AnimatedCircle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke="#5DA7DB"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          rotation="-90"
          origin={`${circleSize / 2}, ${circleSize / 2}`}
        />
      </Svg>

      <Text style={styles.title}>잠시만 기다려주세요</Text>
      <Text style={styles.subtitle}>모두에게 만족스러운 기관을 찾고 있어요!</Text>

      <View style={styles.box}>
        <Ionicons
          name={step >= 1 ? "checkmark-circle" : "radio-button-on"}
          size={24}
          color={step >= 1 ? "#5DA7DB" : "#BFD8EC"}
        />
        <Text style={styles.boxText}>위치 기반 분석</Text>
      </View>

      <View style={styles.box}>
        <Ionicons
          name={step >= 2 ? "checkmark-circle" : "radio-button-on"}
          size={24}
          color={step >= 2 ? "#5DA7DB" : "#BFD8EC"}
        />
        <Text style={styles.boxText}>가격 분석</Text>
      </View>

      <View style={styles.box}>
        <Ionicons
          name={step >= 3 ? "checkmark-circle" : "radio-button-on"}
          size={24}
          color={step >= 3 ? "#5DA7DB" : "#BFD8EC"}
        />
        <Text style={styles.boxText}>선호 요양 시설 분석</Text>
      </View>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5FAFF",
    alignItems: "center",
    paddingTop: 210,
  },
  title: {
    marginTop: 25,
    fontSize: 26 ,
    fontWeight: "700",
    color: "#5DA7DB",
  },
  subtitle: {
    marginTop: 5,
    fontSize: 16,
    color: "#6B7B8C",
    marginBottom: 20,
  },
  box: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },
  boxText: {
    marginLeft: 12,
    fontSize: 16,
    color: "#6B7B8C",
    fontWeight: "500",
  },
});
