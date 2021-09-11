import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { selectOrigin, setDestination } from "../slices/navSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/core";

const data = [
  {
    id: 123,
    icon: "home",
    location: "Home",
    destination: "Av. de Ceuta, Marbella, Spain",
    lat: 36.510983472954884,
    lng: -4.903534161102719,
  },
  {
    id: 456,
    icon: "briefcase",
    location: "Work",
    destination: "C. Alfredo Palma, Marbella, Spain",
    lat: 36.51364775067921,
    lng: -4.874428629573598,
  },
];

const NavFavourites = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      ItemSeparatorComponent={() => {
        return <View style={[tw`bg-gray-200`, { height: 0.5 }]} />;
      }}
      renderItem={({ item: { icon, destination, location, lat, lng } }) => (
        <TouchableOpacity
          disabled={!origin}
          onPress={() => {
            dispatch(setDestination({ lat, lng }));
          }}
          style={tw`flex-row items-center py-5`}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-blue-200 p-3`}
            name={icon}
            color="white"
            size={18}
            type="ionicon"
          />
          <View>
            <Text style={tw`font-semibold text-lg`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;
