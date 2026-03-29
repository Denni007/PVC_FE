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
import { deleteMachineSchedule, fetchAllMachineSchedule, MachineScheduleview } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Edit, Delete } from '@mui/icons-material';

const columns = [
  { id: 'name', label: 'Machine Name', align: 'center' },
  { id: 'frequency', label: 'Frequency', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'type', label: 'Type', align: 'center' },
  { id: 'interval', label: 'Interval', align: 'center' },
  { id: 'maintenanceType', label: 'Maintenance Type', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Machineschedulelist = () => {
  const navigate = useNavigate();
  const [machineData, setMachineData] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedMachineId, setSelectedMachineId] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { canCreateMachineSchedule, canDeleteMachineSchedule, canUpdateMachineSchedule } = useCan();

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await dispatch(fetchAllMachineSchedule());
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
    navigate('/machinescheduleadd');
  };
  const handleUpdateMachine = (id) => {
    dispatch(MachineScheduleview(id));
    navigate(`/updatemachineschedule/${id}`);
  };
  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedMachineId(id);
  };
  const handleDeleteMachine = async () => {
    try {
      await dispatch(deleteMachineSchedule(selectedMachineId, navigate));
      setOpenConfirmation(false);
      const response = await dispatch(fetchAllMachineSchedule());
      setMachineData(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };
  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Machine Schedule
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ margin: '16px' }}
        onClick={handleaddmachine}
        disabled={!canCreateMachineSchedule()}
      >
        Add Machine Schedule
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
                    {column.id === 'date' ? (
                      new Date(row.date).toLocaleDateString('en-GB')
                    ) : column.id === 'name' ? (
                      row.scheduleMachine.name
                    ) : column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateMachineSchedule() ? 'green' : 'gray',
                            color: canUpdateMachineSchedule() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateMachineSchedule() && { opacity: 1 }),
                            ...(!canUpdateMachineSchedule() && { opacity: 0.5 }),
                            ...(!canUpdateMachineSchedule() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateMachine(row.id)}
                          disabled={!canUpdateMachineSchedule()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteMachineSchedule() ? 'Red' : 'gray',
                            color: canDeleteMachineSchedule() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteMachineSchedule() && { opacity: 1 }),
                            ...(!canDeleteMachineSchedule() && { opacity: 0.5 }),
                            ...(!canDeleteMachineSchedule() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteMachineSchedule()}
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
        count={machineData?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this machine schedule?</DialogContent>
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

export default Machineschedulelist;
