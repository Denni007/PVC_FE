import React, { useState, useEffect } from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TablePagination,
  TableHead,
  TableContainer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { getallPaymentCash, paymentCashDelete, paymentCashview } from 'store/thunk';
import { useNavigate } from 'react-router';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];
const ExpenseListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreatePaymentcash, canUpdatePaymentcash, canDeletePaymentcash } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);

  useEffect(() => {
    getData();
  }, [dispatch, navigate]);

  const getData = () => {
    dispatch(getallPaymentCash())
      .then((data) => {
        const filterData = data.data.filter((item) => item.accountPaymentCash.accountName === 'Expense');
        setPayments(filterData);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching payment cash data:', error);
      });
  };

  const handleMakePayment = () => {
    navigate('/expense');
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleUpdatePayment = (id) => {
    dispatch(paymentCashview(id));
    navigate(`/expense/${id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handledelete = async () => {
    try {
      await dispatch(paymentCashDelete(selectedId, navigate));
      setOpenConfirmation(false);
      getData();
    } catch (error) {
      console.error('Error deleting payment cash:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Expense List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleMakePayment}
          disabled={!canCreatePaymentcash()}
        >
          Expense
        </Button>
      </div>
      <TableContainer>
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
            {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment, index) => (
              <TableRow key={payment.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdatePaymentcash() ? 'green' : 'gray',
                            color: canUpdatePaymentcash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdatePaymentcash() && { opacity: 1 }),
                            ...(!canUpdatePaymentcash() && { opacity: 0.5 }),
                            ...(!canUpdatePaymentcash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdatePayment(payment.id)}
                          disabled={!canUpdatePaymentcash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeletePaymentcash() ? 'Red' : 'gray',
                            color: canDeletePaymentcash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeletePaymentcash() && { opacity: 1 }),
                            ...(!canDeletePaymentcash() && { opacity: 0.5 }),
                            ...(!canDeletePaymentcash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(payment.id)}
                          disabled={!canDeletePaymentcash()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(payment[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      payment.accountPaymentCash.contactPersonName
                    ) : column.id === 'updatedBy' ? (
                      payment.paymentUpdate?.username
                    ) : column.id === 'createdBy' ? (
                      payment.paymentCreate?.username
                    ) : (
                      payment[column.id]
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
        count={payments?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handledelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ExpenseListPage;
