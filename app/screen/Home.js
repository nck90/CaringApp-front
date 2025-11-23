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

import BottomTabBar from "../../components/BottomTabBar";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();

  const [loaded] = useAssets([
    require("../../assets/images/logo.png"),
    require("../../assets/images/icons/bell.png"),
    require("../../assets/images/search.png"),
    require("../../assets/images/reservation.png"),
    require("../../assets/images/use.png"),
  ]);

  if (!loaded) return null;

  const seniorName = "OOO";
  const guardianName = "OOO";

  return (
    <View style={styles.container}>

      <View style={styles.topRow}>
        <View style={styles.logoBox}>
          <Image
            source={require("../../assets/images/logo.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <TouchableOpacity onPress={() => router.push("/screen/Bell")}>
          <Image
            source={require("../../assets/images/icons/bell.png")}
            style={styles.bell}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bannerBox} />

      <View style={styles.fixedContent}>
        <View style={styles.greetingBox}>
          <Text style={styles.greeting1}>안녕하세요!</Text>
          <Text style={styles.greeting2}>
            {seniorName}님 보호자 {guardianName}님!
          </Text>
        </View>

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

        <TouchableOpacity
          onPress={() => router.push("/screen/Counsel")}
          style={styles.cardWrapperBlueGreen}
        >
          <Image
            source={require("../../assets/images/reservation.png")}
            style={styles.cardImageBlueGreen}
            resizeMode="stretch"
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/screen/Use")}
          style={styles.cardWrapperWhite}
        >
          <Image
            source={require("../../assets/images/use.png")}
            style={styles.cardImageWhite}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
      <BottomTabBar activeKey="home" />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FC",
    paddingTop: 60,
  },
  
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
    marginBottom: 17,
  },

  fixedContent: {
    flexGrow: 0,
    paddingBottom: 40,
  },

  greetingBox: {
    marginLeft: 25,
    marginBottom: 17,
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
    marginBottom: 17,
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
});
