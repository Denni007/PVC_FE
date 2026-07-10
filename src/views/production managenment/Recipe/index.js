
import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Paper, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Recipe = ({ recipes, onEdit, onDelete }) => {
    const formatCurrency = (value) => `Rs. ${Number(value).toFixed(2)}`;

    return (
        <Grid container spacing={2} sx={{p: 2}}>
            {recipes?.map((recipe) => (
                <Grid item lg={4} sm={6} xs={12} key={recipe.id}>
                    <Paper sx={{p: 2}}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {recipe.name}
                            </Typography>
                            <Box>
                                <IconButton onClick={() => onEdit(recipe)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => onDelete(recipe.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2">Materials: {recipe.items?.length || 0} Items</Typography>
                            <Typography variant="body2">Total Usage: {recipe.total_usage?.toFixed(2) || '0.00'} KG</Typography>
                            <Typography variant="body2">Production Cost: {formatCurrency(recipe.production_cost)}</Typography>
                        </Box>
                        <Typography variant="h5" sx={{mt: 2}}>{formatCurrency(recipe.final_value)}</Typography>
                        <Typography variant="caption">RECIPE VALUE</Typography>
                    </Paper>
                </Grid>
            ))}
        </Grid>
    );
};

Recipe.propTypes = {
    recipes: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Recipe;
