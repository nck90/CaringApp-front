import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const router = useRouter();

  // 🔥 이미지 미리 로딩 (로고 + SNS 이미지)
  const [loaded] = useAssets([
    require("../../assets/images/logo.png"),
    require("../../assets/images/naver.png"),
    require("../../assets/images/google.png"),
    require("../../assets/images/kakao.png"),
  ]);

  // 로딩 끝날 때까지 화면 렌더 안함 → 이미지 깜빡임 / 딜레이 제거
  if (!loaded) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        {/* 로고 */}
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

        {/* 입력 필드 */}
        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              focusedField === "id" && styles.inputFocused,
            ]}
            placeholder="아이디"
            placeholderTextColor="#A0AEC0"
            value={id}
            onChangeText={setId}
            onFocus={() => setFocusedField("id")}
            onBlur={() => setFocusedField("")}
            underlineColorAndroid="transparent"
            selectionColor="#5DA7DB"
          />

          <TextInput
            style={[
              styles.input,
              focusedField === "password" && styles.inputFocused,
            ]}
            placeholder="비밀번호"
            placeholderTextColor="#A0AEC0"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField("")}
            underlineColorAndroid="transparent"
            selectionColor="#5DA7DB"
          />
        </View>

        {/* 링크 */}
        <View style={styles.linkRow}>
          <TouchableOpacity onPress={() => router.push("/screen/SelfIdentification")}>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        {/* 로그인 버튼 */}
        <TouchableOpacity
          style={[
            styles.loginButton,
            !(id && password) && styles.loginButtonDisabled,
          ]}
          disabled={!(id && password)}
        >
          <Text style={styles.loginButtonText}>로그인</Text>
        </TouchableOpacity>

        {/* SNS 로그인 */}
        <Text style={styles.snsTitle}>SNS 계정으로 로그인</Text>
        <View style={styles.snsRow}>
          <TouchableOpacity style={[styles.snsCircle, styles.naver]}>
            <Image
              source={require("../../assets/images/naver.png")}
              style={styles.snsIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.snsCircle, styles.google]}>
            <Image
              source={require("../../assets/images/google.png")}
              style={styles.snsIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.snsCircle, styles.kakao]}>
            <Image
              source={require("../../assets/images/kakao.png")}
              style={styles.snsIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 140,
  },
  logo: {
    width: width * 0.75,
    height: 130,
    marginBottom: 50,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 10,
  },
  input: {
    backgroundColor: "#F7F9FB",
    borderColor: "#E2E8F0",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    height: 50,
    fontSize: 16,
    marginBottom: 10,
    color: "#162B40",
  },
  inputFocused: {
    borderColor: "#5DA7DB",
    borderWidth: 1.8,
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "80%",
    marginTop: 6,
  },
  linkText: {
    color: "#6B7B8C",
    fontSize: 15,
  },
  separator: {
    color: "#CBD5E0",
    marginHorizontal: 8,
    fontSize: 15,
  },
  loginButton: {
    width: "80%",
    height: 50,
    backgroundColor: "#5DA7DB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  loginButtonDisabled: {
    backgroundColor: "#D7E5F0",
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  snsTitle: {
    color: "#6B7B8C",
    fontSize: 15,
    marginTop: 45,
    marginBottom: 12,
  },
  snsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  snsCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  snsIcon: {
    width: 26,
    height: 26,
    resizeMode: "contain",
  },
  kakao: {
    backgroundColor: "#FEE500",
  },
  naver: {
    backgroundColor: "#04B916",
  },
  google: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
});
