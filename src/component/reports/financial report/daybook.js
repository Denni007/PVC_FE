import React, { useState } from 'react';
import { Button, Dialog, DialogContent, useMediaQuery, Grid, Typography } from '@mui/material';
// import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getallDaybookledger } from 'store/thunk';
import { useNavigate } from 'react-router';
import { useTheme } from '@emotion/react';

const Daybookreport = ({ Open, onClose }) => {
  Daybookreport.propTypes = {
    Open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  // const [openDrawer, setOpenDrawer] = useState(false);
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleCloseDrawer = () => {
  //   setOpenDrawer(false);
  // };

  //   const handleLedgerClick = () => {
  //     setOpenDrawer(true);
  //   };

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

  const handleLedger = (formDate, toDate) => {
    dispatch(getallDaybookledger(formDate, toDate));
    navigate('/daybookledger');
    setFormDate(formDate);
    sessionStorage.setItem('RDaybookformDate', formDate);
    setToDate(toDate);
    sessionStorage.setItem('RDaybooktoDate', toDate);
  };

  return (
    <>
      <Dialog
        open={Open}
        onClose={onClose}
        PaperProps={{
          style: {
            height: 'auto',
            width: isMobile ? '90%' : '18%',
            margin: isMobile ? '0' : 'auto',
            maxWidth: isMobile ? '80%' : 'none'
          }
        }}
      >
        <div style={{ display: 'flex', padding: '0px 20px', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Ledger Details</h3>
        </div>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle1">From Date:</Typography>
              <DatePicker
                selected={formDate}
                onChange={(date) => handleformDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1">To Date:</Typography>
              <DatePicker
                selected={toDate}
                onChange={(date) => handletoDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>

            <Button onClick={() => handleLedger(formDate, toDate)} variant="contained" color="secondary" style={{ marginLeft: '60%' }}>
              GO
            </Button>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Daybookreport;
