import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  Image,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import db from "../db/db";
import * as FileSystem from "expo-file-system";

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [firstName, setFirstName] = useState(selectedItem?.firstName);
  const [lastName, setLastName] = useState(selectedItem?.lastName);
  const [age, setAge] = useState(selectedItem?.age);
  const [email, setEmail] = useState(selectedItem?.email);
  const [password, setPassword] = useState(selectedItem?.password);
  const [pImage, setPImage] = useState(selectedItem?.pImage);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsersFromSQLite();
  }, []);

  const fetchUsersFromSQLite = () => {
    db.transaction((tx) => {
      tx.executeSql("SELECT * FROM students", [], (_, { rows: { _array } }) => {
        setUsers(_array);
      });
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

  const updateUserData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "UPDATE students SET firstName=?, lastName=?, age=?, email=?, password=?, pImage=? WHERE id=?",
        [
          selectedItem.firstName,
          selectedItem.lastName,
          selectedItem.age,
          selectedItem.email,
          selectedItem.password,
          pImage,
          selectedItem.id,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            fetchUsersFromSQLite();
            closeModal();
          }
        }
      );
    });
    closeModal();
  };

  const deleteUserData = () => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM students WHERE id=?",
        [selectedItem.id],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            fetchUsersFromSQLite();
            closeModal();
          }
        }
      );
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        setSelectedItem(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.row}>
        <Image
          style={styles.profileImage}
          source={{ uri: `data:image/png;base64,${item.pImage}` }}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <View style={styles.column}>
            <View style={styles.row}>
              <Text style={styles.label}>User ID:</Text>
              <Text>{item.id}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>First Name:</Text>
              <Text>{item.firstName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Last Name:</Text>
              <Text>{item.lastName}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Age:</Text>
              <Text>{item.age}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Email:</Text>
              <Text>{item.email}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Password:</Text>
              <Text>{item.password}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  const closeModal = () => {
    setModalVisible(false);
    setSelectedItem(null);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Manage Student</Text>
          <Text style={styles.sTitle}>User ID: {selectedItem?.id}</Text>
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={selectedItem?.firstName}
            onChangeText={(text) => {
              setFirstName(text);
              setSelectedItem({ ...selectedItem, firstName: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={selectedItem?.lastName}
            onChangeText={(text) => {
              setLastName(text);
              setSelectedItem({ ...selectedItem, lastName: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={selectedItem?.age}
            onChangeText={(text) => {
              setAge(text);
              setSelectedItem({ ...selectedItem, age: text });
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={selectedItem?.email}
            onChangeText={(text) => {
              setEmail(text);
              setSelectedItem({ ...selectedItem, email: text });
            }}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            value={selectedItem?.password}
            onChangeText={(text) => {
              setPassword(text);
              setSelectedItem({ ...selectedItem, password: text });
            }}
          />

          <TouchableOpacity
            style={styles.imagePickerButton}
            onPress={openImagePicker}
          >
            <Text style={styles.buttonText}>
              {pImage ? "Image is Uploaded" : "Update Profile Image"}
            </Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#eccc68" }]}
              onPress={updateUserData}
            >
              <Text style={[styles.buttonText, { color: "#2f3542" }]}>
                Edit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#dc3545" }]}
              onPress={deleteUserData}
            >
              <Text style={[styles.buttonText, { color: "black" }]}>
                Delete
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: "#487eb0" }]}
              onPress={closeModal}
            >
              <Text style={[styles.buttonText, { color: "white" }]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    borderRadius: 30,
  },
  flatListContent: {
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 30,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 60,
  },
  profileImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 50,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#487eb0",
  },
  sTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: "bold",
  },
  detailsContainer: {
    marginLeft: 10,
    flex: 1,
    flexDirection: "row",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 3,
  },
  column: {
    flex: 1,
    margin: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 5,
    fontSize: 15,
  },
  imagePickerButton: {
    backgroundColor: "#7f8fa6",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  imagePickerButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;
