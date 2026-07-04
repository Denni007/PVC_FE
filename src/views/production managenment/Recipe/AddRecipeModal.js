
import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Modal, Box, Typography, TextField, Button, Grid, IconButton, Select, MenuItem, FormControl,
  Table, TableBody, TableCell, TableHead, TableRow, TableFooter, Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { createRecipe } from 'store/thunk';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60vw',
  maxWidth: '900px',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
  maxHeight: '90vh',
  overflowY: 'auto'
};

const AddRecipeModal = ({ open, handleClose, rawMaterials }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form State
  const [name, setName] = useState('');
  const [productionCost, setProductionCost] = useState('');
  const [components, setComponents] = useState([
    { material: '', usage: '', rate: 0, total: 0 }
  ]);

  // Derived State for Calculations
  const { totalUsage, totalAmount } = useMemo(() => {
    let usage = 0;
    let amount = 0;
    components.forEach(c => {
      const u = parseFloat(c.usage || 0);
      const r = parseFloat(c.rate || 0);
      usage += u;
      amount += u * r;
    });
    return { totalUsage: usage, totalAmount: amount };
  }, [components]);

  const perKgValue = totalUsage > 0 ? totalAmount / totalUsage : 0;
  const finalValue = perKgValue + parseFloat(productionCost || 0);

  // Handlers
  const handleAddComponent = () => {
    setComponents([...components, { material: '', usage: '', rate: 0, total: 0 }]);
  };

  const handleRemoveComponent = (index) => {
    const newComponents = components.filter((_, i) => i !== index);
    setComponents(newComponents);
  };

  const handleComponentChange = (index, event) => {
    const { name, value } = event.target;
    const newComponents = [...components];
    const component = newComponents[index];

    component[name] = value;

    if (name === 'material') {
      const selectedMaterial = rawMaterials.find(m => m.id === value);
      component.rate = selectedMaterial ? selectedMaterial.rate_per_kg : 0;
    }
    
    const usage = parseFloat(component.usage || 0);
    const rate = parseFloat(component.rate || 0);
    component.total = usage * rate;

    setComponents(newComponents);
  };

  const handleSubmit = async () => {
    if (!name.trim()) return toast.error('Please provide a recipe name.');

    const validComponents = components
      .filter(c => c.material && c.usage)
      .map(c => ({
        material: c.material,
        usage: parseFloat(c.usage),
      }));

    if (validComponents.length === 0) return toast.error('Please add at least one valid material to the recipe.');
    if (validComponents.length !== components.length) return toast.error('Please ensure all components have a material and usage specified.');

    const payload = {
      name,
      total_usage: totalUsage,
      total_amount: totalAmount,
      per_kg_value: perKgValue,
      production_cost: parseFloat(productionCost || 0),
      final_value: finalValue,
      items: validComponents,
    };

    try {
      await dispatch(createRecipe(payload, navigate));
      handleClose(true); // Signal refresh
    } catch (error) {
      console.error("Failed to create recipe:", error);
    }
  };

  const formatCurrency = (value) => `₹${Number(value).toFixed(2)}`;
  const formatPercentage = (value) => `${Number(value).toFixed(2)}%`;

  return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <Box sx={style}>
        <Typography variant="h4" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Add Recipe
        </Typography>

        {/* Top Inputs */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={9}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>RECIPE NAME</Typography>
            <TextField fullWidth variant="outlined" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>PRODUCTION COST (₹/KG)</Typography>
            <TextField fullWidth variant="outlined" type="number" value={productionCost} onChange={(e) => setProductionCost(e.target.value)} />
          </Grid>
        </Grid>

        {/* Components Section */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>RECIPE COMPONENTS</Typography>
            <Button startIcon={<AddIcon />} onClick={handleAddComponent} variant="text">+ Add Component</Button>
        </Box>

        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <Table>
            <TableHead sx={{ bgcolor: '#f5f5f5' }}>
              <TableRow>
                <TableCell>MATERIAL</TableCell>
                <TableCell align="right">RATE/KG</TableCell>
                <TableCell align="right">USAGE (KG)</TableCell>
                <TableCell align="right">CONTRIB %</TableCell>
                <TableCell align="right">TOTAL</TableCell>
                <TableCell align="center"> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {components.map((component, index) => {
                const contribPercentage = totalAmount > 0 ? (component.total / totalAmount) * 100 : 0;
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <Select name="material" value={component.material} onChange={(e) => handleComponentChange(index, e)}>
                          {rawMaterials?.map((m) => (
                            <MenuItem value={m.id} key={m.id}>{m.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">{formatCurrency(component.rate)}</TableCell>
                    <TableCell align="right" sx={{ minWidth: 100 }}>
                      <TextField name="usage" type="number" value={component.usage} onChange={(e) => handleComponentChange(index, e)} variant="outlined" size="small" sx={{ width: '100px' }}/>
                    </TableCell>
                    <TableCell align="right">{formatPercentage(contribPercentage)}</TableCell>
                    <TableCell align="right">{formatCurrency(component.total)}</TableCell>
                    <TableCell align="center">
                      <IconButton onClick={() => handleRemoveComponent(index)} disabled={components.length <= 1}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <TableFooter sx={{ borderTop: '2px solid #000' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>TOTALS</TableCell>
                <TableCell />
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>{totalUsage.toFixed(2)} KG</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>100.00%</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold' }}>{formatCurrency(totalAmount)}</TableCell>
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>

        {/* Footer Summary */}
        <Box sx={{ mt: 4, p: 3, bgcolor: '#FFF7E6', borderRadius: 2, display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          <Box textAlign="center">
            <Typography variant="body2">PER KG VALUE</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{formatCurrency(perKgValue)}</Typography>
          </Box>
          <Typography variant="h4">+</Typography>
          <Box textAlign="center">
            <Typography variant="body2">PRODUCTION COST</Typography>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>{formatCurrency(productionCost || 0)}</Typography>
          </Box>
          <Typography variant="h4">=</Typography>
          <Box textAlign="center">
             <Typography variant="body2" color="primary">FINAL VALUE</Typography>
             <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>{formatCurrency(finalValue)}</Typography>
          </Box>
        </Box>
        
        {/* Action Buttons */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => handleClose(false)} sx={{ mr: 2, minWidth: '120px' }} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ minWidth: '120px' }}>Save Recipe</Button>
        </Box>
      </Box>
    </Modal>
  );
};

AddRecipeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  rawMaterials: PropTypes.array,
};

export default AddRecipeModal;
