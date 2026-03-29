// import React from 'react';
// import { Link } from 'react-router-dom';

// // material-ui
// import { Card, CardHeader, CardContent, Divider, Grid, Typography } from '@mui/material';

// // project import
// import Breadcrumb from 'component/Breadcrumb';
// import { gridSpacing } from 'config.js';

// // ==============================|| SAMPLE PAGE ||============================== //

// const SamplePage = () => {
//   return (
//     <>
//       <Breadcrumb title="Sample Page">
//         <Typography component={Link} to="/" variant="subtitle2" color="inherit" className="link-breadcrumb">
//           Home
//         </Typography>
//         <Typography variant="subtitle2" color="primary" className="link-breadcrumb">
//           Sample Page
//         </Typography>
//       </Breadcrumb>
//       <Grid container spacing={gridSpacing}>
//         <Grid item>
//           <Card>
//             <CardHeader
//               title={
//                 <Typography component="div" className="card-header">
//                   Sample Page
//                 </Typography>
//               }
//             />
//             <Divider />
//             <CardContent>
//               <Typography variant="body2">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
//                 Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
//                 dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiatnulla pariatur. Excepteur sint occaecat cupidatat non
//                 proident, sunt in culpa qui officia deserunt mollitanim id est laborum.
//               </Typography>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>
//     </>
//   );
// };

// export default SamplePage;
import React from 'react';
import { Button, Card, CardContent, Link, Stack, Typography } from '@mui/material';

const CompanyProfile = () => {
  return (
    <Card>
      {/* <CardMedia component="img" height="140" image="./src/assets/images/logo.jpg" alt="Company Logo" /> */}
      <CardContent>
        <Typography variant="h5" component="div">
          <img src={require('../../assets/images/logo.jpg')} alt="logo" height={100}></img>
        </Typography>
        <Typography variant="h6">WEBSPHERE</Typography>
        <Typography variant="body1">Mission: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        <Typography variant="body1">Vision: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        <Typography variant="body1">Values: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
        <Stack direction="row" spacing={2} mt={2}>
          <Button variant="contained" color="secondary">
            Edit Profile
          </Button>
          <Button variant="outlined" color="secondary">
            View Team
          </Button>
        </Stack>
        <Typography variant="body2" mt={2}>
          For more information, visit our website:
          <Link href="https://www.example.com" target="_blank" rel="noopener">
            www.example.com
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CompanyProfile;
