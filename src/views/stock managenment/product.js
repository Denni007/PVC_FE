import React, { useEffect, useState } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableHead,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  IconButton,
  Grid,
  TableContainer
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { getAllStoke, updateStoke, viewSingleStoke } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import useCan from 'views/permission managenment/checkpermissionvalue';

const columns = [
  { id: 'product', label: 'Product Name', minWidth: 100, align: 'center' },
  { id: 'stock', label: 'Stock', minWidth: 70, align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Product = ({ GroupId, CategoryId, SubCategoryId, Query }) => {
  const { canUpdateStoke, canViewStoke } = useCan();
  const [stoke, setStoke] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewStock, setViewStock] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenDialog = (row) => {
    setSelectedRow(row);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRow(null);
  };

  const handleSave = async () => {
    try {
      const paylod = {
        itemId: selectedRow.productId,
        qty: selectedRow.qty
      };
      await dispatch(updateStoke(selectedRow.id, paylod, navigate));
      const query = {
        groupId: GroupId,
        categoryId: CategoryId,
        subCategoryId: SubCategoryId,
        search: Query
      };
      const updatedData = await dispatch(getAllStoke(query));
      setStoke(updatedData);
      handleCloseDialog();
    } catch (error) {
      console.error('Error updating stoke', error);
    }
  };

  const handleViewLowStock = async (id) => {
    const data = await dispatch(viewSingleStoke(id, navigate));
    setViewStock(data);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
    setSelectedRow(null);
  };

  useEffect(() => {
    const fetchStoke = async () => {
      try {
        const query = {
          groupId: GroupId,
          categoryId: CategoryId,
          subCategoryId: SubCategoryId,
          search: Query
        };
        const data = await dispatch(getAllStoke(query));
        setStoke(data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('fetching data of stoke', error);
      }
    };
    fetchStoke();
  }, [dispatch, navigate, GroupId, CategoryId, SubCategoryId, Query]);

  return (
    <Card style={{ width: 'auto', padding: '20px' }}>
      {/* <Typography variant="h4" align="center" id="mycss">
        Stock List
      </Typography> */}
      <TableContainer sx={{ maxHeight: 540, overflowY: 'scroll' }}>
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
            {stoke?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewStoke() ? 'Blue' : 'gray',
                            color: canViewStoke() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewStoke() && { opacity: 1 }),
                            ...(!canViewStoke() && { opacity: 0.5 }),
                            ...(!canViewStoke() && { backgroundColor: 'gray' })
                          }}
                          disabled={!canViewStoke()}
                          onClick={() => handleViewLowStock(row.id)}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateStoke() ? 'green' : 'gray',
                            color: canUpdateStoke() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateStoke() && { opacity: 1 }),
                            ...(!canUpdateStoke() && { opacity: 0.5 }),
                            ...(!canUpdateStoke() && { backgroundColor: 'gray' })
                          }}
                          disabled={!canUpdateStoke()}
                          onClick={() => handleOpenDialog(row, row.itemStock.id)}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'product' ? (
                      row.itemStock?.productname
                    ) : column.id === 'stock' ? (
                      row.qty
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
        count={stoke?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Stock</DialogTitle>
        <DialogContent>
          <Grid item container spacing={2}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">Product Name:</Typography>
              <input
                disabled
                value={selectedRow?.itemStock.productname || ''}
                onChange={(e) =>
                  setSelectedRow({ ...selectedRow, itemStock: { ...selectedRow.itemStock.id, productname: e.target.value } })
                }
              />
            </Grid>
            <Grid item sm={6}>
              <Typography variant="subtitle1">
                Product QTY: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input value={selectedRow?.qty || ''} onChange={(e) => setSelectedRow({ ...selectedRow, qty: e.target.value })} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary" id="savebtncs" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSave} color="secondary" id="savebtncs" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog}>
        <DialogTitle align="center" variant="h5">
          View Stock
        </DialogTitle>
        <DialogContent>
          <Grid item container spacing={4}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">Product name:</Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>{viewStock?.itemStock?.productname}</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={4}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">Stock:</Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>{viewStock?.qty}</Typography>
            </Grid>
          </Grid>
          <Grid item container spacing={4}>
            <Grid item sm={6}>
              <Typography variant="subtitle1">Updated By:</Typography>
            </Grid>
            <Grid item sm={6}>
              <Typography>{viewStock?.stockUpdateUser?.username}</Typography>
            </Grid>
          </Grid>
          <DialogActions>
            <Button onClick={handleCloseViewDialog} color="secondary" id="savebtncs" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default Product;
