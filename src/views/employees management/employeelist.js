import { CurrencyRupee, Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Radio,
  RadioGroup,
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
import { useNavigate, useParams } from 'react-router';
import {
  addAdvance,
  createPaymentCash,
  deleteEmployee,
  fetchAllEmployee,
  fetchSalarySummary,
  getallPaymentCash,
  getExpenseAccount
} from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const columns = [
  { id: 'id', label: 'Employee No.', align: 'center' },
  { id: 'firstName', label: 'Employee Name', align: 'center' },
  { id: 'role', label: 'Role', align: 'center' },
  { id: 'phoneNumber', label: 'Phone No.', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const EmployeeList = () => {
  const navigate = useNavigate();
  const { canCreateEmployee, canUpdateEmployee, canDeleteEmployee, canViewEmployee } = useCan();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [employeeData, setEmployeeData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [itemtype, setItemType] = useState('Advance');
  const [amount, setAmount] = useState(0);
  const [advanceAmount, setAdvanceAmount] = useState(0);
  const [paidAmount, setPaidAmount] = useState(0);
  const [netSalary, setNetSalary] = useState(0);
  const [accountId, setAccountId] = useState(2);
  const [paymentNo, setPaymentNo] = useState(1);

  const handleaddemployee = () => {
    navigate('/employeeadd');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteEmployee = async () => {
    try {
      await dispatch(deleteEmployee(selectedEmployeeId, navigate));
      setOpenConfirmation(false);
      const response = await dispatch(fetchAllEmployee());
      setEmployeeData(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteConfirmation = (employee) => {
    setOpenConfirmation(true);
    setSelectedEmployeeId(employee.id);
    setSelectedEmployee(employee);
  };

  const handleUpdateEmployee = (id) => {
    navigate(`/employeeupdate/${id}`);
  };

  const handleEmployeeview = (id) => {
    navigate(`/employeeview/${id}`);
  };

  const handleCloseAdvanveDialog = () => {
    setOpenDialog(false);
    setSelectedEmployeeId(null);
    setSelectedEmployee(null);
    setAmount(0);
  };

  const handleItem = (e) => {
    setItemType(e.target.value);
  };

  const handleAddAmount = async (employee) => {
    const salarySummary = await dispatch(fetchSalarySummary(employee.id));
    console.log('salarySummary: ', salarySummary);
    setAdvanceAmount(salarySummary.currentMonth.advanceAmount);
    setPaidAmount(salarySummary.lastMonth.paidAmount);
    setNetSalary(salarySummary.lastMonth.netSalary);
    setOpenDialog(true);
    setSelectedEmployeeId(employee.id);
    setSelectedEmployee(employee);
  };

  const handleSaveAdvance = async () => {
    const payload = {
      employeeId: selectedEmployeeId
    };
    const expenseData = {
      date: new Date(),
      amount: +amount,
      description: '',
      // employeeId: selectedEmployeeId,
      accountId,
      paymentNo
    };
    if (itemtype === 'Advance') {
      payload.advanceAmount = +amount;
      expenseData.description = getDescription('Advance', selectedEmployee);
      expenseData.isAdvance = true;
    } else {
      payload.paidAmount = +amount;
      expenseData.description = getDescription('Paid', selectedEmployee);
      expenseData.isAdvance = false;
    }
    try {
      const paymentRes = await dispatch(createPaymentCash(expenseData, navigate, 'employee'));
      if (!paymentRes || paymentRes?.status === false) {
        console.error('Payment cash creation failed');
        return;
      }
      generateAutoPaymentcashNumber();
    } catch (e) {
      console.error('Failed to create self expense:', e);
      return;
    }
    try {
      const data = await dispatch(addAdvance(payload, navigate));
      console.log('response data: ', data);
      handleCloseAdvanveDialog();
    } catch (e) {
      console.error('Failed to add advance:', e);
    }
  };

  const getDescription = (type, employee) => {
    let fullName = `(${employee.id}) ${employee.firstName}`;

    let desc = type === 'Advance' ? `Advance to ${fullName}` : `Paid to ${fullName}`;

    if (desc.length > 30) {
      return desc.substring(0, 26) + '...';
    }

    return desc;
  };

  const generateAutoPaymentcashNumber = async () => {
    try {
      const PaymentcashResponse = await dispatch(getallPaymentCash());
      let nextPaymentcashNumber = 1;
      if (PaymentcashResponse.data.length === 0) {
        setPaymentNo(nextPaymentcashNumber);
        return;
      }
      const existingPaymentcashNumbers = PaymentcashResponse.data.map((Paymentcash) => {
        const PaymentcashNumber = Paymentcash.paymentNo;
        return parseInt(PaymentcashNumber);
      });
      const maxPaymentcashNumber = Math.max(...existingPaymentcashNumbers);
      if (!isNaN(maxPaymentcashNumber)) {
        nextPaymentcashNumber = maxPaymentcashNumber + 1;
      }
      setPaymentNo(nextPaymentcashNumber);
    } catch (error) {
      console.error('Error generating auto Payment cash number:', error);
    }
  };

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await dispatch(fetchAllEmployee());
        setEmployeeData(response ?? []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        setEmployeeData([]);
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployeeData();
    const getExpendeAccountId = async () => {
      try {
        const response = await dispatch(getExpenseAccount());
        const expenseId = response.find((res) => res.accountGroup.name === 'Salary')?.id;
        setAccountId(Number(expenseId));
      } catch (error) {
        console.error('Error fetching Account Id:', error);
      }
    };
    getExpendeAccountId();
    generateAutoPaymentcashNumber();
  }, [dispatch, navigate, id]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Employee
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleaddemployee} disabled={!canCreateEmployee()}>
        Add Employee
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
            {employeeData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'description' ? (
                      row.description || '-'
                    ) : column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        {/* TODO add view icon */}
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewEmployee() ? 'Blue' : 'gray',
                            color: canViewEmployee() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewEmployee() && { opacity: 1 }),
                            ...(!canViewEmployee() && { opacity: 0.5 }),
                            ...(!canViewEmployee() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleEmployeeview(row.id)}
                          disabled={!canViewEmployee()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateEmployee() ? 'green' : 'gray',
                            color: canUpdateEmployee() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateEmployee() && { opacity: 1 }),
                            ...(!canUpdateEmployee() && { opacity: 0.5 }),
                            ...(!canUpdateEmployee() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateEmployee(row.id)}
                          disabled={!canUpdateEmployee()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteEmployee() ? 'Red' : 'gray',
                            color: canDeleteEmployee() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteEmployee() && { opacity: 1 }),
                            ...(!canDeleteEmployee() && { opacity: 0.5 }),
                            ...(!canDeleteEmployee() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteEmployee()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewEmployee() ? 'Blue' : 'gray',
                            color: canViewEmployee() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewEmployee() && { opacity: 1 }),
                            ...(!canViewEmployee() && { opacity: 0.5 }),
                            ...(!canViewEmployee() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleAddAmount(row)}
                          disabled={!canViewEmployee()}
                        >
                          <CurrencyRupee style={{ fontSize: '16px' }} />
                        </IconButton>
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
        count={employeeData?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this employee?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteEmployee} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openDialog} onClose={handleCloseAdvanveDialog} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h5" align="center">
            Add Salary
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Select Payment Type
              </Typography>
              <RadioGroup row defaultValue="Advance" value={itemtype} onChange={handleItem}>
                <FormControlLabel value="Salary" control={<Radio />} label="Salary" />
                <FormControlLabel value="Advance" control={<Radio />} label="Advance" />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Amount
              </Typography>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
            </Grid>
            <Grid item xs={12}>
              {itemtype === 'Salary' ? (
                <>
                  <Typography>Net Salary: ₹{netSalary}</Typography>
                  <Typography>Paid Amount: ₹{paidAmount}</Typography>
                </>
              ) : (
                <Typography>Advance Paid This Month: ₹{advanceAmount}</Typography>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAdvanveDialog} color="secondary" id="savebtncs" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSaveAdvance} color="secondary" id="savebtncs" variant="outlined">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default EmployeeList;
