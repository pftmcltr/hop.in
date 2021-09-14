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
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {origin && (
        <MapView.Marker
          icon={{
            uri: "https://cdn0.iconfinder.com/data/icons/3d-web-isometric-vol-2/256/3d-web-isometric-vol-2/1000/Location_Pin.png",
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

      <MapView.Marker
        icon={{
          uri: "https://cdn0.iconfinder.com/data/icons/isometric-city-basic-transport/48/car-front-01-128.png",
        }}
        coordinate={{
          latitude: origin.lat + 0.002,
          longitude: origin.lng - 0.003,
        }}
        title="Car1"
        description="Car no.1"
        identifier="car1"
      />
      <MapView.Marker
        icon={{
          uri: "https://cdn0.iconfinder.com/data/icons/isometric-city-basic-transport/48/car-front-01-128.png",
        }}
        coordinate={{
          latitude: origin.lat - 0.001,
          longitude: origin.lng + 0.003,
        }}
        title="Car2"
        description="Car no.2"
        identifier="car2"
      />

      <MapView.Marker
        icon={{
          uri: "https://cdn0.iconfinder.com/data/icons/isometric-city-basic-transport/48/car-front-01-128.png",
        }}
        coordinate={{
          latitude: origin.lat - 0.003,
          longitude: origin.lng - 0.003,
        }}
        title="Car3"
        description="Car no.3"
        identifier="car3"
      />

      <MapView.Marker
        icon={{
          uri: "https://cdn0.iconfinder.com/data/icons/isometric-city-basic-transport/48/car-front-01-128.png",
        }}
        coordinate={{
          latitude: origin.lat - 0.001,
          longitude: origin.lng - 0.002,
        }}
        title="Car4"
        description="Car no.4"
        identifier="car4"
      />

      {destination && (
        <MapView.Marker
          icon={{
            uri: "https://cdn0.iconfinder.com/data/icons/3d-web-isometric-vol-2/256/3d-web-isometric-vol-2/1000/Location_Pin.png",
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
