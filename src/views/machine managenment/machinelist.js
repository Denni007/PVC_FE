import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableContainer,
  TableHead,
  TablePagination,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteMachine, fetchAllMachine, Machineview } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Edit, Delete } from '@mui/icons-material';

const columns = [
  { id: 'name', label: 'Machine Type', align: 'center' },
  { id: 'machineNo', label: 'Machine Number', align: 'center' },
  { id: 'description', label: 'Description', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const MachineList = () => {
  const navigate = useNavigate();
  const [machineData, setMachineData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canCreateMachine, canDeleteMachine, canUpdateMachine } = useCan();

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await dispatch(fetchAllMachine());
        setMachineData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching machine data:', error);
      }
    };

    fetchSalaryData();
  }, [dispatch, navigate, id]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleaddmachine = () => {
    navigate('/machineadd');
  };
  const handleUpdateMachine = (id) => {
    dispatch(Machineview(id));
    navigate(`/updatemachine/${id}`);
  };
  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedMachineId(id);
  };
  const handleDeleteMachine = async () => {
    try {
      await dispatch(deleteMachine(selectedMachineId, navigate));
      setOpenConfirmation(false);
      const response = await dispatch(fetchAllMachine());
      setMachineData(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Machine
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleaddmachine} disabled={!canCreateMachine()}>
        Add Machine
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
            {machineData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'description' ? (
                      row.description || '-'
                    ) : column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateMachine() ? 'green' : 'gray',
                            color: canUpdateMachine() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateMachine() && { opacity: 1 }),
                            ...(!canUpdateMachine() && { opacity: 0.5 }),
                            ...(!canUpdateMachine() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateMachine(row.id)}
                          disabled={!canUpdateMachine()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteMachine() ? 'Red' : 'gray',
                            color: canDeleteMachine() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteMachine() && { opacity: 1 }),
                            ...(!canDeleteMachine() && { opacity: 0.5 }),
                            ...(!canDeleteMachine() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteMachine()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
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
        count={machineData.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this machine?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteMachine} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default MachineList;
