import React from 'react';

// material-ui
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Tabs,
  Tab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputAdornment
} from '@mui/material';
import { styled } from '@mui/material/styles';

// project imports
import MainCard from '../../../ui-component/cards/MainCard';

const StyledTab = styled(Tab)({
  minWidth: 100,
  textTransform: 'none'
});

const ProductCosting = () => {
  const [tabValue, setTabValue] = React.useState(0);
  const [subTabValue, setSubTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubTabChange = (event, newValue) => {
    setSubTabValue(newValue);
  };

  return (
    <MainCard title="Product Costing">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="fittings pipes tabs">
              <StyledTab label="Fittings" />
              <StyledTab label="Pipes" />
            </Tabs>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="subtitle1">BUSINESS CONTEXT</Typography>
              <Typography variant="h5">SHREE KRISHNA INDUSTRIES</Typography>
            </Box>
            <Box>
              <Button variant="outlined" sx={{ mr: 1 }}>
                Matrix
              </Button>
              <Button variant="outlined" sx={{ mr: 1 }}>
                Quick View
              </Button>
              <Button variant="outlined">Focus</Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Tabs value={subTabValue} onChange={handleSubTabChange} aria-label="product type tabs">
            <StyledTab label="CPVC" />
            <StyledTab label="UPVC" />
            <StyledTab label="AGRI" />
            <StyledTab label="SWR SELFFIT" />
            <StyledTab label="SWR RINGFIT" />
          </Tabs>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <TextField label="Resin Rate" defaultValue="92" InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
              </Grid>
              <Grid item>
                <TextField label="Select Recipe" defaultValue="Manual Entry" />
              </Grid>
              <Grid item>
                <TextField label="Brass Rate" defaultValue="1000" InputProps={{ startAdornment: <InputAdornment position="start">₹</InputAdornment> }} />
              </Grid>
              <Grid item>
                <TextField label="Net %" defaultValue="0" />
                <Typography variant="body2">Value: ₹ 92.00</Typography>
              </Grid>
              <Grid item>
                <TextField label="MRP Mult %" defaultValue="250" />
              </Grid>
              <Grid item>
                <TextField label="Star (10%)" defaultValue="10" />
                 <Typography variant="body2">Value: ₹ 101.20</Typography>
              </Grid>
               <Grid item>
                <TextField label="Gold (15%)" defaultValue="15" />
                 <Typography variant="body2">Value: ₹ 105.80</Typography>
              </Grid>
              <Grid item>
                <TextField label="Silver (25%)" defaultValue="25" />
                 <Typography variant="body2">Value: ₹ 115.00</Typography>
              </Grid>
              <Grid item>
                <TextField label="Ref (0%)" defaultValue="0" />
                 <Typography variant="body2">Value: ₹ 0.00</Typography>
              </Grid>
              <Grid item>
                <TextField label="CD (0%)" defaultValue="0" />
                 <Typography variant="body2">Value: ₹ 0.00</Typography>
              </Grid>
              <Grid item>
                <TextField label="TOD (0%)" defaultValue="0" />
                 <Typography variant="body2">Value: ₹ 0.00</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box>
                <Typography variant="subtitle1">FINAL VALUE</Typography>
                <Typography variant="h4">₹92.00</Typography>
                <Typography variant="caption">AGGREGATED</Typography>
            </Box>
            <Box>
                <Button variant="contained" color="warning" sx={{ mr: 1 }}>Save to Cloud</Button>
                <Button variant="outlined">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V1L8 5L12 9V6C15.31 6 18 8.69 18 12C18 15.31 15.31 18 12 18C8.69 18 6 15.31 6 12H4C4 16.42 7.58 20 12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4Z" fill="currentColor"/></svg>
                </Button>
            </Box>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Button variant="contained" sx={{ mr: 1 }}>
              All
            </Button>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Brass
            </Button>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Bush
            </Button>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Couplers
            </Button>
            <Button variant="outlined" sx={{ mr: 1 }}>
              Elbows
            </Button>
            {/* ... more buttons */}
            <TextField placeholder="Filter..." size="small" sx={{ ml: 'auto' }} />
            <Button variant="outlined" sx={{ ml: 1 }}>
              Download
            </Button>
          </Box>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>NO.</TableCell>
                  <TableCell>DESCRIPTION</TableCell>
                  <TableCell>SIZE</TableCell>
                  <TableCell>GROUP</TableCell>
                  <TableCell>PCS/BOX</TableCell>
                  <TableCell>WT (KG)</TableCell>
                  <TableCell>CONV.</TableCell>
                  <TableCell>BASIC</TableCell>
                  <TableCell>FREIGHT</TableCell>
                  <TableCell>LANDED</TableCell>
                  <TableCell>NET RATE</TableCell>
                  <TableCell>REF</TableCell>
                  <TableCell>CD</TableCell>
                  <TableCell>TOD</TableCell>
                  <TableCell>FINAL VALUE</TableCell>
                  <TableCell>DISC %</TableCell>
                  <TableCell>PRICE LIST</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Example Row */}
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell>BRASSTEE</TableCell>
                  <TableCell>1&quot;</TableCell>
                  <TableCell>BRASS</TableCell>
                  <TableCell>15</TableCell>
                  <TableCell>0.07</TableCell>
                  <TableCell>45.00</TableCell>
                  <TableCell>₹49.29</TableCell>
                  <TableCell>₹1.04</TableCell>
                  <TableCell>₹50.33</TableCell>
                  <TableCell>₹50.33</TableCell>
                  <TableCell>₹0.00</TableCell>
                  <TableCell>₹0.00</TableCell>
                  <TableCell>₹0.00</TableCell>
                  <TableCell>₹50.33</TableCell>
                  <TableCell>60.00%</TableCell>
                  <TableCell>₹125.81</TableCell>
                </TableRow>
                 {/* You would map over your data to create the rest of the rows */}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

         <Grid item xs={12}>
            <Grid container justifyContent="space-around">
                <Grid item>
                    <Typography variant="subtitle2">LANDED FORMULA</Typography>
                    <Typography variant="caption">((WT * (RESIN+CONV)) + (BRASS * RATE) + FREIGHT)</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">NET SELLING</Typography>
                    <Typography variant="caption">LANDED * (1 + MARGIN %)</Typography>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2">TAXATION</Typography>
                    <Typography variant="caption">STANDARD IGST/OGST @ 18%</Typography>
                </Grid>
            </Grid>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProductCosting;
