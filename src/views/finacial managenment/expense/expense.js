import React, { useEffect, useState } from 'react';
import { Typography, Paper, Grid, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { createPaymentCash, paymentCashview, getallPaymentCash, updatePaymentCash, getExpenseAccount } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { convertToIST } from 'component/details';

const ExpensePage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    date: convertToIST(new Date()),
    amount: Number(),
    description: '',
    accountId: 3,
    paymentNo: ''
  });

  useEffect(() => {
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(paymentCashview(id));
          const { amount, description, paymentNo, accountPaymentCash, date } = response;
          setFormData({ amount, description, paymentNo, accountId: accountPaymentCash.id, date });
        }
      } catch (error) {
        console.error('Error fetching payment cash:', error);
      }
    };
    const generateAutoPaymentcashNumber = async () => {
      if (!id) {
        try {
          const PaymentcashResponse = await dispatch(getallPaymentCash());
          let nextPaymentcashNumber = 1;
          if (PaymentcashResponse.data.length === 0) {
            const PaymentcashNumber = nextPaymentcashNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              paymentNo: Number(PaymentcashNumber)
            }));
            return;
          }
          const existingPaymentcashNumbers = PaymentcashResponse.data.map((Paymentcash) => {
            const PaymentcashNumber = Paymentcash.paymentNo;
            return parseInt(PaymentcashNumber);
          });
          const maxPaymentcashNumber = Math.max(...existingPaymentcashNumbers);
          if (!isNaN(maxPaymentcashNumber)) {
            nextPaymentcashNumber = maxPaymentcashNumber + 1;
          }

          const PaymentcashNumber = nextPaymentcashNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            paymentNo: Number(PaymentcashNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Payment cash number:', error);
        }
      }
    };
    generateAutoPaymentcashNumber();
    viewData();
    const getExpendeAccountId = async () => {
      if (!id) {
        try {
          const response = await dispatch(getExpenseAccount());
          const expenseId = response.find((res) => res.accountGroup.name === 'Expenses (Company)').id;
          setFormData((prevFormData) => ({
            ...prevFormData,
            accountId: Number(expenseId)
          }));
        } catch (error) {
          console.error('Error fetching payment cash:', error);
        }
      }
    };
    getExpendeAccountId();
  }, [dispatch, id]);

  const handlecreatePaymentCash = async () => {
    try {
      if (id) {
        await dispatch(updatePaymentCash(id, formData, navigate, true));
      } else {
        await dispatch(createPaymentCash(formData, navigate, 'Expense'));
      }
    } catch (error) {
      console.error('Error creating payment cash data:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Expense
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Expense
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                id="date"
                selected={formData.date ? new Date(formData.date) : null}
                onChange={(date) => handleDateChange(date)}
                dateFormat="dd/MM/yyyy"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Amount : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Amount"
                id="amount"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">description :</Typography>
              <input
                placeholder="Enter description"
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/expenselist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" onClick={handlecreatePaymentCash}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/expenselist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreatePaymentCash}>
                  Save
                </button>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export default ExpensePage;
