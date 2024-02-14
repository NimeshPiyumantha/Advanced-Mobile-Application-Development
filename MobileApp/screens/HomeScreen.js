import React, { useState } from "react";
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

const DATA = [
  {
    id: "1",
    firstName: "Nimesh",
    lastName: "Piyumantha",
    age: "22",
    email: "saas@dsads",
    password: "123",
    pImage: "https://placebear.com/g/200/200",
  },
  {
    id: "2",
    firstName: "Akila",
    lastName: "Piyumantha",
    age: "24",
    email: "ssdaas@dsads",
    password: "1233",
    pImage: "https://placebear.com/g/200/200",
  },
  // Add more vehicles as needed
];

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const [firstName, setFirstName] = useState(selectedItem?.firstName);
  const [lastName, setLastName] = useState(selectedItem?.lastName);
  const [age, setAge] = useState(selectedItem?.age);
  const [email, setEmail] = useState(selectedItem?.email);
  const [password, setPassword] = useState(selectedItem?.password);
  const [pImage, setPImage] = useState(selectedItem?.pImage);
  const [person, setPerson] = useState(DATA);

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

    setPImage(result.uri);
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
          source={{ uri: item.pImage }}
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
        data={DATA}
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
          <Text style={styles.title}>Edit Profile</Text>
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
            <Text style={styles.buttonText}>Add Profile Image</Text>
          </TouchableOpacity>
          <Text style={styles.imagePickerButtonText}>
            {pImage ? "Profile Image Added!" : ""}
          </Text>

          <View style={styles.buttonContainer}>
            <Button
              title="  Edit  "
              color="#eccc68"
              titleStyle={{ color: "#2f3542" }}
              onPress={() => {
                console.log(
                  `Id: ${selectedItem.id}, First Name: ${selectedItem.firstName}, Last Name: ${selectedItem.lastName}, Age: ${selectedItem.age}, Email: ${selectedItem.email}, Profile Image: ${pImage}`
                );
              }}
            />
            <Button
              title="  Delete "
              color="#dc3545"
              titleStyle={{ color: "white" }}
              onPress={() => {
                console.log(`Id: ${selectedItem.id}`);
              }}
            />
            <Button
              title="  Close  "
              color="#6c757d"
              titleStyle={{ color: "white" }}
              onPress={closeModal}
            />
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
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 20,
    fontSize: 18,
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
  },
  sTitle: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
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
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
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
