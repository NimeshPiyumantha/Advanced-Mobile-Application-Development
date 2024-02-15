import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import db from "../db/db";

const SignInScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  clearTextfield = () => {
    setEmail("");
    setPassword("");
  };

  const handleLogin = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM user WHERE email = ?",
        [email],
        (_, { rows: { _array } }) => {
          if (_array.length === 0) {
            alert("User not found");
          } else {
            const user = _array[0];
            if (user.password !== password) {
              alert("Invalid password");
            } else {
              clearTextfield();
              navigation.navigate("MainTabs");
            }
          }
        },
        (_, error) => {
          console.log("Error querying user:", error);
        }
      );
    });
  };

  const navigateToRegister = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={navigateToRegister}>
        <Text style={styles.registerLink}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  registerLink: {
    color: "#007bff",
    fontSize: 20,
    marginTop: 6,
    marginBottom: 20,
  },
});

export default SignInScreen;
