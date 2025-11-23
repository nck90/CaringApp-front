import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function Institution() {
  const router = useRouter();
  const { id, keyword } = useLocalSearchParams();

  const [data, setData] = useState(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const mock = {
        id,
        name: "사랑재 요양원",
        type: "요양원",
        address: "서울시 광진구 자양로188",
        available: true,
        imageUrl:
          "https://cdn.pixabay.com/photo/2020/01/28/12/38/building-4803763_1280.jpg",
        tags: ["치매", "청결"],
        description:
          "사랑재 요양원은 어르신들의 편안한 생활을 위해 최적의 케어 환경을 제공합니다.",
        staff: [
          {
            id: 1,
            name: "김미정",
            career: "경력 10년",
            license: "자격증 보유",
            image:
              "https://cdn.pixabay.com/photo/2021/08/01/19/16/woman-6512419_1280.jpg",
          },
          {
            id: 2,
            name: "박지은",
            career: "경력 7년",
            license: "자격증 보유",
            image:
              "https://cdn.pixabay.com/photo/2019/11/29/02/02/architecture-1867426_1280.jpg",
          },
        ],
        reviews: [
          {
            id: 1,
            name: "이**",
            rating: 4,
            content: "친절하고 좋아요!",
            tags: ["청결함", "서비스", "친절"],
          },
          {
            id: 2,
            name: "윤**",
            rating: 5,
            content: "세심히 케어해주고 좋습니다.",
            tags: ["청결함", "시설"],
          },
          {
            id: 3,
            name: "박**",
            rating: 3,
            content: "어머니가 좋아하세요.",
            tags: ["청결", "친절"],
          },
        ],
      };

      setData(mock);
    };
    fetchData();
  }, [id]);

  if (!data) return null;

  const visibleReviews = expanded ? data.reviews : data.reviews.slice(0, 2);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() =>
          router.push(`/screen/InstitutionResult?keyword=${keyword}`)
        }
      >
        <Ionicons name="chevron-back" size={26} color="#FFFFFF" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: data.imageUrl }} style={styles.topImage} />

        <View style={styles.contentBox}>
          <Text style={styles.typeText}>{data.type}</Text>
          <Text style={styles.nameText}>{data.name}</Text>

          <View style={styles.row}>
            <Ionicons name="location-outline" size={18} color="#5DA7DB" />
            <Text style={styles.addressText}>{data.address}</Text>
          </View>

          <View style={styles.row}>
            <Ionicons
              name="home-outline"
              size={18}
              color={data.available ? "#5DA7DB" : "#A0A9B2"}
            />
            <Text
              style={[
                styles.availableText,
                !data.available && { color: "#A0A9B2" },
              ]}
            >
              {data.available ? "입소 가능" : "입소 불가능"}
            </Text>
          </View>

          <View style={styles.tagRow}>
            {data.tags.map((t) => (
              <View key={t} style={styles.tagBox}>
                <Text style={styles.tagText}>{t}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionCard}>
            <Text style={styles.descriptionText}>{data.description}</Text>
          </View>

          <Text style={styles.sectionTitle}>직원 정보</Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginTop: 10 }}
          >
            {data.staff.map((s) => (
              <View key={s.id} style={styles.staffCard}>
                <Image source={{ uri: s.image }} style={styles.staffImage} />
                <Text style={styles.staffName}>{s.name}</Text>
                <Text style={styles.staffDetail}>{s.career}</Text>
                <Text style={styles.staffDetail}>{s.license}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={{ marginTop: 25 }}>
            <Text style={styles.sectionTitle}>
              모든 리뷰 ({data.reviews.length}개)
            </Text>

            {visibleReviews.map((r) => (
              <View key={r.id} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewName}>{r.name}</Text>

                  <View style={{ flexDirection: "row", marginLeft: 6 }}>
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Ionicons
                        key={`filled-${i}`}
                        name="star"
                        size={16}
                        color="#FFD700"
                        style={{ marginLeft: 2 }}
                      />
                    ))}

                    {Array.from({ length: 5 - r.rating }).map((_, i) => (
                      <Ionicons
                        key={`empty-${i}`}
                        name="star-outline"
                        size={16}
                        color="#C4C4C4"
                        style={{ marginLeft: 2 }}
                      />
                    ))}
                  </View>
                </View>

                <Text style={styles.reviewContent}>{r.content}</Text>

                <View style={styles.reviewTagRow}>
                  {r.tags.map((t) => (
                    <View key={t} style={styles.reviewTagBox}>
                      <Text style={styles.reviewTagText}>{t}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}

            {!expanded && (
              <TouchableOpacity
                style={styles.moreBtn}
                onPress={() => setExpanded(true)}
              >
                <Text style={styles.moreBtnText}>모두보기</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.actionRow}>
            <TouchableOpacity
              style={styles.actionLeft}
              onPress={() => router.push("/screen/counsel")}
            >
              <Text style={styles.actionLeftText}>상담하기</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionRight}
              onPress={() => router.push("/screen/reservation")}
            >
              <Text style={styles.actionRightText}>예약하기</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      <Image
        source={require("../../assets/images/bottomsearch.png")}
        style={styles.bottomTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
  },

  backButton: {
    position: "absolute",
    top: 60,
    left: 10,
    zIndex: 20,
  },

  topImage: {
    width: "100%",
    height: 260,
  },

  contentBox: {
    paddingHorizontal: 20,
    marginTop: -20,
  },

  typeText: {
    fontSize: 16,
    color: "#5DA7DB",
  },

  nameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "#162B40",
    marginTop: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },

  addressText: {
    fontSize: 16,
    marginLeft: 6,
    color: "#162B40",
  },

  availableText: {
    fontSize: 16,
    marginLeft: 6,
    color: "#162B40",
  },

  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },

  tagBox: {
    backgroundColor: "#6B7B8C11",
    borderWidth: 1,
    borderColor: "#6B7B8C",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },

  tagText: {
    fontSize: 15,
    color: "#2C3E50",
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },

  descriptionText: {
    fontSize: 16,
    lineHeight: 23,
    color: "#162B40",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#162B40",
    marginTop: 25,
  },

  staffCard: {
    backgroundColor: "#FFFFFF",
    width: 160,
    borderRadius: 16,
    padding: 15,
    marginRight: 15,
    elevation: 2,
  },

  staffImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
  },

  staffName: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
  },

  staffDetail: {
    fontSize: 14,
    color: "#5F6F7F",
    marginTop: 2,
  },

  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    marginTop: 15,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },

  reviewName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#162B40",
    marginRight: 5,
  },

  reviewContent: {
    fontSize: 16,
    color: "#162B40",
    marginTop: 6,
    marginBottom: 10,
  },

  reviewTagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  reviewTagBox: {
    backgroundColor: "#6B7B8C11",
    borderWidth: 1,
    borderColor: "#6B7B8C",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginTop: 4,
  },

  reviewTagText: {
    fontSize: 14,
    color: "#2C3E50",
  },

  moreBtn: {
    backgroundColor: "#FFFFFF",
    alignSelf: "center",
    marginTop: 15,
    paddingVertical: 10,
    paddingHorizontal: 26,
    borderRadius: 10,
  },

  moreBtnText: {
    fontSize: 16,
    color: "#5DA7DB",
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
  },

  actionLeft: {
    flex: 1,
    backgroundColor: "#D7E5F0",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginRight: 10,
  },

  actionLeftText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#5DA7DB",
  },

  actionRight: {
    flex: 1,
    backgroundColor: "#5DA7DB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginLeft: 10,
  },

  actionRightText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  bottomTab: {
    width: "100%",
    height: undefined,
    aspectRatio: 604 / 153,
    position: "absolute",
    bottom: 5,
    resizeMode: "contain",
  },
});
