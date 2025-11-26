import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Keyboard,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { WebView } from "react-native-webview";

import ProgressBar from "../../components/ProgressBar";
import { useProgress } from "../context/ProgressContext";
import { useSignup } from "../context/SignupContext";

export default function SeniorInfo() {
  const router = useRouter();
  const { updateSignup } = useSignup();

  const { setProgress } = useProgress();
  useEffect(() => {
    setProgress(0.8);
  }, []);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    year: "",
    month: "",
    day: "",
    gender: "",
    address: "",
  });

  const [errors, setErrors] = useState({});
  const [modalYear, setModalYear] = useState(false);
  const [modalMonth, setModalMonth] = useState(false);
  const [modalDay, setModalDay] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const validate = (name, value) => {
    switch (name) {
      case "name":
        return value.trim() ? "" : "이름을 입력해주세요.";
      case "phone": {
        const nums = value.replace(/[^0-9]/g, "");
        return nums.length >= 11 ? "" : "전화번호 11자리를 입력해주세요.";
      }
      case "year":
      case "month":
      case "day":
        return value ? "" : "필수 선택 항목입니다.";
      case "gender":
        return value ? "" : "성별을 선택해주세요.";
      case "address":
        return value.trim() ? "" : "주소를 입력해주세요.";
      default:
        return "";
    }
  };

  const handlePhoneChange = (text) => {
    let nums = text.replace(/[^0-9]/g, "").slice(0, 11);

    if (nums.length > 7)
      nums = nums.replace(/(\d{3})(\d{4})(\d{1,4})/, "$1-$2-$3");
    else if (nums.length > 3)
      nums = nums.replace(/(\d{3})(\d{1,4})/, "$1-$2");

    setForm({ ...form, phone: nums });
    setErrors({ ...errors, phone: validate("phone", nums) });
  };

  const handleChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const isValidField = (name) => form[name] && !validate(name, form[name]);

  const isFormValid =
    form.name &&
    form.phone &&
    form.year &&
    form.month &&
    form.day &&
    form.gender &&
    form.address &&
    Object.values(errors).every((err) => !err);

  const handleSubmit = () => {
    if (!isFormValid) {
      Alert.alert("입력 오류", "입력값을 다시 확인해주세요.");
      return;
    }

    // 🔥 Senior 정보 Context에 저장
    updateSignup({
      senior: {
        name: form.name,
        phone: form.phone,
        birth_date: `${form.year}-${form.month}-${form.day}`,
        gender: form.gender,
        address: form.address,
      },
    });

    router.push("/screen/SeniorHealthInfo");
  };

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      const address = data.address || data.roadAddress || "";
      if (address) {
        handleChange("address", address);
        setModalVisible(false);
      }
    } catch (e) {}
  };

  const kakaoAddressHTML = `
    <!DOCTYPE html>
    <html lang="ko">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      <script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
      <style>
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; }
        #container { width: 100%; height: 100%; }
      </style>
    </head>
    <body>
      <div id="container"></div>
      <script>
        window.onload = function () {
          new daum.Postcode({
            oncomplete: function(data) {
              window.ReactNativeWebView.postMessage(JSON.stringify(data));
            },
            width: "100%",
            height: "100%"
          }).embed(document.getElementById("container"));
        };
      </script>
    </body>
    </html>
  `;

  const years = Array.from({ length: 120 }, (_, i) => `${2025 - i}`);
  const months = Array.from({ length: 12 }, (_, i) =>
    `${i + 1}`.padStart(2, "0")
  );
  const days = Array.from({ length: 31 }, (_, i) =>
    `${i + 1}`.padStart(2, "0")
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

        <View style={styles.progressContainer}>
          <ProgressBar />
        </View>

        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/screen/PreferredInstitution")}
        >
          <Ionicons name="chevron-back" size={28} color="#162B40" />
        </TouchableOpacity>

        <View style={styles.header}>
          <Text style={styles.title}>어르신 기본정보 입력</Text>
          <Text style={styles.subtitle}>어르신의 기본정보를 입력해주세요</Text>
        </View>

        <View style={styles.form}>
          <LabeledInput
            label="성함"
            placeholder="어르신 성함 입력"
            value={form.name}
            error={errors.name}
            valid={isValidField("name")}
            onChangeText={(t) => handleChange("name", t)}
          />

          <LabeledInput
            label="전화번호"
            placeholder="어르신 전화번호 입력"
            value={form.phone}
            error={errors.phone}
            valid={isValidField("phone")}
            onChangeText={handlePhoneChange}
          />

          <Text style={styles.label}>어르신 생년월일</Text>

          <View style={styles.birthRow}>
            <TouchableOpacity
              style={[
                styles.birthBox,
                { marginRight: 8 },
                form.year && styles.birthSelected,
              ]}
              onPress={() => setModalYear(true)}
            >
              <Text
                style={[
                  styles.birthText,
                  { color: form.year ? "#162B40" : "#9CA3AF" },
                ]}
              >
                {form.year || "연도"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.birthBox,
                { marginRight: 8 },
                form.month && styles.birthSelected,
              ]}
              onPress={() => setModalMonth(true)}
            >
              <Text
                style={[
                  styles.birthText,
                  { color: form.month ? "#162B40" : "#9CA3AF" },
                ]}
              >
                {form.month || "월"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.birthBox,
                form.day && styles.birthSelected,
              ]}
              onPress={() => setModalDay(true)}
            >
              <Text
                style={[
                  styles.birthText,
                  { color: form.day ? "#162B40" : "#9CA3AF" },
                ]}
              >
                {form.day || "일"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.error}>
            {errors.year || errors.month || errors.day || " "}
          </Text>

          {/* 성별 */}
          <View style={{ marginTop: 15 }}>
            <Text style={styles.label}>성별</Text>

            <View style={styles.genderRow}>
              <TouchableOpacity
                style={[
                  styles.genderBox,
                  { marginRight: 8 },
                  form.gender === "남성" && styles.genderMaleSelected,
                ]}
                onPress={() => handleChange("gender", "남성")}
              >
                <Text
                  style={[
                    styles.genderText,
                    form.gender === "남성" && styles.genderTextSelected,
                  ]}
                >
                  남성
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.genderBox,
                  form.gender === "여성" && styles.genderFemaleSelected,
                ]}
                onPress={() => handleChange("gender", "여성")}
              >
                <Text
                  style={[
                    styles.genderText,
                    form.gender === "여성" && styles.genderTextSelected,
                  ]}
                >
                  여성
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.error}>{errors.gender || " "}</Text>
          </View>

          {/* 주소 */}
          <View style={{ marginTop: 15 }}>
            <Text style={styles.label}>주소</Text>

            <View
              style={[
                styles.inputLikeBox,
                errors.address
                  ? { borderColor: "#FF3F1D" }
                  : form.address
                  ? { borderColor: "#5DA7DB" }
                  : { borderColor: "#E5E7EB" },
              ]}
            >
              <View pointerEvents="none" style={{ flex: 1 }}>
                <Text
                  style={{
                    color: form.address ? "#162B40" : "#9CA3AF",
                    fontSize: 16,
                  }}
                >
                  {form.address || "주소 입력"}
                </Text>
              </View>

              <TouchableOpacity
                style={styles.addressButton}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.addressButtonText}>주소 찾기</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.error}>{errors.address || " "}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isFormValid ? "#5DA7DB" : "#D7E5F0" },
          ]}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>다음</Text>
        </TouchableOpacity>

        {/* 주소 모달 */}
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <WebView
                style={{ flex: 1 }}
                originWhitelist={["*"]}
                source={{
                  html: kakaoAddressHTML,
                  baseUrl: "https://t1.daumcdn.net",
                }}
                onMessage={handleWebViewMessage}
              />

              <TouchableOpacity
                style={styles.modalCloseButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCloseText}>닫기</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 연/월/일 Picker 모달 */}
        <Modal visible={modalYear} transparent animationType="slide">
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerBox}>
              <Text style={styles.pickerTitle}>연도 선택</Text>

              <Picker
                selectedValue={form.year}
                onValueChange={(v) => handleChange("year", v)}
                style={styles.modalPicker}
              >
                <Picker.Item label="연도" value="" />
                {years.map((y) => (
                  <Picker.Item key={y} label={y} value={y} />
                ))}
              </Picker>

              <TouchableOpacity
                style={styles.pickerConfirm}
                onPress={() => setModalYear(false)}
              >
                <Text style={styles.pickerConfirmText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={modalMonth} transparent animationType="slide">
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerBox}>
              <Text style={styles.pickerTitle}>월 선택</Text>

              <Picker
                selectedValue={form.month}
                onValueChange={(v) => handleChange("month", v)}
                style={styles.modalPicker}
              >
                <Picker.Item label="월" value="" />
                {months.map((m) => (
                  <Picker.Item key={m} label={m} value={m} />
                ))}
              </Picker>

              <TouchableOpacity
                style={styles.pickerConfirm}
                onPress={() => setModalMonth(false)}
              >
                <Text style={styles.pickerConfirmText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Modal visible={modalDay} transparent animationType="slide">
          <View style={styles.pickerOverlay}>
            <View style={styles.pickerBox}>
              <Text style={styles.pickerTitle}>일 선택</Text>

              <Picker
                selectedValue={form.day}
                onValueChange={(v) => handleChange("day", v)}
                style={styles.modalPicker}
              >
                <Picker.Item label="일" value="" />
                {days.map((d) => (
                  <Picker.Item key={d} label={d} value={d} />
                ))}
              </Picker>

              <TouchableOpacity
                style={styles.pickerConfirm}
                onPress={() => setModalDay(false)}
              >
                <Text style={styles.pickerConfirmText}>확인</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
}

function LabeledInput({ label, placeholder, value, error, valid, onChangeText }) {
  const borderColor = error
    ? "#FF3F1D"
    : valid
    ? "#5DA7DB"
    : "#E5E7EB";

  return (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        style={[styles.input, { borderColor }]}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        value={value}
        onChangeText={onChangeText}
      />

      <Text style={styles.error}>{error || " "}</Text>
    </View>
  );
}

/* 스타일은 그대로 유지 */
