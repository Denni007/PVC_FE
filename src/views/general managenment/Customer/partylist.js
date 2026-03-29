import React, { useEffect, useState } from 'react';
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

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { useDispatch } from 'react-redux';
import { deleteAccount, fetchAllAccounts, viewAccount } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import AnchorTemporaryDrawer from 'component/addparty';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

const columns = [
  { id: 'accountName', label: 'Name', align: 'center' },
  { id: 'contactPersonName', label: 'Contect Person Name', align: 'center' },
  { id: 'accountGroup', label: 'Group Name', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];
const SearchContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
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
const AccountList = () => {
  const { canseecreateAccount, canseedeleteAccount, canseeviewAccount, canseeupdateAccount } = useCan();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [accounts, setAccount] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState();

  useEffect(() => {
    dispatch(fetchAllAccounts())
      .then((data) => {
        setAccount(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching account data:', error);
      });
  }, [dispatch, navigate]);

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleAccountview = (id) => {
    dispatch(viewAccount(id));
    navigate(`/accountview/${id}`);
  };

  const handleUpdateAccount = (id) => {
    setIsDrawerOpen(true);
    setSelectedAccount(id);
    dispatch(viewAccount(id));
  };

  const handleCreateAccount = () => {
    setSelectedAccount(null);
    setIsDrawerOpen(true);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteAccount(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(fetchAllAccounts());
      setAccount(data);
    } catch (error) {
      console.error('Error deleting account:', error);
    }
  };

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      const response = await dispatch(fetchAllAccounts({ search: query }));
      setAccount(response);
    } catch (error) {
      console.error('Error Searching Account:', error);
    }
  };

  const handleNewAccountAdded = () => {
    dispatch(fetchAllAccounts())
      .then((data) => {
        setAccount(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated Account data:', error);
        if (error.response.status === 401) {
          navigate('/');
        }
      });
  };

  const handleAccountUpdated = () => {
    dispatch(fetchAllAccounts())
      .then((data) => {
        setAccount(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated Account data:', error);
      });
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Account List
      </Typography>
      <SearchContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleCreateAccount}
          disabled={!canseecreateAccount()}
        >
          Create Account
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
            {accounts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((account, index) => (
              <TableRow key={account.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseeviewAccount() ? 'Blue' : 'gray',
                            color: canseeviewAccount() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseeviewAccount() && { opacity: 1 }),
                            ...(!canseeviewAccount() && { opacity: 0.5 }),
                            ...(!canseeviewAccount() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleAccountview(account.id)}
                          disabled={!canseeviewAccount()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseeupdateAccount() ? 'green' : 'gray',
                            color: canseeupdateAccount() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseeupdateAccount() && { opacity: 1 }),
                            ...(!canseeupdateAccount() && { opacity: 0.5 }),
                            ...(!canseeupdateAccount() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateAccount(account.id)}
                          disabled={!canseeupdateAccount()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseedeleteAccount() ? 'Red' : 'gray',
                            color: canseedeleteAccount() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseedeleteAccount() && { opacity: 1 }),
                            ...(!canseedeleteAccount() && { opacity: 0.5 }),
                            ...(!canseedeleteAccount() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(account.id)}
                          disabled={!canseedeleteAccount()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'accountGroup' ? (
                      account.accountGroup?.name
                    ) : (
                      account[column.id]
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
        count={accounts?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Account?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <AnchorTemporaryDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedAccount}
        onAccountUpdated={handleAccountUpdated}
        onAccountCreate={handleNewAccountAdded}
      />
    </Card>
  );
};

export default AccountList;
