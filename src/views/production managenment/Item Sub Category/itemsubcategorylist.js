import React, { useEffect, useState, useCallback } from 'react';
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
import { viewAllItemSubCategory, deleteItemSubCategory } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import ItemSubCategory from 'component/ItemSubCategory';

const columns = [
  { id: 'name', label: 'Sub Category Name', align: 'center' },
  { id: 'category', label: 'Item Category', align: 'center' },
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

const ItemSubCategoryList = () => {
  const { canseeitemsubcategory, canseeUpdateitemsubcategory, canseeDeleteitemsubcategory } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [subCategories, setSubCategories] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const fetchSubCategories = useCallback(
    async (query = '') => {
      try {
        const response = await dispatch(viewAllItemSubCategory({ search: query }, navigate));
        const data = response?.data || response;
        setSubCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/');
        }
        console.error('Error fetching item sub-categories:', error);
        setSubCategories([]);
      }
    },
    [dispatch, navigate]
  );

  useEffect(() => {
    fetchSubCategories();
  }, [fetchSubCategories]);

  const handleAdd = () => {
    setSelectedSubCategory(null);
    setIsDrawerOpen(true);
  };

  const handleUpdate = (id) => {
    setSelectedSubCategory(id);
    setIsDrawerOpen(true);
  };

  const handleAdded = () => {
    fetchSubCategories();
    setIsDrawerOpen(false);
  };

  const handleUpdated = () => {
    fetchSubCategories();
    setIsDrawerOpen(false);
  };

  const handleDeleteConfirmation = (id) => {
    setSelectedId(id);
    setOpenConfirmation(true);
  };

  const handleDelete = async () => {
    await dispatch(deleteItemSubCategory(selectedId, navigate));
    setOpenConfirmation(false);
    fetchSubCategories();
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    fetchSubCategories(query);
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Item Sub Category List
      </Typography>
      <SearchContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAdd}
          disabled={!canseeitemsubcategory()}
        >
          Create Item Sub Category
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
              {columns.map((col) => (
                <TableCell key={col.id} align={col.align} style={{ minWidth: col.minWidth }}>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(subCategories || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.ItemCategory?.name}</TableCell>
                <TableCell align="center">{row.subCategoryCreateUser?.username}</TableCell>
                <TableCell align="center">{row.subCategoryUpdateUser?.username}</TableCell>
                <TableCell align="center">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <IconButton
                      sizeSmall
                      style={{
                        backgroundColor: canseeUpdateitemsubcategory() ? 'green' : 'gray',
                        color: canseeUpdateitemsubcategory() ? 'white' : 'white',
                        borderRadius: 0.8,
                        ...(canseeUpdateitemsubcategory() && { opacity: 1 }),
                        ...(!canseeUpdateitemsubcategory() && { opacity: 0.5 }),
                        ...(!canseeUpdateitemsubcategory() && { backgroundColor: 'gray' })
                      }}
                      onClick={() => handleUpdate(row.id)}
                      disabled={!canseeUpdateitemsubcategory()}
                    >
                      <Edit style={{ fontSize: '16px' }} />
                    </IconButton>
                    <IconButton
                      sizeSmall
                      style={{
                        backgroundColor: canseeDeleteitemsubcategory() ? 'Red' : 'gray',
                        color: canseeDeleteitemsubcategory() ? 'white' : 'white',
                        borderRadius: 0.8,
                        ...(canseeDeleteitemsubcategory() && { opacity: 1 }),
                        ...(!canseeDeleteitemsubcategory() && { opacity: 0.5 }),
                        ...(!canseeDeleteitemsubcategory() && { backgroundColor: 'gray' })
                      }}
                      onClick={() => handleDeleteConfirmation(row.id)}
                      disabled={!canseeDeleteitemsubcategory()}
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
        count={(subCategories || []).length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(e, n) => setPage(n)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
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
      <ItemSubCategory
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedSubCategory}
        onnewSubCategoryadded={handleAdded}
        onnewSubCategoryupdated={handleUpdated}
      />
    </Card>
  );
};

export default ItemSubCategoryList;
