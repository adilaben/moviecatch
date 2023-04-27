import { ExitToApp } from "@mui/icons-material";
import {
  Typography,
  Button,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../features/auth";
import { useGetListQuery } from "../../services/TMDB";
import { RatedCards } from "..";
import images from "../../assets";

function Profile() {
  const { user } = useSelector(userSelector);
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  const { data: favoriteMovies, refetch: refetchFavorites } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.Id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });
  const { data: watchlistMovies, refetch: refetchWatchlisted } =
    useGetListQuery({
      listName: "watchlist/movies",
      accountId: user.Id,
      sessionId: localStorage.getItem("session_id"),
      page: 1,
    });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, []);

  const logout = () => {
    localStorage.clear();

    window.location.href = "/";
  };
  return (
    <Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h4" gutterBottom>
          My Profile
        </Typography>
        <Button color="inherit" onClick={logout}>
          Logout &nbsp; <ExitToApp />
        </Button>
      </Box>
      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          mt="20px"
        >
          <Typography variant="h6">
            Add favorites or watchlist some movies to see them here
          </Typography>
          <img
            width={isMobile ? "300px" : "500px"}
            src={
              theme.palette.mode === "light"
                ? images.bluePopcorn
                : images.redPopcorn
            }
            alt="Add favorites or watchlist"
          />
        </Box>
      ) : (
        <Box>
          <RatedCards title="Favorite Movies" data={favoriteMovies} />
          <RatedCards title="Watchlist Movies" data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
}
export default Profile;
