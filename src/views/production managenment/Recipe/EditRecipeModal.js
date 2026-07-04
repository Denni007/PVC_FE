
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
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
  InputLabel,
  FormControl
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateRecipeRequest } from 'store/actions';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const EditRecipeModal = ({ open, handleClose, recipe, rawMaterials }) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [productLine, setProductLine] = useState('');
  const [components, setComponents] = useState([{ material: '', usage: '' }]);

  useEffect(() => {
    if (recipe) {
      setName(recipe.name);
      setProductLine(recipe.productLine);
      setComponents(recipe.components);
    }
  }, [recipe]);

  const handleAddComponent = () => {
    setComponents([...(components || []), { material: '', usage: '' }]);
  };

  const handleRemoveComponent = (index) => {
    const newComponents = [...components];
    newComponents.splice(index, 1);
    setComponents(newComponents);
  };

  const handleComponentChange = (index, event) => {
    const newComponents = [...components];
    newComponents[index][event.target.name] = event.target.value;
    setComponents(newComponents);
  };

  const handleSubmit = () => {
    dispatch(updateRecipeRequest({ id: recipe.id, name, productLine, components }));
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="edit-recipe-modal-title">
      <Box sx={style}>
        <Typography id="edit-recipe-modal-title" variant="h6" component="h2">
          Edit Recipe
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Recipe Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Product Line" value={productLine} onChange={(e) => setProductLine(e.target.value)} />
          </Grid>

          {components?.map((component, index) => (
            <React.Fragment key={index}>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel>Material</InputLabel>
                  <Select
                    name="material"
                    value={component.material}
                    onChange={(e) => handleComponentChange(index, e)}
                  >
                    {rawMaterials?.map((material) => (
                      <MenuItem value={material.id} key={material.id}>
                        {material.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Usage"
                  name="usage"
                  type="number"
                  value={component.usage}
                  onChange={(e) => handleComponentChange(index, e)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => handleRemoveComponent(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </React.Fragment>
          ))}

          <Grid item xs={12}>
            <Button startIcon={<AddIcon />} onClick={handleAddComponent}>
              Add Component
            </Button>
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
            Save
          </Button>
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
