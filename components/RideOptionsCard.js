import React, { useState } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { redCar, yellowCar, greyCar } from "../imgs/image";

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);

  const handleAlert = () => {
    alert(
      "Well, now it's time to order a real Uber. This app doesn't have any cars, drivers or lawyers. It's just me, the front-end developer. But thank you for exploring all the pages and features, I'm truly grateful. See you on LinkedIn!"
    );
  };

  const uberTypes = [
    {
      id: "UBER-X-1",
      title: "Hop Casual",
      multiplier: 1.2,
      icon: greyCar,
      estimatedTime: 35,
    },
    {
      id: "UBER-X-2",
      title: "Hop Lux",
      multiplier: 1.6,
      icon: redCar,
      estimatedTime: 25,
    },
    {
      id: "UBER-X-3",
      title: "Hop Service",
      multiplier: 3.9,
      icon: yellowCar,
      estimatedTime: 75,
    },
  ];

  return (
    <SafeAreaView style={tw`bg-gray-900 flex-grow`}>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate("NavigateCard")}
          style={[tw`absolute top-5 left-6 z-50`]}
        >
          <Icon name="chevron-left" color="white" type="fontawesome" />
        </TouchableOpacity>
        <Text style={tw`text-center text-white p-5 text-xl`}>
          Select a Ride - 28.4 km
        </Text>
      </View>

      <FlatList
        data={uberTypes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row items-center justify-between px-7 ${
              item.id === selected?.id && "bg-gray-700"
            }`}
          >
            <Image
              style={{ width: 100, height: 100, resizeMode: "contain" }}
              source={item.icon}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl text-white font-semibold`}>
                {item.title}
              </Text>
              <Text style={tw`text-gray-400`}>
                Travel time: {item.estimatedTime} min.
              </Text>
            </View>
            <Text style={tw`text-xl text-white`}>{40 * item.multiplier} €</Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`mt-auto border-t border-gray-700`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-blue-900 py-3 m-3 ${!selected && "bg-gray-800"}`}
          onPress={handleAlert}
        >
          <Text style={tw`text-center text-white text-xl`}>Select a car</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;
