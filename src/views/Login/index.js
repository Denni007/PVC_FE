import React from 'react';
// import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Typography, Grid } from '@mui/material';

// project import
import AuthLogin from './FirebaseLogin';
// import backgroundImageUrl from '../../assets/images/pipe2.png';
import backgroundImageUrl from '../../assets/images/thumbnail_PVC.jpeg';
// import backgroundImageUrl from '../../assets/images/loginbackground.jpg';
// assets
// import Logo from 'assets/images/logo-dark.svg';

// ==============================|| LOGIN ||============================== //

const Login = () => {
  const theme = useTheme();

  return (
<Grid
  container
  justifyContent="center"
  alignItems="center"
  sx={{
    minHeight: '100vh',
    position: 'relative',
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',

    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      background: 'rgba(0,0,0,0.45)',
      backdropFilter: 'blur(3px)'
    }
  }}
>
      <Grid item xs={11} sm={7} md={6} lg={4}>
      <Card
  sx={{
    position: 'relative',
    zIndex: 1,
    maxWidth: 480,
    mx: 'auto',
    borderRadius: 4,

    background: 'rgba(255,255,255,0.92)',
    backdropFilter: 'blur(20px)',

    boxShadow: '0 20px 50px rgba(0,0,0,0.25)',

    border: '1px solid rgba(255,255,255,0.3)',

    overflow: 'hidden',

    transition: 'all .3s ease',

    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 25px 60px rgba(0,0,0,0.35)'
    }
  }}
>
          <CardContent sx={{ p: theme.spacing(5, 4, 3, 4) }}>
            <Grid container direction="column" spacing={4} justifyContent="center">
              <Grid item xs={12}>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Typography color="textPrimary" gutterBottom variant="h2">
                      Welcome Back
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Sign in to continue
                    </Typography>
                  </Grid>
                  {/* <Grid item>
                    <RouterLink to="/">
                      <img alt="Auth method" src={Logo} />
                    </RouterLink>
                  </Grid> */}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <AuthLogin />
              </Grid>
              <Grid container justifyContent="flex-start" sx={{ mt: theme.spacing(2), mb: theme.spacing(1) }}>
                {/* <Grid item>
                  <Typography variant="subtitle2" color="secondary" sx={{ textDecoration: 'none', pl: 2 }}>
                    Create new account
                  </Typography>
                </Grid> */}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
