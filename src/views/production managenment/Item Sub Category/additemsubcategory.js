import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button, TextField, Grid, Typography, Paper } from '@mui/material';
import { createItemSubCategory, updateItemSubCategory } from 'store/thunk';

const ItemSubCategoryForm = ({ subCategory, onFormSubmit }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [itemCategoryId, setItemCategoryId] = useState('');

  useEffect(() => {
    if (subCategory) {
      setName(subCategory.name);
      setItemCategoryId(subCategory.itemCategoryId);
    }
  }, [subCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { name, itemCategoryId };
    if (subCategory) {
      dispatch(updateItemSubCategory(subCategory.id, data));
    } else {
      dispatch(createItemSubCategory(data));
    }
    onFormSubmit();
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <Typography variant="h6">{subCategory ? 'Edit' : 'Add'} Item Sub-Category</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Item Category ID"
              value={itemCategoryId}
              onChange={(e) => setItemCategoryId(e.target.value)}
              fullWidth
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              {subCategory ? 'Update' : 'Create'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default ItemSubCategoryForm;
