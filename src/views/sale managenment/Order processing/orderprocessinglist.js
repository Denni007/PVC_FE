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
  IconButton
  // useMediaQuery,
  // useTheme
} from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import { changeOrderStatus, deleteOrderprocessing, getallOrderprocessing } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const columns = [
  { id: 'orderProcessingNo', label: 'Order Processing No', align: 'center' },
  { id: 'date', label: 'Date.', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Orderprocessinglist = () => {
  const { canCreateOrderProcessing, canUpdateOrderProcessing, canDeleteOrderProcessing, canViewOrderProcessing } = useCan();
  const navigate = useNavigate();
  const [orderProcessing, setOrderProcessing] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openDispatchConfirmation, setOpenDispatchConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchOrderProcessing = async () => {
      try {
        const data = await dispatch(getallOrderprocessing());
        setOrderProcessing(data.data);
      } catch (error) {
        console.log('error: ', error);
        if (error.response?.status === 401) {
          navigate('/');
        }
        console.error('Error fetching Order Processing:', error);
      }
    };

    fetchOrderProcessing();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddOrderprocessing = () => {
    navigate('/orderprocessing');
  };

  const handleUpdateOP = (id) => {
    navigate(`/orderprocessing/${id}`);
  };

  const handleViewOP = (id) => {
    console.log('id: ', id);
    // navigate(`/orderprocessingview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDispatchConfirmation = (id) => {
    setOpenDispatchConfirmation(true);
    setSelectedId(id);
  };

  const handledeleteOP = async () => {
    try {
      await dispatch(deleteOrderprocessing(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallOrderprocessing());
      setOrderProcessing(data.data);
    } catch (error) {
      console.error('Error deleting order processing:', error);
    }
  };

  const handleDispatchOP = async () => {
    try {
      await dispatch(changeOrderStatus(selectedId, { status: 'Closed' }, navigate));
      setOpenDispatchConfirmation(false);
      const data = await dispatch(getallOrderprocessing());
      setOrderProcessing(data.data);
    } catch (error) {
      console.error('Error Dispatch order processing:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Order Processing List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddOrderprocessing}
          disabled={!canCreateOrderProcessing()}
        >
          Create Order Processing
        </Button>
      </div>
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
            {orderProcessing?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewOrderProcessing() ? 'Blue' : 'gray',
                            color: 'white',
                            borderRadius: 0.8,
                            ...(canViewOrderProcessing() && { opacity: 1 }),
                            ...(!canViewOrderProcessing() && { opacity: 0.5 }),
                            ...(!canViewOrderProcessing() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewOP(row.id)}
                          disabled={!canViewOrderProcessing()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateOrderProcessing() ? 'green' : 'gray',
                            color: 'white',
                            borderRadius: 0.8,
                            ...(canUpdateOrderProcessing() && { opacity: 1 }),
                            ...((!canUpdateOrderProcessing() || row.status === 'Closed') && { opacity: 0.5 }),
                            ...((!canUpdateOrderProcessing() || row.status === 'Closed') && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateOP(row.id)}
                          disabled={!canUpdateOrderProcessing() || row.status === 'Closed'}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateOrderProcessing() ? '#6a1b9a' : 'gray',
                            color: 'white',
                            borderRadius: 0.8,
                            ...(canUpdateOrderProcessing() && { opacity: 1 }),
                            ...((!canUpdateOrderProcessing() || row.status === 'Closed') && { opacity: 0.5 }),
                            ...((!canUpdateOrderProcessing() || row.status === 'Closed') && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDispatchConfirmation(row.id)}
                          disabled={!canUpdateOrderProcessing() || row.status === 'Closed'}
                        >
                          <LocalShippingIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteOrderProcessing() ? 'Red' : 'gray',
                            color: 'white',
                            borderRadius: 0.8,
                            ...(canDeleteOrderProcessing() && { opacity: 1 }),
                            ...(!canDeleteOrderProcessing() && { opacity: 0.5 }),
                            ...(!canDeleteOrderProcessing() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteOrderProcessing()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.orderAccount.contactPersonName
                    ) : column.id === 'updatedBy' ? (
                      row.orderUpdate?.username
                    ) : column.id === 'createdBy' ? (
                      row.orderCreate?.username
                    ) : column.id === 'status' ? (
                      <div
                        style={{
                          color: row.status === 'Closed' ? 'Green' : 'Red'
                        }}
                      >
                        {row[column.id]}
                      </div>
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
        count={orderProcessing.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Order?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handledeleteOP} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDispatchConfirmation} onClose={() => setOpenDispatchConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to dispatch this Order?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDispatchConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDispatchOP} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default Orderprocessinglist;
