
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Grid
} from '@mui/material';
import { createRawMaterial } from 'store/thunk'; 

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const AddRawMaterialModal = ({ open, handleClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert('Please enter a material name.');
      return;
    }
    if (!rate || parseFloat(rate) <= 0) {
      alert('Please enter a rate greater than 0.');
      return;
    }

    try {
      await dispatch(createRawMaterial({ name, rate_per_kg: rate }, navigate));
      handleClose(true); 
      setName('');
      setRate('');
    } catch (error) {
      console.error("Failed to create raw material:", error);
    }
  };

  return (
    <Modal open={open} onClose={() => handleClose(false)} aria-labelledby="add-raw-material-modal-title">
      <Box sx={style}>
        <Typography id="add-raw-material-modal-title" variant="h6" component="h2">
          Add Raw Material
        </Typography>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <TextField fullWidth label="Material Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField fullWidth label="Rate / KG" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
          </Grid>
        </Grid>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button onClick={() => handleClose(false)}>Cancel</Button>
          <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

AddRawMaterialModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default AddRawMaterialModal;
