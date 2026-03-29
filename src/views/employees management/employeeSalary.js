import { Delete } from '@mui/icons-material';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteAdvance, getallPaymentCash, paymentCashDelete } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const EmployeeSalary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selected, setSelected] = useState(null);
  const { canDeleteEmployee } = useCan();

  useEffect(() => {
    getData();
  }, [dispatch, navigate]);

  const getData = () => {
    dispatch(getallPaymentCash())
      .then((data) => {
        const filterData = data.data.filter((item) => item.accountPaymentCash.accountName === 'Salary');
        setPayments(filterData);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching payment cash data:', error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteConfirmation = (payment) => {
    setOpenConfirmation(true);
    setSelected(payment);
  };

  const handledelete = async () => {
    try {
      const obj = parseDescription(selected.description);
      console.log('obj: ', obj);
      if (obj.id) {
        const payload = {
          employeeId: obj.id
        };
        if (obj.type === 'Advance') {
          payload.advanceAmount = +selected.amount;
        } else {
          payload.paidAmount = +selected.amount;
        }
        console.log('payload: ', payload);
        await dispatch(deleteAdvance(payload, navigate));
      }
      await dispatch(paymentCashDelete(selected.id, navigate));
      setOpenConfirmation(false);
      getData();
    } catch (error) {
      console.error('Error deleting payment cash:', error);
    }
  };

  const parseDescription = (desc) => {
    let type = desc.startsWith('Advance') ? 'Advance' : 'Paid';

    let match = desc.match(/\((.*?)\)/);
    let id = match ? match[1] : null;

    return { type, id };
  };

  const canDeletePayment = (dateStr) => {
    const paymentDate = new Date(dateStr);
    const paymentYear = paymentDate.getFullYear();
    const paymentMonth = paymentDate.getMonth();

    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();

    if (paymentYear === currentYear && paymentMonth === currentMonth) {
      return true;
    }

    if (paymentYear === currentYear && paymentMonth === currentMonth - 1) {
      return true;
    }

    if (currentMonth === 0 && paymentYear === currentYear - 1 && paymentMonth === 11) {
      return true;
    }

    return false;
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Employee Salary
      </Typography>
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
                            backgroundColor: canDeleteEmployee() ? 'Red' : 'gray',
                            color: canDeleteEmployee() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteEmployee() && { opacity: 1 }),
                            ...((!canDeleteEmployee() || !canDeletePayment(payment.date)) && { opacity: 0.5 }),
                            ...((!canDeleteEmployee() || !canDeletePayment(payment.date)) && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(payment)}
                          disabled={!canDeleteEmployee() || !canDeletePayment(payment.date)}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(payment[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      payment.accountPaymentCash.contactPersonName
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
export default EmployeeSalary;
