import { Alert } from "react-native";

export const showAlert = (title, message, onPressHandler) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: "OK",
        onPress: onPressHandler
          ? onPressHandler
          : () => console.log("OK Pressed"),
      },
    ],
    { cancelable: false }
  );
};
