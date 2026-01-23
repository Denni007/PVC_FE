import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogContent, useMediaQuery, Grid, Typography } from '@mui/material';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { fetchAllAccountCash, getallCashAccountledger } from 'store/thunk';
import { useNavigate } from 'react-router';
import { useTheme } from '@emotion/react';

const Ledgeraccountcashreport = ({ Open, onClose }) => {
  Ledgeraccountcashreport.propTypes = {
    Open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [AccountId, setAccountId] = useState(null);
  const [Account, setAccount] = useState([]);
  const [Accountname, setAccountname] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      setAccountId(selectedOption.value);
      setAccountname(selectedOption.label);
    }
  };

  const handleFormDateChange = (date) => {
    setFormDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccountCash());

        if (Array.isArray(response)) {
          const options = response.map((account) => ({
            value: account.id,
            label: account.contactPersonName
          }));
          setAccount(options);
        }
      } catch (error) {
        console.error('Error fetching ledger:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const formatDateForApi = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleLedger = () => {
    const formattedFormDate = formatDateForApi(formDate);
    const formattedToDate = formatDateForApi(toDate);
    dispatch(getallCashAccountledger(AccountId, formattedFormDate, formattedToDate));
    navigate('/cashaccountledger');
    sessionStorage.setItem('RCAccountId', AccountId);
    sessionStorage.setItem('RCAccountformDate', formattedFormDate);
    sessionStorage.setItem('RCAccounttoDate', formattedToDate);
  };

  return (
    <>
      <Dialog
        open={Open}
        onClose={onClose}
        PaperProps={{
          style: {
            height: 'auto',
            width: isMobile ? '90%' : '400px', // Fixed width for desktop, responsive for mobile
            margin: '20px',
            padding: '20px',
            maxWidth: 'none'
          }
        }}
      >
        <Typography variant="h6" style={{ textAlign: 'center', marginBottom: '20px' }}>
          Ledger Details
        </Typography>
        <DialogContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">Account:</Typography>
              <Select
                options={Account}
                value={AccountId ? { value: AccountId, label: Accountname } : null}
                onChange={handleSelectChange}
                menuPortalTarget={document.body}
                styles={{
                  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 9999,
                    maxHeight: '300px',
                    overflowY: 'scroll'
                  })
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">From Date:</Typography>
              <DatePicker
                selected={formDate}
                onChange={handleFormDateChange}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showPopperArrow={false}
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">To Date:</Typography>
              <DatePicker
                selected={toDate}
                onChange={handleToDateChange}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showPopperArrow={false}
                style={{ width: '100%' }}
              />
            </Grid>

            <Grid item xs={12} style={{ textAlign: 'center', marginTop: '20px' }}>
              <Button onClick={handleLedger} variant="contained" color="secondary" style={{ width: '50%' }}>
                GO
              </Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Ledgeraccountcashreport;
