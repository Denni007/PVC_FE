import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Debitnoteviewdata } from 'store/thunk';

const Debitnoteview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(Debitnoteviewdata(id, navigate))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching debit note data:', error);
      });
  }, [dispatch, id, navigate]);
  const subtotal = data.totalMrp ? data.totalMrp : 0;
  const maintotal = data.mainTotal ? data.mainTotal : 0;
  const sgst = data.totalSgst ? data.totalSgst / 2 : 0;
  const cgst = data.totalSgst ? data.totalSgst / 2 : 0;
  const igst = data.totalIgst ? data.totalIgst : 0;
  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Debit Note View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Party</Typography>
          <Typography variant="subtitle2">{data.accountDebitNo?.accountName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Date</Typography>
          <Typography variant="subtitle2">{new Date(data.debitdate).toLocaleDateString('en-GB')}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Debit Note No.</Typography>
          <Typography variant="subtitle2">{data.debitnoteno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Purchase Invoice No.</Typography>
          <Typography variant="subtitle2">{data.purchaseData?.supplyInvoiceNo}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Purchase Invoice Date</Typography>
          <Typography variant="subtitle2">{new Date(data.invoicedate).toLocaleDateString('en-GB')}</Typography>
        </Grid>

        <Grid item xs={12}>
          <div style={{ overflowX: 'auto', maxHeight: '300px', maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableCell width={420} sx={{ fontSize: '12px' }}>
                  PRODUCT/SERVICE
                </TableCell>
                <TableCell sx={{ fontSize: '12px' }}>MRP (₹)</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>UNIT</TableCell>
                <TableCell sx={{ fontSize: '12px' }}>RATE (₹)</TableCell>
              </TableHead>
              <TableBody>
                {data.items &&
                  data.items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item?.DebitProduct.productname}</TableCell>
                      <TableCell>{item?.mrp}</TableCell>
                      <TableCell>{item?.qty}</TableCell>
                      <TableCell>{item?.unit}</TableCell>
                      <TableCell>{item?.rate}</TableCell>
                    </TableRow>
                  ))}
                <TableCell></TableCell>
                <TableCell sx={{ fontSize: '12px', textAlign: 'right' }}>TotalQTY:</TableCell>
                <TableCell sx={{ fontSize: '12px', textAlign: 'left', padding: '10px' }}>{data?.totalQty}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableBody>
            </Table>
          </div>
        </Grid>

        <Grid item xs={12}>
          {isMobile ? (
            // For mobile screens, show each total on separate lines
            <>
              <div style={{ margin: '0px' }} id="subtotalcs">
                <p>Sub Total</p>
                <p>₹{subtotal?.toFixed(2)}</p>
              </div>
              {data?.totalSgst ? (
                <Grid item xs={12}>
                  <div style={{ margin: '0px' }} id="subtotalcs">
                    <p>SGST</p>
                    <p>₹{sgst?.toFixed(2)}</p>
                  </div>
                  <div style={{ margin: '0px' }} id="subtotalcs">
                    <p>CGST</p>
                    <p>₹{cgst?.toFixed(2)}</p>
                  </div>
                </Grid>
              ) : (
                ''
              )}
              {data?.totalIgst ? (
                <Grid item xs={12}>
                  <div style={{ margin: '0px' }} id="subtotalcs">
                    <p>IGST</p>
                    <p>₹{igst?.toFixed(2)}</p>
                  </div>
                </Grid>
              ) : (
                ''
              )}
              <div style={{ margin: '0px' }} id="subtotalcs">
                <p>Total Amt.</p>
                <p>₹{maintotal?.toFixed(2)}</p>
              </div>
            </>
          ) : (
            // For larger screens, show all totals on one line
            <div style={{ float: 'right', width: '30%' }}>
              <>
                <div style={{ margin: '0px' }} id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹{subtotal?.toFixed(2)}</p>
                </div>
                {data.totalSgst ? (
                  <Grid item xs={12}>
                    <div style={{ margin: '0px' }} id="subtotalcs">
                      <p>SGST</p>
                      <p>₹{sgst.toFixed(2)}</p>
                    </div>
                    <div style={{ margin: '0px' }} id="subtotalcs">
                      <p>CGST</p>
                      <p>₹{cgst.toFixed(2)}</p>
                    </div>
                  </Grid>
                ) : (
                  ''
                )}
                {data.totalIgst ? (
                  <Grid item xs={12}>
                    <div style={{ margin: '0px' }} id="subtotalcs">
                      <p>IGST</p>
                      <p>₹{igst.toFixed(2)}</p>
                    </div>
                  </Grid>
                ) : (
                  ''
                )}
                <div style={{ margin: '0px' }} id="subtotalcs">
                  <p>Total Amt.</p>
                  <p>₹{maintotal.toFixed(2)}</p>
                </div>
              </>
            </div>
          )}
        </Grid>

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/debitnotelist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/debitnotelist" style={{ textDecoration: 'none' }}>
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

export default Debitnoteview;
