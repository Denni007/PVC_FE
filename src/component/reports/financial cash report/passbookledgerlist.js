import { Typography, Table, TableBody, TableRow, TableCell, Card, TableHead, Grid, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getallPassbookledger } from 'store/thunk';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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

const Passbookbookledgerlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payments, setPayments] = useState({});
  const [getdata, setGetdata] = useState({});
  const [toDatec, setToDate] = useState(new Date());
  const [formDatec, setFormDate] = useState(new Date());

  const handleformDateChange = (date) => {
    setFormDate(date);
  };

  const handletoDateChange = (date) => {
    setToDate(date);
  };

  const handleLedger = (formDatec, toDatec) => {
    const formattedFormDate = formatDateForApi(formDatec);
    const formattedToDate = formatDateForApi(toDatec);
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
  const formDate = sessionStorage.getItem('RPassbookformDate');
  const toDate = sessionStorage.getItem('RPassbooktoDate');

  useEffect(() => {
    dispatch(getallPassbookledger(formDate, toDate))
      .then((data) => {
        setPayments(data.records || {});
        setGetdata(data.form);
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
        if (error.response.status === 401) {
          navigate('/');
        }
      });
  }, [dispatch, formDate, toDate, navigate]);

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
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
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
                      <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
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
                <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
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
                      <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
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
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" gutterBottom id="mycss">
        Pass Book Report
      </Typography>
      <Grid container style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">From Date:</Typography>
          <DatePicker selected={formDatec} onChange={handleformDateChange} dateFormat="dd/MM/yyyy" />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">To Date:</Typography>
          <DatePicker selected={toDatec} onChange={handletoDateChange} dateFormat="dd/MM/yyyy" />
        </Grid>
        <Grid item xs={12} md={3} sm={6} alignContent={'center'} sx={{ marginTop: '10px' }}>
          <Button onClick={() => handleLedger(formDatec, toDatec)} variant="contained" color="secondary">
            GO
          </Button>
        </Grid>
      </Grid>
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
    </Card>
  );
};

export default Passbookbookledgerlist;
