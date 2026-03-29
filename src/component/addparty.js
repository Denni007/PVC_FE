import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Paper, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { createAccounts, fetchAllAccountOptions, updateAccount, viewAccount } from 'store/thunk';
import Select from 'react-select';
import { CitySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { useNavigate } from 'react-router';

const AnchorTemporaryDrawer = ({ open, onClose, id, onAccountCreate, onAccountUpdated }) => {
  AnchorTemporaryDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string,
    onAccountCreate: PropTypes.func.isRequired,
    onAccountUpdated: PropTypes.func.isRequired
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    accountname: '',
    shortname: '',
    contactpersonname: '',
    accountGroupId: ''
  });
  const [loading, setLoading] = React.useState(false);
  const [stateid, setstateid] = React.useState(0);
  const [countryid, setCountryid] = React.useState(101);
  {
    console.log(setCountryid);
  }
  const [bankdetail, setBankDetail] = React.useState(false);
  const [creditlimit, setCreditlimit] = React.useState(false);
  const [bankName, setBankName] = React.useState('');
  const [accountNumber, setAccountNumber] = React.useState('');
  const [accountHolderName, setAccountHolderName] = React.useState('');
  const [ifscCode, setIfscCode] = React.useState('');
  const [totalCredit, setTotalCredit] = React.useState();
  const [sundryDetails, setSundryDetails] = React.useState({
    email: '',
    mobileNo: '',
    panNo: null,
    state: '',
    city: '',
    address1: '',
    address2: null,
    pincode: '',
    balance: 0,
    cashOpeningBalance: 0,
    gstnumber: null,
    creditperiod: 0
  });
  const [accountgroup, setAccountgroup] = React.useState([]);
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [registrationType, setregistrationType] = React.useState('Composition');
  const [balanceType, setBalanceType] = React.useState('Credit');
  const [cashBalanceType, setCashBalanceType] = React.useState('Credit');

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleInputSundryDetailChange = (e) => {
    const { id, value } = e.target;
    setSundryDetails({ ...sundryDetails, [id]: value });

    if (id === 'gstnumber' && value.length === 15) {
      const panNo = value.substring(2, 12);
      setSundryDetails((prevDetails) => ({
        ...prevDetails,
        panNo: panNo
      }));
    }
  };

  const handleGroupChange = (selectedOption) => {
    setFormData({ ...formData, accountGroupId: selectedOption.value });
    setSelectedGroup(selectedOption);
  };
  const handleCreditDetailChange = (event) => {
    setCreditlimit(event.target.value === 'true' ? true : false);
  };
  const handleTotalCreditChange = (event) => {
    setTotalCredit(event.target.value);
  };
  const handleBankDetailChange = (event) => {
    setBankDetail(event.target.value === 'true' ? true : false);
    if (!event.target.value) {
      setBankName('');
      setAccountNumber('');
      setAccountHolderName('');
      setIfscCode('');
    }
  };
  const handleCityChange = (selectedCity) => {
    setSundryDetails({ ...sundryDetails, city: selectedCity.name });
  };

  const handleStateChange = (selectedState) => {
    setSundryDetails({ ...sundryDetails, state: selectedState.name });
  };

  const handleGstTypeChange = (selectedOption) => {
    setregistrationType(selectedOption.value);
  };

  const handleBalanceTypeChange = (event) => {
    setBalanceType(event.target.value);
  };

  const handleCashBalanceTypeChange = (event) => {
    setCashBalanceType(event.target.value);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await dispatch(viewAccount(id));
          setFormData({
            accountname: response.accountName || '',
            shortname: response.shortName || '',
            contactpersonname: response.contactPersonName || '',
            accountGroupId: response.accountGroupId || ''
          });
          setSundryDetails({
            email: response.accountDetail?.email || '',
            mobileNo: response.accountDetail?.mobileNo || '',
            panNo: response.accountDetail?.panNo || null,
            state: response.accountDetail?.state || '',
            city: response.accountDetail?.city || '',
            address1: response.accountDetail?.address1 || '',
            address2: response.accountDetail?.address2 || null,
            pincode: response.accountDetail?.pincode || '',
            balance: response.accountDetail?.balance || 0,
            cashOpeningBalance: response.accountDetail?.cashOpeningBalance || 0,
            gstnumber: response.accountDetail?.gstNumber || 0,
            creditperiod: response.accountDetail?.creditPeriod || 0
          });
          setBankDetail(response.accountDetail?.bankDetail || false);
          setCreditlimit(response.accountDetail?.creditLimit || false);
          setBankName(response.accountDetail?.bankName || '');
          setAccountNumber(response.accountDetail?.accountNumber || '');
          setAccountHolderName(response.accountDetail?.accountHolderName || '');
          setIfscCode(response.accountDetail?.ifscCode || '');
          setTotalCredit(response.accountDetail?.totalCredit || '');
          setSelectedGroup({
            value: response.accountGroup?.id || '',
            label: response.accountGroup?.name || ''
          });
          setregistrationType(response.accountDetail?.registrationType);
          // Calculate balance type from balance value: negative = Debit, otherwise Credit
          const balanceValue = parseFloat(response.accountDetail?.balance || 0);
          setBalanceType(balanceValue < 0 ? 'Debit' : 'Credit');
          const cashBalanceValue = parseFloat(response.accountDetail?.cashOpeningBalance || 0);
          setCashBalanceType(cashBalanceValue < 0 ? 'Debit' : 'Credit');
        } else {
          setFormData({
            accountname: '',
            shortname: '',
            contactpersonname: '',
            accountGroupId: ''
          });
          setSundryDetails({
            email: '',
            mobileNo: '',
            panNo: null,
            state: '',
            city: '',
            address1: '',
            address2: null,
            pincode: '',
            balance: 0,
            cashOpeningBalance: 0,
            gstnumber: null,
            creditperiod: 0
          });
          setBankDetail(false);
          setCreditlimit(false);
          setBankName('');
          setAccountNumber('');
          setAccountHolderName('');
          setIfscCode('');
          setTotalCredit('');
          setSelectedGroup(null);
          setregistrationType('Composition');
          setBalanceType('Credit');
          setCashBalanceType('Credit');
        }
      } catch (error) {
        console.log('Error fetching Account', error);
      }
    };

    const data = async () => {
      try {
        const fetchdata = await dispatch(fetchAllAccountOptions(navigate));
        const options = fetchdata.map((account) => ({
          value: account.id,
          label: account.name
        }));
        setAccountgroup(options);
      } catch (error) {
        console.log('fetching data of all group of ledgers:', error);
      }
    };
    fetchData();
    data();
  }, [id, dispatch, navigate]);

  const handlesave = async () => {
    if (loading) return;

    if (!formData.accountname || !formData.accountGroupId) {
      alert("Please fill in all mandatory fields.");
      return;
    }

    setLoading(true);
    try {
      // 1. Base Payload
      const payload = {
        accountGroupId: formData.accountGroupId,
        accountName: formData.accountname,
        shortName: formData.shortname,
        contactPersonName: formData.contactpersonname,
        accountDetail: {} // Initialize as empty object
      };

      // 2. Identify if the current selection requires accountDetail
      const isSundryOrLoan =
        selectedGroup?.label === 'Sundry Creditors' ||
        selectedGroup?.label === 'Sundry Debtors' ||
        selectedGroup?.label === 'Unsecured Loans';

      // 3. Force populate accountDetail if it's a Sundry group
      if (isSundryOrLoan) {
        payload.accountDetail = {
          email: sundryDetails.email || "",
          mobileNo: sundryDetails.mobileNo || "",
          panNo: sundryDetails.panNo || null,
          address1: sundryDetails.address1 || "",
          address2: sundryDetails.address2 || null,
          city: sundryDetails.city || "",
          state: sundryDetails.state || "",
          pincode: sundryDetails.pincode || "",
          bankDetail: bankdetail || false
        };

        // Add Specific fields for Creditors/Debtors
        if (selectedGroup?.label === 'Sundry Creditors' || selectedGroup?.label === 'Sundry Debtors') {
          let balanceValue = parseFloat(sundryDetails.balance) || 0;
          if (balanceType === 'Debit') {
            balanceValue = -Math.abs(balanceValue);
          } else {
            balanceValue = Math.abs(balanceValue);
          }
          let cashBalanceValue = parseFloat(sundryDetails.cashOpeningBalance) || 0;
          if (cashBalanceType === 'Debit') {
            cashBalanceValue = -Math.abs(cashBalanceValue);
          } else {
            cashBalanceValue = Math.abs(cashBalanceValue);
          }

          payload.accountDetail.gstNumber = sundryDetails.gstnumber || null;
          payload.accountDetail.balance = balanceValue;
          payload.accountDetail.cashOpeningBalance = cashBalanceValue;
          payload.accountDetail.creditPeriod = sundryDetails.creditperiod || 0;
          payload.accountDetail.creditLimit = creditlimit || false;
          payload.accountDetail.registrationType = registrationType || 'Composition';

          if (creditlimit) {
            payload.accountDetail.totalCredit = totalCredit || 0;
          }
        }
      }

      // 4. Handle Bank specific logic
      if (bankdetail || selectedGroup?.label === 'Bank Account') {
        payload.accountDetail = {
          ...payload.accountDetail, // Keep existing details if any
          bankName: bankName || "",
          accountNumber: accountNumber || "",
          accountHolderName: accountHolderName || "",
          ifscCode: ifscCode || ""
        };
      }

      // 5. API Dispatch
      const result = id
        ? await dispatch(updateAccount(id, payload, navigate))
        : await dispatch(createAccounts(payload, navigate));

      if (result) {
        if (id) {
          onAccountUpdated(result);
        } else {
          onAccountCreate(result.data.data);
        }

        // Reset and Close
        resetFormState();
        onClose();
      }
    } catch (error) {
      console.error('Error saving account:', error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to keep code clean
  const resetFormState = () => {
    setFormData({ accountname: '', shortname: '', contactpersonname: '', accountGroupId: '' });
    setSundryDetails({
      email: '', mobileNo: '', panNo: null, state: '', city: '',
      address1: '', address2: null, pincode: '', balance: 0, cashOpeningBalance: 0,
      gstnumber: null, creditperiod: 0
    });
    setBankDetail(false);
    setCreditlimit(false);
    setBankName('');
    setAccountNumber('');
    setAccountHolderName('');
    setIfscCode('');
    setTotalCredit('');
    setSelectedGroup(null);
  };

  const handleClose = () => {
    onClose();
  };
  const gstOptions = [
    { value: 'Composition', label: 'Composition' },
    { value: 'Regular', label: 'Regular' },
    { value: 'Unregistered', label: 'Unregistered' }
  ];

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
          position: 'fixed',
          zIndex: '999',
          width: { xs: '1000px', sm: '550px' }
        }}
      >
        <Grid item>
          {id ? (
            <>
              <Typography variant="h4" className="heading">
                Update Party [ledger]
              </Typography>
            </>
          ) : (
            <>
              <Typography variant="h4" className="heading">
                New Party [ledger]
              </Typography>
            </>
          )}
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      <Box sx={{ width: { xs: 320, sm: 550 } }} role="presentation" marginTop={'50px'}>
        <Grid container spacing={2} style={{ paddingTop: '16px' }}>
          <Grid item>
            <Typography variant="subtitle1">
              Account Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Account Name" id="accountname" value={formData.accountname} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">Short/Alias Name :</Typography>
            <input placeholder="Enter Short/Alias Name" id="shortname" value={formData.shortname} onChange={handleInputChange} />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Account Group :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              color="secondary"
              id="accountGroupId"
              value={{ value: selectedGroup?.value, label: selectedGroup?.label }}
              options={accountgroup}
              onChange={handleGroupChange}
            />
          </Grid>
          <Grid item>
            <Typography variant="subtitle1">
              Contact person name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Name" id="contactpersonname" value={formData.contactpersonname} onChange={handleInputChange} />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          {selectedGroup?.label === 'Sundry Creditors' ||
            selectedGroup?.label === 'Sundry Debtors' ||
            selectedGroup?.label === 'Unsecured Loans' ? (
            <>
              <Grid item>
                <Typography variant="subtitle1">
                  Email : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input placeholder="Enter Email" id="email" value={sundryDetails.email} onChange={handleInputSundryDetailChange} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Mobile No : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Enter Mobile No"
                  id="mobileNo"
                  value={sundryDetails.mobileNo}
                  onChange={handleInputSundryDetailChange}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  State : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <StateSelect
                  countryid={countryid}
                  onChange={(selectedState) => {
                    setstateid(selectedState.id);
                    handleStateChange(selectedState);
                  }}
                  placeHolder={sundryDetails.state}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  City : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <CitySelect countryid={countryid} stateid={stateid} onChange={handleCityChange} placeHolder={sundryDetails.city} />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Address 1 : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Enter Address 1"
                  id="address1"
                  value={sundryDetails.address1}
                  onChange={handleInputSundryDetailChange}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">Address 2 :</Typography>
                <input
                  placeholder="Enter Address 2"
                  id="address2"
                  value={sundryDetails.address2}
                  onChange={handleInputSundryDetailChange}
                />
              </Grid>
              <Grid item>
                <Typography variant="subtitle1">
                  Pincode : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input placeholder="Enter Pincode" id="pincode" value={sundryDetails.pincode} onChange={handleInputSundryDetailChange} />
              </Grid>
              {selectedGroup?.label !== 'Unsecured Loans' && (
                <>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Opening Balance : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input
                      placeholder="Enter Opening Balance"
                      id="balance"
                      value={sundryDetails.balance}
                      onChange={handleInputSundryDetailChange}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Opening Balance Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <RadioGroup row value={balanceType} onChange={handleBalanceTypeChange}>
                      <FormControlLabel value="Credit" control={<Radio />} label="Credit" />
                      <FormControlLabel value="Debit" control={<Radio />} label="Debit" />
                    </RadioGroup>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Cash Opening Balance :
                    </Typography>
                    <input
                      placeholder="Enter Cash Opening Balance"
                      id="cashOpeningBalance"
                      value={sundryDetails.cashOpeningBalance}
                      onChange={handleInputSundryDetailChange}
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Cash Opening Balance Type :
                    </Typography>
                    <RadioGroup row value={cashBalanceType} onChange={handleCashBalanceTypeChange}>
                      <FormControlLabel value="Credit" control={<Radio />} label="Credit" />
                      <FormControlLabel value="Debit" control={<Radio />} label="Debit" />
                    </RadioGroup>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">
                      Default Credit Period (In days) : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <input
                      placeholder="Default Credit Period"
                      id="creditperiod"
                      value={sundryDetails.creditperiod}
                      onChange={handleInputSundryDetailChange}
                    />
                  </Grid>
                </>
              )}
              {selectedGroup?.label !== 'Unsecured Loans' && (
                <>
                  <Grid item>
                    <Typography variant="subtitle1">
                      GST Type: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                    </Typography>
                    <Select
                      id="registrationType"
                      name="registrationType"
                      placeholder="Select GST Type"
                      options={gstOptions}
                      value={gstOptions.find((option) => option.value === registrationType)}
                      onChange={handleGstTypeChange}
                    />
                  </Grid>

                  <Grid item>
                    <Typography variant="subtitle1">PAN No :</Typography>
                    <input placeholder="Enter PAN No" id="panNo" value={sundryDetails.panNo} onChange={handleInputSundryDetailChange} />
                  </Grid>
                  {registrationType === 'Regular' && (
                    <>
                      <Grid item>
                        <Typography variant="subtitle1">
                          GST No.: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                        </Typography>
                        <input
                          placeholder="GSTIN452"
                          id="gstnumber"
                          value={sundryDetails.gstnumber}
                          onChange={handleInputSundryDetailChange}
                        />
                      </Grid>
                    </>
                  )}
                </>
              )}

              <Grid item container spacing={2}>
                {selectedGroup?.label !== 'Unsecured Loans' && (
                  <>
                    <Grid item>
                      <Typography variant="subtitle1">
                        Enable credit limit? : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                      </Typography>
                      <RadioGroup row defaultValue="false" value={creditlimit} onChange={handleCreditDetailChange}>
                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                        <FormControlLabel value="false" control={<Radio />} label="No" />
                      </RadioGroup>
                    </Grid>
                    <Grid style={{ width: '100%' }}>
                      {creditlimit && (
                        <Grid item>
                          <Typography variant="subtitle1">
                            Total Credit: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                          </Typography>
                          <input placeholder="Enter Total Credit" value={totalCredit} onChange={handleTotalCreditChange} />
                        </Grid>
                      )}
                    </Grid>
                  </>
                )}

                <Grid item>
                  <Typography variant="subtitle1">
                    Provide bank details? : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <RadioGroup row defaultValue="false" value={bankdetail} onChange={handleBankDetailChange}>
                    <FormControlLabel value="true" control={<Radio />} label="Yes" />
                    <FormControlLabel value="false" control={<Radio />} label="No" />
                  </RadioGroup>
                </Grid>
              </Grid>
            </>
          ) : (
            ''
          )}
        </Grid>

        <Grid style={{ width: '100%' }}>
          {bankdetail || selectedGroup?.label === 'Bank Account' ? (
            <>
              <Grid container spacing={2}>
                <Grid item>
                  <Typography variant="subtitle1">
                    Bank Name: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input placeholder="Enter Bank Name" value={bankName} onChange={(e) => setBankName(e.target.value)} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Account Number: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input placeholder="Enter Account Number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    Holder Name: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input placeholder="Enter Holder Name" value={accountHolderName} onChange={(e) => setAccountHolderName(e.target.value)} />
                </Grid>
                <Grid item>
                  <Typography variant="subtitle1">
                    IFSC Code: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input placeholder="Enter IFSC Code" value={ifscCode} onChange={(e) => setIfscCode(e.target.value)} />
                </Grid>
              </Grid>
            </>
          ) : (
            ''
          )}
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10px' }}>
          <div>
            <button id="savebtncs" onClick={handleClose}>
              Cancel
            </button>
          </div>
          <div style={{ display: 'flex' }}>
            <button id="savebtncs" onClick={handlesave} disabled={loading}>
              {loading ? 'Save' : 'Save'}
            </button>
          </div>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default AnchorTemporaryDrawer;
