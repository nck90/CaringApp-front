import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function Bell() {
  const router = useRouter();

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const mockData = [
      { id: 1, message: "알림" },
      { id: 2, message: "API 연결해두기" },
    ];

    setNotifications(mockData);
  }, []);

  return (
    <View style={styles.container}>

      {/* ----------------------------------- */}
      {/*   ⬅ + 알림   (IDPW와 동일 위치)    */}
      {/* ----------------------------------- */}
      <View style={styles.topRow}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="chevron-back" size={28} color="#162B40" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>알림</Text>
      </View>

      {/* ----------------------------------- */}
      {/*  알림 내역  → 큰 타이틀 위치로 이동   */}
      {/* ----------------------------------- */}
      <Text style={styles.sectionTitle}>알림 내역</Text>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 40 }}
      >
        {notifications.map((item) => (
          <View key={item.id} style={styles.notificationBox}>
            <View style={styles.iconCircle}>
              <Image
                source={require("../../assets/images/icons/bell.png")}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.notificationText}>{item.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
  },

  /* ----------------------------------- */
  /*   ⬅ + 알림  (IDPW 스타일 반영)      */
  /* ----------------------------------- */
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 50,
    marginLeft: 25,
  },

  backButton: {
    marginRight: 5,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#162B40",
  },

  /* ----------------------------------- */
  /*   알림 내역 → 큰 제목처럼 옮김       */
  /* ----------------------------------- */
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#2C3E50",
    marginTop: 25,
    marginLeft: 25,
    marginBottom: 20,
  },

  notificationBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 18,
    paddingHorizontal: 15,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },

  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 2,
    borderColor: "#5DA7DB",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  icon: {
    width: 18,
    height: 18,
  },

  notificationText: {
    marginLeft: 15,
    fontSize: 14,
    color: "#6B7B8C",
  },
});
