import React, { useCallback, useEffect, useState } from 'react';
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
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ItemType from 'component/itemtype';
import { deleteItemType, viewAllItemType } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';

const columns = [
  { id: 'name', label: 'Item Type Name', align: 'center' },
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

const ItemTypeList = () => {
  const { canCreateItemType, canUpdateItemType, canDeleteItemType } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [itemTypes, setItemTypes] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItemType, setSelectedItemType] = useState(null);

  const fetchItemTypes = useCallback(
    async (query = '') => {
      try {
        const response = await dispatch(viewAllItemType({ search: query }));
        setItemTypes(Array.isArray(response) ? response : []);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/');
        }
        console.error('Error fetching item types:', error);
        setItemTypes([]);
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    fetchItemTypes();
  }, [fetchItemTypes]);

  const handleAdd = () => {
    setSelectedItemType(null);
    setIsDrawerOpen(true);
  };

  const handleUpdate = (id) => {
    setSelectedItemType(id);
    setIsDrawerOpen(true);
  };

  const handleRefresh = () => {
    fetchItemTypes();
    setIsDrawerOpen(false);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteItemType(selectedId, navigate));
      setOpenConfirmation(false);
      fetchItemTypes();
    } catch (error) {
      console.error('Error deleting item type:', error);
    }
  };

  const handleSearch = (event) => {
    fetchItemTypes(event.target.value);
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Item Type List
      </Typography>
      <SearchContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button variant="contained" color="secondary" style={{ margin: '10px' }} onClick={handleAdd} disabled={!canCreateItemType()}>
          Create Item Type
        </Button>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search..." inputProps={{ 'aria-label': 'search' }} onChange={handleSearch} />
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
            {itemTypes.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((itemType, index) => (
              <TableRow key={itemType.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                <TableCell align="center">{itemType.name}</TableCell>
                <TableCell align="center">{itemType.typeCreateUser?.username || itemType.itemTypeCreateUser?.username}</TableCell>
                <TableCell align="center">{itemType.typeUpdateUser?.username || itemType.itemTypeUpdateUser?.username}</TableCell>
                <TableCell align="center">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <IconButton
                      sizeSmall
                      style={{
                        backgroundColor: canUpdateItemType() ? 'green' : 'gray',
                        color: 'white',
                        borderRadius: 0.8,
                        ...(canUpdateItemType() && { opacity: 1 }),
                        ...(!canUpdateItemType() && { opacity: 0.5 })
                      }}
                      onClick={() => handleUpdate(itemType.id)}
                      disabled={!canUpdateItemType()}
                    >
                      <Edit style={{ fontSize: '16px' }} />
                    </IconButton>
                    <IconButton
                      sizeSmall
                      style={{
                        backgroundColor: canDeleteItemType() ? 'Red' : 'gray',
                        color: 'white',
                        borderRadius: 0.8,
                        ...(canDeleteItemType() && { opacity: 1 }),
                        ...(!canDeleteItemType() && { opacity: 0.5 })
                      }}
                      onClick={() => handleDeleteConfirmation(itemType.id)}
                      disabled={!canDeleteItemType()}
                    >
                      <Delete style={{ fontSize: '16px' }} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={itemTypes.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0);
        }}
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
      <ItemType
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedItemType}
        onnewTypeadded={handleRefresh}
        onnewTypeUpdated={handleRefresh}
      />
    </Card>
  );
};

export default ItemTypeList;
