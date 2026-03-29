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
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Deliverychallanview, getallDeliverychallan, deleteDileveryChallan } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'challanno', label: 'Challan No', minWidth: 100, align: 'center' },
  { id: 'date', label: 'Date', minWidth: 100, align: 'center' },
  { id: 'party', label: 'Party', minWidth: 100, align: 'center' },
  { id: 'challanCreateUser', label: 'Created By', align: 'center' },
  { id: 'challanUpdateUser', label: 'Updated By', align: 'center' },
  { id: 'action', label: 'Action', minWidth: 100, align: 'center' }
];

const DileveryChallanList = () => {
  const { canViewDeliverychallan, canDeleteDeliverychallan, canCreateDeliverychallan, canUpdateDeliverychallan } = useCan();
  const navigate = useNavigate();
  const [deliverychallan, setdeliverychallan] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // all delivery challan api called
  useEffect(() => {
    const fetchDeliverychallan = async () => {
      try {
        const data = await dispatch(getallDeliverychallan());
        setdeliverychallan(data);
      } catch (error) {
        console.error('Error fetching delivery challan:', error);
        if (error.response.status === 401) {
          navigate('/');
        }
      }
    };

    fetchDeliverychallan();
  }, [dispatch, navigate]);

  // set pagination to change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // how much row show in one page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //navigate page on create deliverychallan
  const handleAddDeliverychallan = () => {
    navigate('/deliverychallan');
  };

  //passed id for view single data
  const handleViewDeliverychallan = (id) => {
    dispatch(Deliverychallanview(id));
    navigate(`/deliverychallanview/${id}`);
  };

  //passed id for update data
  const handleUpdateDeliverychallan = (id) => {
    dispatch(Deliverychallanview(id));
    navigate(`/deliverychallan/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedUserId(id);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteDileveryChallan(selectedUserId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallDeliverychallan());
      setdeliverychallan(data);
    } catch (error) {
      console.error('Error deleting delivery challan:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ padding: '25px', width: '100%' }}>
      <Typography variant="h4" align="center" id="mycss">
        Dilevery Challan List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '16px' }}
        onClick={handleAddDeliverychallan}
        disabled={!canCreateDeliverychallan()}
      >
        Create Delivery Challan
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
            {deliverychallan?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((order, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewDeliverychallan() ? 'Blue' : 'gray',
                            color: canViewDeliverychallan() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewDeliverychallan() && { opacity: 1 }),
                            ...(!canViewDeliverychallan() && { opacity: 0.5 }),
                            ...(!canViewDeliverychallan() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewDeliverychallan(order.id)}
                          disabled={!canViewDeliverychallan()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateDeliverychallan() ? 'green' : 'gray',
                            color: canUpdateDeliverychallan() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateDeliverychallan() && { opacity: 1 }),
                            ...(!canUpdateDeliverychallan() && { opacity: 0.5 }),
                            ...(!canUpdateDeliverychallan() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateDeliverychallan(order.id)}
                          disabled={!canUpdateDeliverychallan()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteDeliverychallan() ? 'Red' : 'gray',
                            color: canDeleteDeliverychallan() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteDeliverychallan() && { opacity: 1 }),
                            ...(!canDeleteDeliverychallan() && { opacity: 0.5 }),
                            ...(!canDeleteDeliverychallan() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(order.id)}
                          disabled={!canDeleteDeliverychallan()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'challanCreateUser' ? (
                      order.challanCreateUser?.username
                    ) : column.id === 'challanUpdateUser' ? (
                      order.challanUpdateUser?.username
                    ) : column.id === 'date' ? (
                      new Date(order[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      order.accountDelivery?.accountName
                    ) : (
                      order[column.id]
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
        count={deliverychallan?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Challan?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} variant="contained" color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default DileveryChallanList;
