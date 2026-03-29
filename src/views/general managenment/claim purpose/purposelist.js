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

import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { DeletePurpose, fetchAllPurpose, Purposeview } from 'store/thunk';
import Purpose from 'component/purposecliam';

const columns = [
  { id: 'name', label: 'Item Group Name', align: 'center' },
  { id: 'createdby', label: 'Created By', align: 'center' },
  { id: 'updatedby', label: 'Updated By', align: 'center' },
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
const Purposelist = () => {
  const { canseeupdatepurpose, canseedeletepurpose, canseepurpose } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [purpose, setPurpose] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState(null);

  useEffect(() => {
    dispatch(fetchAllPurpose())
      .then((data) => {
        setPurpose(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching item group data:', error);
      });
  }, [dispatch, navigate]);

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleUpdatePurpose = (id) => {
    setIsDrawerOpen(true);
    setSelectedPurpose(id);
    dispatch(Purposeview(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddPurpose = () => {
    setSelectedPurpose(null);
    setIsDrawerOpen(true);
  };

  const handlePurposeUpdated = () => {
    dispatch(fetchAllPurpose())
      .then((data) => {
        setPurpose(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated item group data:', error);
      });
  };

  const handleNewPurposeAdded = () => {
    dispatch(fetchAllPurpose())
      .then((data) => {
        setPurpose(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated item group data:', error);
      });
  };

  const handleDelete = async () => {
    try {
      await dispatch(DeletePurpose(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(fetchAllPurpose());
      setPurpose(data);
    } catch (error) {
      console.error('Error deleting purpose:', error);
    }
  };

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      const response = await dispatch(fetchAllPurpose({ search: query }));
      setPurpose(response);
    } catch (error) {
      console.error('Error Searching item group:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purpose List
      </Typography>
      <SearchContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={handleAddPurpose} disabled={!canseepurpose()}>
          Create Purpose
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
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {purpose?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
              <TableRow key={product.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseeupdatepurpose() ? 'green' : 'gray',
                            color: canseeupdatepurpose() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseeupdatepurpose() && { opacity: 1 }),
                            ...(!canseeupdatepurpose() && { opacity: 0.5 }),
                            ...(!canseeupdatepurpose() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdatePurpose(product.id)}
                          disabled={!canseeupdatepurpose()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseedeletepurpose() ? 'Red' : 'gray',
                            color: canseedeletepurpose() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseedeletepurpose() && { opacity: 1 }),
                            ...(!canseedeletepurpose() && { opacity: 0.5 }),
                            ...(!canseedeletepurpose() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(product.id)}
                          disabled={!canseedeletepurpose()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'createdby' ? (
                      product.purposeCreateUser?.username
                    ) : column.id === 'updatedby' ? (
                      product.purposeUpdateUser?.username
                    ) : (
                      product[column.id]
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
        count={purpose?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Purpose
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedPurpose}
        onnewadded={handleNewPurposeAdded}
        onnewUpdated={handlePurposeUpdated}
      />
    </Card>
  );
};

export default Purposelist;
