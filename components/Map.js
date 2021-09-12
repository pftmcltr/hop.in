import React, { useRef, useEffect } from "react";
import MapView, { Marker, Polyline } from "react-native-maps";
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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Polyline
        coordinates={[
          { latitude: 37.8025259, longitude: -122.4351431 },
          { latitude: 37.7896386, longitude: -122.421646 },
          { latitude: 37.7665248, longitude: -122.4161628 },
          { latitude: 37.7734153, longitude: -122.4577787 },
          { latitude: 37.7948605, longitude: -122.4596065 },
          { latitude: 37.8025259, longitude: -122.4351431 },
        ]}
        strokeColor="#000" // fallback for when `strokeColors` is not supported by the map-provider
        strokeWidth={2}
      />

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
