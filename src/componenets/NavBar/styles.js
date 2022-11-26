import { makeStyles } from '@mui/styles';

const drawerWidth = '240px';

export default makeStyles((theme) => ({
  toolbar: {
    height: '80px',
    display: 'flex',
    background: theme.palette.mode === 'light' ? 'linear-gradient(#3a7bd5, #00d2ff)' : 'linear-gradient( #1F1C18,#8E0E00)',
    justifyContent: 'space-between',
    marginLeft: '240px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: '0',
      flexWrap: 'wrap',
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  linkButton: {
    '&:hover': {
      color: 'white !important',
      textDecoration: 'none',
    },
  },
}));
