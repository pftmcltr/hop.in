import React from "react";
import { TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";

import Map from "../components/Map";
import NavigateCard from "../components/NavigateCard";
import RideOptionsCard from "../components/RideOptionsCard";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const MapScreen = () => {
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        style={tw`absolute top-14 left-6 bg-gray-900 z-50 p-3 rounded-full shadow-lg`}
        onPress={() => {
          navigation.navigate("HomeScreen");
        }}
      >
        <Icon name="menu" color="white" />
      </TouchableOpacity>

      <View style={tw`h-1/2`}>
        <Map />
      </View>

      <View style={tw`h-1/2`}>
        <Stack.Navigator>
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;
