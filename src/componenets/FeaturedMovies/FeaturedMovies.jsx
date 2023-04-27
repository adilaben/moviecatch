import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import useStyles from "./styles";
import { useTheme } from "@mui/styles";

function FeaturedMovies({ movies }) {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  if (!movies) return null;

  return (
    <Carousel
      duration={200}
      autoPlay
      NextIcon={<ArrowForwardIcon />}
      PrevIcon={<ArrowBackIcon />}
      navButtonsProps={{
        style: {
          padding: "12px",
        },
      }}
      indicatorIconButtonProps={{
        style: {
          padding: isMobile && "10px",
          color: theme.palette.mode === "light" ? "#05CBFC" : "#EAB7B7",
        },
      }}
      activeIndicatorIconButtonProps={{
        style: {
          backgroundColor:
            theme.palette.mode === "light" ? "#3582D8" : "#bf151d",
        },
      }}
    >
      {movies.map((movie, i) => (
        <Box
          key={i}
          component={Link}
          to={`/movie/${movie.id}`}
          className={classes.featuredCardContainer}
        >
          <Card className={classes.card} classes={{ root: classes.cardRoot }}>
            <CardMedia
              media="picture"
              alt={movie.title}
              image={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/${
                      isMobile ? "w500" : "w1280"
                    }/${movie?.backdrop_path}`
                  : `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`
              }
              title={movie.title}
              className={classes.cardMedia}
            />
            <Box padding="20px">
              <CardContent
                className={classes.cardContent}
                classes={{ root: classes.cardContentRoot }}
              >
                <Typography variant="h5" gutterBottom>
                  {movie.title}
                </Typography>
                {movie?.overview && (
                  <Typography variant="body2">{movie?.overview}</Typography>
                )}
              </CardContent>
            </Box>
          </Card>
        </Box>
      ))}
    </Carousel>
  );
}

export default FeaturedMovies;
