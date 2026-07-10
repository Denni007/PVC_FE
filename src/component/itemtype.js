import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { createItemType, updateItemType, viewItemType } from 'store/thunk';

const ItemType = ({ open, onClose, id, onnewTypeadded, onnewTypeUpdated }) => {
  const [itemTypeName, setItemTypeName] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await dispatch(viewItemType(id));
          setItemTypeName(response?.name || '');
        } else {
          setItemTypeName('');
        }
      } catch (error) {
        console.error('Error view item type', error);
      }
    };

    fetchData();
  }, [id, dispatch]);

  const handleSave = async () => {
    try {
      const payload = { name: itemTypeName };
      if (id) {
        const response = await dispatch(updateItemType(id, payload, navigate));
        onnewTypeUpdated(response?.data?.data);
      } else {
        const response = await dispatch(createItemType(payload, navigate));
        onnewTypeadded(response?.data?.data);
        setItemTypeName('');
      }
    } catch (error) {
      console.error('Error saving item type', error);
    }
  };

  const list = (
    <Box sx={{ width: { xs: 320, sm: 420 }, overflowX: 'hidden' }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Type</Typography>
          <input placeholder="Enter Item Type" value={itemTypeName} onChange={(e) => setItemTypeName(e.target.value)} />
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
        <Grid item>
          <Typography variant="h4">{id ? 'Update Item Type' : 'New Item Type'}</Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Paper>
      {list}
    </Drawer>
  );
};

ItemType.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onnewTypeadded: PropTypes.func.isRequired,
  onnewTypeUpdated: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

export default ItemType;
