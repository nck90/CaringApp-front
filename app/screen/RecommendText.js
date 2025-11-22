import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function RecommendText() {
  const router = useRouter();
  const [text, setText] = useState("");

  return (
    <View style={styles.container}>
      {/* 상단 텍스트 */}
      <View style={styles.header}>
        <Text style={styles.title}>어르신은 어떤 분이신가요?</Text>
        <Text style={styles.subtitle}>어르신에게 맞는 기관을 추천하기 위해</Text>
        <Text style={styles.subtitle}>
          어르신의 성격, 행동 패턴 등을 입력해주세요
        </Text>
      </View>

      {/* 중앙 텍스트 입력 박스 */}
      <View style={styles.inputBox}>
        <TextInput
          style={styles.textInput}
          multiline
          value={text}
          onChangeText={setText}
          placeholder={`예)\n어머니가 사람 많은 곳을 힘들어하세요.\n활동적인 프로그램을 선호하세요.`}
          placeholderTextColor="#A0AEC0"
          textAlignVertical="top"
          underlineColorAndroid="transparent" // Android 밑줄 제거
        />
      </View>

      {/* 하단 버튼 — RecommendClear.js와 위치 동일 */}
      <View style={styles.bottomBox}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/screen/RecommendStart")}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>기관 추천받기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

/* ------------------------------- */
/* 스타일 */
/* ------------------------------- */

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

  /* 텍스트 입력 박스 */
  inputBox: {
    width: width * 0.88,
    height: 260,
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    alignSelf: "center",
    padding: 15,

    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,

    borderWidth: 0,     // 🔥 포커스 시 테두리 제거
    outlineStyle: "none",
  },

  textInput: {
    flex: 1,
    color: "#162B40",
    fontSize: 16,
    lineHeight: 22,

    borderWidth: 0,     // 🔥 포커스 시 검정 테두리 완전 제거
    outlineStyle: "none",
  },

  /* 하단 박스 — RecommendClear.js와 동일 */
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
