import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Grid, Typography, Radio, RadioGroup, FormControlLabel, Paper } from '@mui/material';
import Select from 'react-select';
import {
  createProduct,
  fetchAllItemcategory,
  fetchAllItemGroup,
  getAllItemSubCategoryByCategory,
  updateProduct,
  viewProduct
} from 'store/thunk';
import { useNavigate } from 'react-router';
import ItemGroup from './itemgruop';
import Itemcategory from './itemcategory';
import ItemSubCategory from './ItemSubCategory';
import useCan from 'views/permission managenment/checkpermissionvalue';

const AnchorProductDrawer = ({ open, onClose, id, onNewProductAdded, onProductUpdated }) => {
  AnchorProductDrawer.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    id: PropTypes.string,
    onNewProductAdded: PropTypes.func.isRequired,
    onProductUpdated: PropTypes.func.isRequired
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreateItemgroup, canseeitemcategory, canseeitemsubcategory } = useCan();
  const [loading, setLoading] = React.useState(false);
  const [itemtype, setItemType] = React.useState('Product');
  const [openingstock, setOpeningStock] = React.useState(true);
  const [nagativeqty, setNagativeQty] = React.useState(false);
  const [lowstock, setLowStock] = React.useState(false);
  const [cess, setCess] = React.useState(true);
  const [isWastage, setIsWastage] = React.useState(false);
  const [isFinishedGoods, setIsFinishedGoods] = React.useState(false);
  const [isRawMaterial, setIsRawMaterial] = React.useState(false);
  const [isSpareItem, setIsSpareItem] = React.useState(false);
  const [selectedItemGroup, setSelectedItemGroup] = React.useState('');
  const [itemGroupDrawerOpen, setItemGroupDrawerOpen] = React.useState(false);
  const [itemCategoryDrawerOpen, setItemCategoryDrawerOpen] = React.useState(false);
  const [itemSubCategoryDrawerOpen, setItemSubCategoryDrawerOpen] = React.useState(false);
  const [itemgroupOptions, setItemgroupOptions] = React.useState([]);
  const [itemgroupname, setItemgroupname] = React.useState('');
  const [itemcategoryOptions, setItemcategoryOptions] = React.useState([]);
  const [itemcategoryname, setItemcategoryname] = React.useState('');
  const [itemSubCategoryOptions, setItemSubCategoryOptions] = React.useState([]);
  const [itemSubCategoryName, setItemSubCategoryName] = React.useState('');
  const [canCreategroupvalue, setCanCreategroupvalue] = React.useState(null);
  const [canCreatecategoryvalue, setCanCreatecategoryvalue] = React.useState(null);
  const [canCreateSubCategoryvalue, setCanCreateSubCategoryvalue] = React.useState(null);
  const [formData, setFormData] = React.useState({
    productname: '',
    description: '',
    itemGroupId: '',
    itemCategoryId: '',
    itemSubCategoryId: '',
    unit: '',
    salesprice: 0,
    purchaseprice: 0,
    HSNcode: 0,
    gstrate: 0,
    lowStockQty: null,
    weight: ''
  });

  React.useEffect(() => {
    setCanCreategroupvalue(canCreateItemgroup());
    setCanCreatecategoryvalue(canseeitemcategory());
    setCanCreateSubCategoryvalue(canseeitemsubcategory());
  }, [canCreateItemgroup, canseeitemcategory, canseeitemsubcategory]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === 'HSNcode' || id === 'salesprice' || id === 'purchaseprice' || id === 'weight' ? Number(value) : value
    }));
  };

  const handleItem = (e) => {
    setItemType(e.target.value);
  };

  const handleOpeningStock = (e) => {
    setOpeningStock(e.target.value === 'true');
  };

  const handleNegativeQty = (e) => {
    setNagativeQty(e.target.value === 'true');
  };

  const handleLowStock = (e) => {
    const isLowStock = e.target.value === 'true';
    setLowStock(isLowStock);
    setFormData((prevData) => ({
      ...prevData,
      lowStockQty: isLowStock ? prevData.lowStockQty : null
    }));
  };

  const handleCess = (e) => {
    setCess(e.target.value === 'true');
  };

  const handleWastage = (e) => {
    setIsWastage(e.target.value === 'true');
  };

  const handleFinishedGoods = (e) => {
    setIsFinishedGoods(e.target.value === 'true');
  };

  const handleRawMaterial = (e) => {
    setIsRawMaterial(e.target.value === 'true');
  };

  const handleSpareItem = (e) => {
    setIsSpareItem(e.target.value === 'true');
  };

  React.useEffect(() => {
    const itemgroup = async () => {
      try {
        const itemgroup = await dispatch(fetchAllItemGroup());
        if (Array.isArray(itemgroup)) {
          const options = itemgroup.map((product) => ({
            value: product.id,
            label: product.name
          }));
          setItemgroupOptions(canCreategroupvalue ? [{ value: 'new_group', label: 'Create New Group' }, ...options] : options);
        }
      } catch (error) {
        console.log(error, 'fetch item Group');
      }
    };
    if (canCreategroupvalue !== null) {
      itemgroup();
    }
  }, [dispatch, canCreategroupvalue]);

  React.useEffect(() => {
    const itemcategory = async () => {
      if (selectedItemGroup) {
        try {
          const itemcategory = await dispatch(fetchAllItemcategory(selectedItemGroup));
          if (Array.isArray(itemcategory)) {
            const options = itemcategory.map((category) => ({
              value: category.id,
              label: category.name
            }));
            setItemcategoryOptions(canCreatecategoryvalue ? [{ value: 'new_category', label: 'Create New Category' }, ...options] : options);
          } else {
            setItemcategoryOptions([]);
          }
        } catch (error) {
          console.log(error, 'fetch item Category');
          setItemcategoryOptions([]);
        }
      } else {
        setItemcategoryOptions([]);
      }
    };
    if (canCreatecategoryvalue !== null) {
      itemcategory();
    }
  }, [dispatch, selectedItemGroup, canCreatecategoryvalue]);

  React.useEffect(() => {
    const fetchSubCategories = async () => {
      if (formData.itemCategoryId) {
        try {
          const subCategories = await dispatch(getAllItemSubCategoryByCategory(formData.itemCategoryId));
          if (Array.isArray(subCategories)) {
            const options = subCategories.map((sub) => ({
              value: sub.id,
              label: sub.name
            }));
            const subCategoryOptions = canCreateSubCategoryvalue
              ? [{ value: 'new_sub_category', label: 'Create New Sub Category' }, ...options]
              : options;
            setItemSubCategoryOptions(subCategoryOptions);
          } else {
            setItemSubCategoryOptions([]);
          }
        } catch (error) {
          console.log(error, 'fetch item Sub Category');
          setItemSubCategoryOptions([]);
        }
      } else {
        setItemSubCategoryOptions([]);
      }
    };

    fetchSubCategories();
  }, [dispatch, formData.itemCategoryId, canCreateSubCategoryvalue]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const productData = await dispatch(viewProduct(id));
          if (productData) {
            setFormData({
              productname: productData.productname || '',
              description: productData.description || '',
              itemGroupId: productData.itemGroupId || '',
              itemCategoryId: productData.itemCategoryId || '',
              itemSubCategoryId: productData.itemSubCategoryId || '',
              unit: productData.unit || '',
              salesprice: productData.salesprice || 0,
              purchaseprice: productData.purchaseprice || 0,
              HSNcode: productData.HSNcode || 0,
              gstrate: productData.gstrate || 0,
              lowStockQty: productData.lowStockQty || null,
              weight: productData.weight || ''
            });

            setOpeningStock(productData.openingstock || true);
            setNagativeQty(productData.nagativeqty || false);
            setLowStock(productData.lowstock || false);
            setCess(productData.cess || true);
            setIsWastage(productData.wastage || false);
            setIsFinishedGoods(productData.finished_goods || false);
            setIsRawMaterial(productData.raw_material || false);
            setIsSpareItem(productData.spare || false);
            setItemType(productData.itemtype || 'Product');
            setSelectedItemGroup(productData.itemGroupId || '');
            setItemgroupname(productData.itemGroup?.name || '');
            setItemcategoryname(productData.itemCategory?.name || '');
            setItemSubCategoryName(productData.itemSubCategory?.name || '');
          }
        } else {
          setFormData({
            productname: '',
            description: '',
            itemGroupId: '',
            itemCategoryId: '',
            itemSubCategoryId: '',
            unit: '',
            salesprice: 0,
            purchaseprice: 0,
            HSNcode: 0,
            gstrate: 0,
            lowStockQty: null,
            weight: ''
          });
          setOpeningStock(true);
          setNagativeQty(false);
          setLowStock(false);
          setCess(true);
          setIsWastage(false);
          setIsFinishedGoods(false);
          setIsRawMaterial(false);
          setIsSpareItem(false);
          setItemType('Product');
          setSelectedItemGroup('');
          setItemgroupname('');
          setItemcategoryname('');
          setItemSubCategoryName('');
        }
      } catch (error) {
        console.error('Error fetching Product', error);
      }
    };
    fetchData();
  }, [id, dispatch]);

  const handleGSTChange = (selectedOption) => {
    setFormData({ ...formData, gstrate: selectedOption.value });
  };

  const handleSave = async () => {
    if (loading) return;

    setLoading(true);
    try {
      const data = {
        ...formData,
        itemtype,
        openingstock,
        nagativeqty,
        lowstock,
        cess,
        isWastage,
        is_finished_goods: isFinishedGoods,
        is_raw_material: isRawMaterial,
        is_spare_item: isSpareItem
      };
      if (id) {
        const newdata = await dispatch(updateProduct(id, data, navigate));
        onProductUpdated(newdata.data.data);
      } else {
        const newdata = await dispatch(createProduct(data, navigate));
        onNewProductAdded(newdata.data.data);
      }
      onClose();
    } catch (error) {
      console.error('Error creating Product', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitChange = (selectedOption) => {
    setFormData({ ...formData, unit: selectedOption.value });
  };

  const unitOptions = [
    { value: 'box', label: 'box' },
    { value: 'fts.', label: 'fts.' },
    { value: 'kg', label: 'kg' },
    { value: 'LTR', label: 'LTR.' },
    { value: 'MTS', label: 'MTS' },
    { value: 'pcs.', label: 'pcs.' },
    { value: 'ton', label: 'ton' }
  ];

  const GST = [
    { value: '5', label: 'GST 5%' },
    { value: '12', label: 'GST 12%' },
    { value: '18', label: 'GST 18%' },
    { value: '28', label: 'GST 28%' }
  ];
  const handleitemgroupChange = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'new_group') {
      setItemGroupDrawerOpen(true);
    } else {
      const value = selectedOption ? selectedOption.value : '';
      const label = selectedOption ? selectedOption.label : '';
      setSelectedItemGroup(value);
      setItemgroupname(label);
      setFormData({ ...formData, itemGroupId: value, itemCategoryId: '', itemSubCategoryId: '' });
      setItemcategoryname('');
      setItemSubCategoryName('');
    }
  };

  const handleitemcategoryChange = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'new_category') {
      setItemCategoryDrawerOpen(true);
    } else {
      const value = selectedOption ? selectedOption.value : '';
      const label = selectedOption ? selectedOption.label : '';
      setItemcategoryname(label);
      setFormData({ ...formData, itemCategoryId: value, itemSubCategoryId: '' });
      setItemSubCategoryName('');
    }
  };

  const handleitemSubCategoryChange = (selectedOption) => {
    if (selectedOption && selectedOption.value === 'new_sub_category') {
      setItemSubCategoryDrawerOpen(true);
    } else {
      const value = selectedOption ? selectedOption.value : '';
      const label = selectedOption ? selectedOption.label : '';
      setItemSubCategoryName(label);
      setFormData({ ...formData, itemSubCategoryId: value });
    }
  };

  const handleNewgroupadded = (newGroup) => {
    const newOption = { value: newGroup.id, label: newGroup.name };
    const updatedgrouplist = [...itemgroupOptions, newOption];
    setItemgroupOptions(updatedgrouplist);
    setSelectedItemGroup(newGroup.id);
    setItemgroupname(newGroup.name);
    setFormData({ ...formData, itemGroupId: newGroup.id, itemCategoryId: '', itemSubCategoryId: '' });
    setItemGroupDrawerOpen(false);
  };

  const handleNewCategoryadded = (newCategory) => {
    const newOption = { value: newCategory.id, label: newCategory.name };
    const updatedcategorylist = [...itemcategoryOptions, newOption];
    setItemcategoryOptions(updatedcategorylist);
    setItemcategoryname(newCategory.name);
    setFormData({ ...formData, itemCategoryId: newCategory.id, itemSubCategoryId: '' });
    setItemCategoryDrawerOpen(false);
  };

  const handleNewSubCategoryadded = (newSubCategory) => {
    const newOption = { value: newSubCategory.id, label: newSubCategory.name };
    const updatedSubCategorylist = [...itemSubCategoryOptions, newOption];
    setItemSubCategoryOptions(updatedSubCategorylist);
    setItemSubCategoryName(newSubCategory.name);
    setFormData({ ...formData, itemSubCategoryId: newSubCategory.id });
    setItemSubCategoryDrawerOpen(false);
  };

  return (
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
        <Typography variant="h4">{id ? 'Update Item' : 'New Item'}</Typography>
        <CancelIcon onClick={onClose} />
      </Paper>
      <Box sx={{ width: { xs: 320, sm: 660 }, overflowX: 'hidden', '&::-webkit-scrollbar': { width: '0' }, paddingTop: '70px' }} role="presentation">
        <Grid container spacing={2} sx={{ margin: '1px', padding: '10px' }}>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Item Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <RadioGroup row value={itemtype} onChange={handleItem}>
              <FormControlLabel value="Product" control={<Radio />} label="Product" />
              <FormControlLabel value="Service" control={<Radio />} label="Service" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Product : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter Product" id="productname" value={formData.productname} onChange={handleInputChange} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Product Description</Typography>
            <input placeholder="Enter Product Description" id="description" value={formData.description} onChange={handleInputChange} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Item Group:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              id="itemgroup"
              options={itemgroupOptions}
              value={formData.itemGroupId ? { value: formData.itemGroupId, label: itemgroupname } : null}
              onChange={handleitemgroupChange}
              isClearable
            />
            <ItemGroup
              open={itemGroupDrawerOpen}
              onClose={() => setItemGroupDrawerOpen(false)}
              onnewgroupadded={handleNewgroupadded}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Item Category:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              id="itemcategory"
              options={itemcategoryOptions}
              value={formData.itemCategoryId ? { value: formData.itemCategoryId, label: itemcategoryname } : null}
              onChange={handleitemcategoryChange}
              isDisabled={!formData.itemGroupId}
              isClearable
            />
            <Itemcategory
              open={itemCategoryDrawerOpen}
              onClose={() => setItemCategoryDrawerOpen(false)}
              onnewCategoryadded={handleNewCategoryadded}
              ItemGroupOptions={itemgroupOptions}
              id={formData.itemGroupId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Item Sub Category:</Typography>
            <Select
              id="itemsubcategory"
              options={itemSubCategoryOptions}
              value={formData.itemSubCategoryId ? { value: formData.itemSubCategoryId, label: itemSubCategoryName } : null}
              onChange={handleitemSubCategoryChange}
              isDisabled={!formData.itemCategoryId}
              isClearable
            />
            <ItemSubCategory
              open={itemSubCategoryDrawerOpen}
              onClose={() => setItemSubCategoryDrawerOpen(false)}
              onnewSubCategoryadded={handleNewSubCategoryadded}
              id={null}
              itemCategoryId={formData.itemCategoryId}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Unit : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              options={unitOptions}
              value={formData.unit ? { label: formData.unit, value: formData.unit } : null}
              onChange={handleUnitChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              GST Rate(%):<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              options={GST}
              value={formData.gstrate ? { label: `GST ${formData.gstrate}%`, value: formData.gstrate } : null}
              onChange={handleGSTChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              HSN Code:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="Enter HSN Code" id="HSNcode" value={formData.HSNcode} onChange={handleInputChange} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Weight :</Typography>
            <input type="number" placeholder="Enter weight" id="weight" value={formData.weight} onChange={handleInputChange} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Would you like to add batch wise opening stock?
            </Typography>
            <RadioGroup row value={String(openingstock)} onChange={handleOpeningStock}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Negative Qty Allowed :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <RadioGroup row value={String(nagativeqty)} onChange={handleNegativeQty}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Low Stock Warning : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <RadioGroup row value={String(lowstock)} onChange={handleLowStock}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
            {lowstock && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">Low Stock Quantity:</Typography>
                <input
                  placeholder="Enter Low Stock Quantity"
                  id="lowStockQty"
                  value={formData.lowStockQty || ''}
                  onChange={handleInputChange}
                  style={{ width: '100%' }}
                />
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Purchase Price :</Typography>
            <input placeholder="0.000" id="purchaseprice" value={formData.purchaseprice} onChange={handleInputChange} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">
              Sales Price: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="0.000" id="salesprice" value={formData.salesprice} onChange={handleInputChange} style={{ width: '100%' }} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Cess Enable</Typography>
            <RadioGroup row value={String(cess)} onChange={handleCess}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Is Wastage?</Typography>
            <RadioGroup row value={String(isWastage)} onChange={handleWastage}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Is Finished Goods?</Typography>
            <RadioGroup row value={String(isFinishedGoods)} onChange={handleFinishedGoods}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Is Raw Material?</Typography>
            <RadioGroup row value={String(isRawMaterial)} onChange={handleRawMaterial}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="subtitle1">Is Spare Item?</Typography>
            <RadioGroup row value={String(isSpareItem)} onChange={handleSpareItem}>
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
          <button id="savebtncs" onClick={onClose} style={{ marginRight: '10px' }}>
            Cancel
          </button>
          <button id="savebtncs" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </Grid>
      </Box>
    </Drawer>
  );
};

export default AnchorProductDrawer;
