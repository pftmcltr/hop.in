import React, { useState, useEffect } from "react";
import {
  Text,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setOrigin } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";
import axios from "axios";
import { selectOrigin } from "../slices/navSlice";
import { API_BASE_URL } from "../apis/locationIQ";

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
            const response = await axios.get(`${API_BASE_URL}${query}&limit=5`);

            setSuggestions(response.data.slice(0, 3));
          }
        };

        query.length > 2 && loadData();
      } catch (error) {
        console.log(error);
      }
    }, 500);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [query]);

  const changeHandler = (text) => {
    setQuery(text);
  };

  const alertHandler = () => {
    alert("This is a text");
  };

  return (
    <SafeAreaView style={tw`bg-gray-900 flex-1`}>
      {/* LOGO */}
      <View style={tw`mx-5 mt-14 mb-5`}>
        <Text style={tw`text-4xl font-bold text-white`}>HOP.IN</Text>
      </View>

      {/* SearchBox */}
      <View style={tw`mx-5`}>
        <TextInput
          placeholderTextColor="gray"
          placeholder="Where are you?"
          style={tw`p-3 my-2 text-base border border-gray-500 rounded-md text-white`}
          onChangeText={(input) => changeHandler(input)}
          value={query}
        />

        {suggestions && (
          <View>
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
                        address: item.display_name,
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

        {/* Cards */}
        <NavOptions />

        {/* Saved Addresses */}
        <Text style={tw`text-base mt-10 font-bold text-gray-400`}>
          Saved addresses
        </Text>
        <View pointerEvents="none">
          <NavFavourites />
        </View>

        {/* Instructions Button */}
        <TouchableOpacity
          style={tw`border bg-gray-900 py-3 my-2 border-yellow-500`}
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
