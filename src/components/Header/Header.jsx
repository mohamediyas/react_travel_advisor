import React, { useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import useStyles from "./style";

const Header = ({ setCoordinates }) => {
  const classes = useStyles();

  const [autoComplete, setAutoComplete] = useState(null);

  const onLoad = (autoCl) => {
    setAutoComplete(autoCl);
  };

  const onPlaceChanged = () => {
    const lat = autoComplete.getPlace().geometry.loaction.lat();

    const lng = autoComplete.getPlace().geometry.loaction.lng();

    setCoordinates({ lat, lng });
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar className={classes.toolbar}>
          <Typography className={classes.title} variant="h5">
            Travel Advisor
          </Typography>
          <Box display="flex">
            <Typography className={classes.title} variant="h6">
              Explore New Places
            </Typography>
            <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchOutlined />
                </div>
                <InputBase
                  placeholder="Search..."
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              </div>
            </Autocomplete>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
