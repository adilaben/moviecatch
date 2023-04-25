import { useContext, useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ColorModeContext } from "../utils/ToggleColorMode";
import { fetchToken } from "../utils";
import {
  searchMovie,
  selectGenreOrCategory,
} from "../features/currentGenreOrCategory";

function useAlan(alanBtnContainer) {
  const { setMode } = useContext(ColorModeContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    var greetingWasSaid = false;

    const alanBtnInstance = alanBtn({
      key: process.env.REACT_APP_ALAN_KEY,
      onCommand: ({ command, mode, genres, genreOrCategory, query }) => {
        if (command === "chooseGenre") {
          const foundGenre = genres.find(
            (g) => g.name.toLowerCase() === genreOrCategory.toLowerCase()
          );

          if (foundGenre) {
            navigate("/");
            dispatch(selectGenreOrCategory(foundGenre.id));
          }
        } else if (command === "changeMode") {
          if (mode === "light") {
            setMode("light");
          } else {
            setMode("dark");
          }
        } else if (command === "login") {
          fetchToken();
        } else if (command === "logout") {
          localStorage.clear();
          navigate("/");
        } else if (command === "search") {
          navigate("/");
          dispatch(searchMovie(query));
        }
      },
      rootEl: alanBtnContainer.current,
    });

    const buttonEl = alanBtnContainer.current;
    buttonEl.addEventListener("click", async function () {
      if (!greetingWasSaid) {
        await alanBtnInstance.activate();
        alanBtnInstance.playText(
          "Hello! This is MovieCatch App where you can find the movies you love. To search for Movies Try saying: 'Search for Spiderman'. To go for certain category, say: 'Go to Action'. For lightmode say 'Make it light'"
        );
        greetingWasSaid = true;
      }
    });
  }, [alanBtnContainer, dispatch, navigate, setMode]);
}

export default useAlan;
