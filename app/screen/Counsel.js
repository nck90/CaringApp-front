import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import BottomTabBar from "../../components/BottomTabBar";

export default function Counsel() {
  const router = useRouter();

  const [chatList, setChatList] = useState([
    {
      id: 1,
      name: "사랑재 요양원",
      image:
        "https://cdn.pixabay.com/photo/2020/01/28/12/38/building-4803763_1280.jpg",
      lastMessage: "마지막 채팅 내용",
      lastTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      unread: 1,
    },
    {
      id: 2,
      name: "행복노인센터",
      image:
        "https://cdn.pixabay.com/photo/2016/11/29/02/02/architecture-1867426_1280.jpg",
      lastMessage: "안녕하세요 문의드립니다.",
      lastTime: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      unread: 0,
    },
    {
      id: 3,
      name: "온기요양원",
      image:
        "https://cdn.pixabay.com/photo/2020/01/20/16/43/house-4781961_1280.jpg",
      lastMessage: "감사합니다!",
      lastTime: new Date(Date.now() - 380 * 24 * 60 * 60 * 1000),
      unread: 3,
    },
  ]);

  const getDateLabel = (time) => {
    const now = new Date();
    const diff = Math.floor((now - time) / (1000 * 60 * 60 * 24));

    if (diff === 0) return "오늘";
    if (diff === 1) return "어제";
    if (diff <= 6) return `${diff}일 전`;

    const year = time.getFullYear();
    const month = String(time.getMonth() + 1).padStart(2, "0");
    const day = String(time.getDate()).padStart(2, "0");
    const nowYear = now.getFullYear();

    if (year !== nowYear) {
      const shortYear = String(year).slice(2);
      return `${shortYear}/${month}/${day}`;
    }

    return `${month}/${day}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>상담</Text>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.listArea}>
        {chatList.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.8}
            style={styles.card}
            onPress={() =>
              router.push(`/screen/CounselChat?name=${item.name}`)
            }
          >
            <Image source={{ uri: item.image }} style={styles.thumb} />

            <View style={styles.infoBox}>
              <Text style={styles.nameText}>{item.name}</Text>
              <Text style={styles.messageText}>{item.lastMessage}</Text>
            </View>

            <View style={styles.rightBox}>
              <Text style={styles.dateText}>{getDateLabel(item.lastTime)}</Text>

              {item.unread > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{item.unread}</Text>
                </View>
              ) : (
                <View style={{ height: 22 }} /> 
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={{ height: 140 }} />
      </ScrollView>

      <BottomTabBar activeKey="counsel" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
    paddingTop: 60,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#162B40",
    paddingHorizontal: 20,
    marginBottom: 15,
  },

  listArea: {
    paddingHorizontal: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 10,
  },

  thumb: {
    width: 55,
    height: 55,
    borderRadius: 12,
  },

  infoBox: {
    flex: 1,
    marginLeft: 12,
  },

  nameText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#162B40",
  },

  messageText: {
    marginTop: 4,
    fontSize: 16,
    color: "#5F6F7F",
  },

  rightBox: {
    alignItems: "center",
    justifyContent: "center",
    width: 70,
  },

  dateText: {
    fontSize: 16,
    color: "#162B40",
    marginBottom: 5,
  },

  badge: {
    backgroundColor: "#FF8A3D",
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
  },

  badgeText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
