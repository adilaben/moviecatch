import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";

import useStyles from "./styles";

function FeaturedMovies({ movies }) {
  const classes = useStyles();

  if (!movies) return null;

  return (
    <Carousel duration={200} autoPlay>
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
                  ? `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`
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
