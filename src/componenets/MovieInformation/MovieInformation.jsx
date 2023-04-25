import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  Rating,
  Modal,
  Tooltip,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import genreIcons from "../../assets/genres";
import images from "../../assets";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetListQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import { MovieList, LoadingCircle, Pagination } from "..";
import { userSelector } from "../../features/auth";

function MovieInformation() {
  const { id } = useParams();
  const { user } = useSelector(userSelector);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.Id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.Id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: recommendations, isFetching: isRecommendationsFetching } =
    useGetRecommendationsQuery({
      movie_id: id,
      list: "/recommendations",
      page,
    });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMovieWatchlisted, setIsMovieWatchlisted] = useState(false);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchlisted(
      !!watchlistMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );

    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMovieWatchlisted,
      }
    );

    setIsMovieWatchlisted((prev) => !prev);
  };

  if (isFetching || isRecommendationsFetching) {
    return <LoadingCircle />;
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong. Go back</Link>
      </Box>
    );
  }
  return (
    <>
      <Grid container className={classes.containerSpaceAround}>
        <Grid
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: " center",
            marginBottom: "30px",
          }}
          item
          sm={12}
          lg={4}
        >
          <img
            className={classes.poster}
            src={
              data?.poster_path
                ? `https://image.tmdb.org/t/p/w500/${data?.poster_path}`
                : images.posterNotFound
            }
            alt={data?.title}
          />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography variant="h4" align="center" gutterBottom>
            {data?.title} ({data?.release_date.split("-")[0]})
          </Typography>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.tagline}
          </Typography>
          <Grid item className={classes.containerSpaceAround}>
            <Box display="flex" align="center">
              <Rating
                readOnly
                value={data?.vote_average && data.vote_average / 2}
              />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginLeft: "10px" }}
              >
                {data?.vote_average} / 10
              </Typography>
            </Box>
            <Typography variant="h6" gutterBottom align="center">
              {data?.runtime} min | Language: {data?.spoken_languages[0]?.name}
            </Typography>
          </Grid>
          <Grid item className={classes.genresContainer}>
            {data?.genres?.map((genre) => (
              <Link
                key={genre.name}
                className={classes.links}
                to="/"
                onClick={() => dispatch(selectGenreOrCategory(genre.id))}
              >
                <img
                  src={genreIcons[genre.name.toLowerCase()]}
                  className={classes.genreImage}
                  height={30}
                />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre?.name}
                </Typography>
              </Link>
            ))}
          </Grid>
          <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
            Overview
          </Typography>
          <Typography style={{ marginBottom: "1rem" }}>
            {data?.overview}
          </Typography>
          <Grid item container>
            <div className={classes.buttonsContainer}>
              <Grid
                style={{ marginTop: "10px" }}
                item
                className={classes.buttonsContainer}
              >
                <ButtonGroup
                  size="small"
                  color="inherit"
                  variant="outlined"
                  className={classes.buttonGrp}
                >
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data?.homepage}
                    endIcon={<Language />}
                  >
                    Website
                  </Button>
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    endIcon={<MovieIcon />}
                  >
                    IMDB
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    href="#"
                    endIcon={<Theaters />}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid
                style={{ marginTop: "10px" }}
                item
                className={classes.buttonsContainer}
              >
                <ButtonGroup
                  size="small"
                  color="inherit"
                  variant="outlined"
                  className={classes.buttonGrp}
                >
                  <Tooltip
                    disableTouchListener
                    title={!user.id && "Please login first!"}
                  >
                    <Button
                      onClick={addToFavorites}
                      endIcon={
                        isMovieFavorited ? (
                          <FavoriteBorderOutlined />
                        ) : (
                          <Favorite />
                        )
                      }
                    >
                      {isMovieFavorited ? "Unfavorite" : "Favorite"}
                    </Button>
                  </Tooltip>
                  <Tooltip
                    disableTouchListener
                    title={!user.id && "Please login first!"}
                  >
                    <Button
                      onClick={addToWatchlist}
                      endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                    >
                      Watchlist
                    </Button>
                  </Tooltip>
                  <Button endIcon={<ArrowBack />}>
                    <Typography
                      component={Link}
                      to="/"
                      color="inherit"
                      variant="subtitle2"
                      style={{ textDecoration: "none" }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </Grid>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {data?.credits?.cast?.length ? (
        <Typography
          style={{ marginTop: "15px" }}
          variant="h4"
          gutterBottom
          align="center"
        >
          Top Cast
        </Typography>
      ) : null}
      <Grid item container spacing={2}>
        {data &&
          data?.credits?.cast
            ?.map(
              (character, i) =>
                character.profile_path && (
                  <Grid
                    key={i}
                    item
                    xs={4}
                    md={2}
                    component={Link}
                    to={`/actors/${character.id}`}
                    style={{
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <img
                      className={classes.castImage}
                      src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                      alt={character.name}
                    />
                    <Typography className={classes.title} color="textPrimary">
                      {character?.name}
                    </Typography>
                    <Typography className={classes.title} color="textSecondary">
                      {character.character.split("/")[0]}
                    </Typography>
                  </Grid>
                )
            )
            .slice(0, 12)}
      </Grid>
      <Box>
        {recommendations?.results?.length ? (
          <Grid>
            <Typography
              style={{ marginTop: "10px" }}
              variant="h4"
              gutterBottom
              align="center"
            >
              You might also like
            </Typography>
            <MovieList movies={recommendations} numberOfMovies={12} />
            <Pagination
              currentPage={page}
              totalPages={recommendations?.total_pages}
              setPage={setPage}
            />
          </Grid>
        ) : null}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 ? (
          <iframe
            autoPlay
            className={classes.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow="autoplay"
            aria-label="Trailer"
          />
        ) : (
          <>No Video</>
        )}
      </Modal>
    </>
  );
}

export default MovieInformation;
