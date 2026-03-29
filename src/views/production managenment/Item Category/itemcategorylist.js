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
import { DeleteItemcategory, getAllcategory, ItemCategoryview } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Itemcategory from 'component/itemcategory';

const columns = [
  { id: 'name', label: 'Item Category Name', align: 'center' },
  { id: 'group', label: 'Item Group Name', align: 'center' },
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
const ItemcategoryList = () => {
  const { canseeUpdateitemcategory, canseeDeleteitemcategory, canseeitemcategory } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Itemcategoty, setItemcategoty] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedItemcategoty, setselectedItemcategoty] = useState(null);

  useEffect(() => {
    dispatch(getAllcategory())
      .then((data) => {
        setItemcategoty(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching product data:', error);
      });
  }, [dispatch, navigate]);

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleUpdateProduct = (id) => {
    setIsDrawerOpen(true);
    setselectedItemcategoty(id);
    dispatch(ItemCategoryview(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddItemCategory = () => {
    setselectedItemcategoty(null);
    setIsDrawerOpen(true);
  };

  const handleItemCategoryUpdated = () => {
    dispatch(getAllcategory())
      .then((data) => {
        setItemcategoty(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated product data:', error);
        if (error.response.status === 401) {
          navigate('/');
        }
      });
  };
  ``;
  const handleItemCategoryAdded = () => {
    dispatch(getAllcategory())
      .then((data) => {
        setItemcategoty(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated product data:', error);
        if (error.response.status === 401) {
          navigate('/');
        }
      });
  };

  const handleDelete = async () => {
    try {
      await dispatch(DeleteItemcategory(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getAllcategory());
      setItemcategoty(data);
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      const response = await dispatch(getAllcategory({ search: query }));
      setItemcategoty(response);
    } catch (error) {
      console.error('Error Searching category:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Item Category List
      </Typography>
      <SearchContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddItemCategory}
          disabled={!canseeitemcategory()}
        >
          Create Item Category
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
            {Itemcategoty?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
              <TableRow key={product.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseeUpdateitemcategory() ? 'green' : 'gray',
                            color: canseeUpdateitemcategory() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseeUpdateitemcategory() && { opacity: 1 }),
                            ...(!canseeUpdateitemcategory() && { opacity: 0.5 }),
                            ...(!canseeUpdateitemcategory() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateProduct(product.id)}
                          disabled={!canseeUpdateitemcategory()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseeDeleteitemcategory() ? 'Red' : 'gray',
                            color: canseeDeleteitemcategory() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseeDeleteitemcategory() && { opacity: 1 }),
                            ...(!canseeDeleteitemcategory() && { opacity: 0.5 }),
                            ...(!canseeDeleteitemcategory() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(product.id)}
                          disabled={!canseeDeleteitemcategory()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'group' ? (
                      product.ItemGroup?.name
                    ) : column.id === 'createdby' ? (
                      product.categoryCreateUser?.username
                    ) : column.id === 'updatedby' ? (
                      product.categoryUpdateUser?.username
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
        count={Itemcategoty?.length || 0}
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
      <Itemcategory
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedItemcategoty}
        onnewCategoryadded={handleItemCategoryAdded}
        onnewCategoryupdated={handleItemCategoryUpdated}
      />
    </Card>
  );
};

export default ItemcategoryList;
