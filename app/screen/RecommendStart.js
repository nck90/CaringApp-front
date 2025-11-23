import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

export default function RecommendStart() {
  const router = useRouter();
  const [step, setStep] = useState(0);

  // 진행률 0 → 1
  const progress = useRef(new Animated.Value(0)).current;

  const circleSize = 90;
  const strokeWidth = 8;
  const radius = (circleSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  // 🔵 원형 채워지기 애니메이션
  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,        // 전체 원을 채움
      duration: 3000,    // 🔥 로딩 6초
      useNativeDriver: true,
    }).start(() => {
      // 🔥 6초 완료 → 다음 페이지로 이동
      router.push("/screen/RecommendClear");
    });
  }, []);

  // 🔵 체크박스 순서 진행
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
      
      {/* 🔥 채워지는 원형 Progress Circle */}
      <Svg width={circleSize} height={circleSize}>
        {/* 배경 원 */}
        <Circle
          cx={circleSize / 2}
          cy={circleSize / 2}
          r={radius}
          stroke="#D6EAF8"
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* 진행 원 */}
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

      {/* 체크 1 */}
      <View style={styles.box}>
        <Ionicons
          name={step >= 1 ? "checkmark-circle" : "radio-button-on"}
          size={24}
          color={step >= 1 ? "#5DA7DB" : "#BFD8EC"}
        />
        <Text style={styles.boxText}>위치 기반 분석</Text>
      </View>

      {/* 체크 2 */}
      <View style={styles.box}>
        <Ionicons
          name={step >= 2 ? "checkmark-circle" : "radio-button-on"}
          size={24}
          color={step >= 2 ? "#5DA7DB" : "#BFD8EC"}
        />
        <Text style={styles.boxText}>가격 분석</Text>
      </View>

      {/* 체크 3 */}
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
