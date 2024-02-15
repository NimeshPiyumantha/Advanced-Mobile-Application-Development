import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import db from "../db/db";
import { showAlert } from "./util/alert";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearTextfield = () => {
    setName("");
    setEmail("");
    setPassword("");
  };

  const registerUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO user (email,name,password) VALUES (?, ?, ?)",
        [email, name, password],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            showAlert("Sign Up Success", "You have successfully signed up!");
            clearTextfield();
          } else {
            showAlert("Sign Up Failed", "Failed to sign up!");
          }
        },
        (error) => {
          console.log("Error inserting user:", error);
        }
      );
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.inputAndroid}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.inputAndroid}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputAndroid}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.registerButton} onPress={registerUser}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f6fa",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#487eb0",
  },
  inputAndroid: {
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
  registerButton: {
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
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
