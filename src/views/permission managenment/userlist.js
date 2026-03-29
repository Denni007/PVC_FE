import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, TextField, InputAdornment } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Checkuser, deleteUser, getallusers, Userview, Adduser } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const columns = [
  { id: 'username', label: 'User Name', align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', align: 'center' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: 'role', label: 'Role', align: 'center' },
  { id: 'salary', label: 'Basic Salary', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];
const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2)
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0)
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto'
  }
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    border: '1px solid #918989',
    [theme.breakpoints.up('md')]: {
      width: '20ch'
    }
  }
}));
export default function UserList() {
  const { canUserView, canUserUpdate, canUserCreate, canUserDelete } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newUser, setNewUser] = useState({ mobileno: '', email: '' });
  const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
  const [userid, setUserid] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getallusers());
        setData(response[0].users);
      } catch (error) {
        if (error?.response?.status === 401) {
          navigate('/');
        }
        console.error('Error fetching User:', error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleAddUser = () => {
    setOpenCreateDialog(true);
  };

  const handleViewUser = (id) => {
    dispatch(Userview(id));
    navigate(`/userview/${id}`);
  };

  const handleUpdateUser = (id) => {
    dispatch(Userview(id));
    navigate(`/updateuser/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedUserId(id);
  };

  const handleDeleteUser = async () => {
    try {
      await dispatch(deleteUser(selectedUserId, navigate));
      setOpenConfirmation(false);
      const response = await dispatch(getallusers());
      setData(response[0].users);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCheckUserSubmit = async () => {
    try {
      const response = await dispatch(Checkuser(newUser));
      setUserid(response.data.data.id);
      if (response.status === 200) {
        setOpenAddConfirmation(true);
        setOpenCreateDialog(false);
        setNewUser({ mobileno: '', email: '' });
      }
    } catch (error) {
      if (error) {
        navigate('/adduser');
        setOpenCreateDialog(false);
        setNewUser({ mobileno: '', email: '' });
      } else {
        setOpenCreateDialog(true);
      }
    }
  };
  const handlecancle = () => {
    setOpenCreateDialog(false);
    setNewUser({ mobileno: '', email: '' });
  };
  const handleConfirmAddUser = async () => {
    try {
      await dispatch(Adduser(userid));
      setOpenAddConfirmation(false);
      const response = await dispatch(getallusers());
      // const filteredData = response[0].users?.filter((user) => user.role !== 'Super Admin');
      setData(response[0].users);
    } catch (error) {
      console.error('Error adding user:', error);
      setOpenAddConfirmation(false);
    }
  };

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      const response = await dispatch(getallusers({ search: query }));
      // const filteredData = response[0].users?.filter((user) => user.role !== 'Super Admin');
      setData(response[0].users);
    } catch (error) {
      console.error('Error fetching User:', error);
    }
  };
  return (
    <Card sx={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        User List
      </Typography>
      <SearchContainer>
        <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddUser} disabled={!canUserCreate()}>
          Add User
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} onChange={handleSearch} />
        </Search>
      </SearchContainer>
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
            {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUserView() ? 'Blue' : 'gray',
                            color: canUserView() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUserView() && { opacity: 1 }),
                            ...(!canUserView() && { opacity: 0.5 }),
                            ...(!canUserView() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewUser(row.id)}
                          disabled={!canUserView()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUserUpdate() ? 'green' : 'gray',
                            color: canUserUpdate() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUserUpdate() && { opacity: 1 }),
                            ...(!canUserUpdate() && { opacity: 0.5 }),
                            ...(!canUserUpdate() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateUser(row.id)}
                          disabled={!canUserUpdate()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUserDelete() ? 'Red' : 'gray',
                            color: canUserDelete() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUserDelete() && { opacity: 1 }),
                            ...(!canUserDelete() && { opacity: 0.5 }),
                            ...(!canUserDelete() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canUserDelete()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString()
                    ) : column.id === 'validtill' ? (
                      new Date(row[column.id]).toLocaleDateString()
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
        count={data?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        PaperProps={{
          style: {
            width: '400px'
          }
        }}
      >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ marginBottom: '8px' }}>
            Mobile no.:<span style={{ color: 'red', fontWeight: 'bold' }}>&#42;</span>
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            color="secondary"
            value={newUser.mobileno}
            onChange={(e) => setNewUser({ ...newUser, mobileno: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle phone number visibility" edge="end" size="small">
                    <PhoneIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
          <Typography variant="body1" sx={{ marginTop: '16px', marginBottom: '8px' }}>
            Email:<span style={{ color: 'red', fontWeight: 'bold' }}>&#42;</span>
          </Typography>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            value={newUser.email}
            color="secondary"
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle email visibility" edge="end" size="large">
                    <EmailIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handlecancle} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleCheckUserSubmit} color="secondary" variant="contained">
            Next
          </Button>
        </DialogActions>
      </Dialog>
      {/* <Dialog
        open={openCreateDialog}
        onClose={() => setOpenCreateDialog(false)}
        PaperProps={{
          style: {
            width: '400px'
          }
        }}
      >
        <DialogTitle>Create User</DialogTitle>
        <DialogContent>
          <Typography>
            Mobile no.:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <input width={'350px'} type="text" onChange={(e) => setNewUser({ ...newUser, mobileno: e.target.value })} />
          <Typography>
            Email:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <input type="email" onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCreateDialog(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleCheckUserSubmit} color="secondary" variant="contained">
            Next
          </Button>
        </DialogActions>
      </Dialog> */}
      <Dialog open={openAddConfirmation} onClose={() => setOpenAddConfirmation(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to add this user to the company?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenAddConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirmAddUser} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this user?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteUser} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
