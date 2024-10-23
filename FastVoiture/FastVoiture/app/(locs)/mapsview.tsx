import React from "react";
import { StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function MapScreen() {
  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      initialRegion={{
        latitude: -34.603738,
        longitude: -58.38157,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1
  },
});
