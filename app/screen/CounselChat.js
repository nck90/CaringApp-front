import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function CounselChat() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams(); // 기관 정보

  const [messages, setMessages] = useState([
    { id: 1, text: "채팅내용", time: "09:46", isMe: true },
    { id: 2, text: "채팅내용", time: "09:46", isMe: false }
  ]);

  const [input, setInput] = useState("");
  const scrollRef = useRef(null);

  const getTime = () => {
    const now = new Date();
    return `${String(now.getHours()).padStart(2, "0")}:${String(
      now.getMinutes()
    ).padStart(2, "0")}`;
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMsg = {
      id: Date.now(),
      text: input,
      time: getTime(),
      isMe: true
    };

    setMessages((prev) => [...prev, newMsg]);
    setInput("");

    setTimeout(() => scrollRef.current?.scrollToEnd({ animated: true }), 30);
  };

  return (
    <View style={styles.container}>

      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => router.back()} 
          style={styles.backBtn}
        >
          <Ionicons name="chevron-back" size={26} color="#162B40" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{name}</Text>

        <View style={{ width: 26 }} />
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? -30 : -30}  
      >
        <ScrollView
          ref={scrollRef}
          style={styles.chatArea}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 5 }}
        >
          {messages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.messageWrapper,
                msg.isMe ? styles.myWrapper : styles.otherWrapper
              ]}
            >
              <View style={styles.rowBubble}>
                {msg.isMe ? (
                  <>
                    <Text style={styles.time}>{msg.time}</Text>
                    <View style={[styles.bubble, styles.myBubble]}>
                      <Text style={[styles.msgText, { color: "#FFFFFF" }]}>
                        {msg.text}
                      </Text>
                    </View>
                  </>
                ) : (
                  <>
                    <View style={[styles.bubble, styles.otherBubble]}>
                      <Text style={styles.msgText}>{msg.text}</Text>
                    </View>
                    <Text style={styles.time}>{msg.time}</Text>
                  </>
                )}
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="상담내용 입력"
            placeholderTextColor="#BFC5CC"
            value={input}
            onChangeText={setInput}
            onSubmitEditing={() => sendMessage()}
            blurOnSubmit={false}
          />

          <TouchableOpacity onPress={sendMessage} style={styles.sendBtn}>
            <Ionicons name="send" size={22} color="#6B7B8C" />
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F9FB",
    paddingTop: 60
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 10
  },

  backBtn: {
    width: 26
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: "#162B40",
    textAlign: "center",
    flex: 1
  },

  chatArea: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 5
  },

  messageWrapper: {
    marginBottom: 18,
    maxWidth: "80%"
  },

  myWrapper: {
    alignSelf: "flex-end"
  },

  otherWrapper: {
    alignSelf: "flex-start"
  },

  rowBubble: {
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%"
  },

  bubble: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    maxWidth: "80%"
  },

  myBubble: {
    backgroundColor: "#5DA7DB",
    borderTopRightRadius: 2
  },

  otherBubble: {
    backgroundColor: "#E7ECF1",
    borderTopLeftRadius: 2
  },

  msgText: {
    fontSize: 17,
    color: "#1d1d1d"
  },

  time: {
    fontSize: 13,
    color: "#8A8A8A",
    marginHorizontal: 6
  },

  inputArea: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 25,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E6E6E6"
  },

  input: {
    flex: 1,
    backgroundColor: "#EEF2F6",
    paddingHorizontal: 12,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 17,
    position: "relative",
    top: -15,   
    height: 45,
  },

  sendBtn: {
    marginLeft: 10,
    height: 45,
    justifyContent: "center",
    position: "relative",
    top: -15  
  }
});
