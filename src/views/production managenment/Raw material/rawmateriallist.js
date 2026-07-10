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
import { fetchAllRawMaterial, deleteRawMaterial } from 'store/thunk'; 
import { useNavigate } from 'react-router';
import EditRawMaterialModal from './EditRawMaterialModal';
import { Edit, Delete } from '@mui/icons-material';
import useCan from 'views/permission managenment/checkpermissionvalue';

const Rawmateriallist = ({ searchQuery = '' }) => {
  const { canUpdateItem, canDeleteItem } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [rawMaterials, setRawMaterials] = useState([]);
  const [filteredMaterials, setFilteredMaterials] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = () => {
    setLoading(true);
    dispatch(fetchAllRawMaterial())
      .then((data) => {
        const materials = Array.isArray(data) ? data : [];
        setRawMaterials(materials);
        setFilteredMaterials(materials);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching raw materials:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMaterials();
  }, [dispatch]);

  useEffect(() => {
    if (rawMaterials) {
      const filtered = rawMaterials.filter((material) =>
        (material.name || '').toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMaterials(filtered);
    }
  }, [rawMaterials, searchQuery]);

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteRawMaterial(selectedId, navigate));
      setOpenConfirmation(false);
      fetchMaterials();
    } catch (error) {
      console.error('Error deleting raw material:', error);
    }
  };
  
  const handleEdit = (material) => {
    setSelectedMaterial(material);
    setEditModalOpen(true);
  };

  const handleClose = (shouldRefetch) => {
    setEditModalOpen(false);
    if (shouldRefetch) {
        fetchMaterials();
    }
  };

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <>
      <Grid container spacing={3}>
        {filteredMaterials.map((material) => (
          <Grid item lg={3} sm={6} xs={12} key={material.id}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', boxShadow: '0 4px 8px rgba(0,0,0,0.1)', borderRadius: '12px' }}>
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{fontWeight: 'bold'}}>{material.name}</Typography>
                    <Box>
                        <IconButton size='small' onClick={() => handleEdit(material)} disabled={!canUpdateItem()}>
                            <Edit />
                        </IconButton>
                        <IconButton size='small' onClick={() => handleDeleteConfirmation(material.id)} disabled={!canDeleteItem()}>
                            <Delete />
                        </IconButton>
                    </Box>
                </Box>
                <Typography variant="body2" sx={{color: 'text.secondary'}}>Raw Material</Typography>
              </Box>
              <Box sx={{ mt: 2, textAlign: 'left' }}>
                <Typography variant="caption" display="block" sx={{color: 'text.secondary'}}>RATE / KG</Typography>
                <Typography variant="h5" sx={{fontWeight: 'bold'}}>Rs. {material.rate_per_kg}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="xs">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
            <Typography>Are you sure you want to delete this raw material?</Typography>
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
      {selectedMaterial && <EditRawMaterialModal open={editModalOpen} handleClose={handleClose} material={selectedMaterial} />}
    </>
  );
};

export default Rawmateriallist;
