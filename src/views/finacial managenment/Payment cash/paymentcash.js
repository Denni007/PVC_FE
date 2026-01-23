import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createPaymentCash, fetchAllAccountCash, getallPaymentCash, paymentCashview, updatePaymentCash } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AnchorTemporaryDrawer from '../../../component/addparty';
import Select from 'react-select';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const PaymentPage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canseecreateAccount } = useCan();
  const [accountname, setaccountname] = useState('');
  const [account, setaccount] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectaccount, setSelectaccount] = useState([]);

  const handleDateChange = (date) => {
    if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    
    setFormData({ ...formData, date: formattedDate });
  } else {
    console.error('Invalid date provided to handleDateChange:', date);
  }
  };
  const [formData, setFormData] = useState({
    accountId: '',
    date: convertToIST(new Date()),
    amount: Number(),
    description: '',
    paymentNo: ''
  });
  console.log(selectaccount);
  const [canCreateAccountValue, setCanCreateAccountValue] = useState(null);
  useEffect(() => {
    setCanCreateAccountValue(canseecreateAccount());
  }, [canseecreateAccount]);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Party') {
      setIsDrawerOpen(true);
    } else {
      formData.accountId = selectedOption.value;
      setFormData(formData);
      setaccountname(selectedOption.label);
      setIsDrawerOpen(false);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccountCash());
        if (Array.isArray(response)) {
          const options = response.map((account) => ({ value: account.id, label: account.contactPersonName }));
          setaccount([{ value: 'new', label: 'Create New Party' }, ...options]);
        }
        if (!canCreateAccountValue) {
          setaccount(options);
        }
      } catch (error) {
        console.error('Error fetching payment cash:', error);
      }
    };
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(paymentCashview(id));
          const { amount, description, paymentNo, accountPaymentCash, date } = response;
          setFormData({ amount, description, paymentNo, accountId: accountPaymentCash.id, date });
          setaccountname(accountPaymentCash.contactPersonName);
          setSelectaccount(accountPaymentCash.id);
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
    if (canCreateAccountValue !== null) {
      fetchData();
    }
    viewData();
  }, [dispatch, id, canCreateAccountValue]);

  //create new Vendor after show in dropdwon
  const handleNewVendor = (newAccountData) => {
    setaccount((prevAccount) => [
      ...prevAccount,
      {
        value: newAccountData?.id,
        label: newAccountData?.contactPersonName
      }
    ]);
    setIsDrawerOpen(false);
  };
  const handlecreatePaymentCash = async () => {
    try {
      if (id) {
        await dispatch(updatePaymentCash(id, formData, navigate));
      } else {
        await dispatch(createPaymentCash(formData, navigate, 'payment'));
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

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Payment Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Payment Cash
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Payment No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="paymentNo"
                value={formData.paymentNo}
                onChange={(e) => setFormData({ ...formData, paymentNo: e.target.value })}
              />
            </Grid>
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
                Party : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={account}
                value={{ value: formData.accountId, label: accountname }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onAccountCreate={handleNewVendor} />
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
                <Link to="/paymentCashlist" style={{ textDecoration: 'none' }}>
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
                <Link to="/paymentCashlist" style={{ textDecoration: 'none' }}>
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

export default PaymentPage;
