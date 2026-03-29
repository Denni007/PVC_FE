import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableHead,
  TableContainer,
  Grid,
  Paper,
  styled,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { getallCashDaybookledger } from 'store/thunk';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import useCan from 'views/permission managenment/checkpermissionvalue';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'particulars', label: 'Particulars', align: 'center' },
  { id: 'vchType', label: 'Vch Type', align: 'center' },
  { id: 'vchNo', label: 'Vch No.', align: 'center' },
  { id: 'debitAmount', label: 'Debit', align: 'center' },
  { id: 'creditAmount', label: 'Credit', align: 'center' }
];

const CustomTableRow = styled(TableRow)({
  padding: '5px 0px'
});

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const Cashdaybookledgerlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [getdata, setGetdata] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);
  const [totals, setTotals] = useState({ totalCredit: 0, totalDebit: 0 });
  const [closingBalance, setClosingBalance] = useState({ type: '', amount: 0 });
  const formData = sessionStorage.getItem('RCDaybookformDate');
  const toDate = sessionStorage.getItem('RCDaybooktoDate');
  const [toDatec, setToDate] = useState(new Date());
  const [formDatec, setFormDate] = useState(new Date());

  useEffect(() => {
    dispatch(getallCashDaybookledger(formData, toDate))
      .then((data) => {
        if (data && data.records) {
          const recordsArray = Object.values(data.records).flat();
          setPayments(recordsArray);
          setGetdata(data.form);
          setTotals({
            totalCredit: data.totals.totalCredit || 0,
            totalDebit: data.totals.totalDebit || 0
          });
          setClosingBalance(data.closingBalance);
          setTotalAmount(data.totalAmount);
        } else {
          console.error('Data or data.records is undefined.');
          if (error.response.status === 401) {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
      });
  }, [dispatch, formData, toDate, navigate]);
  const handleformDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormDate(formattedDate);
  };

  const handletoDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setToDate(formattedDate);
  };

  const handleLedger = async (formDatec, toDatec) => {
    const data = await dispatch(getallCashDaybookledger(formDatec, toDatec));
    const recordsArray = Object.values(data.records).flat();
    setPayments(recordsArray);
    setGetdata(data.form);
    setTotals({
      totalCredit: data.totals.totalCredit || 0,
      totalDebit: data.totals.totalDebit || 0
    });
    setClosingBalance(data.closingBalance);
    setTotalAmount(data.totalAmount);
    navigate('/cashdaybookledger');
    setFormDate(formDatec);
    sessionStorage.setItem('RCDaybookformDate', formDatec);
    setToDate(toDatec);
    sessionStorage.setItem('RCDaybooktoDate', toDatec);
  };
  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Grid container style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">From Date:</Typography>
          <DatePicker
            selected={formDatec}
            onChange={(date) => handleformDateChange(date)}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showTimeSelect={false}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">To Date:</Typography>
          <DatePicker
            selected={toDatec}
            onChange={(date) => handletoDateChange(date)}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showTimeSelect={false}
          />
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
        <Grid item xs={12}>
          <Typography variant="h6" align="center">
            {formatDate(formData)} to {formatDate(toDate)}
          </Typography>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow sx={{ padding: '5px 0px' }}>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments.map((payment, index) => (
              <CustomTableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ color: column.id === 'creditAmount' ? '#00CE00' : column.id === 'debitAmount' ? 'red' : 'inherit' }}
                  >
                    {column.id === 'creditAmount' && payment[column.id] !== 0 ? payment[column.id] : ''}
                    {column.id === 'debitAmount' && payment[column.id] !== 0 ? payment[column.id] : ''}
                    {column.id === 'date' && (index === 0 || payments[index - 1]?.date !== payment.date)
                      ? formatDate(payment[column.id])
                      : ''}
                    {column.id !== 'creditAmount' && column.id !== 'debitAmount' && column.id !== 'date' && payment[column.id]}
                  </TableCell>
                ))}
              </CustomTableRow>
            ))}
          </TableBody>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} align="right"></TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" style={{ color: 'red' }}>
                  {totals.totalDebit.toFixed(2)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1" style={{ color: '#00CE00' }}>
                  {totals.totalCredit.toFixed(2)}
                </Typography>
              </TableCell>
            </TableRow>
            {closingBalance.type === 'credit' && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Closing Balance :</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center" style={{ color: '#00CE00' }}>
                  {closingBalance.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            )}
            {closingBalance.type === 'debit' && (
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="center">Closing Balance :</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell align="center" style={{ color: 'red' }}>
                  {closingBalance.amount.toFixed(2)}
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">{totalAmount.toFixed(2)}</Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="subtitle1">{totalAmount.toFixed(2)}</Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default Cashdaybookledgerlist;
