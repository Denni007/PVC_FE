import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMaintenancType, MaintenanceTypeview, updateMaintenanceType } from 'store/thunk';
import { useNavigate } from 'react-router';

const Maintenancetype = ({ open, onClose, id, onnewadded, onnewUpdated }) => {
  const [MaintenancetypeName, setMaintenancetypeName] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [loading, setLoading] = React.useState(false);

  Maintenancetype.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onnewadded: PropTypes.func.isRequired,
    onnewUpdated: PropTypes.func.isRequired,
    id: PropTypes.string
  };

  const handleSave = async () => {
    // if (loading) return;

    // setLoading(true);
    try {
      const payload = { name: MaintenancetypeName };
      if (id) {
        const response = await dispatch(updateMaintenanceType(id, payload, navigate));
        onnewUpdated(response);
      } else {
        const response = await dispatch(createMaintenancType(payload, navigate));
        onnewadded(response.data.data);
        setMaintenancetypeName('');
      }
    } catch (error) {
      console.error('Error creating maintenance', error);
    }
  };

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        if (id) {
          const response = await dispatch(MaintenanceTypeview(id));
          setMaintenancetypeName(response.name);
        } else {
          setMaintenancetypeName('');
        }
      } catch (error) {
        console.error('Error view item group', error);
        if (error.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchdata();
  }, [id, dispatch, navigate]);

  const list = (
    <Box sx={{ width: { xs: 320, sm: 420 }, overflowX: 'hidden' }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Maintenance Type</Typography>
          <input
            placeholder="Enter Maintenance Type"
            value={MaintenancetypeName}
            onChange={(e) => setMaintenancetypeName(e.target.value)}
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10px' }}>
        <div>
          <button id="savebtncs" onClick={onClose}>
            Cancel
          </button>
        </div>
        <div style={{ display: 'flex' }}>
          <button id="savebtncs" onClick={handleSave}>
            Save
          </button>
        </div>
      </Grid>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '10px 15px',
          position: 'fixed',
          zIndex: '999',
          width: { xs: '100%', sm: '420px' }
        }}
      >
        {id ? (
          <Grid item>
            <Typography variant="h4">Update Maintenance Type</Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography variant="h4">Add Maintenance Type</Typography>
          </Grid>
        )}
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      {list}
    </Drawer>
  );
};

export default Maintenancetype;
