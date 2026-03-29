import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, Typography } from '@mui/material';

// project import
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { drawerWidth } from 'config.js';

// assets
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import { useDispatch } from 'react-redux';
import { fetchuserwiseCompany } from 'store/thunk';
// import logo from 'assets/images/logo.svg';

// ==============================|| HEADER ||============================== //

const Header = ({ drawerToggle }) => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [name, setname] = useState('');
  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const response = await dispatch(fetchuserwiseCompany());
        const defaultCompany = response.find((company) => company.setDefault === true);
        // console.log(defaultCompany, 'default');
        if (defaultCompany) {
          setname(defaultCompany.companies.companyname);
          // console.log('Default Company Name:', defaultCompany.companyname);
        } else {
          console.log('No default company found');
        }
      } catch (error) {
        console.error('Error fetching company:', error);
      }
    };

    fetchCompany();
  }, [dispatch]);

  return (
    <>
      <Box width={drawerWidth}>
        <Grid container>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Grid item>
              {/* <Box mt={0.5}>
                <img src={logo} alt="Logo" />
              </Box> */}
            </Grid>
          </Box>
          <Grid item>
            <IconButton
              edge="start"
              sx={{ mr: theme.spacing(1.25) }}
              color="inherit"
              aria-label="open drawer"
              onClick={drawerToggle}
              size="large"
            >
              <MenuTwoToneIcon sx={{ fontSize: '1.5rem' }} />
              <Typography style={{ marginLeft: '10px' }}>{name}</Typography>
            </IconButton>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <SearchSection theme="light" />
      <NotificationSection theme="light" />
      <ProfileSection theme="light" />
    </>
  );
};

Header.propTypes = {
  drawerToggle: PropTypes.func
};

export default Header;
