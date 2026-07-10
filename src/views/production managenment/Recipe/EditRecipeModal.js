import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { updateRecipe } from 'store/thunk';

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

const emptyComponent = { material: '', materialName: '', usage: '', rate: 0, total: 0 };

const normalizeRecipeItems = (items = [], rawMaterials = []) => {
  if (!Array.isArray(items) || items.length === 0) {
    return [{ ...emptyComponent }];
  }

  return items.map((item) => {
    const materialId = item.raw_material_id || item.material || '';
    const selectedMaterial = rawMaterials.find((material) => Number(material.id) === Number(materialId));
    const rate = Number(item.rate_per_kg ?? selectedMaterial?.rate_per_kg ?? 0);
    const usage = item.usage ?? '';

    return {
      material: materialId,
      materialName: item.material && Number.isNaN(Number(item.material)) ? item.material : selectedMaterial?.name || '',
      usage,
      rate,
      total: Number(item.total ?? Number(usage || 0) * rate)
    };
  });
};

const EditRecipeModal = ({ open, handleClose, recipe, rawMaterials }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [productionCost, setProductionCost] = useState('');
  const [components, setComponents] = useState([{ ...emptyComponent }]);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name || '');
      setProductionCost(recipe.production_cost ?? '');
      setComponents(normalizeRecipeItems(recipe.items, rawMaterials));
    }
  }, [recipe, rawMaterials]);

  const { totalUsage, totalAmount } = useMemo(() => {
    return components.reduce(
      (totals, component) => {
        const usage = parseFloat(component.usage || 0);
        const rate = parseFloat(component.rate || 0);
        return {
          totalUsage: totals.totalUsage + usage,
          totalAmount: totals.totalAmount + usage * rate
        };
      },
      { totalUsage: 0, totalAmount: 0 }
    );
  }, [components]);

  const perKgValue = totalUsage > 0 ? totalAmount / totalUsage : 0;
  const finalValue = perKgValue + parseFloat(productionCost || 0);

  const handleAddComponent = () => {
    setComponents([...components, { ...emptyComponent }]);
  };

  const handleRemoveComponent = (index) => {
    if (components.length <= 1) return;
    setComponents(components.filter((_, componentIndex) => componentIndex !== index));
  };

  const handleComponentChange = (index, event) => {
    const { name: fieldName, value } = event.target;
    const nextComponents = [...components];
    const component = { ...nextComponents[index], [fieldName]: value };

    if (fieldName === 'material') {
      const selectedMaterial = rawMaterials.find((material) => Number(material.id) === Number(value));
      component.rate = selectedMaterial ? selectedMaterial.rate_per_kg : 0;
      component.materialName = selectedMaterial ? selectedMaterial.name : '';
    }

    const usage = parseFloat(component.usage || 0);
    const rate = parseFloat(component.rate || 0);
    component.total = usage * rate;
    nextComponents[index] = component;
    setComponents(nextComponents);
  };

  const handleSubmit = async () => {
    if (!recipe) return;
    if (!name.trim()) return toast.error('Please provide a recipe name.');

    const validComponents = components
      .filter((component) => component.material && component.usage)
      .map((component) => ({
        raw_material_id: Number(component.material),
        material: component.materialName,
        usage: parseFloat(component.usage),
        rate_per_kg: parseFloat(component.rate || 0),
        total: parseFloat(component.total || 0)
      }));

    if (validComponents.length === 0) {
      return toast.error('Please add at least one valid material to the recipe.');
    }

    if (validComponents.length !== components.length) {
      return toast.error('Please ensure all components have a material and usage specified.');
    }

    const payload = {
      name,
      total_usage: totalUsage,
      total_amount: totalAmount,
      per_kg_value: perKgValue,
      production_cost: parseFloat(productionCost || 0),
      final_value: finalValue,
      items: validComponents
    };

    await dispatch(updateRecipe(recipe.id, payload, navigate));
    handleClose(true);
  };

  const formatCurrency = (value) => `Rs. ${Number(value).toFixed(2)}`;
  const formatPercentage = (value) => `${Number(value).toFixed(2)}%`;

  return (
    <Modal open={open} onClose={() => handleClose(false)} aria-labelledby="edit-recipe-modal-title">
      <Box sx={style}>
        <Typography id="edit-recipe-modal-title" variant="h4" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
          Edit Recipe
        </Typography>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} md={9}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>RECIPE NAME</Typography>
            <TextField fullWidth variant="outlined" value={name} onChange={(event) => setName(event.target.value)} />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'medium' }}>PRODUCTION COST (RS/KG)</Typography>
            <TextField fullWidth variant="outlined" type="number" value={productionCost} onChange={(event) => setProductionCost(event.target.value)} />
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>RECIPE COMPONENTS</Typography>
          <Button startIcon={<AddIcon />} onClick={handleAddComponent} variant="text">Add Component</Button>
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
                const componentUsage = parseFloat(component.usage || 0);
                const contribPercentage = totalUsage > 0 ? (componentUsage / totalUsage) * 100 : 0;
                return (
                  <TableRow key={index}>
                    <TableCell sx={{ minWidth: 200 }}>
                      <FormControl fullWidth>
                        <Select name="material" value={component.material} onChange={(event) => handleComponentChange(index, event)}>
                          {rawMaterials?.map((material) => (
                            <MenuItem value={material.id} key={material.id}>{material.name}</MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="right">{formatCurrency(component.rate)}</TableCell>
                    <TableCell align="right" sx={{ minWidth: 100 }}>
                      <TextField name="usage" type="number" value={component.usage} onChange={(event) => handleComponentChange(index, event)} variant="outlined" size="small" sx={{ width: '100px' }} />
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

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => handleClose(false)} sx={{ mr: 2, minWidth: '120px' }} variant="outlined">Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ minWidth: '120px' }}>Save Recipe</Button>
        </Box>
      </Box>
    </Modal>
  );
};

EditRecipeModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  recipe: PropTypes.object,
  rawMaterials: PropTypes.array,
};

export default EditRecipeModal;
