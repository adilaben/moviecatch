import React, { useState } from 'react';
import { Box, useMediaQuery, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/styles';
import images from '../../assets';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList, LoadingCircle, Pagination } from '..';

function Movies() {
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector((state) => state.currentGenreOrCategory);
  const { data, error, isFetching } = useGetMoviesQuery({ genreIdOrCategoryName, page, searchQuery });
  const theme = useTheme();
  const isMobile = useMediaQuery('(max-width:600px)');
  const lg = useMediaQuery((theme) => theme.breakpoints.only('lg'));

  const numberOfMovies = lg ? 16 : 18;

  if (isFetching) {
    return (
      <LoadingCircle />
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
        <img width={isMobile ? '300px' : '500px'} src={theme.palette.mode === 'light' ? images.blueNotFound : images.redNotFound} />
      </Box>
    );
  }

  if (error) return 'An error has occured.';
  return (
    <div>
      <MovieList movies={data} numberOfMovies={numberOfMovies} />
      <Pagination currentPage={page} totalPages={data?.total_pages} setPage={setPage} />
    </div>
  );
}

export default Movies;
