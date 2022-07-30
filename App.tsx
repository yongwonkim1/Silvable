import React from "react";
import { View, Text } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

function App() {
  return (
    <>
      <View style={{ flex: 1 }}>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: 35.91395373474155,
            longitude: 127.73829440215488,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          }}
        />
      </View>
    </>
  );
}

export default App;
