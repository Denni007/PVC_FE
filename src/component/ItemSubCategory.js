import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { Grid, Typography, Card } from '@mui/material';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import {
  createItemSubCategory,
  getAllcategory,
  viewItemSubCategory,
  updateItemSubCategory
} from 'store/thunk';
import { useNavigate } from 'react-router';

const ItemSubCategory = ({ open, onClose, onnewSubCategoryadded, onnewSubCategoryupdated, id }) => {

  const [itemCategoryOptions, setItemCategoryOptions] = React.useState([]);
  const [selectedItemCategory, setSelectedItemCategory] = React.useState(null);
  const [subCategoryName, setSubCategoryName] = React.useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // FETCH CATEGORY LIST
  const fetchCategories = React.useCallback(async () => {
    try {
      const response = await dispatch(getAllcategory());
      const options = response.map((cat) => ({
        value: cat.id,
        label: cat.name
      }));
      setItemCategoryOptions(options);
    } catch (error) {
      console.error('fetch all item category', error);
    }
  }, [dispatch]);

  React.useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // EDIT MODE LOAD DATA
  React.useEffect(() => {
    const fetchdata = async () => {
      try {
        if (id) {
          const response = await dispatch(viewItemSubCategory(id));

          setSubCategoryName(response.name);
          setSelectedItemCategory({
            value: response.ItemCategory.id,
            label: response.ItemCategory.name
          });
        } else {
          setSelectedItemCategory(null);
          setSubCategoryName('');
        }
      } catch (error) {
        if (error.response?.status === 401) navigate('/');
        console.error('Error view item sub category', error);
      }
    };
    fetchdata();
  }, [id, dispatch, navigate]);

  // SAVE
  const handleSave = async () => {
    try {
      const payload = {
        itemCategoryId: selectedItemCategory.value,
        name: subCategoryName
      };

      if (id) {
        const response = await dispatch(updateItemSubCategory(id, payload, navigate));
        onnewSubCategoryupdated(response.data.data);
      } else {
        const response = await dispatch(createItemSubCategory(payload, navigate));
        onnewSubCategoryadded(response.data.data);

        setSelectedItemCategory(null);
        setSubCategoryName('');
      }
    } catch (error) {
      console.error('save subcategory error', error);
    }
  };

  ItemSubCategory.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onnewSubCategoryadded: PropTypes.func.isRequired,
    onnewSubCategoryupdated: PropTypes.func.isRequired,
    id: PropTypes.string
  };

  const list = (
    <Box sx={{ width: { xs: 320, sm: 420 }, overflowX: 'hidden', height: '500px' }}>
      <Grid container spacing={2} sx={{ margin: '1px', paddingTop: '50px' }}>

        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Category</Typography>
          <Select
            onChange={setSelectedItemCategory}
            options={itemCategoryOptions}
            value={selectedItemCategory}
          />
        </Grid>

        <Grid item sm={12}>
          <Typography variant="subtitle1">Item Sub Category</Typography>
          <input
            placeholder="Enter sub category"
            value={subCategoryName}
            onChange={(e) => setSubCategoryName(e.target.value)}
          />
        </Grid>

      </Grid>

      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '20px 10px' }}>
        <button id="savebtncs" onClick={onClose}>Cancel</button>
        <button id="savebtncs" onClick={handleSave}>Save</button>
      </Grid>
    </Box>
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Card sx={{ display: 'flex', justifyContent: 'space-between', padding: '10px 15px', position: 'fixed', zIndex: 999, width: { xs: '100%', sm: '420px' } }}>
        <Typography variant="h4">{id ? 'Edit Sub Category' : 'New Sub Category'}</Typography>
        <CancelIcon onClick={onClose} />
      </Card>
      {list}
    </Drawer>
  );
};

export default ItemSubCategory;
