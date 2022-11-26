import React, { useEffect } from 'react';
import { Divider, List, ListItem, ListItemText, ListSubheader, ListItemIcon, Box, CircularProgress, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { useTheme } from '@mui/styles';
import useStyles from './styles';
import images from '../../assets';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

const demoCategories = [
  { label: 'Action', value: 'action' },
  { label: 'Comedy', value: 'comedy' },
  { label: 'Horror', value: 'horror' },
  { label: 'Animation', value: 'animation' },
];

function SideBar({ setMobileOpen }) {
  const theme = useTheme();
  const classes = useStyles();
  return (
    <>
      <Link to="/" className={classes.imageLink}>
        <img
          className={classes.image}
          src={theme.palette.mode === 'light' ? images.blueLogo : images.redLogo}
          alt="MovieCatch Logo"
        />
      </Link>
      <Divider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img src={blueLogo} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {demoCategories.map(({ label, value }) => (
          <Link key={value} className={classes.links} to="/">
            <ListItem onClick={() => {}} button>
              {/* <ListItemIcon>
                <img src={blueLogo} className={classes.genreImages} height={30} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <div className={classes.copyright}>
        <p className="p-text">{(new Date().getFullYear())} &copy; <Button target="_blank" style={{ padding: '0', color: '#575d60' }} href="https://www.linkedin.com/in/aadila-bendahou/">Aâdila Bendahou</Button> <br />All rights reserved.</p>
      </div>
    </>
  );
}

export default SideBar;
