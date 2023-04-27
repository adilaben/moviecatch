import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Typography, Button, Grid, Box, Divider } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import {
  useGetActorDetailsQuery,
  useGetMoviesByActorIdQuery,
} from "../../services/TMDB";
import useStyles from "./styles";
import { MovieList, LoadingCircle, Pagination } from "..";
import getAge from "../../utils/getAge";
import images from "../../assets";

function Actors() {
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const { data, isFetching, error } = useGetActorDetailsQuery(id);
  const { data: movies, isFetching: isMoviesFetching } =
    useGetMoviesByActorIdQuery({ id, page });
  const navigate = useNavigate();

  const classes = useStyles();

  if (isFetching || isMoviesFetching) {
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
            marginBottom: "30px",
          }}
          item
          sm={12}
          lg={3}
        >
          <img
            alt={data?.name}
            className={classes.image}
            src={
              data?.profile_path
                ? `https://image.tmdb.org/t/p/w500/${data?.profile_path}`
                : images.posterNotFound
            }
            height={450}
            width={300}
          />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography variant="h4" align="center" gutterBottom>
            {data?.name}
          </Typography>
          <Grid
            item
            container
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginBottom: "20px",
            }}
          >
            {data?.birthday ? (
              <Typography variant="h5" gutterBottom>
                <span style={{ fontWeight: "bold" }}>Born : </span>
                {new Date(data?.birthday).toDateString()}
                {!data?.deathday && (
                  <> (age {getAge(new Date(data?.birthday))} years) </>
                )}
              </Typography>
            ) : null}
            {data?.place_of_birth ? (
              <Typography variant="h5" gutterBottom>
                <span style={{ fontWeight: "bold" }}> Place of Birth :</span>
                {data?.place_of_birth}
              </Typography>
            ) : null}
            {data?.deathday ? (
              <Typography variant="h5" gutterBottom>
                <span style={{ fontWeight: "bold" }}>Died : </span>
                {new Date(data?.deathday).toDateString()} (age{" "}
                {getAge(new Date(data?.birthday)) -
                  getAge(new Date(data?.deathday))}{" "}
                years)
              </Typography>
            ) : null}
          </Grid>

          <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
            Biography
          </Typography>
          <Typography variant="h7" style={{ marginBottom: "1rem" }}>
            {data?.biography || "Sorry, no biography yet..."}
          </Typography>
          <Box
            marginTop="2rem"
            marginBottom="1rem"
            display="flex"
            justifyContent="space-around"
          >
            <Button
              className={classes.buttonsContainer}
              variant="contained"
              color="inherit"
              target="_blank"
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              className={classes.buttonsContainer}
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="inherit"
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Divider style={{ marginTop: "5px" }} />

      {movies?.results?.length ? (
        <Grid>
          <Typography
            style={{ marginTop: "10px" }}
            variant="h5"
            gutterBottom
            align="center"
          >
            Movies
          </Typography>
          <MovieList movies={movies} numberOfMovies={12} />
          <Pagination
            currentPage={page}
            totalPages={movies?.total_pages}
            setPage={setPage}
          />
        </Grid>
      ) : null}
    </>
  );
}

export default Actors;
