import React from 'react';

import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  InputAdornment,
  MenuItem,
  Paper,
  Stack,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useDispatch } from 'react-redux';
import CalculateIcon from '@mui/icons-material/Calculate';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PriceCheckIcon from '@mui/icons-material/PriceCheck';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SaveIcon from '@mui/icons-material/Save';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

import MainCard from '../../../ui-component/cards/MainCard';
import {
  fetchAllProducts,
  fetchAllItemGroup,
  fetchAllItemGroupByType,
  fetchAllItemcategory,
  getAllItemSubCategoryByCategory,
  viewAllItemType,
  fetchAllRecipe,
  fetchCostingSettingByScope,
  saveCostingSettingByScope
} from 'store/thunk';

const StyledTab = styled(Tab)(({ theme }) => ({
  minWidth: 110,
  minHeight: 38,
  textTransform: 'none',
  fontWeight: 600,
  padding: '8px 16px',
  borderRadius: 6,
  color: theme.palette.text.primary,
  '&.Mui-selected': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.primary.lighter || 'rgba(51, 102, 255, 0.08)'
  }
}));

const ToolbarPaper = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
  borderRadius: 8,
  overflow: 'hidden',
  backgroundColor: theme.palette.background.paper
}));

const SectionHeader = ({ icon, title, actions }) => (
  <Stack
    direction={{ xs: 'column', sm: 'row' }}
    alignItems={{ xs: 'flex-start', sm: 'center' }}
    justifyContent="space-between"
    spacing={1.5}
    sx={{ mb: 2 }}
  >
    <Stack direction="row" alignItems="center" spacing={1.25} sx={{ minWidth: 0 }}>
      <Box
        sx={{
          width: 34,
          height: 34,
          borderRadius: 1,
          display: 'grid',
          placeItems: 'center',
          color: 'primary.main',
          bgcolor: 'rgba(51, 102, 255, 0.08)'
        }}
      >
        {icon}
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
    </Stack>
    {actions}
  </Stack>
);

const FieldValue = ({ label, value }) => (
  <Box sx={{ mt: 0.75 }}>
    <Typography variant="caption" color="text.secondary">
      {label}
    </Typography>
    <Typography variant="body2" sx={{ fontWeight: 700 }}>
      {value}
    </Typography>
  </Box>
);

const scrollableTabProps = {
  variant: 'scrollable',
  scrollButtons: 'auto',
  allowScrollButtonsMobile: true
};

const toTabValue = (items, selectedId) => {
  const index = items.findIndex((item) => item.id === selectedId);
  return index >= 0 ? index : false;
};

const defaultCostingForm = {
  id: null,
  resinRate: 92,
  brassRate: 1000,
  profitMargin: 0,
  multiplier: 250,
  starMargin: 10,
  goldMargin: 15,
  silverMargin: 25,
  refMargin: 0,
  cdMargin: 0,
  todMargin: 0,
  discountBaseColumn: 'net',
  recipeId: ''
};

const numberValue = (value) => Number(value || 0);
const withMargin = (value, margin) => value * (1 + numberValue(margin) / 100);
const percentageAmount = (value, margin) => value * (numberValue(margin) / 100);
const formatCurrency = (value) => `Rs. ${Number(value || 0).toFixed(2)}`;
const formatPercent = (value) => `${Number(value || 0).toFixed(2)}%`;

const discountBaseOptions = [
  { value: 'net', label: 'Net' },
  { value: 'star', label: 'Star' },
  { value: 'gold', label: 'Gold' },
  { value: 'silver', label: 'Silver' }
];

const ProductCosting = () => {
  const dispatch = useDispatch();
  const [itemTypes, setItemTypes] = React.useState([]);
  const [itemGroups, setItemGroups] = React.useState([]);
  const [itemCategories, setItemCategories] = React.useState([]);
  const [itemSubCategories, setItemSubCategories] = React.useState([]);
  const [products, setProducts] = React.useState([]);
  const [recipes, setRecipes] = React.useState([]);
  const [costingForm, setCostingForm] = React.useState(defaultCostingForm);
  const [selectedItemTypeId, setSelectedItemTypeId] = React.useState(null);
  const [selectedItemGroupId, setSelectedItemGroupId] = React.useState(null);
  const [selectedItemCategoryId, setSelectedItemCategoryId] = React.useState(null);
  const [selectedItemSubCategoryId, setSelectedItemSubCategoryId] = React.useState(null);
  const [filterText, setFilterText] = React.useState('');
  const [loading, setLoading] = React.useState({
    itemTypes: false,
    itemGroups: false,
    itemCategories: false,
    itemSubCategories: false,
    products: false,
    recipes: false,
    costingSetting: false,
    saving: false
  });

  const selectedItemType = itemTypes.find((item) => item.id === selectedItemTypeId);
  const selectedItemGroup = itemGroups.find((item) => item.id === selectedItemGroupId);
  const selectedItemCategory = itemCategories.find((item) => item.id === selectedItemCategoryId);
  const selectedItemSubCategory = itemSubCategories.find((item) => item.id === selectedItemSubCategoryId);
  const selectedRecipe = recipes.find((recipe) => Number(recipe.id) === Number(costingForm.recipeId));
  const isPipesItemType = selectedItemType?.name?.toLowerCase() === 'pipes';

  const costingScope = React.useMemo(
    () => ({
      itemTypeId: selectedItemTypeId || null,
      itemGroupId: selectedItemGroupId || null,
      itemCategoryId: selectedItemCategoryId || null
    }),
    [selectedItemTypeId, selectedItemGroupId, selectedItemCategoryId]
  );

  const materialBaseValue = numberValue(selectedRecipe?.final_value ?? costingForm.resinRate);
  const netValue = withMargin(materialBaseValue, costingForm.profitMargin);
  const starValue = withMargin(materialBaseValue, costingForm.starMargin);
  const goldValue = withMargin(materialBaseValue, costingForm.goldMargin);
  const silverValue = withMargin(materialBaseValue, costingForm.silverMargin);
  const discountBaseValues = {
    net: netValue,
    star: starValue,
    gold: goldValue,
    silver: silverValue
  };
  const discountBaseColumn = Object.prototype.hasOwnProperty.call(discountBaseValues, costingForm.discountBaseColumn)
    ? costingForm.discountBaseColumn
    : 'net';
  const discountBaseValue = discountBaseValues[discountBaseColumn];
  const discountBaseLabel = discountBaseOptions.find((option) => option.value === discountBaseColumn)?.label || 'Net';
  const refValue = percentageAmount(discountBaseValue, costingForm.refMargin);
  const cdValue = percentageAmount(discountBaseValue, costingForm.cdMargin);
  const todValue = percentageAmount(discountBaseValue, costingForm.todMargin);
  const extraValue = refValue + cdValue + todValue;
  const aggregatedFinalValue = discountBaseValue + extraValue;

  React.useEffect(() => {
    const loadProducts = async () => {
      setLoading((previous) => ({ ...previous, products: true }));
      try {
        const response = await dispatch(fetchAllProducts());
        setProducts(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Error loading products for product costing', error);
        setProducts([]);
      } finally {
        setLoading((previous) => ({ ...previous, products: false }));
      }
    };

    loadProducts();
  }, [dispatch]);

  React.useEffect(() => {
    const loadRecipes = async () => {
      setLoading((previous) => ({ ...previous, recipes: true }));
      try {
        const response = await dispatch(fetchAllRecipe());
        setRecipes(Array.isArray(response) ? response : []);
      } catch (error) {
        console.error('Error loading recipes for product costing', error);
        setRecipes([]);
      } finally {
        setLoading((previous) => ({ ...previous, recipes: false }));
      }
    };

    loadRecipes();
  }, [dispatch]);

  React.useEffect(() => {
    const loadItemTypes = async () => {
      setLoading((previous) => ({ ...previous, itemTypes: true }));
      try {
        const response = await dispatch(viewAllItemType());
        const data = Array.isArray(response) ? response : [];
        setItemTypes(data);
        setSelectedItemTypeId(data[0]?.id || null);
      } catch (error) {
        console.error('Error loading item types for product costing', error);
        setItemTypes([]);
        setSelectedItemTypeId(null);
      } finally {
        setLoading((previous) => ({ ...previous, itemTypes: false }));
      }
    };

    loadItemTypes();
  }, [dispatch]);

  React.useEffect(() => {
    const loadItemGroups = async () => {
      setItemGroups([]);
      setItemCategories([]);
      setItemSubCategories([]);
      setSelectedItemGroupId(null);
      setSelectedItemCategoryId(null);
      setSelectedItemSubCategoryId(null);

      if (!selectedItemTypeId) return;

      setLoading((previous) => ({ ...previous, itemGroups: true }));
      try {
        const response = await dispatch(fetchAllItemGroupByType(selectedItemTypeId));
        let data = Array.isArray(response) ? response : [];

        if (!data.length) {
          const allGroupsResponse = await dispatch(fetchAllItemGroup());
          const allGroups = Array.isArray(allGroupsResponse) ? allGroupsResponse : [];
          data = allGroups.filter((group) => group.itemTypeId === selectedItemTypeId || group.ItemType?.id === selectedItemTypeId);
        }

        setItemGroups(data);
        setSelectedItemGroupId(data[0]?.id || null);
      } catch (error) {
        console.error('Error loading item groups for product costing', error);
      } finally {
        setLoading((previous) => ({ ...previous, itemGroups: false }));
      }
    };

    loadItemGroups();
  }, [dispatch, selectedItemTypeId]);

  React.useEffect(() => {
    const loadItemCategories = async () => {
      setItemCategories([]);
      setItemSubCategories([]);
      setSelectedItemCategoryId(null);
      setSelectedItemSubCategoryId(null);

      if (!selectedItemGroupId) return;

      setLoading((previous) => ({ ...previous, itemCategories: true }));
      try {
        const response = await dispatch(fetchAllItemcategory(selectedItemGroupId));
        const data = Array.isArray(response) ? response : [];
        setItemCategories(data);
        setSelectedItemCategoryId(data[0]?.id || null);
      } catch (error) {
        console.error('Error loading item categories for product costing', error);
      } finally {
        setLoading((previous) => ({ ...previous, itemCategories: false }));
      }
    };

    loadItemCategories();
  }, [dispatch, selectedItemGroupId]);

  React.useEffect(() => {
    const loadItemSubCategories = async () => {
      setItemSubCategories([]);
      setSelectedItemSubCategoryId(null);

      if (!selectedItemCategoryId) return;

      setLoading((previous) => ({ ...previous, itemSubCategories: true }));
      try {
        const response = await dispatch(getAllItemSubCategoryByCategory(selectedItemCategoryId));
        const data = Array.isArray(response) ? response : [];
        setItemSubCategories(data);
        setSelectedItemSubCategoryId(data[0]?.id || null);
      } catch (error) {
        console.error('Error loading item sub categories for product costing', error);
      } finally {
        setLoading((previous) => ({ ...previous, itemSubCategories: false }));
      }
    };

    loadItemSubCategories();
  }, [dispatch, selectedItemCategoryId]);

  React.useEffect(() => {
    const loadCostingSetting = async () => {
      if (!selectedItemTypeId) {
        setCostingForm(defaultCostingForm);
        return;
      }

      setLoading((previous) => ({ ...previous, costingSetting: true }));
      try {
        const setting = await dispatch(fetchCostingSettingByScope(costingScope));
        if (!setting) {
          setCostingForm(defaultCostingForm);
          return;
        }

        setCostingForm({
          id: setting.id || null,
          resinRate: setting.resinRate ?? defaultCostingForm.resinRate,
          brassRate: setting.brassRate ?? defaultCostingForm.brassRate,
          profitMargin: setting.profitMargin ?? defaultCostingForm.profitMargin,
          multiplier: setting.multiplier ?? defaultCostingForm.multiplier,
          starMargin: setting.tierMargins?.star ?? setting.starMargin ?? defaultCostingForm.starMargin,
          goldMargin: setting.tierMargins?.gold ?? setting.goldMargin ?? defaultCostingForm.goldMargin,
          silverMargin: setting.tierMargins?.silver ?? setting.silverMargin ?? defaultCostingForm.silverMargin,
          refMargin: setting.refMargin ?? defaultCostingForm.refMargin,
          cdMargin: setting.cdMargin ?? defaultCostingForm.cdMargin,
          todMargin: setting.todMargin ?? defaultCostingForm.todMargin,
          discountBaseColumn: setting.discountBaseColumn ?? defaultCostingForm.discountBaseColumn,
          recipeId: setting.recipeId || ''
        });
      } catch (error) {
        console.error('Error loading costing setting for selected hierarchy', error);
        setCostingForm(defaultCostingForm);
      } finally {
        setLoading((previous) => ({ ...previous, costingSetting: false }));
      }
    };

    loadCostingSetting();
  }, [dispatch, costingScope, selectedItemTypeId]);

  const handleItemTypeChange = (event, index) => {
    setSelectedItemTypeId(itemTypes[index]?.id || null);
  };

  const handleItemGroupChange = (event, index) => {
    setSelectedItemGroupId(itemGroups[index]?.id || null);
  };

  const handleItemCategoryChange = (event, index) => {
    setSelectedItemCategoryId(itemCategories[index]?.id || null);
  };

  const handleItemSubCategoryChange = (event, index) => {
    setSelectedItemSubCategoryId(itemSubCategories[index]?.id || null);
  };

  const handleCostingFieldChange = (field) => (event) => {
    setCostingForm((previous) => ({
      ...previous,
      [field]: event.target.value
    }));
  };

  const handleSaveCostingSetting = async () => {
    setLoading((previous) => ({ ...previous, saving: true }));
    try {
      const savedSetting = await dispatch(saveCostingSettingByScope({
        ...costingScope,
        resinRate: numberValue(costingForm.resinRate),
        brassRate: numberValue(costingForm.brassRate),
        profitMargin: numberValue(costingForm.profitMargin),
        multiplier: numberValue(costingForm.multiplier),
        starMargin: numberValue(costingForm.starMargin),
        goldMargin: numberValue(costingForm.goldMargin),
        silverMargin: numberValue(costingForm.silverMargin),
        refMargin: numberValue(costingForm.refMargin),
        cdMargin: numberValue(costingForm.cdMargin),
        todMargin: numberValue(costingForm.todMargin),
        discountBaseColumn,
        recipeId: costingForm.recipeId || null
      }));

      if (savedSetting?.id) {
        setCostingForm((previous) => ({ ...previous, id: savedSetting.id }));
      }
    } finally {
      setLoading((previous) => ({ ...previous, saving: false }));
    }
  };

  const handleResetCostingSetting = () => {
    setCostingForm(defaultCostingForm);
  };

  const isLoading = Object.values(loading).some(Boolean);
  const costingPath = [selectedItemType?.name, selectedItemGroup?.name, selectedItemCategory?.name]
    .filter(Boolean)
    .join(' / ');
  const activePath = [selectedItemType?.name, selectedItemGroup?.name, selectedItemCategory?.name, selectedItemSubCategory?.name]
    .filter(Boolean)
    .join(' / ');

  const tableRows = products
    .filter((product) => {
      if (!selectedItemTypeId) return true;
      return product.itemTypeId === selectedItemTypeId || product.itemType?.id === selectedItemTypeId;
    })
    .filter((product) => !selectedItemGroupId || product.itemGroupId === selectedItemGroupId)
    .filter((product) => !selectedItemCategoryId || product.itemCategoryId === selectedItemCategoryId)
    .filter((product) => !selectedItemSubCategoryId || product.itemSubCategoryId === selectedItemSubCategoryId)
    .filter((product) => {
      const query = filterText.toLowerCase();
      return (
        !query ||
        product.productname?.toLowerCase().includes(query) ||
        product.description?.toLowerCase().includes(query) ||
        product.itemSubCategory?.name?.toLowerCase().includes(query) ||
        product.ItemSubCategory?.name?.toLowerCase().includes(query) ||
        selectedItemGroup?.name?.toLowerCase().includes(query)
      );
    })
    .map((product, index) => {
      const basicValue = numberValue(product.weight) * materialBaseValue;
      const productTierValues = {
        net: withMargin(basicValue, costingForm.profitMargin),
        star: withMargin(basicValue, costingForm.starMargin),
        gold: withMargin(basicValue, costingForm.goldMargin),
        silver: withMargin(basicValue, costingForm.silverMargin)
      };
      const selectedTierValue = productTierValues[discountBaseColumn] ?? productTierValues.net;
      const productRefValue = percentageAmount(selectedTierValue, costingForm.refMargin);
      const productCdValue = percentageAmount(selectedTierValue, costingForm.cdMargin);
      const productTodValue = percentageAmount(selectedTierValue, costingForm.todMargin);
      const productExtraValue = productRefValue + productCdValue + productTodValue;
      const finalValue = selectedTierValue + productExtraValue;
      const priceList = numberValue(product.weight) * numberValue(costingForm.multiplier);
      const discountPercent = priceList ? ((priceList - finalValue) / priceList) * 100 : 0;

      return {
        no: index + 1,
        description: product.productname || product.description || '-',
        size: product.size || product.unit || '-',
        weight: product.weight || '-',
        landed: basicValue,
        netRate: selectedTierValue,
        refValue: productRefValue,
        cdValue: productCdValue,
        todValue: productTodValue,
        finalValue,
        discountPercent,
        priceList
      };
    });

  const pricedRows = tableRows.filter((row) => Number(row.finalValue) > 0).length;
  const averageFinalValue = tableRows.length
    ? tableRows.reduce((sum, row) => sum + Number(row.finalValue || 0), 0) / tableRows.length
    : 0;

  return (
    <MainCard title="Product Costing">
      <Grid container spacing={2.25}>
        <Grid item xs={12}>
          <ToolbarPaper sx={{ borderColor: 'rgba(51, 102, 255, 0.16)' }}>
            <Box
              sx={{
                px: { xs: 2, md: 2.5 },
                py: 2,
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '1fr auto' },
                gap: 2,
                alignItems: 'center',
                bgcolor: '#f8fafc',
                borderLeft: '4px solid',
                borderLeftColor: 'primary.main'
              }}
            >
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="overline" color="text.secondary">
                  Business Context
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                  SHREE KRISHNA INDUSTRIES
                </Typography>
                <Stack direction="row" spacing={1} sx={{ mt: 1, flexWrap: 'wrap', rowGap: 1 }}>
                  <Chip size="small" color="primary" label={activePath || 'Select costing hierarchy'} />
                  <Chip size="small" variant="outlined" icon={<Inventory2OutlinedIcon />} label={`${tableRows.length} products`} />
                  {costingForm.id && <Chip size="small" color="primary" variant="outlined" label="Saved setting" />}
                </Stack>
              </Box>
              <Stack direction="row" spacing={1} justifyContent={{ xs: 'flex-start', md: 'flex-end' }} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                <Button variant="outlined" size="small">
                  Matrix
                </Button>
                <Button variant="outlined" size="small">
                  Quick View
                </Button>
                <Button variant="outlined" size="small">
                  Focus
                </Button>
              </Stack>
            </Box>
          </ToolbarPaper>
        </Grid>

        <Grid item xs={12}>
          <ToolbarPaper sx={{ px: 1.5, py: 1 }}>
            <SectionHeader icon={<TuneIcon fontSize="small" />} title="Costing Scope" />
            <Stack spacing={1}>
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                  Item Type
                </Typography>
                {loading.itemTypes ? (
                  <Box sx={{ px: 1, py: 1 }}>
                    <CircularProgress size={22} />
                  </Box>
                ) : (
                  <Tabs
                    value={toTabValue(itemTypes, selectedItemTypeId)}
                    onChange={handleItemTypeChange}
                    aria-label="item type tabs"
                    {...scrollableTabProps}
                  >
                    {itemTypes.map((itemType) => (
                      <StyledTab key={itemType.id} label={itemType.name} />
                    ))}
                  </Tabs>
                )}
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                  Item Group
                </Typography>
                {loading.itemGroups ? (
                  <Box sx={{ px: 1, py: 1 }}>
                    <CircularProgress size={22} />
                  </Box>
                ) : (
                  <Tabs
                    value={toTabValue(itemGroups, selectedItemGroupId)}
                    onChange={handleItemGroupChange}
                    aria-label="item group tabs"
                    {...scrollableTabProps}
                  >
                    {itemGroups.map((itemGroup) => (
                      <StyledTab key={itemGroup.id} label={itemGroup.name} />
                    ))}
                  </Tabs>
                )}
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                  Item Category
                </Typography>
                {loading.itemCategories ? (
                  <Box sx={{ px: 1, py: 1 }}>
                    <CircularProgress size={22} />
                  </Box>
                ) : (
                  <Tabs
                    value={toTabValue(itemCategories, selectedItemCategoryId)}
                    onChange={handleItemCategoryChange}
                    aria-label="item category tabs"
                    {...scrollableTabProps}
                  >
                    {itemCategories.map((category) => (
                      <StyledTab key={category.id} label={category.name} />
                    ))}
                  </Tabs>
                )}
              </Box>
              <Divider />
              <Box>
                <Typography variant="caption" color="text.secondary" sx={{ px: 1 }}>
                  Item Sub Category
                </Typography>
                {loading.itemSubCategories ? (
                  <Box sx={{ px: 1, py: 1 }}>
                    <CircularProgress size={22} />
                  </Box>
                ) : (
                  <Tabs
                    value={toTabValue(itemSubCategories, selectedItemSubCategoryId)}
                    onChange={handleItemSubCategoryChange}
                    aria-label="item sub category tabs"
                    {...scrollableTabProps}
                  >
                    {itemSubCategories.map((subCategory) => (
                      <StyledTab key={subCategory.id} label={subCategory.name} />
                    ))}
                  </Tabs>
                )}
              </Box>
            </Stack>
          </ToolbarPaper>
        </Grid>

        {!isLoading && !itemTypes.length && (
          <Grid item xs={12}>
            <Alert severity="info">No item types found. Create item types before configuring product costing.</Alert>
          </Grid>
        )}

        <Grid item xs={12}>
          <ToolbarPaper sx={{ p: { xs: 1.5, md: 2 } }}>
            <SectionHeader
              icon={<CalculateIcon fontSize="small" />}
              title="Costing Inputs"
              actions={
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', rowGap: 1 }}>
                  <Chip size="small" color="primary" label={`Base / Price Per KG ${formatCurrency(materialBaseValue)}`} />
                  <Chip size="small" variant="outlined" label={`Average ${formatCurrency(averageFinalValue)}`} />
                  <Chip size="small" variant="outlined" label={`${tableRows.length} rows`} />
                </Stack>
              }
            />
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                columnGap: 1.25,
                rowGap: 1.75,
                alignItems: 'flex-start',
                pt: 0.75,
                pb: 0.5,
                overflow: 'visible',
                '& .MuiInputBase-root': {
                  bgcolor: '#fff'
                },
                '& .MuiInputBase-input': {
                  fontWeight: 700
                }
              }}
            >
              <Box sx={{ flex: '1 1 135px', maxWidth: 170, minWidth: 125 }}>
                <TextField
                  fullWidth
                  size="small"
                  label="Price Per KG"
                  type="number"
                  value={selectedRecipe ? numberValue(selectedRecipe.final_value) : costingForm.resinRate}
                  onChange={handleCostingFieldChange('resinRate')}
                  disabled={Boolean(selectedRecipe)}
                  InputProps={{ startAdornment: <InputAdornment position="start">Rs.</InputAdornment> }}
                />
              </Box>
              <Box sx={{ flex: '2 1 205px', maxWidth: 280, minWidth: 190 }}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Select Recipe"
                  value={costingForm.recipeId}
                  onChange={handleCostingFieldChange('recipeId')}
                  disabled={loading.recipes}
                >
                  <MenuItem value="">Manual Entry</MenuItem>
                  {recipes.map((recipe) => (
                    <MenuItem key={recipe.id} value={recipe.id}>
                      {recipe.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
              {!isPipesItemType && (
                <Box sx={{ flex: '1 1 125px', maxWidth: 155, minWidth: 120 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="Brass Rate"
                    type="number"
                    value={costingForm.brassRate}
                    onChange={handleCostingFieldChange('brassRate')}
                    InputProps={{ startAdornment: <InputAdornment position="start">Rs.</InputAdornment> }}
                  />
                </Box>
              )}
              <Box sx={{ flex: '1 1 115px', maxWidth: 140, minWidth: 105 }}>
                <TextField fullWidth size="small" label="Net %" type="number" value={costingForm.profitMargin} onChange={handleCostingFieldChange('profitMargin')} />
                <FieldValue label="Value" value={formatCurrency(netValue)} />
              </Box>
              <Box sx={{ flex: '1 1 115px', maxWidth: 140, minWidth: 105 }}>
                <TextField fullWidth size="small" label="MRP Mult %" type="number" value={costingForm.multiplier} onChange={handleCostingFieldChange('multiplier')} />
              </Box>
              <Box
                sx={{
                  flex: '1 1 120px',
                  maxWidth: 155,
                  minWidth: 112,
                  p: discountBaseColumn === 'star' ? 1 : 0,
                  borderRadius: 1,
                  bgcolor: discountBaseColumn === 'star' ? 'rgba(51, 102, 255, 0.08)' : 'transparent',
                  border: discountBaseColumn === 'star' ? '1px solid rgba(51, 102, 255, 0.22)' : '1px solid transparent'
                }}
              >
                <TextField fullWidth size="small" label={`Star (${numberValue(costingForm.starMargin)}%)`} type="number" value={costingForm.starMargin} onChange={handleCostingFieldChange('starMargin')} />
                <FieldValue label="Value" value={formatCurrency(starValue)} />
              </Box>
              <Box
                sx={{
                  flex: '1 1 120px',
                  maxWidth: 155,
                  minWidth: 112,
                  p: discountBaseColumn === 'gold' ? 1 : 0,
                  borderRadius: 1,
                  bgcolor: discountBaseColumn === 'gold' ? 'rgba(255, 171, 0, 0.12)' : 'transparent',
                  border: discountBaseColumn === 'gold' ? '1px solid rgba(255, 171, 0, 0.28)' : '1px solid transparent'
                }}
              >
                <TextField fullWidth size="small" label={`Gold (${numberValue(costingForm.goldMargin)}%)`} type="number" value={costingForm.goldMargin} onChange={handleCostingFieldChange('goldMargin')} />
                <FieldValue label="Value" value={formatCurrency(goldValue)} />
              </Box>
              <Box
                sx={{
                  flex: '1 1 120px',
                  maxWidth: 155,
                  minWidth: 112,
                  p: discountBaseColumn === 'silver' ? 1 : 0,
                  borderRadius: 1,
                  bgcolor: discountBaseColumn === 'silver' ? 'rgba(0, 150, 136, 0.08)' : 'transparent',
                  border: discountBaseColumn === 'silver' ? '1px solid rgba(0, 150, 136, 0.22)' : '1px solid transparent'
                }}
              >
                <TextField fullWidth size="small" label={`Silver (${numberValue(costingForm.silverMargin)}%)`} type="number" value={costingForm.silverMargin} onChange={handleCostingFieldChange('silverMargin')} />
                <FieldValue label="Value" value={formatCurrency(silverValue)} />
              </Box>
              <Box sx={{ flex: '1 1 130px', maxWidth: 165, minWidth: 120 }}>
                <TextField
                  fullWidth
                  size="small"
                  select
                  label="Pricing Tier"
                  value={discountBaseColumn}
                  onChange={handleCostingFieldChange('discountBaseColumn')}
                >
                  {discountBaseOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <FieldValue label="Tier Value" value={formatCurrency(discountBaseValue)} />
              </Box>
              <Box sx={{ flex: '1 1 105px', maxWidth: 135, minWidth: 100 }}>
                <TextField fullWidth size="small" label={`Ref (${numberValue(costingForm.refMargin)}%)`} type="number" value={costingForm.refMargin} onChange={handleCostingFieldChange('refMargin')} />
                <FieldValue label="Value" value={formatCurrency(refValue)} />
              </Box>
              <Box sx={{ flex: '1 1 105px', maxWidth: 135, minWidth: 100 }}>
                <TextField fullWidth size="small" label={`CD (${numberValue(costingForm.cdMargin)}%)`} type="number" value={costingForm.cdMargin} onChange={handleCostingFieldChange('cdMargin')} />
                <FieldValue label="Value" value={formatCurrency(cdValue)} />
              </Box>
              <Box sx={{ flex: '1 1 105px', maxWidth: 135, minWidth: 100 }}>
                <TextField fullWidth size="small" label={`TOD (${numberValue(costingForm.todMargin)}%)`} type="number" value={costingForm.todMargin} onChange={handleCostingFieldChange('todMargin')} />
                <FieldValue label="Value" value={formatCurrency(todValue)} />
              </Box>
              <Box sx={{ flex: '1 1 170px', maxWidth: 210, minWidth: 160 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1,
                    border: '1px solid',
                    borderColor: 'warning.light',
                    bgcolor: 'rgba(255, 171, 0, 0.08)'
                  }}
                >
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700 }}>
                    Final Value
                  </Typography>
                  <Typography variant="h4" sx={{ fontWeight: 800, lineHeight: 1.1, mt: 0.75, color: 'warning.dark' }}>
                    {formatCurrency(aggregatedFinalValue)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {discountBaseLabel} + Ref/CD/TOD
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Divider sx={{ my: 1.5 }} />
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} alignItems={{ xs: 'stretch', sm: 'center' }}>
              <Button
                variant="contained"
                color="warning"
                startIcon={<SaveIcon />}
                onClick={handleSaveCostingSetting}
                disabled={!selectedItemTypeId || loading.saving}
                sx={{ minWidth: 150 }}
              >
                {loading.saving ? 'Saving...' : 'Save to Cloud'}
              </Button>
              <Button variant="outlined" startIcon={<RestartAltIcon />} onClick={handleResetCostingSetting}>
                Reset
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Typography variant="caption" color="text.secondary">
                Scope: {costingPath || 'Company default'} | Priced rows: {pricedRows}
              </Typography>
            </Stack>
          </ToolbarPaper>
        </Grid>

        <Grid item xs={12}>
          <ToolbarPaper sx={{ p: { xs: 1.5, md: 2 } }}>
            <SectionHeader
              icon={<PriceCheckIcon fontSize="small" />}
              title="Product Rates"
              actions={
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.25} alignItems={{ xs: 'stretch', sm: 'center' }}>
                  <TextField
                    placeholder="Filter products..."
                    size="small"
                    value={filterText}
                    onChange={(event) => setFilterText(event.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon fontSize="small" />
                        </InputAdornment>
                      )
                    }}
                    sx={{ minWidth: { xs: '100%', sm: 300 } }}
                  />
                  <Button variant="outlined" startIcon={<FileDownloadIcon />}>
                    Download
                  </Button>
                </Stack>
              }
            />
            <TableContainer
              sx={{
                maxHeight: 520,
                maxWidth: '100%',
                display: 'block',
                overflowX: 'auto',
                overflowY: 'auto',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 1,
                scrollbarGutter: 'stable',
                '&::-webkit-scrollbar': {
                  height: 12,
                  width: 12
                },
                '&::-webkit-scrollbar-thumb': {
                  backgroundColor: '#90a4b8',
                  borderRadius: 8,
                  border: '3px solid #f8fafc'
                },
                '&::-webkit-scrollbar-track': {
                  backgroundColor: '#eef2f6'
                },
                '& .MuiTableRow-root:hover': {
                  bgcolor: 'rgba(51, 102, 255, 0.04)'
                }
              }}
            >
              <Table
                size="small"
                stickyHeader
                sx={{
                  minWidth: 1360,
                  width: 1360,
                  tableLayout: 'auto',
                  '& .MuiTableCell-root': {
                    px: 2,
                    py: 1.5,
                    whiteSpace: 'nowrap'
                  }
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc', minWidth: 80 }}>NO.</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc', minWidth: 300, maxWidth: 460 }}>DESCRIPTION</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc', minWidth: 145 }}>SIZE</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc', minWidth: 110 }}>WT (KG)</TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc' }} align="right">
                      LANDED
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800, bgcolor: 'rgba(0, 150, 136, 0.1)', color: 'success.dark' }} align="right">
                      NET RATE
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc' }} align="right">
                      REF
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc' }} align="right">
                      CD
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc' }} align="right">
                      TOD
                    </TableCell>
                    <TableCell sx={{ fontWeight: 800, bgcolor: '#eef4ff', color: 'primary.main' }} align="right">
                      FINAL VALUE
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc' }} align="right">
                      DISC %
                    </TableCell>
                    <TableCell sx={{ fontWeight: 700, bgcolor: '#f8fafc' }} align="right">
                      PRICE LIST
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableRows.map((row) => (
                    <TableRow key={row.no} hover>
                      <TableCell>{row.no}</TableCell>
                      <TableCell sx={{ whiteSpace: 'normal', wordBreak: 'break-word', lineHeight: 1.45 }}>{row.description}</TableCell>
                      <TableCell>{row.size}</TableCell>
                      <TableCell>{row.weight}</TableCell>
                      <TableCell align="right">{formatCurrency(row.landed)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: 'success.dark', bgcolor: 'rgba(0, 150, 136, 0.05)' }}>
                        {formatCurrency(row.netRate)}
                      </TableCell>
                      <TableCell align="right">{formatCurrency(row.refValue)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.cdValue)}</TableCell>
                      <TableCell align="right">{formatCurrency(row.todValue)}</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 800, color: 'primary.main' }}>
                        {formatCurrency(row.finalValue)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, color: 'success.main' }}>
                        {formatPercent(row.discountPercent)}
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        {formatCurrency(row.priceList)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {!tableRows.length && (
                    <TableRow>
                      <TableCell colSpan={12} align="center" sx={{ py: 5 }}>
                        No costing rows match the selected filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </ToolbarPaper>
        </Grid>

        <Grid item xs={12}>
          <ToolbarPaper sx={{ p: { xs: 1.5, md: 2 }, bgcolor: '#f8fafc' }}>
            <SectionHeader icon={<CalculateIcon fontSize="small" />} title="Formula Reference" />
            <Grid container spacing={1.5}>
              <Grid item xs={12} md={4}>
                <Box sx={{ borderLeft: '3px solid', borderLeftColor: 'primary.main', pl: 1.5 }}>
                  <Typography variant="subtitle2">LANDED FORMULA</Typography>
                  <Typography variant="caption" color="text.secondary">
                    WT * BASE VALUE / PRICE PER KG
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ borderLeft: '3px solid', borderLeftColor: 'success.main', pl: 1.5 }}>
                  <Typography variant="subtitle2">NET SELLING</Typography>
                  <Typography variant="caption" color="text.secondary">
                    LANDED * (1 + NET %)
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} md={4}>
                <Box sx={{ borderLeft: '3px solid', borderLeftColor: 'warning.main', pl: 1.5 }}>
                  <Typography variant="subtitle2">FINAL VALUE</Typography>
                  <Typography variant="caption" color="text.secondary">
                    SELECTED TIER + REF + CD + TOD
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </ToolbarPaper>
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default ProductCosting;
