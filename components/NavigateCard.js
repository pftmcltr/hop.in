import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  View,
  FlatList,
} from "react-native";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const NavigateCard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

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
    <SafeAreaView style={[tw`bg-white flex-1`]}>
      <Text style={tw`text-center p-5 text-xl`}>Hello, stranger!</Text>
      <View style={tw`border-t border-gray-200`}>
        <TextInput
          autoCompleteType="street-address"
          style={tw`p-3 mt-5 mb-1 mx-4 text-base border border-gray-200 rounded-md text-black`}
          placeholder="Where to? (approximate location)"
          onChangeText={(input) => changeHandler(input)}
          value={query}
        />
        {suggestions && (
          <View style={tw``}>
            <FlatList
              data={suggestions}
              keyExtractor={(_, id) => id.toString()}
              renderItem={({ item }) => (
                <View style={tw`flex-row mx-4 my-1 p-5 bg-gray-100`}>
                  <TouchableOpacity
                    onPress={() => {
                      dispatch(
                        setDestination({
                          lat: parseInt(item.lat),
                          lng: parseInt(item.lon),
                        })
                      );
                      setSuggestions([]);
                      navigation.navigate("RideOptionsCard");
                    }}
                  >
                    <Text>{item.display_name}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        )}
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
