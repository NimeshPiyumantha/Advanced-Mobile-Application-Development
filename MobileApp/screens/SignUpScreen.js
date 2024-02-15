import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import db from "../db/db";

const SignUpScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const clearTextfield = () => {
    setName("");
    setEmail("");
    setPassword("");
    setRePassword("");
  };

  const registerUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO user (email,name,password) VALUES (?, ?, ?)",
        [email, name, password],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("User inserted successfully");
            clearTextfield();
          } else {
            console.log("Failed to insert user");
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
      <Text style={styles.title}>Register</Text>
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
      <TextInput
        style={styles.inputAndroid}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={rePassword}
        onChangeText={setRePassword}
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
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputAndroid: {
    width: "100%",
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    fontSize: 16,
    fontWeight: "bold",
    elevation: 2,
  },
  registerButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default SignUpScreen;
