
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Grid, Paper, Typography, IconButton, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteRawMaterial } from 'store/thunk';
import EditRawMaterialModal from './EditRawMaterialModal';

const RawMaterial = ({ rawMaterials, onUpdate }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const handleEdit = (material) => {
        setSelectedMaterial(material);
        setEditModalOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(deleteRawMaterial(id, navigate));
    };

    const handleClose = (shouldRefetch) => {
        setEditModalOpen(false);
        if (shouldRefetch) {
            onUpdate(); 
        }
    };

    return (
        <Grid container spacing={2} sx={{p: 2}}>
            {rawMaterials?.map((material) => (
                <Grid item lg={4} sm={6} xs={12} key={material.id}>
                    <Paper sx={{p: 2}}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6">{material.name}</Typography>
                            <Box>
                                <IconButton onClick={() => handleEdit(material)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(material.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                        <Typography variant="body2">Raw Material</Typography>
                        <Typography variant="h5" sx={{mt: 2}}>₹{material.rate_per_kg}</Typography>
                        <Typography variant="caption">RATE / KG</Typography>
                    </Paper>
                </Grid>
            ))}
            <EditRawMaterialModal open={editModalOpen} handleClose={handleClose} material={selectedMaterial} />
        </Grid>
    );
};

RawMaterial.propTypes = {
    rawMaterials: PropTypes.array,
    onUpdate: PropTypes.func
};

export default RawMaterial;
