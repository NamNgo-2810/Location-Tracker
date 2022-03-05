import createDataContext from "./createDataContext";
import trackerApi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const trackReducer = (state, action) => {
    switch (action.type) {
        case "fetch_tracks":
            return action.payload;

        default:
            return state;
    }
};

const fetchTracks = (dispatch = async () => {
    const response = await trackerApi.get("/tracks");
    dispatch({ type: "fetch_tracks", payload: response.data });
});

const createTrack = (dispatch = async (name, locations) => {
    try {
        await trackerApi.post("/tracks", { name, locations });
    } catch (error) {}
});

export const { Provider, Context } = createDataContext(
    trackReducer,
    { fetchTracks, createTrack },
    []
);
