import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import db from "../db/db";

const AddNewScreen = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [age, setAge] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [pImage, setPImage] = useState();

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setAge("");
    setEmail("");
    setPassword("");
    setPImage("");
  };

  const addNewUser = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO students (firstName, lastName, age, email, password, pImage) VALUES (?, ?, ?, ?, ?, ?)",
        [firstName, lastName, age, email, password, pImage],
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) {
            console.log("Student inserted successfully");
            clearFields();
          } else {
            console.log("Failed to insert Student");
          }
        },
        (error) => {
          console.log("Error inserting student:", error);
        }
      );
    });
  };

  const openImagePicker = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    setPImage(base64);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New User</Text>
      <TextInput
        style={styles.inputAndroid}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.inputAndroid}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.inputAndroid}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.inputAndroid}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.inputAndroid}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={openImagePicker}
      >
        <Text style={styles.buttonText}>Add Profile Image</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={addNewUser}>
        <Text style={styles.buttonText}>Save User</Text>
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
  addButton: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  imagePickerButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddNewScreen;
