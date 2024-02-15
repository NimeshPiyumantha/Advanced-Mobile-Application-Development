import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import AddNewScreen from "./screens/AddNewScreen";
import SignUpScreen from "./screens/SignUpScreen";

const Stack = createNativeStackNavigator();
const BottomTab = createMaterialBottomTabNavigator();

const MainTabs = () => {
  return (
    <BottomTab.Navigator>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Add User"
        component={AddNewScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="plus" color={color} size={26} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="SignIn"
          component={SignInScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUpScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={({ navigation }) => ({
            headerLeft: null,
            title: "User Manage",
            headerRight: () => (
              <MaterialCommunityIcons
                name="logout"
                size={24}
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("SignIn")}
              />
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
