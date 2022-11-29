import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: '30px 2px',
    background: theme.palette.mode === 'light' ? 'linear-gradient(#3a7bd5, #00d2ff)' : 'linear-gradient( #1F1C18,#8E0E00)',
    color: theme.palette.mode === 'dark' && 'secondary',

  },
  pageNumber: {
    margin: '0 20px !important',
    color: theme.palette.text.primary,
  },
}));
