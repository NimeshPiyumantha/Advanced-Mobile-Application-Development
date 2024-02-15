import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import db from "../db/db";
import { Ionicons } from "@expo/vector-icons";

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
    <View>
      <ImageBackground
        source={require("../assets/img/bg_1.jpg")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Welcome !</Text>

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
            <Ionicons
              name="arrow-forward"
              size={24}
              color="white"
              style={styles.icon}
            />
          </TouchableOpacity>

          <View style={styles.rowContainer}>
            <Text style={{ fontSize: 17 }}>Don't have an account? </Text>
            <TouchableOpacity onPress={navigateToRegister}>
              <Text style={styles.registerLink}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    marginTop: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 50,
    marginRight: 180,
    color: "#487eb0",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#7f8fa6",
    borderRadius: 15,
    fontSize: 16,
    backgroundColor: "#f5f6fa",
    elevation: 5,
  },
  loginButton: {
    backgroundColor: "#487eb0",
    padding: 13,
    marginTop: 20,
    borderRadius: 25,
    width: "80%",
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    marginRight: 5,
    fontWeight: "bold",
  },
  icon: {
    marginLeft: 5,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  registerLink: {
    marginLeft: 5,
    color: "#007bff",
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default SignInScreen;
