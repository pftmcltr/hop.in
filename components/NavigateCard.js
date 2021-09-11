import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

const NavigateCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={[tw`bg-white flex-1`]}>
      <Text style={tw`text-center p-5 text-xl`}>Hello, stranger!</Text>
      <View style={tw`border-t border-gray-200`}>
        <TextInput
          autoCompleteType="street-address"
          style={tw`p-3 rounded-md bg-gray-100 mx-4 mt-5 mb-0`}
          placeholder="To Where? (autocomplete off)"
          onSubmitEditing={() => {
            dispatch(
              setDestination({
                lat: 36.72577601886682,
                lng: -4.433722231767535,
              })
            );
            navigation.navigate("RideOptionsCard");
          }}
          defaultValue=""
        />
      </View>
      <View style={tw`mx-4`}>
        <NavFavourites />
      </View>

      <View
        style={tw`flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-200`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`bg-blue-900 flex-row w-24 px-4 py-3 justify-between rounded-full `}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EatScreen")}
          style={tw`bg-gray-100 flex-row w-24 px-4 py-3 justify-evenly rounded-full `}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-black text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;
