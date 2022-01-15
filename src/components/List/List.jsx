import React, { createRef, useEffect, useState } from "react";
import {
  CircularProgress,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyles from "./style";
import PlaceDetail from "../PlaceDetails/PlaceDetail";

const List = ({
  places,
  childClicked,
  isLoading,
  rating,
  setRating,
  type,
  setType,
}) => {
  const classes = useStyles();

  const [elRef, setElRef] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
      .fill()
      .map((_, i) => elRef[i] || createRef());

    setElRef(refs);
  }, [places]);

  console.log({ elRef });

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotel & attraction around you
      </Typography>
      {isLoading ? (
        <div className={classes.loading}>
          <CircularProgress size={"5rem"} />
        </div>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Type</InputLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
            <InputLabel>Ratings</InputLabel>
            <Select value={rating} onChange={(e) => setRating(e.target.value)}>
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
          <Grid container spacing={3} className={classes.list}>
            {places.map((place, i) => (
              <Grid ref={elRef[i]} item key={i} xs={12}>
                <PlaceDetail
                  place={place}
                  selected={+childClicked == i}
                  refProp={elRef[i]}
                />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </div>
  );
};

export default List;
