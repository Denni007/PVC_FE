import React, { useEffect, useState } from 'react';
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
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteSelfExpense, getallcompanyusers, getallSelfExpense, getAllSelfExpenseByUserId } from 'store/thunk';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

const columns = [
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 100 },
  { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
  { id: 'action', label: 'Action', align: 'center' }
];

const SelfExpenseList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canCreateSelfExpense, canUpdateSelfExpense, canDeleteSelfExpense } = useCan();
  const [selfExpense, setselfExpense] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedId, setSelectedId] = useState(null);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());

  useEffect(() => {
    getAllSelfExpense();
    if (sessionStorage.getItem('role') === 'Super Admin' || sessionStorage.getItem('role') === 'Admin') {
      const fetchData = async () => {
        const userResponse = await dispatch(getallcompanyusers());
        if (Array.isArray(userResponse[0]?.users)) {
          const options = userResponse[0]?.users?.map((user) => ({
            value: user.id,
            label: user.username
          }));
          setUsers([...options]);
          const username = sessionStorage.getItem('username');
          const currentUser = options.find((value) => value.label === username);
          if (currentUser) {
            setUserId(currentUser.value);
            setUsername(currentUser.label);
          }
        }
      };
      fetchData();
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    if (userId && formDate && toDate) {
      const from = formDate ? formDate.toISOString().split('T')[0] : null;
      const to = toDate ? toDate.toISOString().split('T')[0] : null;
      dispatch(getAllSelfExpenseByUserId(userId, from, to))
        .then((data) => {
          setselfExpense(data);
        })
        .catch((error) => {
          if (error.response.status === 401) {
            navigate('/');
          }
          console.error('Error fetching self expense data:', error);
        });
    }
  }, [userId, formDate, toDate]);

  const getAllSelfExpense = () => {
    dispatch(getallSelfExpense())
      .then((data) => {
        setselfExpense(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching self expense data:', error);
      });
  };

  const handleUserSelectChange = (selectedOption) => {
    if (selectedOption) {
      setUserId(selectedOption.value);
      setUsername(selectedOption.label);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handledelete = async () => {
    try {
      await deleteSelfExpense(selectedId, navigate);
      setOpenConfirmation(false);
      const data = await dispatch(getallSelfExpense());
      setselfExpense(data);
    } catch (error) {
      console.error('Error deleting cliam cash data:', error);
    }
  };

  const handleCreateSelfExpense = () => {
    navigate('/selfExpense');
  };

  const handleUpdateSelfExpense = (id) => {
    navigate(`/selfExpense/${id}`);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const createConfig1 = () => {
    const role = sessionStorage.getItem('role');
    return role;
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Self Expense List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '16px 0 16px 0' }}>
        <Button variant="contained" color="secondary" onClick={handleCreateSelfExpense} disabled={!canCreateSelfExpense()}>
          Create Self Expense
        </Button>
        {(createConfig1() === 'Super Admin' || createConfig1() === 'Admin') && (
          <>
            <div style={{ width: '25%' }}>
              <Typography variant="subtitle1">User:</Typography>
              <Select
                options={users}
                onChange={handleUserSelectChange}
                value={{ value: userId, label: username }}
                placeholder="Select User"
              />
            </div>
            <div>
              <Typography variant="subtitle1">From Date:</Typography>
              <DatePicker selected={formDate} onChange={setFormDate} dateFormat="dd/MM/yyyy" />
            </div>
            <div>
              <Typography variant="subtitle1">To Date:</Typography>
              <DatePicker selected={toDate} onChange={setToDate} dateFormat="dd/MM/yyyy" />
            </div>
          </>
        )}
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
            {selfExpense?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense, index) => (
              <TableRow key={expense.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateSelfExpense() ? 'green' : 'gray',
                            color: canUpdateSelfExpense() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateSelfExpense() && { opacity: 1 }),
                            ...(!canUpdateSelfExpense() && { opacity: 0.5 }),
                            ...(!canUpdateSelfExpense() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateSelfExpense(expense.id)}
                          disabled={!canUpdateSelfExpense()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteSelfExpense() ? 'Red' : 'gray',
                            color: canDeleteSelfExpense() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteSelfExpense() && { opacity: 1 }),
                            ...(!canDeleteSelfExpense() && { opacity: 0.5 }),
                            ...(!canDeleteSelfExpense() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(expense.id)}
                          disabled={!canDeleteSelfExpense()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(expense.date).toLocaleDateString('en-GB')
                    ) : (
                      expense[column.id]
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
        count={selfExpense?.length || 0}
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

export default SelfExpenseList;
