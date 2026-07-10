import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Modal, Box, Typography, TextField, Button, Grid } from '@mui/material';
import { updateRawMaterial } from 'store/thunk';
import { toast } from 'react-toastify';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const EditRawMaterialModal = ({ open, handleClose, material }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [rate, setRate] = useState('');

  useEffect(() => {
    if (material) {
      setName(material.name);
      setRate(material.rate_per_kg);
    }
  }, [material]);

  const handleSubmit = async () => {
    if (!material) return;
    if (!name.trim()) return toast.error('Please provide a material name.');
    if (rate === '' || Number(rate) < 0) return toast.error('Please provide a valid rate.');

    try {
      await dispatch(updateRawMaterial(material.id, { name: name, rate_per_kg: rate }, navigate));
      handleClose(true);
    } catch (error) {
      console.error('Failed to update raw material:', error);
      handleClose(false);
    }
  };

  return (
    <Modal open={open} onClose={() => handleClose(false)} aria-labelledby="edit-raw-material-modal-title">
      <Box sx={style}>
        <Typography id="edit-raw-material-modal-title" variant="h6" component="h2">
          Edit Raw Material
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

EditRawMaterialModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  material: PropTypes.object
};

export default EditRawMaterialModal;
