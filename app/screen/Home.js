import { useAssets } from "expo-asset";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();

  // 🔥 모든 이미지 미리 로딩
  const [loaded] = useAssets([
    require("../../assets/images/logo.png"),
    require("../../assets/images/icons/bell.png"),
    require("../../assets/images/search.png"),
    require("../../assets/images/reservation.png"),
    require("../../assets/images/use.png"),
    require("../../assets/images/bottomhome.png"),
  ]);

  // 로딩 전 화면 렌더 X → 이미지가 즉시 뜨게 됨
  if (!loaded) return null;

  const seniorName = "OOO";
  const guardianName = "OOO";

  return (
    <View style={styles.container}>

      {/* --------------------------- */}
      {/* 상단 로고 + 벨 */}
      {/* --------------------------- */}
      <View style={styles.topRow}>
        <View style={styles.logoBox}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity onPress={() => router.push("/screen/bell")}>
          <Image
            source={require("../../assets/images/icons/bell.png")}
            style={styles.bell}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* 광고 */}
      <View style={styles.bannerBox} />

      {/* --------------------------- */}
      {/* 고정 콘텐츠 */}
      {/* --------------------------- */}
      <View style={styles.fixedContent}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting1}>안녕하세요!</Text>
          <Text style={styles.greeting2}>
            {seniorName}님 보호자 {guardianName}님!
          </Text>
        </View>

        {/* 파란 박스 */}
        <TouchableOpacity
          onPress={() => router.push("/screen/Search")}
          style={styles.cardWrapperBlueGreen}
        >
          <Image
            source={require("../../assets/images/search.png")}
            style={styles.cardImageBlueGreen}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        {/* 초록 박스 */}
        <TouchableOpacity
          onPress={() => router.push("/screen/reservation")}
          style={styles.cardWrapperBlueGreen}
        >
          <Image
            source={require("../../assets/images/reservation.png")}
            style={styles.cardImageBlueGreen}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        {/* 하얀 박스 */}
        <TouchableOpacity
          onPress={() => router.push("/screen/use")}
          style={styles.cardWrapperWhite}
        >
          <Image
            source={require("../../assets/images/use.png")}
            style={styles.cardImageWhite}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* --------------------------- */}
      {/* 하단 네비바 */}
      {/* --------------------------- */}
      <View style={styles.bottomBarContainer}>

        <Image
          source={require("../../assets/images/bottomhome.png")}
          style={styles.bottomImage}
        />

        <View style={styles.iconHitboxes}>
          <TouchableOpacity
            style={[styles.iconButton, { left: "10%" }]}
            onPress={() => router.push("/screen/Recommend")}
          />

          <TouchableOpacity
            style={[styles.iconButton, { left: "30%" }]}
            onPress={() => router.push("/screen/Search")}
          />

          <TouchableOpacity
            style={[styles.centerButton, { left: "50%" }]}
          />

          <TouchableOpacity
            style={[styles.iconButton, { left: "70%" }]}
            onPress={() => router.push("/screen/People")}
          />

          <TouchableOpacity
            style={[styles.iconButton, { left: "90%" }]}
            onPress={() => router.push("/screen/Mypage")}
          />
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingTop: 60,
  },

  /* 상단 */
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 15,
  },

  logoBox: {
    marginLeft: -70,
  },

  logo: {
    width: 220,
    height: 70,
  },

  bell: {
    width: 32,
    height: 32,
  },

  bannerBox: {
    width: "90%",
    height: 80,
    backgroundColor: "#EAEAEA",
    borderRadius: 12,
    alignSelf: "center",
    marginBottom: 23,
  },

  fixedContent: {
    flexGrow: 0,
    paddingBottom: 40,
  },

  greetingBox: {
    marginLeft: 25,
    marginBottom: 23,
  },

  greeting1: {
    fontSize: 20,
    fontWeight: "600",
    color: "#5DA7DB",
  },

  greeting2: {
    fontSize: 20,
    fontWeight: "700",
    color: "#5DA7DB",
    marginTop: 3,
  },

  cardWrapperBlueGreen: {
    width: "90%",
    height: 150,
    alignSelf: "center",
    marginBottom: 23,
  },

  cardImageBlueGreen: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  cardWrapperWhite: {
    width: "90%",
    height: 120,
    alignSelf: "center",
    marginBottom: 12,
    backgroundColor: "#F7F9FC",
    justifyContent: "center",
    alignItems: "center",
  },

  cardImageWhite: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },

  bottomBarContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingBottom: 15,
    alignItems: "center",
  },

  bottomImage: {
    width: "100%",
    height: undefined,
    aspectRatio: 604 / 153,
    position: "absolute",
    bottom: 11,
    resizeMode: "contain",
  },

  iconHitboxes: {
    position: "absolute",
    bottom: 18,
    width: "100%",
    height: 45,
  },

  iconButton: {
    position: "absolute",
    width: 55,
    height: 55,
    borderRadius: 28,
    marginLeft: -27,
  },

  centerButton: {
    position: "absolute",
    width: 70,
    height: 70,
    borderRadius: 35,
    marginLeft: -35,
  },
});
