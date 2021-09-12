import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { selectDestination, setDestination } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const NavigateCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const destination = useSelector(selectDestination);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      try {
        const loadData = async () => {
          {
            const response = await axios.get(
              `https://api.locationiq.com/v1/autocomplete.php?key=pk.c44e97d8fe6625ec0354e739a223945c&q=${query}&limit=5`
            );

            setSuggestions(response.data.slice(0, 2));
          }
        };

        query.length > 2 && loadData();
      } catch (error) {
        console.log(error);
      }
    }, 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  const changeHandler = (text) => {
    setQuery(text);
  };

  return (
    <SafeAreaView style={[tw`bg-gray-900 flex-1`]}>
      <Text style={tw`text-center mt-5 text-white text-xl`}>
        Go somewhere new!
      </Text>
      <View>
        <TextInput
          placeholderTextColor="gray"
          style={tw`p-3 mt-5 mb-1 mx-4 text-base border border-gray-500 rounded-md text-white`}
          placeholder="Where to?"
          onChangeText={(input) => changeHandler(input)}
          value={query}
        />
        {suggestions && (
          <View style={tw``}>
            <FlatList
              data={suggestions}
              keyExtractor={(_, id) => id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    dispatch(
                      setDestination({
                        lat: parseFloat(item.lat),
                        lng: parseFloat(item.lon),
                      })
                    );
                    setSuggestions([]);
                    navigation.navigate("RideOptionsCard");
                  }}
                >
                  <View style={tw`flex-row mx-4 my-1 p-5 bg-gray-800`}>
                    <Text style={tw`text-white`}>{item.display_name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <View style={tw`mx-4`}>
        <NavFavourites />
      </View>

      <View
        style={tw`flex-row bg-gray-900 justify-evenly py-2 mt-auto border-t border-gray-700`}
      >
        <TouchableOpacity
          disabled={!destination}
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`bg-blue-900 flex-row w-24 px-4 py-3 justify-between rounded-full ${
            !destination && "opacity-50"
          } `}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("EatScreen")}
          style={tw`bg-gray-700 flex-row w-24 px-4 py-3 justify-evenly rounded-full `}
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
