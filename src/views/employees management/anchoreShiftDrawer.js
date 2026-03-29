import { Box, Drawer, Grid, Paper, Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useState } from 'react';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { createShift, fetchShift, updateShift } from 'store/thunk';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { format } from 'date-fns';

const AnchorShiftDrawer = ({ open, onClose, id, onNewShiftAdded, onShiftUpdated }) => {
  AnchorShiftDrawer.prototypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string,
    onNewShiftAdded: PropTypes.func.isRequired,
    onShiftUpdated: PropTypes.func
  };
  const [formData, setFormData] = useState({
    shiftName: '',
    shiftStartTime: '',
    shiftEndTime: '',
    breakStartTime: '',
    breakEndTime: '',
    maxOvertimeHours: 0
  });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFormTimeChange = (fieldName, time) => {
    console.log(format(time, 'hh:mm:ss a'));
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: new Date(time)
    }));
  };

  const handleSave = async () => {
    if (loading) return;

    setLoading(true);
    try {
      if (id) {
        let data = {
          ...formData,
          shiftStartTime: format(formData.shiftStartTime, 'hh:mm:ss a'),
          shiftEndTime: format(formData.shiftEndTime, 'hh:mm:ss a'),
          breakStartTime: format(formData.breakStartTime, 'hh:mm:ss a'),
          breakEndTime: format(formData.breakEndTime, 'hh:mm:ss a')
        };
        const newdata = await dispatch(updateShift(id, data, navigate));
        onShiftUpdated(newdata.data.data);
      } else {
        let data = {
          ...formData,
          shiftStartTime: format(formData.shiftStartTime, 'hh:mm:ss a'),
          shiftEndTime: format(formData.shiftEndTime, 'hh:mm:ss a'),
          breakStartTime: format(formData.breakStartTime, 'hh:mm:ss a'),
          breakEndTime: format(formData.breakEndTime, 'hh:mm:ss a')
        };
        const newdata = await dispatch(createShift(data, navigate));
        console.log('newdata: ', newdata);
        onNewShiftAdded(newdata.data.data);
      }
    } catch (error) {
      console.error('Error creating Shift', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        if (id) {
          const response = await dispatch(fetchShift(id));
          setFormData({
            shiftName: response.shiftName,
            shiftStartTime: new Date(`1970-01-01 ${response.shiftStartTime}`),
            shiftEndTime: new Date(`1970-01-01 ${response.shiftEndTime}`),
            breakStartTime: new Date(`1970-01-01 ${response.breakStartTime}`),
            breakEndTime: new Date(`1970-01-01 ${response.breakEndTime}`),
            maxOvertimeHours: 0
          });
        }
      } catch (error) {
        console.error('Error view item group', error);
      }
    };
    fetchdata();
  }, [id, dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Drawer anchor="right" open={open} onClose={onClose}>
        <Paper
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '10px 15px',
            position: 'fixed',
            zIndex: '999',
            width: { xs: '100%', sm: '660px' }
          }}
        >
          {id ? (
            <Grid item>
              <Typography variant="h4">Update Shift</Typography>
            </Grid>
          ) : (
            <Grid item>
              <Typography variant="h4">New Shift</Typography>
            </Grid>
          )}
          <Grid item>
            <CancelIcon onClick={onClose} />
          </Grid>
        </Paper>
        <Box sx={{ width: { xs: 320, sm: 660 }, overflowX: 'hidden', '&::-webkit-scrollbar': { width: '0' } }} role="presentation">
          {/*  TODO: shift form */}
          <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
            <Grid container spacing={2} sx={{ margin: '1px' }}>
              <Grid item sm={12}>
                <Typography variant="subtitle1">
                  Shift Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input placeholder="Enter Shift Name" id="shiftName" value={formData.shiftName} onChange={handleInputChange} />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ margin: '1px' }}>
              <Grid item sm={6}>
                <Typography variant="subtitle1">
                  Shift Start Time : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <TimePicker value={formData.shiftStartTime} onChange={(newValue) => handleFormTimeChange('shiftStartTime', newValue)} />
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1">
                  Shift End Time : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <TimePicker value={formData.shiftEndTime} onChange={(newValue) => handleFormTimeChange('shiftEndTime', newValue)} />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ margin: '1px' }}>
              <Grid item sm={6}>
                <Typography variant="subtitle1">
                  Break Start Time : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <TimePicker value={formData.breakStartTime} onChange={(newValue) => handleFormTimeChange('breakStartTime', newValue)} />
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1">
                  Break End Time : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <TimePicker value={formData.breakEndTime} onChange={(newValue) => handleFormTimeChange('breakEndTime', newValue)} />
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ margin: '1px' }}>
              <Grid item sm={10} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 0px' }}>
                <div>
                  <button id="savebtncs" onClick={onClose}>
                    Cancel
                  </button>
                </div>
                <div style={{ display: 'flex' }}>
                  <button id="savebtncs" onClick={handleSave} disabled={loading}>
                    {loading ? 'Save' : 'Save'}
                  </button>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Drawer>
    </LocalizationProvider>
  );
};

export default AnchorShiftDrawer;
