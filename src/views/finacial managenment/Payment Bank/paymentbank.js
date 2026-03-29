import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import {
  createCompanyBank,
  createPaymentBank,
  fetchAllAccounts,
  fetchAllCompanyBank,
  getAllPaymentbank,
  updatePaymentbank,
  viewSinglePaymentBank
} from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import AnchorTemporaryDrawer from '../../../component/addparty';
import Select from 'react-select';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { toast } from 'react-toastify';
import { convertToIST } from 'component/details';

const Paymentbank = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canCreateVendor, canViwAllCompanyBank } = useCan();
  const [accountname, setaccountname] = useState('');
  const [companyname, setcompanyname] = useState('');
  const [account, setaccount] = useState([]);
  const [bankaccount, SetBankaccount] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectaccount, setSelectaccount] = useState([]);
  const [selectbankaccount, setSelectbankaccount] = useState([]);
  const [formData, setFormData] = useState({
    accountId: null,
    paymentdate: convertToIST(new Date()),
    amount: Number(),
    paymentType: '',
    mode: null,
    bankAccountId: null,
    voucherno: '',
    transactionType: ''
  });
  console.log(selectaccount, selectbankaccount);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bankdata, setBankdata] = useState({
    accountname: '',
    bankname: '',
    accountnumber: '',
    ifsccode: '',
    branch: ''
  });
  const [canCreateVendorValue, setCanCreateVendorValue] = useState(null);
  useEffect(() => {
    setCanCreateVendorValue(canCreateVendor());
  }, [canCreateVendor]);

  const handleDateChange = (date) => {
    if (date instanceof Date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      setFormData({ ...formData, paymentdate: formattedDate });
    } else {
      console.error('Invalid date provided to handleDateChange:', date);
    }
  };
  const handleaccountChange = (field, value) => {
    setBankdata({ ...bankdata, [field]: value });
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
  const handleSelectAccountChange = (selectedOption) => {
    if ((selectedOption && selectedOption.label === 'Create New Account') || !canViwAllCompanyBank()) {
      setIsDialogOpen(true);
    } else {
      formData.bankAccountId = selectedOption.value;
      setFormData(formData);
      setcompanyname(selectedOption.label);
      setIsDialogOpen(false);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };
  const handleSave = async () => {
    try {
      const companyId = sessionStorage.getItem('companyId');
      const bankdetails = {
        companyId: companyId,
        ...bankdata
      };
      const response = await dispatch(createCompanyBank(bankdetails));

      if (response.data.status === 'true') {
        toast.success(response.data.message, {
          icon: <img src={require('../../../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
        setIsDialogOpen(false);
        setBankdata({
          accountname: '',
          bankname: '',
          accountnumber: '',
          ifsccode: '',
          branch: ''
        });

        const responsecompany = await dispatch(fetchAllCompanyBank());
        if (Array.isArray(responsecompany)) {
          const options = responsecompany.map((company) => ({ value: company.id, label: company.bankname }));
          SetBankaccount([{ value: 'new', label: 'Create New Account' }, ...options]);
        }
      } else {
        throw new Error('Failed to create bank details');
      }
    } catch (error) {
      console.error('Error updating or creating bank details:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccounts());
        if (Array.isArray(response)) {
          const options = response.map((account) => ({ value: account.id, label: account.accountName }));
          setaccount([{ value: 'new', label: 'Create New Party' }, ...options]);
        }
        if (!canCreateVendorValue) {
          setaccount(options);
        }
        const responsecompany = await dispatch(fetchAllCompanyBank());
        if (Array.isArray(responsecompany)) {
          const options = responsecompany.map((company) => ({ value: company.id, label: company.bankname }));
          SetBankaccount([{ value: 'new', label: 'Create New Account' }, ...options]);
        }
      } catch (error) {
        console.error('Error fetching payment bank:', error);
      }
    };
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(viewSinglePaymentBank(id));
          const { voucherno, mode, paymentType, amount, paymentBankAccount, accountPayment, paymentdate, transactionType } = response;
          setFormData({
            voucherno,
            mode,
            paymentType,
            amount,
            transactionType,
            accountId: accountPayment.id,
            bankAccountId: paymentBankAccount === null ? null : paymentBankAccount.id,
            paymentdate
          });
          setcompanyname(paymentBankAccount === null ? null : paymentBankAccount.bankname);
          setaccountname(accountPayment.accountName);
          setSelectbankaccount(paymentBankAccount === null ? null : paymentBankAccount.id);
          setSelectaccount(accountPayment.id);
        }
      } catch (error) {
        console.error('Error fetching payment bank:', error);
      }
    };
    if (canCreateVendorValue !== null) {
      fetchData();
    }
    const generateAutoVoucherNumber = async () => {
      if (!id) {
        try {
          const VoucherResponse = await dispatch(getAllPaymentbank());
          let nextVoucherNumber = 1;
          if (VoucherResponse.length === 0) {
            const VoucherNumber = nextVoucherNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              voucherno: Number(VoucherNumber)
            }));
            return;
          }
          const existingVoucherNumbers = VoucherResponse.map((Voucher) => {
            const VoucherNumber = Voucher.voucherno;
            return parseInt(VoucherNumber);
          });
          const maxVoucherNumber = Math.max(...existingVoucherNumbers);
          if (!isNaN(maxVoucherNumber)) {
            nextVoucherNumber = maxVoucherNumber + 1;
          }

          const VoucherNumber = nextVoucherNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            voucherno: Number(VoucherNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Voucher number:', error);
        }
      }
    };
    generateAutoVoucherNumber();
    viewData();
  }, [dispatch, id, canCreateVendorValue]);

  //create new Vendor after show in dropdwon
  const handleNewAccount = async (newVendorData) => {
    setaccount((prevVendor) => [
      ...prevVendor,
      {
        value: newVendorData?.id,
        label: newVendorData?.accountName
      }
    ]);
    setIsDrawerOpen(false);
  };
  const handlecreatePaymentCash = async () => {
    try {
      if (id) {
        await dispatch(updatePaymentbank(id, formData, navigate));
      } else {
        await dispatch(createPaymentBank(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating payment bank data:', error);
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };
  const handlePaymentChange = (selectedOption) => {
    setFormData({ ...formData, mode: selectedOption.value });
  };
  const handlePaymentTypeChange = (selectedOption) => {
    setFormData({ ...formData, paymentType: selectedOption.value });
  };

  const handleTransactionTypeChange = (selectedOption) => {
    setFormData({ ...formData, transactionType: selectedOption.value });
  };
  const Options = [
    { value: 'Cheque', label: 'Cheque' },
    { value: 'Net Banking', label: 'Net Banking' },
    // { value: 'Cash', label: 'Cash' },
    { value: 'UPI', label: 'UPI' },
    { value: 'IMPS', label: 'IMPS' },
    { value: 'NEFT', label: 'NEFT' },
    { value: 'RTGS', label: 'RTGS' },
    { value: 'Debit card', label: 'Debit card' },
    { value: 'Credit card', label: 'Credit card' },
    { value: 'Other', label: 'Other' }
  ];

  const paymentTypes = [
    { value: 'advance', label: 'Advance' },
    { value: 'payment', label: 'Payment' },
    { value: 'final payment', label: 'Final Payment' }
  ];

  const TransactionType = [
    { value: 'Bank', label: 'Bank' },
    { value: 'Cash', label: 'Cash' }
  ];

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Payment
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Payment
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
                selected={formData.paymentdate ? new Date(formData.paymentdate) : null}
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
              <Typography variant="subtitle1">Transaction Type</Typography>
              <Select
                options={TransactionType}
                onChange={handleTransactionTypeChange}
                value={TransactionType.find((option) => option.value === formData.transactionType)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Voucher No.:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter voucherno"
                id="voucherno"
                value={formData.voucherno}
                onChange={(e) => handleInputChange('voucherno', e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Payment Type :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                options={paymentTypes}
                value={paymentTypes.find((option) => option.value === formData.paymentType)}
                onChange={handlePaymentTypeChange}
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
            {formData.transactionType === 'Bank' && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">
                    Account : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <Select
                    color="secondary"
                    options={bankaccount}
                    value={{ value: formData.bankAccountId, label: companyname }}
                    onChange={handleSelectAccountChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">
                    Mode :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <Select
                    options={Options}
                    value={Options.find((option) => option.value === formData.mode)}
                    onChange={handlePaymentChange}
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Dialog open={isDialogOpen} onClose={handleClose}>
            <DialogTitle>Add Bank Details</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Account Name:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input
                    id="accountname"
                    placeholder="Account Name"
                    onChange={(e) => handleaccountChange('accountname', e.target.value)}
                    value={bankdata.accountname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    IFSC Code:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input
                    placeholder="IFSC Code"
                    id="ifsccode"
                    onChange={(e) => handleaccountChange('ifsccode', e.target.value)}
                    value={bankdata.ifsccode}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Branch:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input
                    placeholder="Branch"
                    id="branch"
                    onChange={(e) => handleaccountChange('branch', e.target.value)}
                    value={bankdata.branch}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Bank Name:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input
                    placeholder="Bank Name"
                    id="bankname"
                    onChange={(e) => handleaccountChange('bankname', e.target.value)}
                    value={bankdata.bankname}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Account Number:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input
                    placeholder="Account Number"
                    id="accountnumber"
                    onChange={(e) => handleaccountChange('accountnumber', e.target.value)}
                    value={bankdata.accountnumber}
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} id="savebtncs" variant="outlined">
                Cancel
              </Button>
              <Button onClick={handleSave} id="savebtncs" variant="outlined">
                Save
              </Button>
            </DialogActions>
          </Dialog>
          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/paymentbanklist" style={{ textDecoration: 'none' }}>
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
                <Link to="/paymentbanklist" style={{ textDecoration: 'none' }}>
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

export default Paymentbank;
