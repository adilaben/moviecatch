import React, { useEffect } from "react";
import {
  Divider,
  List,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  ListItemButton,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import images from "../../assets";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/genres";
import { selectGenreOrCategory } from "../../features/currentGenreOrCategory";
import { LoadingCircle } from "..";
import RenderIfVisible from "react-render-if-visible";

const categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

function SideBar({ setMobileOpen }) {
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentGenreOrCategory
  );
  const theme = useTheme();
  const classes = useStyles();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    setMobileOpen(false);
  }, [genreIdOrCategoryName]);

  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={
            theme.palette.mode === "light" ? images.blueLogo : images.redLogo
          }
          alt="MovieCatch Logo"
          height={40.85}
          width={162.95}
        />
      </Link>
      <Divider />

      <List aria-label="Categories">
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <ListSubheader key={value}>
            <Link className={classes.links} to="/">
              <ListItemButton
                onClick={() => dispatch(selectGenreOrCategory(value))}
              >
                <ListItemIcon>
                  <img
                    alt={label.toLowerCase()}
                    src={genreIcons[label.toLowerCase()]}
                    className={classes.genreImage}
                    height={30}
                    width={30}
                  />
                </ListItemIcon>
                <ListItemText primary={label} />
              </ListItemButton>
            </Link>
          </ListSubheader>
        ))}
      </List>
      <Divider />
      <List aria-label="Genres">
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <LoadingCircle />
        ) : (
          data.genres.map(({ name, id }) => (
            <ListSubheader key={name}>
              <RenderIfVisible defaultHeight={48}>
                <Link className={classes.links} to="/">
                  <ListItemButton
                    onClick={() => dispatch(selectGenreOrCategory(id))}
                  >
                    <ListItemIcon>
                      <img
                        alt={name.toLowerCase()}
                        src={genreIcons[name.toLowerCase()]}
                        className={classes.genreImage}
                        height={30}
                        width={30}
                      />
                    </ListItemIcon>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </Link>
              </RenderIfVisible>
            </ListSubheader>
          ))
        )}
      </List>
      <Divider />
      <>
        <p className={`${classes.copyright} p-text`}>
          {new Date().getFullYear()} &copy;{" "}
          <Button
            target="_blank"
            style={{
              padding: "0",
              color: theme.palette.mode === "light" ? "#030303" : "#F3F3F3",
            }}
            href="https://www.linkedin.com/in/aadila-bendahou/"
          >
            Aâdila Bendahou
          </Button>{" "}
          <br />
          All rights reserved
        </p>
      </>
    </>
  );
}

export default SideBar;
