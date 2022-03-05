import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Context as TrackContext } from "../context/TrackContext";
import MapView, { Polyline } from "react-native-maps";
import TrackListScreen from "./TrackListScreen";

const TrackDetailScreen = ({ navigation }) => {
    const { state } = useContext(TrackContext);
    const _id = navigation.getParam("_id");

    const track = state.find((t) => t._id === _id);
    const initialCoords = track.locations[0].coords;

    return (
        <>
            <Text style={styles}>{track.name}</Text>
            <MapView
                initialRegion={{
                    longtitudeDelta: 0.01,
                    latitudeDelta: 0.01,
                    ...initialCoords,
                }}
                style={styles.map}
            >
                <Polyline
                    coordinates={TrackListScreen.locations.map(
                        (loc) => loc.coords
                    )}
                />
            </MapView>
        </>
    );
};

const styles = StyleSheet.create({
    map: {
        height: 300,
    },
});

export default TrackDetailScreen;
