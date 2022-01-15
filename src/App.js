import React, { useEffect, useState } from "react";

import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import PlaceDetail from "./components/PlaceDetails/PlaceDetail";
import { getPlaceData, getWeatherData } from "./api";

const App = () => {
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const [bounds, setBounds] = useState({
    ne: { lat: 0, lng: 0 },
    sw: { lng: 0, lat: 0 },
  });

  const [isLoading, setIsLoading] = useState(false);

  const [childClicked, setChildClicked] = useState(null);

  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({
          lat: latitude,
          lng: longitude,
        });
      }
    );
  }, []);

  useEffect(() => {
    const filter = places.filter((place) => place.rating > rating);

    setFilteredPlaces(filter);
  }, [rating]);

  useEffect(() => {
    // if (bounds) {
    setIsLoading(true);

    getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
      setWeatherData(data)
    );

    getPlaceData(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data);
      setFilteredPlaces([]);
      setIsLoading(false);
    });
    // }
  }, [coordinates, bounds, type]);

  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>

        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
