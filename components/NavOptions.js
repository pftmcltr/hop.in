import React from "react";
import { FlatList, Text, TouchableOpacity, View, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";

import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { camaro, restaurant } from "../imgs/image";

const data = [
  {
    id: "123",
    title: "Get a ride",
    image: camaro,
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order food",
    image: restaurant,
    screen: "EatScreen",
  },
];

const NavOptions = () => {
  const Navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      keyExtractor={(item) => item.id}
      data={data}
      numColumns={1}
      renderItem={({ item }) => (
        <View style={tw`${!origin && "opacity-50"}`}>
          <TouchableOpacity
            disabled={!origin}
            onPress={() => Navigation.navigate(item.screen)}
            style={tw`flex-row items-center rounded-md justify-between bg-blue-100 my-2 px-5 py-2 `}
          >
            <View>
              <Text style={tw`text-xl font-semibold`}>{item.title}</Text>
              <Icon
                style={tw`p-2 bg-blue-900 rounded-full w-full mt-4`}
                name="arrowright"
                color="white"
                type="antdesign"
              />
            </View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={item.image}
            />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};

export default NavOptions;
