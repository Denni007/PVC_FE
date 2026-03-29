import React, { useState, useEffect } from 'react';
import {
  // Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableContainer,
  TableHead,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Checkbox
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { settledeleteBom, deleteBom, getAllBom, viewSingleBom } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'settle', label: '', align: 'center' }, // ✅ NEW
  { id: 'bomNo', label: 'Batch No.', align: 'center' },
  { id: 'date', label: 'Date.', align: 'center' },
  { id: 'name', label: 'Product Name', align: 'center' },
  { id: 'createdBy', label: 'Created By', align: 'center' },
  { id: 'updatedBy', label: 'Updated By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Billofmateriallist = () => {
  const { canCreateBom, canDeleteBom, canSettleDeleteBom, canUpdateBom, canViewBom } = useCan();
  const navigate = useNavigate();
  const [bom, setBom] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchBom = async () => {
      try {
        const data = await dispatch(getAllBom());
        setBom(data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching Bom:', error);
      }
    };

    fetchBom();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddBom = () => {
    navigate('/addbillofmaterial');
  };

  const handleUpdateBom = (id) => {
    dispatch(viewSingleBom(id, navigate));
    navigate(`/addbillofmaterial/${id}`);
  };

  const handleViewBom = (id) => {
    dispatch(viewSingleBom(id, navigate));
    navigate(`/billofmaterialview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteBom = async () => {
    try {
      await dispatch(deleteBom(selectedId));
      setOpenConfirmation(false);
      const data = await dispatch(getAllBom());
      setBom(data);
    } catch (error) {
      console.error('Error deleting Bom:', error);
    }
  };

  const handleSettleCheckbox = async (id, checked) => {
    if (!checked) return;

    const confirm = window.confirm(
      'This will permanently delete the Production. Are you sure?'
    );

    if (!confirm) return;

    try {
      await dispatch(settledeleteBom(id));
      const data = await dispatch(getAllBom());
      setBom(data);
    } catch (error) {
      console.error('Error settling delete BOM:', error);
    }
  };


  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Production List
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={handleAddBom} disabled={!canCreateBom()}>
        Create Production
      </Button>
      <TableContainer sx={{ maxHeight: 575 }}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {bom?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'settle' ? (
                      <Checkbox
                        disabled={!canSettleDeleteBom()}
                        onChange={(e) => handleSettleCheckbox(row.id, e.target.checked)}
                        color="secondary"
                      />
                    ) : column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewBom() ? 'Blue' : 'gray',
                            color: canViewBom() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewBom() && { opacity: 1 }),
                            ...(!canViewBom() && { opacity: 0.5 }),
                            ...(!canViewBom() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewBom(row.id)}
                          disabled={!canViewBom()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateBom() ? 'green' : 'gray',
                            color: canUpdateBom() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateBom() && { opacity: 1 }),
                            ...(!canUpdateBom() && { opacity: 0.5 }),
                            ...(!canUpdateBom() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateBom(row.id)}
                          disabled={!canUpdateBom()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteBom() ? 'Red' : 'gray',
                            color: canDeleteBom() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteBom() && { opacity: 1 }),
                            ...(!canDeleteBom() && { opacity: 0.5 }),
                            ...(!canDeleteBom() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteBom()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'createdBy' ? (
                      row.bomCreatedUser?.username
                    ) : column.id === 'name' ? (
                      row.bomProduct?.productname
                    ) : column.id === 'updatedBy' ? (
                      row.bomUpdatedUser?.username
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={bom.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Bill of material?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteBom} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default Billofmateriallist;
