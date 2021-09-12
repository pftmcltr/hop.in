import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setOrigin } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import axios from "axios";
import { selectOrigin } from "../slices/navSlice";

const HomeScreen = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      try {
        const loadData = async () => {
          {
            const response = await axios.get(
              `https://api.locationiq.com/v1/autocomplete.php?key=pk.c44e97d8fe6625ec0354e739a223945c&q=${query}&limit=5`
            );

            setSuggestions(response.data.slice(0, 3));
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

  const alertHandler = () => {
    alert(origin.lat);
  };

  return (
    <SafeAreaView style={tw`bg-gray-900 h-full`}>
      <View style={tw`mx-5 mt-10`}>
        <Text style={tw`text-4xl py-7 font-bold text-white`}>HOP.IN</Text>
        <TextInput
          placeholderTextColor="gray"
          placeholder="From Where? (approximate location)"
          style={tw`p-3 my-2 text-base border border-gray-500 rounded-md text-white`}
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
                      setOrigin({
                        lat: parseFloat(item.lat),
                        lng: parseFloat(item.lon),
                      })
                    );
                    setSuggestions([]);
                  }}
                >
                  <View style={tw`flex-row my-1 p-5 bg-gray-800`}>
                    <Text style={tw`text-white`}>{item.display_name}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      <View style={tw`mx-5`}>
        <NavOptions />
        <Text style={tw`text-base mt-10 font-bold text-gray-400`}>
          Saved addresses
        </Text>
        <NavFavourites />
      </View>
      <View style={tw` mx-5 mb-auto`}>
        <TouchableOpacity
          style={tw`border border-yellow-500 py-2`}
          onPress={alertHandler}
        >
          <Text style={tw`text-center text-yellow-500 font-bold text-lg`}>
            Instructions for beta users
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
