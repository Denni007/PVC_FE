import { Grid, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { createSelfExpense, getExpenseAccount, selfExpenseview, updateSelfExpense } from 'store/thunk';
import DatePicker from 'react-datepicker';
import { Link } from 'react-router-dom';
import { convertToIST } from 'component/details';

const SelfExpense = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery('(max-width:600px)');
  const { id } = useParams();

  const [formData, setFormData] = useState({
    date: convertToIST(new Date()),
    amount: Number(),
    description: '',
    accountId: 2
  });

  useEffect(() => {
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(selfExpenseview(id));
          const { amount, description, date } = response;
          setFormData({ amount, description, date });
        }
      } catch (error) {
        console.error('Error fetching self Expense:', error);
      }
    };
    viewData();
    const getExpendeAccountId = async () => {
      try {
        const response = await dispatch(getExpenseAccount());
        const expenseId = response.find((res) => res.accountGroup.name === 'Expenses (self)')?.id;
        setFormData((prevFormData) => ({
          ...prevFormData,
          accountId: Number(expenseId)
        }));
      } catch (error) {
        console.error('Error fetching payment cash:', error);
      }
    };
    getExpendeAccountId();
  }, [dispatch, id]);

  const handlecreateSelfExpense = async () => {
    try {
      if (id) {
        await dispatch(updateSelfExpense(id, formData, navigate));
      } else {
        await dispatch(createSelfExpense(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating self Expense data:', error);
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
            Update Self Expense
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Self Expense
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={3} style={{ marginBottom: '16px' }}>
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
                <Link to="/selfExpenselist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" onClick={handlecreateSelfExpense}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/selfExpenselist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreateSelfExpense}>
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

export default SelfExpense;
