import React, { useState } from 'react';
import { Typography, Grid, Paper, useMediaQuery, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { CitySelect, StateSelect } from 'react-country-state-city';
import 'react-country-state-city/dist/react-country-state-city.css';
import { createCompany, createCompanyBank, Companyview, updateCompany } from 'store/thunk';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const AddCompanyForm = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const [open, setOpen] = useState(false);
  const [countryid, setCountryid] = React.useState(101);
  {
    console.log(setCountryid);
  }
  const [stateid, setstateid] = React.useState(0);
  const [formData, setFormData] = React.useState({
    companyname: '',
    email: '',
    mobileno: '',
    gstnumber: '',
    address1: '',
    address2: '',
    pincode: ''
  });
  const [bankdata, setBankdata] = React.useState({
    accountname: '',
    bankname: '',
    accountnumber: '',
    ifsccode: '',
    branch: ''
  });
  const { id } = useParams();
  const emailRef = React.useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [companyid, setCompanyid] = React.useState(null);

  React.useEffect(() => {
    if (id) {
      const fetchCompanyData = async () => {
        try {
          const company = await dispatch(Companyview(id));
          setFormData({
            companyname: company.companyname,
            email: company.email,
            mobileno: company.mobileno,
            gstnumber: company.gstnumber,
            address1: company.address1,
            address2: company.address2,
            pincode: company.pincode,
            city: company.city,
            state: company.state
          });
          console.log('Retrieved company data:', company);
        } catch (error) {
          console.error('Error fetching company data:', error);
        }
      };
      fetchCompanyData();
    }
  }, [id, dispatch]);

  const handleCityChange = (selectedCity) => {
    setFormData({ ...formData, city: selectedCity.name });
  };

  const handleStateChange = (selectedState) => {
    setFormData({ ...formData, state: selectedState.name });
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (['accountname', 'bankname', 'accountnumber', 'ifsccode', 'branch'].includes(id)) {
      setBankdata({ ...bankdata, [id]: value });
    } else {
      setFormData({ ...formData, [id]: value });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleSave = async () => {
  //   try {
  //     const data = {
  //       ...formData
  //     };
  //     if (id) {
  //       await dispatch(updateCompany(id, data, navigate));
  //     } else {
  //       const companydata = await dispatch(createCompany(data));
  //       setCompanyid(companydata.data.data.id);
  //       if (bankdata) {
  //         const bankdetails = {
  //           companyId: companyid,
  //           ...bankdata
  //         };
  //         await dispatch(createCompanyBank(bankdetails, navigate));
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error creating company:', error);
  //   }
  // };
  const isBankDataComplete = () => {
    return Object.values(bankdata).every((value) => value.trim() !== '');
  };

  const handleSave = async () => {
    try {
      const data = {
        ...formData
      };

      if (id) {
        await dispatch(updateCompany(id, data, navigate));
      } else {
        const companydata = await dispatch(createCompany(data));
        console.log(companydata.data.message, 'companydata');
        toast.success(companydata.data.message, {
          icon: <img src={require('../../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000,
          onClose: () => {
            navigate('/companylist');
          }
        });
        if (isBankDataComplete()) {
          const bankdetails = {
            companyId: companydata.data.data.id,
            ...bankdata
          };
          await dispatch(createCompanyBank(bankdetails, navigate));
        }
      }
    } catch (error) {
      console.error('Error creating company:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Account
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Account
          </Typography>
        )}

        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                Company Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Account Name"
                id="companyname"
                value={formData.companyname}
                onChange={(e) => setFormData({ ...formData, companyname: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                Email : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Email"
                type="email"
                ref={emailRef}
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                Mobile No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Mobile No."
                id="mobileno"
                value={formData.mobileno}
                onChange={(e) => setFormData({ ...formData, mobileno: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                Address 1 : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Floor,buliding Name"
                id="address1"
                value={formData.address1}
                onChange={(e) => setFormData({ ...formData, address1: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">Address 2</Typography>
              <input
                placeholder="Location"
                id="address2"
                value={formData.address2}
                onChange={(e) => setFormData({ ...formData, address2: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                GST No.: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="GSTIN452"
                id="gstnumber"
                value={formData.gstnumber}
                onChange={(e) => setFormData({ ...formData, gstnumber: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                Pincode : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="395001"
                id="pincode"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                State : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <StateSelect
                countryid={countryid}
                // defaultValue={formData.state}
                onChange={(selectedState) => {
                  setstateid(selectedState.id);
                  handleStateChange(selectedState);
                }}
                placeHolder={formData.state}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Typography variant="subtitle1">
                City : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <CitySelect
                // value={formData.city}
                countryid={countryid}
                stateid={stateid}
                onChange={handleCityChange}
                placeHolder={formData.city}
              />
            </Grid>
          </Grid>
          {id ? (
            ''
          ) : (
            <Grid container spacing={2} style={{ display: 'flex', justifyContent: 'end', justifyItems: 'center' }}>
              <button id="buttoncs" style={{ width: '150px' }} onClick={handleClickOpen}>
                Add Bank Details
              </button>
            </Grid>
          )}

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/companylist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handleSave}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
              <div>
                <Link to="/companylist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handleSave}>
                  Save
                </button>
              </div>
            </Grid>
          )}
        </Grid>
      </div>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Add Bank Details</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Account Name</Typography>
              <input id="accountname" placeholder="Account Name" onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">IFSC Code</Typography>
              <input placeholder="IFSC Code" id="ifsccode" onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Branch</Typography>
              <input placeholder="Branch" id="branch" onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Bank Name</Typography>
              <input placeholder="Bank Name" id="bankname" onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Account Number</Typography>
              <input placeholder="Account Number" id="accountnumber" onChange={handleInputChange} />
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
    </Paper>
  );
};

export default AddCompanyForm;
