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
import Wastage from 'component/wastage';
import { DeleteWastage, fetchAllWastage, Wastageview } from 'store/thunk';

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
const Wastagelist = () => {
  const { canseeupdatewastage, canseedeletewastage, canseewastage } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wastage, setWastage] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedWastage, setSelectedWastage] = useState(null);

  useEffect(() => {
    dispatch(fetchAllWastage())
      .then((data) => {
        setWastage(data);
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

  const handleUpdateWastage = (id) => {
    setIsDrawerOpen(true);
    setSelectedWastage(id);
    dispatch(Wastageview(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddWastage = () => {
    setSelectedWastage(null);
    setIsDrawerOpen(true);
  };

  const handleWastageUpdated = () => {
    dispatch(fetchAllWastage())
      .then((data) => {
        setWastage(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated item group data:', error);
      });
  };

  const handleNewWastageAdded = () => {
    dispatch(fetchAllWastage())
      .then((data) => {
        setWastage(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated item group data:', error);
      });
  };

  const handleDelete = async () => {
    try {
      await dispatch(DeleteWastage(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(fetchAllWastage());
      setWastage(data);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      const response = await dispatch(fetchAllWastage({ search: query }));
      setWastage(response);
    } catch (error) {
      console.error('Error Searching item group:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Wastage List
      </Typography>
      <SearchContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={handleAddWastage} disabled={!canseewastage()}>
          Create Wastage
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
            {wastage?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
              <TableRow key={product.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseeupdatewastage() ? 'green' : 'gray',
                            color: canseeupdatewastage() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseeupdatewastage() && { opacity: 1 }),
                            ...(!canseeupdatewastage() && { opacity: 0.5 }),
                            ...(!canseeupdatewastage() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateWastage(product.id)}
                          disabled={!canseeupdatewastage()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseedeletewastage() ? 'Red' : 'gray',
                            color: canseedeletewastage() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseedeletewastage() && { opacity: 1 }),
                            ...(!canseedeletewastage() && { opacity: 0.5 }),
                            ...(!canseedeletewastage() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(product.id)}
                          disabled={!canseedeletewastage()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'createdby' ? (
                      product.wastageCreateUser?.username
                    ) : column.id === 'updatedby' ? (
                      product.wastageUpdateUser?.username
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
        count={wastage?.length || 0}
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
      <Wastage
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedWastage}
        onnewadded={handleNewWastageAdded}
        onnewUpdated={handleWastageUpdated}
      />
    </Card>
  );
};

export default Wastagelist;
