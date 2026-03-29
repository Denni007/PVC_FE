import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createRecievecash, viewRecieveCash, updateRecieveCash, getallRecieveCash, fetchAllAccountCash } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import AnchorTemporaryDrawer from 'component/addparty';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const Paymentrecieve = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canseecreateAccount } = useCan();
  const [accountname, setaccountname] = useState('');
  const [account, setaccount] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectaccount, setSelectaccount] = useState([]);
  const [formData, setFormData] = useState({
    accountId: '',
    date: convertToIST(new Date()),
    amount: 0,
    description: '',
    receiptNo: ''
  });
  const [canCreateAccountValue, setCanCreateAccountValue] = useState(null);
  useEffect(() => {
    setCanCreateAccountValue(canseecreateAccount());
  }, [canseecreateAccount]);
  console.log(selectaccount);

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
        if (id) {
          const response = await dispatch(viewRecieveCash(id));
          const { date, amount, receiptNo, description, accountReceiptCash } = response;
          setFormData({ date, amount, receiptNo, description, accountId: accountReceiptCash.id });
          setaccountname(accountReceiptCash.contactPersonName);
          setSelectaccount(accountReceiptCash.id);
        }
      } catch (error) {
        console.error('Error fetching payment recive:', error);
      }
    };
    const fetchCustomerData = async () => {
      try {
        const response = await dispatch(fetchAllAccountCash());
        if (Array.isArray(response)) {
          const options = response.map((account) => ({ value: account.id, label: account.contactPersonName }));
          setaccount([{ value: 'new', label: 'Create New Party' }, ...options]);
          if (!canCreateAccountValue) {
            setaccount(options);
          }
        }
      } catch (error) {
        console.error('Error fetching payment recieve cash:', error);
      }
    };
    const generateAutoRecievecashNumber = async () => {
      if (!id) {
        try {
          const RecievecashResponse = await dispatch(getallRecieveCash());
          let nextRecievecashNumber = 1;
          if (RecievecashResponse.length === 0) {
            const RecievecashNumber = nextRecievecashNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              receiptNo: Number(RecievecashNumber)
            }));
            return;
          }
          const existingRecievecashNumbers = RecievecashResponse.map((Recievecash) => {
            const RecievecashNumber = Recievecash.receiptNo;
            return parseInt(RecievecashNumber);
          });
          const maxRecievecashNumber = Math.max(...existingRecievecashNumbers);
          if (!isNaN(maxRecievecashNumber)) {
            nextRecievecashNumber = maxRecievecashNumber + 1;
          }

          const RecievecashNumber = nextRecievecashNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            receiptNo: Number(RecievecashNumber)
          }));
        } catch (error) {
          console.error('Error generating auto receipt number:', error);
        }
      }
    };
    generateAutoRecievecashNumber();
    fetchData();
    if (canCreateAccountValue !== null) {
      fetchCustomerData();
    }
  }, [dispatch, id, canCreateAccountValue]);
  //create new customer after show in dropdwon
  const handleNewAccount = (newAccountData) => {
    setaccount((prevAccounts) => [...prevAccounts, { value: newAccountData?.id, label: newAccountData?.contactPersonName }]);
    setIsDrawerOpen(false);
  };
  const handlecreatepayment = async () => {
    try {
      if (id) {
        await dispatch(updateRecieveCash(id, formData, navigate));
      } else {
        await dispatch(createRecievecash(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating payment recieve cash data:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldName === 'amount' ? Number(value) : value
    }));
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Receipt Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Receipt Cash
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Receipt No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="receiptNo"
                value={formData.receiptNo}
                onChange={(e) => setFormData({ ...formData, receiptNo: e.target.value })}
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
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onAccountCreate={handleNewAccount} />
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Amount : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter amount"
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

          {/* <Grid item xs={12}>
            {isMobile ? (
              // For mobile screens, show each total on separate lines
              <>
                <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO CREDIT</p>
                  <p>₹0.00</p>
                </div>
                <div style={{ borderBottom: '0.2px solid lightgrey', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO APPLY</p>
                  <p>₹0.00</p>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO CREDIT</p>
                  <p>₹0.00</p>
                </div>
                <div style={{ borderBottom: '0.2px solid lightgrey', display: 'flex', justifyContent: 'space-between' }}>
                  <p>AMOUNT TO APPLY</p>
                  <p>₹0.00</p>
                </div>
              </div>
            )}
          </Grid> */}

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/paymentrecieveList" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" onClick={handlecreatepayment}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/paymentrecieveList" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreatepayment}>
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

export default Paymentrecieve;
