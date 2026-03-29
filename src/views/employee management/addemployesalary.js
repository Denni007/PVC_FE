import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createEmployeesalary, fetchAllCompanyBank, fetchAllUserBank } from 'store/thunk';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Addemployee = () => {
  const location = useLocation();
  const { userId, salaryId } = location.state || {};
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userBankId: '',
    amount: Number(),
    companyBankId: '',
    paymentType: '',
    date: new Date()
  });
  const { id } = useParams();
  const [companyname, setcompanyname] = useState('');
  const [userbankname, setUserbankname] = useState('');
  const [account, setAccount] = useState([]);
  const [useraccount, setUseraccount] = useState([]);

  useEffect(() => {
    const accountdata = async () => {
      try {
        const responsecompany = await dispatch(fetchAllCompanyBank());
        if (Array.isArray(responsecompany)) {
          const options = responsecompany.map((company) => ({ value: company.id, label: company.bankname }));
          setAccount([...options]);
        }
      } catch (error) {
        console.error('not fetch company bank accounts', error);
      }
    };
    const useraccountdata = async () => {
      try {
        const responseuserbank = await dispatch(fetchAllUserBank(userId));
        if (Array.isArray(responseuserbank)) {
          const options = responseuserbank.map((user) => ({ value: user.id, label: user.bankname }));
          setUseraccount([...options]);
        }
      } catch (error) {
        console.error('not fetch user bank accounts', error);
      }
    };
    useraccountdata();
    accountdata();
  }, [dispatch, userId]);

  const handleDateChange = (date) => {
    setFormData({ ...formData, date: date });
  };

  const handleSelectAccountChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      formData.companyBankId = selectedOption.value;
      setFormData(formData);
      setcompanyname(selectedOption.label);
    }
  };

  const handleSelectUserAccountChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      formData.userBankId = selectedOption.value;
      setFormData(formData);
      setUserbankname(selectedOption.label);
    }
  };

  const handlecreatePaymentCash = async () => {
    try {
      const payload = {
        ...formData,
        companyBankId: formData.paymentType === 'cash' ? null : formData.companyBankId,
        userBankId: formData.paymentType === 'cash' ? null : formData.userBankId
      };
      await dispatch(createEmployeesalary(salaryId, payload, navigate));
    } catch (error) {
      console.error('Error creating cliam cash data:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };
  const handlepaymentTypeChange = (selectedOption) => {
    setFormData({ ...formData, paymentType: selectedOption.value });
  };

  const paymentTypeOptions = [
    { value: 'cash', label: 'Cash' },
    { value: 'bank', label: 'Bank' }
  ];
  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Pay Salary
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Pay Salary
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker id="date" selected={formData.date} onChange={(date) => handleDateChange(date)} dateFormat="dd/MM/yyyy" />
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
            {formData.paymentType === 'bank' && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">
                    Company Account : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <Select
                    color="secondary"
                    options={account}
                    value={{ value: formData.companyBankId, label: companyname }}
                    onChange={handleSelectAccountChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">
                    Employee Account : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <Select
                    color="secondary"
                    options={useraccount}
                    value={{ value: formData.userBankId, label: userbankname }}
                    onChange={handleSelectUserAccountChange}
                  />
                </Grid>
              </>
            )}

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Payment Type: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                options={paymentTypeOptions}
                value={paymentTypeOptions.find((option) => option.value === formData.paymentType)}
                onChange={handlepaymentTypeChange}
              />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/employeedirectory" style={{ textDecoration: 'none' }}>
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
                <Link to="/employeedirectory" style={{ textDecoration: 'none' }}>
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

export default Addemployee;
