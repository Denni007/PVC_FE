import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Box,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { fetchAllRecipe, deleteRecipe } from 'store/thunk'; 
import { useNavigate } from 'react-router';
import { Edit, Delete } from '@mui/icons-material';

const RecipeList = ({ searchQuery }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);

  const getRecipes = () => {
    setLoading(true);
    dispatch(fetchAllRecipe())
      .then((data) => {
        const recipeData = Array.isArray(data) ? data : [];
        setRecipes(recipeData);
        setFilteredRecipes(recipeData);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching recipes:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    getRecipes();
  }, [dispatch]);

  useEffect(() => {
    if (recipes) {
      const filtered = recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    }
  }, [recipes, searchQuery]);

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteRecipe(selectedId, navigate));
      setOpenConfirmation(false);
      getRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/addbillofmaterial/${id}`);
  };

  const formatCurrency = (value) => `₹${Number(value).toFixed(2)}`;

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Grid container spacing={3}>
        {filteredRecipes.map((recipe) => (
          <Grid item lg={3} sm={6} xs={12} key={recipe.id}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>{recipe.name}</Typography>
                    <Box>
                        <IconButton size='small' onClick={() => handleEdit(recipe.id)}>
                            <Edit />
                        </IconButton>
                        <IconButton size='small' onClick={() => handleDeleteConfirmation(recipe.id)}>
                            <Delete />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="body2">Materials: {recipe.items?.length || 0} Items</Typography>
                    <Typography variant="body2">Total Usage: {recipe.total_usage?.toFixed(2) || '0.00'} KG</Typography>
                    <Typography variant="body2">Production Cost: {formatCurrency(recipe.production_cost)}</Typography>
                </Box>
              </Box>
              <Box sx={{ mt: 2, textAlign: 'left' }}>
                <Typography variant="caption" display="block" sx={{color: 'text.secondary'}}>RECIPE VALUE</Typography>
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>{formatCurrency(recipe.final_value)}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="xs">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to delete this recipe?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RecipeList;
