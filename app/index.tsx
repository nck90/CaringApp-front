import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { getAccessToken } from "./utils/tokenHelper";

export default function Index() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuthAndNavigate = async () => {
      try {
        // 토큰 확인
        const token = await getAccessToken();
        
        if (token) {
          // 토큰이 있으면 홈 화면으로
          router.replace("/screen/Home");
        } else {
          // 토큰이 없으면 로그인 화면으로
          router.replace("/screen/Login");
        }
      } catch (error) {
        console.log("Auth check error:", error);
        // 에러 발생 시 로그인 화면으로
        router.replace("/screen/Login");
      } finally {
        setIsChecking(false);
      }
    };

    if (router && router.replace) {
      checkAuthAndNavigate();
    }
  }, [router]);

  // 로딩 중일 때 스플래시 화면 표시
  if (isChecking) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#5DA7DB" />
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
});
