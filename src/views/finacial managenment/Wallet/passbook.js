import React, { useState } from 'react';
import { Button, Grid, Typography, Table, TableBody, TableRow, TableCell, TableHead, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { getallPassbookledger } from 'store/thunk';

const formatDate = (dateString) => {
  if (!dateString) {
    console.error('Date string is undefined or empty:', dateString);
    return 'Invalid Date';
  }
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    console.error('Invalid date format:', dateString);
    return 'Invalid Date';
  }

  return date.toLocaleDateString('en-GB', options);
};
const Passbookreport = () => {
  const dispatch = useDispatch();

  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [payments, setPayments] = useState([]);
  const [getdata, setGetdata] = useState({});
  const [showData, setShowData] = useState(false);

  const handleformDateChange = (date) => {
    setFormDate(date);
  };

  const handletoDateChange = (date) => {
    setToDate(date);
  };

  const handleLedger = (formDate, toDate) => {
    const formattedFormDate = formatDateForApi(formDate);
    const formattedToDate = formatDateForApi(toDate);
    dispatch(getallPassbookledger(formattedFormDate, formattedToDate))
      .then((data) => {
        setPayments(data.records || {});
        setGetdata(data.form);
        setShowData(true);
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
      });
  };

  const formatDateForApi = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const renderRecordsByDate = (date, data) => {
    const { totals, closingBalance, records } = data;
    return (
      <Grid container spacing={2} key={date} style={{ marginBottom: '20px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            Date: {formatDate(date)}
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
            Credit
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Banks</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records
                  .filter((entry) => entry.creditAmount > 0)
                  .map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: 'center' }}>{entry.creditAmount}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.party}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.bank}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.username}</TableCell>
                    </TableRow>
                  ))}
              {totals && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Total Credit: {totals.totalCredit}
                  </TableCell>
                </TableRow>
              )}
              {closingBalance && closingBalance.type === 'credit' && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Closing Balance: {closingBalance.amount}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
            Debit
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Banks</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>User Name</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records &&
                records
                  .filter((entry) => entry.debitAmount > 0)
                  .map((entry, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: 'center' }}>{entry.debitAmount}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.party}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.bank}</TableCell>
                      <TableCell style={{ textAlign: 'center' }}>{entry.username}</TableCell>
                    </TableRow>
                  ))}
              {totals && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Total Debit: {totals.totalDebit}
                  </TableCell>
                </TableRow>
              )}
              {closingBalance && closingBalance.type === 'debit' && (
                <TableRow>
                  <TableCell colSpan={4} style={{ textAlign: 'start', fontWeight: 'bold' }}>
                    Closing Balance: {closingBalance.amount}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  };
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" gutterBottom id="mycss">
        Pass Book Report
      </Typography>
      <Grid container style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">From Date:</Typography>
          <DatePicker selected={formDate} onChange={handleformDateChange} dateFormat="dd/MM/yyyy" />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">To Date:</Typography>
          <DatePicker selected={toDate} onChange={handletoDateChange} dateFormat="dd/MM/yyyy" />
        </Grid>
        <Grid item xs={12} md={3} sm={6} alignContent={'center'} sx={{ marginTop: '10px' }}>
          <Button onClick={() => handleLedger(formDate, toDate)} variant="contained" color="secondary">
            GO
          </Button>
        </Grid>
      </Grid>

      {showData && (
        <>
          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <Typography variant="h6">From:</Typography>
              <Typography variant="h4">{getdata.companyname}</Typography>
              <Typography>{getdata.address1}</Typography>
              <Typography>
                {getdata.city}, {getdata.state}, {getdata.pincode}
              </Typography>
            </Grid>
          </Grid>

          <Grid container style={{ marginTop: '20px', overflowY: 'scroll' }}>
            {Object.entries(payments).map(([date, data]) => renderRecordsByDate(date, data))}
          </Grid>
        </>
      )}
      {/* </Card> */}
    </Paper>
  );
};

export default Passbookreport;
