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
import { deleteMaintenanceType, fetchAllMaintenanceType, MaintenanceTypeview } from 'store/thunk';
import Maintenancetype from 'component/maintenancetype';

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
const Maintenancelist = () => {
  const { canUpdateMaintenanceType, canDeleteMaintenanceType, canCreateMaintenanceType } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Maintenance, setMaintenance] = useState([]);
  const [page, setPage] = useState(0);
  const [selectedId, setSelectedId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState(null);

  useEffect(() => {
    dispatch(fetchAllMaintenanceType())
      .then((data) => {
        setMaintenance(data);
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

  const handleUpdateMaintenance = (id) => {
    setIsDrawerOpen(true);
    setSelectedMaintenance(id);
    dispatch(MaintenanceTypeview(id));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddMaintenance = () => {
    setSelectedMaintenance(null);
    setIsDrawerOpen(true);
  };

  const handleMaintenanceUpdated = () => {
    dispatch(fetchAllMaintenanceType())
      .then((data) => {
        setMaintenance(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated item group data:', error);
      });
  };

  const handleNewMaintenanceAdded = () => {
    dispatch(fetchAllMaintenanceType())
      .then((data) => {
        setMaintenance(data);
        setIsDrawerOpen(false);
      })
      .catch((error) => {
        console.error('Error fetching updated item group data:', error);
      });
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteMaintenanceType(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(fetchAllMaintenanceType());
      setMaintenance(data);
    } catch (error) {
      console.error('Error deleting group:', error);
    }
  };

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      const response = await dispatch(fetchAllMaintenanceType({ search: query }));
      setMaintenance(response);
    } catch (error) {
      console.error('Error Searching item group:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Maintenance List
      </Typography>
      <SearchContainer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddMaintenance}
          disabled={!canCreateMaintenanceType()}
        >
          Create Maintenance
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
            {Maintenance?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((product, index) => (
              <TableRow key={product.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateMaintenanceType() ? 'green' : 'gray',
                            color: canUpdateMaintenanceType() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateMaintenanceType() && { opacity: 1 }),
                            ...(!canUpdateMaintenanceType() && { opacity: 0.5 }),
                            ...(!canUpdateMaintenanceType() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateMaintenance(product.id)}
                          disabled={!canUpdateMaintenanceType()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteMaintenanceType() ? 'Red' : 'gray',
                            color: canDeleteMaintenanceType() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteMaintenanceType() && { opacity: 1 }),
                            ...(!canDeleteMaintenanceType() && { opacity: 0.5 }),
                            ...(!canDeleteMaintenanceType() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(product.id)}
                          disabled={!canDeleteMaintenanceType()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'createdby' ? (
                      product.maintenanceTypeCreateUser?.username
                    ) : column.id === 'updatedby' ? (
                      product.maintenanceTypeUpdateUser?.username
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
        count={Maintenance?.length || 0}
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
      <Maintenancetype
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        id={selectedMaintenance}
        onnewadded={handleNewMaintenanceAdded}
        onnewUpdated={handleMaintenanceUpdated}
      />
    </Card>
  );
};

export default Maintenancelist;
