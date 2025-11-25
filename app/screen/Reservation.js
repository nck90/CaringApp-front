import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

const WEEKDAY = ["일", "월", "화", "수", "목", "금", "토"];

const MOCK_DATES = [
  "2025-11-23",
  "2025-11-24",
  "2025-11-25",
  "2025-11-26",
  "2025-11-27",
  "2025-11-28",
  "2025-11-29",
];

const MOCK_AM = ["09:00", "09:30", "10:00", "10:30"];
const MOCK_PM = ["12:00", "12:30", "13:00", "13:30", "14:00"];

export default function Reservation() {
  const router = useRouter();
  const { name, id } = useLocalSearchParams(); // 🔥 Institution에서 넘어온 id까지 받음

  const [selectedDate, setSelectedDate] = useState("2025-11-23");
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const getDay = (date) => WEEKDAY[new Date(date).getDay()];
  const getDayNum = (date) => Number(date.split("-")[2]);
  const isSunday = (date) => getDay(date) === "일";

  // 🔥 예약 완료 → ReservationClear로 모든 데이터 전달
  const onSubmit = () => {
    if (!(selectedDate && selectedTime && selectedType)) return;

    router.replace({
      pathname: "/screen/ReservationClear",
      params: {
        name: name || "기관명",
        date: `${selectedDate} ${selectedTime}`,
        mode: selectedType,
      },
    });
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() =>
            router.replace({
              pathname: "/screen/Institution",
              params: { id: id },
            })
          }
        >
          <Ionicons name="chevron-back" size={26} color="#162B40" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>예약하기</Text>
      </View>

      {/* 방문 희망일 */}
      <Text style={styles.sectionTitle}>예약 희망일</Text>
      <Text style={styles.monthLabel}>11월</Text>

      {/* 날짜 스크롤 */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.dateRow}>
          {MOCK_DATES.map((d) => {
            const selected = selectedDate === d;
            const sunday = isSunday(d);

            return (
              <TouchableOpacity
                key={d}
                onPress={() => setSelectedDate(d)}
                style={[styles.dateBox, selected && styles.dateBoxSelected]}
              >
                <Text
                  style={[
                    styles.weekText,
                    sunday && { color: "#FF7F50" },
                    selected && styles.weekTextSelected,
                  ]}
                >
                  {getDay(d)}
                </Text>

                <Text
                  style={[
                    styles.dayText,
                    sunday && { color: "#FF7F50" },
                    selected && styles.dayTextSelected,
                  ]}
                >
                  {getDayNum(d)}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 예약 희망 시간 */}
      <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
        예약 희망 시간
      </Text>

      <Text style={styles.timeSubtitle}>오전</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.timeRow}>
          {MOCK_AM.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedTime(t)}
              style={[styles.timeBox, selectedTime === t && styles.timeSelected]}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === t && styles.timeTextSelected,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text style={[styles.timeSubtitle, { marginTop: 6 }]}>오후</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.timeRow}>
          {MOCK_PM.map((t) => (
            <TouchableOpacity
              key={t}
              onPress={() => setSelectedTime(t)}
              style={[styles.timeBox, selectedTime === t && styles.timeSelected]}
            >
              <Text
                style={[
                  styles.timeText,
                  selectedTime === t && styles.timeTextSelected,
                ]}
              >
                {t}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* 구분선 */}
      <View style={styles.divider} />

      {/* 예약 방식 */}
      <Text style={[styles.sectionTitle, { marginTop: 18 }]}>
        예약 방식
      </Text>

      {["입소 예약", "방문 상담 예약", "전화 상담 예약"].map((label) => (
        <TouchableOpacity
          key={label}
          onPress={() => setSelectedType(label)}
          style={[styles.radioBox, selectedType === label && styles.radioBoxSelected]}
        >
          <View
            style={[
              styles.radioOuter,
              selectedType === label && styles.radioOuterSelected,
            ]}
          >
            {selectedType === label && (
              <MaterialIcons
                name="check"
                size={18}
                color="#FFFFFF"
                style={{ marginLeft: 0.5 }}
              />
            )}
          </View>

          <Text style={styles.radioLabel}>{label}</Text>
        </TouchableOpacity>
      ))}

      {/* 예약 버튼 */}
      <TouchableOpacity
        onPress={onSubmit}
        style={[
          styles.submitBtn,
          !(selectedDate && selectedTime && selectedType) &&
            styles.submitDisabled,
        ]}
      >
        <Text style={styles.submitText}>예약 완료하기</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
    paddingHorizontal: 20,
  },

  header: {
    paddingTop: 60,
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 24,
    marginLeft: 5,
    color: "#162B40",
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "#6B7B8C22",
    marginTop: 30,
    marginBottom: 10,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: "700",
    color: "#162B40",
    marginTop: 30,
  },

  monthLabel: {
    color: "#8A8A8A",
    marginVertical: 10,
    fontSize: 16,
  },

  dateRow: { flexDirection: "row", gap: 12 },

  dateBox: {
    width: 50,
    height: 68,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  dateBoxSelected: {
    backgroundColor: "#5DA7DB33",
    borderWidth: 2,
    borderColor: "#5DA7DB",
  },

  weekText: {
    fontSize: 17,
    color: "#A3A9AE",
    marginBottom: 10,
  },

  weekTextSelected: { color: "#5DA7DB", fontWeight: "700" },

  dayText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#162B40",
  },

  dayTextSelected: { color: "#5DA7DB" },

  timeSubtitle: {
    marginTop: 10,
    marginBottom: 10,
    color: "#7A8793",
    fontSize: 16,
  },

  timeRow: {
    flexDirection: "row",
    gap: 12,
  },

  timeBox: {
    width: 70,
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  timeSelected: {
    backgroundColor: "#5DA7DB33",
    borderColor: "#5DA7DB",
    borderWidth: 2,
  },

  timeText: {
    color: "#36424A",
    fontSize: 17,
  },

  timeTextSelected: {
    color: "#5DA7DB",
    fontWeight: "700",
    fontSize: 17,
  },

  radioBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 2,
    borderColor: "transparent",
  },

  radioBoxSelected: {
    backgroundColor: "#5DA7DB33",
    borderColor: "#5DA7DB",
  },

  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: "#DCE2E9",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  radioOuterSelected: {
    borderColor: "#5DA7DB",
    backgroundColor: "#5DA7DB",
  },

  radioLabel: {
    fontSize: 17,
    color: "#162B40",
  },

  submitBtn: {
    marginTop: 30,
    backgroundColor: "#5DA7DB",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  submitDisabled: {
    backgroundColor: "#C9DCEC",
  },

  submitText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "700",
  },
});
