import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/core";
import Restaurants from "../components/Restaurants";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

const EatScreen = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <SafeAreaView style={tw`bg-gray-900 flex-1`}>
      <View style={tw`flex-1 mt-12`}>
        <View style={tw`flex-row m-4 justify-center items-center`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={tw`p-4  text-base border border-indigo-900 rounded-md text-white`}
          >
            <Icon name="menu" size={20} color="#312E81" />
          </TouchableOpacity>
          <View
            style={tw`p-3  text-base border border-gray-500 rounded-md text-white flex-1 ml-2`}
          >
            <TextInput
              editable={false}
              placeholder={origin.address}
              placeholderTextColor="gray"
            />
          </View>
        </View>

        {/* Restaurant List */}
        <Restaurants />
      </View>

      <View
        style={tw`flex-row bg-gray-900 justify-evenly py-3 border-t border-gray-700`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("MapScreen")}
          style={tw` bg-gray-700  flex-row w-24 px-4 py-3 justify-between rounded-full`}
        >
          <Icon name="car" type="font-awesome" color="black" size={16} />
          <Text style={tw`text-black text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EatScreen")}
          style={tw`bg-indigo-900 border border-white flex-row w-24 px-4 py-3 justify-evenly rounded-full `}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="white"
            size={16}
          />
          <Text style={tw`text-white text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EatScreen;
