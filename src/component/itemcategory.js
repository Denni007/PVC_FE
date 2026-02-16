import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { Grid, Typography, Card } from '@mui/material';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import { createItemcategory, fetchAllItemGroup, ItemCategoryview, updateItemcategory } from 'store/thunk';
import { useNavigate } from 'react-router';

const Itemcategory = ({ open, onClose, onnewCategoryadded, onnewCategoryupdated, id, ItemGroupOptions }) => {
  const [itemGroupOptions, setItemGroupOptions] = React.useState([]);
  const [selectedItemGroup, setSelectedItemGroup] = React.useState(null);
  const [categoryName, setCategoryName] = React.useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchItemGroups = React.useCallback(async () => {
    try {
      const response = await dispatch(fetchAllItemGroup());
      const options = response.map((group) => ({
        value: group.id,
        label: group.name
      }));
      setItemGroupOptions(options);
      const updatedOptions = ItemGroupOptions.slice(1);
      setItemGroupOptions(updatedOptions);
    } catch (error) {
      console.error('fetch all item groups', error);
    }
  }, [dispatch, ItemGroupOptions]);

  React.useEffect(() => {
    fetchItemGroups();
  }, [fetchItemGroups, dispatch]);

  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        if (id) {
          const response = await dispatch(ItemCategoryview(id));
          setCategoryName(response.name);
          setSelectedItemGroup({ value: response.ItemGroup.id, label: response.ItemGroup.name });
        } else {
          setSelectedItemGroup('');
          setCategoryName('');
        }
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/');
        }
        console.error('Error view item group', error);
      }
    };
    fetchdata();
  }, [id, dispatch, navigate]);

  const handleSave = async () => {
    try {
      const payload = {
        itemGroupId: selectedItemGroup.value,
        name: categoryName
      };
      if (id) {
        const response = await dispatch(updateItemcategory(id, payload, navigate));
        onnewCategoryupdated(response.data.data);
      } else {
        const response = await dispatch(createItemcategory(payload, navigate));
        onnewCategoryadded(response.data.data);
        setSelectedItemGroup('');
        setCategoryName('');
      }
    } catch (error) {
      console.error('fetch all item category', error);
    }
  };

  Itemcategory.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onnewCategoryadded: PropTypes.func.isRequired,
    onnewgroupadded: PropTypes.func.isRequired,
    onnewCategoryupdated: PropTypes.func.isRequired,
    ItemGroupOptions: PropTypes.array.isRequired,
    id: PropTypes.string
  };

  const list = (
    <Box sx={{ width: { xs: 320, sm: 420 }, overflowX: 'hidden', height: '500px' }} role="presentation">
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Group</Typography>
          <Select color="secondary" onChange={setSelectedItemGroup} options={itemGroupOptions} value={selectedItemGroup} />
        </Grid>
        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Category</Typography>
          <input placeholder="Enter category" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
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
      <Card
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
          <Typography variant="h4">New Category</Typography>
        </Grid>
        <Grid item>
          <CancelIcon onClick={onClose} />
        </Grid>
      </Card>
      {list}
    </Drawer>
  );
};

export default Itemcategory;
