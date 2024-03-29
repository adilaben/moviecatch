import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
  containerSpaceAround: {
    display: "flex",
    justifyContent: "space-around",
    margin: "10px 0 !important",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      flexWrap: "wrap",
    },
  },
  poster: {
    borderRadius: "20px",
    boxShadow: "0.5em 1em 1em rgb(64,64,70)",
    height: "450px",
    [theme.breakpoints.down("md")]: {
      margin: "0 auto",
    },
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "100%",
      marginBottom: "30px",
    },
  },
  genresContainer: {
    margin: "10px 0 !important",
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  genreImage: {
    filter: theme.palette.mode === "dark" && "invert(1)",
    marginRight: "10px",
  },
  links: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textDecoration: "none",
    [theme.breakpoints.down("md")]: {
      padding: "0.5rem 1rem",
    },
  },
  castImage: {
    width: "100%",
    maxWidth: "10em",
    height: "10em",
    objectFit: "cover",
    borderRadius: "10px",
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
    [theme.breakpoints.down("xs")]: {
      maxWidth: "200px",
    },
  },
  buttonGrp: {
    color: theme.palette.mode === "light" ? "#397DD6" : "#BF151D",
  },
  title: {
    color: theme.palette.text.primary,
    marginTop: "10px",
    marginBottom: "0px",
    textAlign: "center",
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  video: {
    width: "50%",
    height: "50%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
      height: "90%",
    },
  },
}));
