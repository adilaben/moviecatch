import React, { useEffect } from "react";
import {
  Typography,
  Grid,
  Grow,
  Tooltip,
  Rating,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import images from "../../assets";
import useStyles from "./styles";
import { lazyImage } from "../../utils/lazyImg";

function Movie({ movie, i }) {
  const classes = useStyles();
  const isMobile = useMediaQuery("(max-width:600px)");
  useEffect(() => {
    lazyImage();
  });

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={2} className={classes.movie}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <Link className={classes.links} to={`/movie/${movie.id}`}>
          <img
            alt={movie.title}
            className={`${classes.image} lazy-image`}
            data-src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/${isMobile ? "w300" : "w342"}/${
                    movie.poster_path
                  }`
                : images.posterNotFound
            }
            src=""
          />
          <Typography className={classes.title} variant="h6">
            {movie.title}
          </Typography>
          <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
          </Tooltip>
        </Link>
      </Grow>
    </Grid>
  );
}

export default Movie;
