import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Typography,
  Tabs,
  Tab,
  TextField,
  InputAdornment,
  Card,
  CardContent,
} from '@mui/material';
import { Search } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import RawMaterialList from '../Raw material/rawmateriallist';
import RecipeList from '../Recipe/recipelist';
import AddRawMaterialModal from '../Raw material/AddRawMaterialModal';
import AddRecipeModal from '../Recipe/AddRecipeModal';
import { fetchAllRawMaterial } from 'store/thunk';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const RecipeManagementPage = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [addMaterialOpen, setAddMaterialOpen] = useState(false);
  const [addRecipeOpen, setAddRecipeOpen] = useState(false);
  const [rawMaterials, setRawMaterials] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    dispatch(fetchAllRawMaterial()).then(data => setRawMaterials(data || []));
  }, [dispatch, refreshKey]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddClick = () => {
    if (value === 0) {
      setAddMaterialOpen(true);
    } else {
      setAddRecipeOpen(true);
    }
  };
  
  const handleCloseMaterialModal = (isSuccess) => {
    setAddMaterialOpen(false);
    if (isSuccess) {
      setRefreshKey(oldKey => oldKey + 1);
    }
  };

  const handleCloseRecipeModal = (isSuccess) => {
    setAddRecipeOpen(false);
    if (isSuccess) {
      setRefreshKey(oldKey => oldKey + 1);
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
          <Grid item>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>Recipe Management</Typography>
            <Typography variant="subtitle2" color="text.secondary">
              Manage raw materials, and product recipes
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleAddClick}>
              {value === 0 ? '+ Add Material' : '+ Add Recipe'}
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="recipe management tabs">
            <Tab label="Raw Materials" {...a11yProps(0)} />
            <Tab label="Recipes" {...a11yProps(1)} />
          </Tabs>
        </Box>

        <Box sx={{ mt: 3, mb: 3 }}>
            <TextField
              variant="outlined"
              fullWidth
              placeholder={value === 0 ? "Search materials..." : "Search recipes..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
        </Box>

        {value === 0 && <RawMaterialList searchQuery={searchQuery} key={`material-list-${refreshKey}`} />}
        {value === 1 && <RecipeList searchQuery={searchQuery} key={`recipe-list-${refreshKey}`} />}

        <AddRawMaterialModal open={addMaterialOpen} handleClose={handleCloseMaterialModal} />
        <AddRecipeModal open={addRecipeOpen} handleClose={handleCloseRecipeModal} rawMaterials={rawMaterials} />
      </CardContent>
    </Card>
  );
};

export default RecipeManagementPage;
