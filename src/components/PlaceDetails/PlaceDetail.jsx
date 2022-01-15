import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Chip,
} from "@material-ui/core";
import {
  LocationOnOutlined,
  Phone,
  SignalCellularNoSimOutlined,
} from "@material-ui/icons";
import Rating from "@material-ui/lab/Rating";
import useStyles from "./style";

const PlaceDetail = ({ place, selected, refProp }) => {
  const classes = useStyles();

  console.log(refProp, selected);

  if (selected) {
    refProp?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Card elevation={6}>
      <CardMedia
        style={{ height: 350 }}
        image={
          place.photo
            ? place.photo.images.large.url
            : "https://picsum.photos/200/300"
        }
        name={place.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {place.name}
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Rating value={Number(place.rating)} readOnly />

          <Typography variant="subtitle1" gutterBottom>
            out of {place.num_reviews}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1"> Price</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {place.price_level}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1"> Ranking</Typography>
          <Typography variant="subtitle1" gutterBottom>
            {place.ranking}
          </Typography>
        </Box>
        {place?.awards?.map((award) => (
          <Box display="flex" justifyContent="space-between">
            <img src={award.images.small} alt={award.display_name} />
            <Typography variant="subtitle2" color="textSecondary">
              {award.display_name}
            </Typography>
          </Box>
        ))}
        {place?.cuisine?.map(({ name }) => (
          <Chip key={name} size="small" label={name} className={classes.chip} />
        ))}
        {place?.address && (
          <Typography
            className={classes.subtitle}
            gutterBottom
            variant="body2"
            color="textSecondary"
          >
            <LocationOnOutlined /> {place.address}
          </Typography>
        )}

        {place?.phone && (
          <Typography
            className={classes.spacing}
            gutterBottom
            variant="body2"
            color="textSecondary"
          >
            <Phone /> {place.phone}
          </Typography>
        )}
        <CardActions>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.web_url, "_blank")}
          >
            Trip Advisor
          </Button>
          <Button
            size="small"
            color="primary"
            onClick={() => window.open(place.website, "_blank")}
          >
            Website
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default PlaceDetail;
