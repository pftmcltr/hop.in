import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import { BEARER_TOKEN, API_BASE_URL } from "../apis/yelpConfig";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
import tw from "tailwind-react-native-classnames";
import defaultImage from "../imgs/default-source.jpg";

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [amount, setAmount] = useState();
  const origin = useSelector(selectOrigin);
  const [isLoading, setIsLoading] = useState(true);
  const defaultImageURI = Image.resolveAssetSource(defaultImage).uri;

  const handlePress = () => {
    alert(
      "I know, this restaurant seems nice. Too bad you can't use Hop.in to place an order. Because it's a fake app. A fake app with real restaurants. *evil laugh*"
    );
  };

  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(
          `${API_BASE_URL}term="food"&latitude=${origin.lat}&longitude=${origin.lng}`,
          {
            headers: {
              Authorization: `Bearer ${BEARER_TOKEN}`,
              withCredentials: true,
              Origin: "localhost",
            },
          }
        );
        setRestaurants(response.data.businesses);
        setAmount(response.data.total);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, [origin]);

  if (restaurants.length == 0)
    return (
      <View style={tw`flex-grow justify-center`}>
        <Text style={tw`text-xl text-white px-5 text-center`}>
          {amount == 0
            ? `No restaurants available in this city.`
            : `Data is loading...`}
        </Text>
      </View>
    );

  return (
    <FlatList
      data={restaurants}
      initialNumToRender={20}
      ItemSeparatorComponent={() => {
        return <View style={tw`border-t border-gray-700`}></View>;
      }}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={item.is_closed}
          style={tw`m-4 flex-grow ${item.is_closed && "opacity-50"}`}
          onPress={handlePress}
        >
          <Image
            resizeMode="cover"
            source={
              isLoading || !item.image_url
                ? { uri: defaultImageURI }
                : { uri: item.image_url }
            }
            onLoad={() => setIsLoading(false)}
            style={tw`flex-1 h-40 rounded-lg`}
          />
          <View style={tw`flex `}>
            <Text style={tw`text-white text-xl mt-2 mb-1 font-bold`}>
              {item.name.length > 25
                ? `${item.name.substring(0, 25)}...`
                : `${item.name}`}{" "}
            </Text>
            <Text style={tw`font-bold text-base text-gray-400`}>
              {item.rating} stars · {(item.distance / 1000).toFixed(2)} km away
              · {item.categories[0].title}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default Restaurants;
