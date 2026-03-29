import { Delete, Edit } from '@mui/icons-material';
import {
  Card,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteShift, fetchAllShift } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import AnchorShiftDrawer from '../anchoreShiftDrawer';

const columns = [
  { id: 'shiftName', label: 'Name', align: 'center' },
  { id: 'time', label: 'Time', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const ShiftList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [shifts, setshifts] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedShift, setSelectedShift] = useState(null);
  const [isShiftDrawerOpen, setIsShiftDrawerOpen] = useState(false);
  const { canCreateShift, canUpdateShift, canDeleteShift } = useCan();

  useEffect(() => {
    getData();
  }, [dispatch, navigate]);

  const getData = async () => {
    const response = await dispatch(fetchAllShift());
    setshifts(response ?? []);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleDeleteConfirmation = (shift) => {
    setOpenConfirmation(true);
    setSelectedShift(shift);
  };

  const handleUpdateShift = (shift) => {
    setSelectedShift(shift);
    setIsShiftDrawerOpen(true);
  };

  const handleAddShift = () => {
    setIsShiftDrawerOpen(true);
  };

  const handelNewShiftAdd = () => {
    setSelectedShift(null);
    setIsShiftDrawerOpen(false);
    getData();
  };

  const handledelete = async () => {
    try {
      await dispatch(deleteShift(selectedShift.id, navigate));
      setOpenConfirmation(false);
      setSelectedShift(null);
      const response = await dispatch(fetchAllShift());
      setshifts(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Employee Shift
      </Typography>
      <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddShift} disabled={!canCreateShift()}>
        Add Shift
      </Button>
      <TableContainer>
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
            {shifts?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((shift, index) => (
              <TableRow key={shift.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateShift() ? 'green' : 'gray',
                            color: canUpdateShift() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateShift() && { opacity: 1 }),
                            ...(!canUpdateShift() && { opacity: 0.5 }),
                            ...(!canUpdateShift() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateShift(shift)}
                          disabled={!canUpdateShift()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteShift() ? 'Red' : 'gray',
                            color: canDeleteShift() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteShift() && { opacity: 1 }),
                            ...(!canDeleteShift() && { opacity: 0.5 }),
                            ...(!canDeleteShift() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(shift)}
                          disabled={!canDeleteShift()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'time' ? (
                      `${shift.shiftStartTime} - ${shift.shiftEndTime}`
                    ) : (
                      shift[column.id]
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
        count={shifts?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <AnchorShiftDrawer
        open={isShiftDrawerOpen}
        onClose={() => setIsShiftDrawerOpen(false)}
        id={selectedShift?.id}
        onNewShiftAdded={handelNewShiftAdd}
        onShiftUpdated={handelNewShiftAdd}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this ?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handledelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ShiftList;
