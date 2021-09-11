import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { setOrigin } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";

// import { GOOGLE_MAPS_APIKEY } from "@env";

// import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const handleAlert = () => {
    alert(
      "Please type something into the input fields to unlock all the features."
    );
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5 mt-10`}>
        <Text style={tw`text-4xl  mb-6 font-bold text-black`}>HOP.IN</Text>
        <TextInput
          autoCompleteType="street-address"
          style={tw`p-3 border border-gray-200 rounded-md text-black`}
          placeholder="From Where? (autocomplete off)"
          onChangeText={() =>
            dispatch(
              setOrigin({ lat: 36.51261828198095, lng: -4.88182288014213 })
            )
          }
          defaultValue=""
        />
      </View>
      <View style={tw`mx-5`}>
        <NavOptions />
        <Text style={tw` text-base mt-10 font-bold text-gray-400`}>
          Saved addresses
        </Text>
        <NavFavourites />
      </View>

      <View style={tw`mt-auto mx-5 mb-5`}>
        <TouchableOpacity
          style={tw`bg-gray-700  px-3 py-2`}
          onPress={handleAlert}
        >
          <Text style={tw`text-center text-white text-base`}>
            Instructions for beta users
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
