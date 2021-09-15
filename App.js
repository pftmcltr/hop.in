import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";

import { Provider } from "react-redux";
import Store from "./store";

import HomeScreen from "./screens/HomeScreen";
import MapScreen from "./screens/MapScreen";
import EatScreen from "./screens/EatScreen";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaProvider>
      <Provider store={Store}>
        <NavigationContainer>
          <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? -64 : 0}
          >
            <Stack.Navigator>
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="MapScreen"
                component={MapScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EatScreen"
                component={EatScreen}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </KeyboardAvoidingView>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
