import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { viewSingleBom } from 'store/thunk';

const Bomview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bomId } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(viewSingleBom(bomId))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching bom data:', error);
      });
  }, [dispatch, bomId, navigate]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Production View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">No.</Typography>
          <Typography variant="subtitle2">{data.bomNo}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Date</Typography>
          <Typography variant="subtitle2">{new Date(data.date).toLocaleDateString('en-GB')}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">weight</Typography>
          <Typography variant="subtitle2">{data.weight}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Product</Typography>
          <Typography variant="subtitle2">{data.bomProduct?.productname}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Qty</Typography>
          <Typography variant="subtitle2">{data.qty}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Unit</Typography>
          <Typography variant="subtitle2">{data.unit}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Shift</Typography>
          <Typography variant="subtitle2">{data.shift}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Start Time</Typography>
          <Typography variant="subtitle2">{data.startTime}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">End Time</Typography>
          <Typography variant="subtitle2">{data.endTime}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Wastage Name</Typography>
          <Typography variant="subtitle2">{data.bomWastage?.productname}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Wastage Qty</Typography>
          <Typography variant="subtitle2">{data.wastageQty}</Typography>
        </Grid>

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell width={420} sx={{ fontSize: '12px' }}>
                  PRODUCT/SERVICE
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>UNIT</TableCell>
              </TableHead>
              <TableBody>
                {data.bomItems &&
                  data.bomItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.bomItemsProduct?.productname}</TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell>{item?.unit}</TableCell>
                    </TableRow>
                  ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell>Total Quantity</TableCell>
                  <TableCell>
                    <strong>{data.totalQty}</strong>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/billofmateriallist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/billofmateriallist" style={{ textDecoration: 'none' }}>
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

export default Bomview;
