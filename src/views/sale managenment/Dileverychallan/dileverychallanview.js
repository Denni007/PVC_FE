import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Deliverychallanview } from 'store/thunk';

const DileveryChallanView = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  //call single deliverychallan view api
  useEffect(() => {
    dispatch(Deliverychallanview(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching delivery challan data:', error);
      });
  }, [dispatch, navigate, id]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Delivery Challan View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Party</Typography>
          <Typography variant="subtitle2">{data?.accountDelivery?.accountName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Challan No.</Typography>
          <Typography variant="subtitle2">{data?.challanno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Sales Invoice No.</Typography>
          <Typography variant="subtitle2">{data?.saleDeliveryChallan?.invoiceno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Challan Date</Typography>
          <Typography variant="subtitle2">{new Date(data?.date).toLocaleDateString('en-GB')}</Typography>
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
                {data?.items &&
                  data?.items?.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.DeliveryProduct?.productname}</TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell>{item?.unit}</TableCell>
                    </TableRow>
                  ))}
                <TableCell sx={{ fontSize: '12px', textAlign: 'right' }}>TotalQTY:</TableCell>
                <TableCell sx={{ fontSize: '12px', textAlign: 'left', padding: '10px' }}>{data?.totalQty}</TableCell>
                <TableCell></TableCell>
              </TableBody>
            </Table>
          </div>
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/deliverychallanlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/deliverychallanlist" style={{ textDecoration: 'none' }}>
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

export default DileveryChallanView;
