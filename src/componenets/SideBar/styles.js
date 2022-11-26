import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  sideBarContainer: {
    background: theme.palette.mode === 'dark' && '#121212',
  },
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  image: {
    width: '70%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
  },
  copyright: {
    color: '#575d60',
    textAlign: 'center',
    padding: '0.5rem',
  },

}
));
