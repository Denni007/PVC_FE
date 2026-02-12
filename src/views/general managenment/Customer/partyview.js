import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, TableCell, TableRow, TableHead, Table } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { viewAccount } from 'store/thunk';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Customerview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState([]);

  // Fetch customer data from API
  useEffect(() => {
    dispatch(viewAccount(id))
      .then((response) => {
        const AccountData = response;
        setData(AccountData);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching User data:', error);
      });
  }, [dispatch, id, navigate]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Account View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Account Name</Typography>
          <Typography variant="subtitle2">{data?.accountName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Short Name</Typography>
          <Typography variant="subtitle2">{data?.shortName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Contact Person Name</Typography>
          <Typography variant="subtitle2">{data?.contactPersonName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Account Group</Typography>
          <Typography variant="subtitle2">{data?.accountGroup?.name}</Typography>
        </Grid>
        {data?.accountGroup?.name === 'Sundry Creditors' ||
        data?.accountGroup?.name === 'Sundry Debtors' ||
        data?.accountGroup?.name === 'Unsecured Loans' ? (
          <>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Email</Typography>
              <Typography variant="subtitle2">{data?.accountDetail?.email}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Mobile No.</Typography>
              <Typography variant="subtitle2">{data?.accountDetail?.mobileNo}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Pan No.</Typography>
              <Typography variant="subtitle2">{data?.accountDetail?.panNo}</Typography>
            </Grid>
            {data?.accountGroup?.name === 'Sundry Creditors' || data?.accountGroup?.name === 'Sundry Debtors' ? (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">Credit Period(in day)</Typography>
                  <Typography variant="subtitle2">{data?.accountDetail?.creditPeriod}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">GST NO.</Typography>
                  <Typography variant="subtitle2">{data?.accountDetail?.gstNumber}</Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">Opening Balance</Typography>
                  <Typography variant="subtitle2">
                    {Math.abs(data?.accountDetail?.balance)} {data?.accountDetail?.balance < 0 ? 'Debit' : 'Credit'}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">Cash Opening Balance</Typography>
                  <Typography variant="subtitle2">
                    {Math.abs(data?.accountDetail?.cashOpeningBalance)} {data?.accountDetail?.cashOpeningBalance < 0 ? 'Debit' : 'Credit'}
                  </Typography>
                </Grid>
              </>
            ) : (
              ''
            )}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Address 1</Typography>
              <Typography variant="subtitle2">{data?.accountDetail?.address1}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Address 2</Typography>
              <Typography variant="subtitle2">{data?.accountDetail?.address2}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">City</Typography>
              <Typography variant="subtitle2">{data?.accountDetail?.city}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">State</Typography>
              <Typography variant="subtitle2">{data?.accountDetail?.state}</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Pincode</Typography>
              <Typography variant="subtitle2">{data?.accountDetail?.pincode}</Typography>
            </Grid>
            {data?.accountDetail?.creditLimit === true && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">Total Credit</Typography>
                  <Typography variant="subtitle2">{data?.accountDetail?.totalCredit}</Typography>
                </Grid>
              </>
            )}
          </>
        ) : (
          ''
        )}
        {data?.accountGroup?.name === 'Bank Account' || data?.accountDetail?.bankDetail === true ? (
          <Grid item container>
            <>
              <Table>
                <TableHead>
                  <TableCell>Account Holder Name</TableCell>
                  <TableCell>Bank Name</TableCell>
                  <TableCell>Account Number</TableCell>
                  <TableCell>IFSC Code</TableCell>
                </TableHead>
                <TableRow>
                  <TableCell>{data?.accountDetail?.accountHolderName}</TableCell>
                  <TableCell>{data?.accountDetail?.bankName}</TableCell>
                  <TableCell>{data?.accountDetail?.accountNumber}</TableCell>
                  <TableCell>{data?.accountDetail?.ifscCode}</TableCell>
                </TableRow>
              </Table>
            </>
          </Grid>
        ) : (
          ''
        )}
        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/accountlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/accountlist" style={{ textDecoration: 'none' }}>
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

export default Customerview;