import React, { useRef, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import { useSelector } from "react-redux";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);

  useEffect(
    () => {
      if (!origin || !destination) return;
      mapRef.current.fitToSuppliedMarkers(["origin", "destination"]);
    },
    [origin, destination],
    {
      edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
    }
  );

  return (
    <MapView
      ref={mapRef}
      style={tw`flex-1`}
      mapType="mutedStandard"
      initialRegion={{
        latitude: origin.lat,
        longitude: origin.lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }}
    >
      {/* {origin && destination && (
      <MapViewDirections
        origin="Some origin here"
        destination="Some destination here"
        apikey="<insert google key>"
        strokeWidth={3}
        strokeColor="black"
      />
    )} */}

      {origin && (
        <Marker
          icon={{
            uri: "https://cdn1.iconfinder.com/data/icons/maps-and-navigation-free/32/Maps_Maps_Navigation_Gps_Pin_Location-02-128.png",
          }}
          coordinate={{
            latitude: origin.lat,
            longitude: origin.lng,
          }}
          title="Origin"
          description="The start of your journey."
          identifier="origin"
        />
      )}

      {destination && (
        <Marker
          icon={{
            uri: "https://cdn1.iconfinder.com/data/icons/maps-and-navigation-free/32/Maps_Maps_Navigation_Gps_Pin_Location-02-128.png",
          }}
          coordinate={{
            latitude: destination.lat,
            longitude: destination.lng,
          }}
          title="Destination"
          description="The end of your journey."
          identifier="destination"
        />
      )}
    </MapView>
  );
};

export default Map;
