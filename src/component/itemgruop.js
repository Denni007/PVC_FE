import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { Grid, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { createItemgroup, ItemGroupview, updateItemgroup, viewAllItemType } from 'store/thunk';
import { useNavigate } from 'react-router';

const ItemGroup = ({ open, onClose, id, onnewgroupadded, onnewgroupUpdated, defaultItemTypeId }) => {
  const [itemGroupName, setItemGroupName] = useState('');
  const [itemTypeOptions, setItemTypeOptions] = useState([]);
  const [selectedItemType, setSelectedItemType] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  ItemGroup.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onnewgroupadded: PropTypes.func.isRequired,
    onnewgroupUpdated: PropTypes.func,
    defaultItemTypeId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    id: PropTypes.string
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: itemGroupName,
        itemTypeId: selectedItemType?.value
      };
      if (id) {
        const response = await dispatch(updateItemgroup(id, payload, navigate));
        onnewgroupUpdated(response.data.data);
      } else {
        const response = await dispatch(createItemgroup(payload, navigate));
        onnewgroupadded(response.data.data);
        setItemGroupName('');
      }
    } catch (error) {
      console.error('Error creating item group', error);
    }
  };

  React.useEffect(() => {
    const fetchItemTypes = async () => {
      try {
        const response = await dispatch(viewAllItemType());
        const options = Array.isArray(response)
          ? response.map((type) => ({
              value: type.id,
              label: type.name
            }))
          : [];
        setItemTypeOptions(options);
      } catch (error) {
        console.error('fetch all item types', error);
      }
    };

    fetchItemTypes();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        if (id) {
          const response = await dispatch(ItemGroupview(id));
          setItemGroupName(response.name);
          const linkedType = response.ItemType || response.itemType;
          setSelectedItemType(
            linkedType
              ? {
                  value: linkedType.id,
                  label: linkedType.name
                }
              : response.itemTypeId && response.itemTypeName
                ? {
                    value: response.itemTypeId,
                    label: response.itemTypeName
                  }
                : null
          );
        } else {
          setItemGroupName('');
          const defaultType = itemTypeOptions.find((option) => option.value === defaultItemTypeId) || null;
          setSelectedItemType(defaultType);
        }
      } catch (error) {
        console.error('Error view item group', error);
      }
    };
    fetchdata();
  }, [id, dispatch, defaultItemTypeId, itemTypeOptions]);

  const list = (
    <Box sx={{ width: { xs: 320, sm: 420 }, overflowX: 'hidden' }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Type</Typography>
          <Select color="secondary" onChange={setSelectedItemType} options={itemTypeOptions} value={selectedItemType} isClearable />
        </Grid>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Group</Typography>
          <input placeholder="Enter Item Group" value={itemGroupName} onChange={(e) => setItemGroupName(e.target.value)} />
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
            <Typography variant="h4">Update Group</Typography>
          </Grid>
        ) : (
          <Grid item>
            <Typography variant="h4">New Group</Typography>
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

export default ItemGroup;
