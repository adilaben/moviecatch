import React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './styles';

function Pagination({ currentPage, totalPages, setPage }) {
  const classes = useStyles();

  if (totalPages === 1 || totalPages === 0) return null;

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div className={classes.container}>
      <Button
        onClick={handlePrev}
        className={classes.button}
        variant="contained"
        color="inherit"
        type="button"
      >Prev
      </Button>
      <Typography variant="h4" className={classes.pageNumber}>
        {currentPage}
      </Typography>
      {currentPage === totalPages ? null
        : (
          <Button
            onClick={handleNext}
            className={classes.button}
            variant="contained"
            color="inherit"
            type="button"
          >Next
          </Button>
        )}

    </div>
  );
}

export default Pagination;
