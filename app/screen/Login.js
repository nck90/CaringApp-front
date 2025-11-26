import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
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

import { loginUser, loginOAuth2 } from "../api/auth/auth.api";
import { saveTokens } from "../utils/tokenHelper";

const { width } = Dimensions.get("window");

export default function Login() {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [loaded] = useAssets([
    require("../../assets/images/logo.png"),
    require("../../assets/images/naver.png"),
    require("../../assets/images/google.png"),
    require("../../assets/images/kakao.png"),
  ]);

  const handleLogin = async () => {
    if (!id || !password) {
      Alert.alert("입력 오류", "아이디와 비밀번호를 입력해주세요.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await loginUser({
        username: id,
        password: password,
      });

      const { access_token, refresh_token } = response.data.data || response.data;
      
      if (access_token) {
        await saveTokens(access_token, refresh_token);
        // 홈 화면으로 이동
        router.replace("/screen/Home");
      } else {
        Alert.alert("로그인 실패", "로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      console.log("Login error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
      Alert.alert("로그인 실패", errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = async (provider) => {
    setIsLoading(true);
    try {
      // TODO: 실제 OAuth 플로우 구현 필요
      // 1. OAuth 제공자로 리다이렉트하여 authorization_code 받기
      // 2. 받은 authorization_code를 백엔드에 전달
      
      // 현재는 placeholder - 실제 구현 시 expo-auth-session 사용
      Alert.alert(
        "준비 중",
        `${provider} 로그인은 현재 준비 중입니다. 일반 로그인을 이용해주세요.`
      );
      
      // 실제 구현 예시 (주석 처리):
      // const authResult = await promptAsync();
      // if (authResult.type === 'success') {
      //   const response = await loginOAuth2(provider, {
      //     authorization_code: authResult.params.code,
      //     state: authResult.params.state,
      //   });
      //   const { access_token, refresh_token } = response.data.data || response.data;
      //   if (access_token) {
      //     await saveTokens(access_token, refresh_token);
      //     router.replace("/(tabs)");
      //   }
      // }
    } catch (error) {
      console.log("OAuth login error:", error);
      Alert.alert("로그인 실패", "소셜 로그인에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!loaded) return null;

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />

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

        <View style={styles.linkRow}>
          <TouchableOpacity onPress={() => router.push("/screen/SelfIdentification")}>
            <Text style={styles.linkText}>회원가입</Text>
          </TouchableOpacity>
          <Text style={styles.separator}>|</Text>
          <TouchableOpacity>
            <Text style={styles.linkText}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={[
            styles.loginButton,
            (!(id && password) || isLoading) && styles.loginButtonDisabled,
          ]}
          disabled={!(id && password) || isLoading}
          onPress={handleLogin}
        >
          <Text style={styles.loginButtonText}>
            {isLoading ? "로그인 중..." : "로그인"}
          </Text>
        </TouchableOpacity>

        <Text style={styles.snsTitle}>SNS 계정으로 로그인</Text>
        <View style={styles.snsRow}>
          <TouchableOpacity
            style={[styles.snsCircle, styles.naver]}
            onPress={() => handleOAuthLogin("naver")}
            disabled={isLoading}
          >
            <Image
              source={require("../../assets/images/naver.png")}
              style={styles.snsIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.snsCircle, styles.google]}
            onPress={() => handleOAuthLogin("google")}
            disabled={isLoading}
          >
            <Image
              source={require("../../assets/images/google.png")}
              style={styles.snsIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.snsCircle, styles.kakao]}
            onPress={() => handleOAuthLogin("kakao")}
            disabled={isLoading}
          >
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
