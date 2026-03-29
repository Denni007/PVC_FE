import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { deleteAttendeesType, fetchAllAttendeesType } from 'store/thunk';

const AttendeesTypeConfigPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [attendeesTypeList, setAttendeesTypeList] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedAttendeesTypeId, setSelectedAttendeesTypeId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchAttendeesType = async () => {
    try {
      const response = await dispatch(fetchAllAttendeesType());
      setAttendeesTypeList(response || []);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
      setAttendeesTypeList([]);
      console.error('Error fetching attendees type data:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedAttendeesTypeId(id);
  };

  const handleDeleteAttendeesType = async () => {
    try {
      await dispatch(deleteAttendeesType(selectedAttendeesTypeId, navigate));
      setOpenConfirmation(false);
      fetchAttendeesType();
    } catch (error) {
      console.error('Error deleting attendees type:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddAttendeesType = () => {
    navigate(`/addattendeestype`);
  };

  const handleUpdateAttendeesType = (id) => {
    navigate(`/updateattendeestype/${id}`);
  };

  useEffect(() => {
    fetchAttendeesType();
  }, [navigate]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Attendees Type List
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddAttendeesType}>
          Add Attendees Type
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              <TableCell align="center">Code</TableCell>
              <TableCell align="center">Description</TableCell>
              <TableCell align="center">Salary Per Day</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendeesTypeList?.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                <TableCell align="center">{row.code}</TableCell>
                <TableCell align="center">{row.description}</TableCell>
                <TableCell align="center">{row.salaryPerDay}</TableCell>
                <TableCell align="center">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <IconButton
                      sizeSmall
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        borderRadius: 0.8
                      }}
                      onClick={() => handleUpdateAttendeesType(row.id)}
                    >
                      <Edit style={{ fontSize: '16px' }} />
                    </IconButton>
                    <IconButton
                      sizeSmall
                      style={{
                        backgroundColor: 'Red',
                        color: 'white',
                        borderRadius: 0.8
                      }}
                      onClick={() => handleDeleteConfirmation(row.id)}
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
        count={attendeesTypeList?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this attendees type?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteAttendeesType} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default AttendeesTypeConfigPage;
