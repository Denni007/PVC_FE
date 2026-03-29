import React, { useState } from 'react';
import { Button, Grid, Typography, Table, TableBody, TableRow, TableCell, TableHead, Paper } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { getallCashbookledger } from 'store/thunk';

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

const CashbookReport = () => {
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
    dispatch(getallCashbookledger(formattedFormDate, formattedToDate))
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
    const { totals, closingBalance, openingBalance, records } = data;

    return (
      <Grid container spacing={2} key={date} style={{ marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
        <Grid item xs={12}>
          <Typography variant="h5" align="center" gutterBottom>
            Date: {formatDate(date)}
          </Typography>
        </Grid>

        {/* Credit Side */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>Credit</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* NEW: Opening Balance as the first row in the Credit Table */}
              <TableRow style={{ backgroundColor: '#f0f4f8' }}>
                <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>{openingBalance || '0.00'}</TableCell>
                <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}></TableCell>
                <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>Opening Balance</TableCell>
              </TableRow>

              {records && records.filter((entry) => entry.creditAmount > 0).map((entry, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: 'center' }}>{entry.creditAmount}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: 'start', fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                  Total Day Credit: ₹{totals?.totalCredit || 0}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>

        {/* Debit Side */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>Debit</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Note: Opening Balance is typically shown on the Credit side in a Cashbook, 
                  so we leave the Debit side starting with actual transactions. */}
              {records && records.filter((entry) => entry.debitAmount > 0).map((entry, index) => (
                <TableRow key={index}>
                  <TableCell style={{ textAlign: 'center' }}>{entry.debitAmount}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                  <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                </TableRow>
              ))}

              <TableRow>
                <TableCell colSpan={3} style={{ textAlign: 'start', fontWeight: 'bold', backgroundColor: '#f9f9f9' }}>
                  Total Day Debit: ₹{totals?.totalDebit || 0}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h6" align="right" style={{ marginTop: '10px', paddingRight: '20px' }}>
            Day Closing Balance: ₹{closingBalance?.amount || 0} ({closingBalance?.type || 'N/A'})
          </Typography>
        </Grid>
      </Grid>
    );
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" gutterBottom id="mycss">
        Cash Book Report
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

export default CashbookReport;
