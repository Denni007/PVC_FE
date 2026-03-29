import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import { viewAddMaintenance } from 'store/thunk';

const Maintenscheduleview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(viewAddMaintenance(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching bom data:', error);
      });
  }, [dispatch, id, navigate]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        View Mainten Schedule
      </Typography>
      <Grid container style={{ marginBottom: '16px' }}>
        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Machine Id</Typography>
            <Typography variant="subtitle2">{data.machineMaintenance?.name}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Date</Typography>
            <Typography variant="subtitle2">{new Date(data.date).toLocaleDateString('en-GB')}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Type</Typography>
            <Typography variant="subtitle2">{data.type}</Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Machine Type</Typography>
            <Typography variant="subtitle2"></Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} style={isMobileX ? { overflowX: 'auto' } : {}}>
          <div style={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell width={500} sx={{ fontSize: '12px' }}>
                  PRODUCT
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
              </TableHead>
              <TableBody>
                {data.maintenanceItems?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row?.maintenanceProduct.productname}</TableCell>
                    <TableCell>{row?.qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Grid>
        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/maintenschedulelist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
            <Link to="/maintenschedulelist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Maintenscheduleview;
