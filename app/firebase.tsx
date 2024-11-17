import { Alert, StyleSheet, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "react-query";
import { router } from "expo-router";
import { ensureUserExists } from "@/clients/firebaseClient";

export default function FirebaseScreen() {
  useQuery<void, Error, void>("ensureFirebaseUserExists", ensureUserExists, {
    onSuccess: () => {
      router.replace("/(tabs)");
    },
    onError: () => {
      Alert.alert(
        "Was not able to setup user",
        "Please try again or contact support (Ragnar...)"
      );
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Fysiken 2.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    alignContent: "center",
    marginBottom: 30,
    color: "#333",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
