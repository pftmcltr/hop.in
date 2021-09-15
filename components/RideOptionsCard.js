import React, { useState, useEffect } from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { redCar, yellowCar, greyCar } from "../imgs/image";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import { API_BASE_URL } from "../apis/openMapConfig";

const hopTypes = [
  {
    id: "HOP-X-1",
    title: "Hop Casual",
    multiplier: 0.72,
    icon: greyCar,
    addedTime: 1.4,
  },
  {
    id: "HOP-X-2",
    title: "Hop Lux",
    multiplier: 1.49,
    icon: redCar,
    addedTime: 1.2,
  },
  {
    id: "HOP-X-3",
    title: "Hop Service",
    multiplier: 2.77,
    icon: yellowCar,
    addedTime: 2.2,
  },
];

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [directionsData, setDirectionsData] = useState({
    distance: 0,
    formattedTime: "",
  });

  useEffect(() => {
    try {
      const loadData = async () => {
        {
          setLoading(true);
          const response = await axios.get(
            `${API_BASE_URL}${origin.lat},${origin.lng}&to=${destination.lat},${destination.lng}`
          );

          if (response.data.route.routeError.errorCode > 0) setError(true);
          else {
            setDirectionsData(response.data.route);
          }

          setLoading(false);
        }
      };

      loadData();
    } catch (error) {
      console.log(error);
    }
  }, [origin, destination]);

  const handleAlert = () => {
    alert(
      "Well, now it's time to order a real Uber. This app doesn't have any cars, drivers or lawyers. It's just me, the front-end developer. But thank you for exploring all the pages and features, I'm truly grateful. See you on LinkedIn!"
    );
  };

  if (loading || error) {
    return (
      <SafeAreaView
        style={tw`bg-gray-900 items-center justify-center flex-grow`}
      >
        <ActivityIndicator color="white" size="large" />
        <Text style={tw`text-xl text-center mt-5 text-white`}>
          {error
            ? "There are no routes available. Press the menu button to turn back."
            : "Wait a sec..."}
        </Text>
      </SafeAreaView>
    );
  } else
    return (
      <SafeAreaView style={tw`bg-gray-900 flex-1`}>
        <View style={tw`flex-1`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("NavigateCard")}
            style={[tw`absolute top-6 left-4 z-50`]}
          >
            <Icon name="chevron-left" color="white" type="fontawesome" />
          </TouchableOpacity>
          <Text style={tw`text-center text-white p-5 text-xl`}>
            Select a Ride - {directionsData.distance?.toFixed(1)}
            &nbsp;km.
          </Text>

          <FlatList
            data={hopTypes}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item);
                }}
                style={tw`flex-row items-center justify-between px-5 ${
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
                    Travel time: &nbsp;
                    {parseInt(
                      directionsData.formattedTime?.substring(0, 2) * 60
                    ) +
                      parseInt(
                        directionsData.formattedTime?.substring(3, 5) *
                          item.addedTime
                      )}
                    &nbsp;min.
                  </Text>
                </View>
                <Text style={tw`text-xl text-white`}>
                  {(directionsData.distance * item.multiplier).toFixed(1)}
                  &nbsp;€
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <View style={tw`border-t border-gray-700`}>
          <TouchableOpacity
            disabled={!selected}
            style={tw`bg-indigo-900 py-3 m-3 ${!selected && "bg-gray-800"}`}
            onPress={handleAlert}
          >
            <Text style={tw`text-center text-white text-xl`}>Select a car</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
};

export default RideOptionsCard;
