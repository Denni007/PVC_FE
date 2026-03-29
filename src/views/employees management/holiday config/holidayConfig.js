import { Delete, Edit } from '@mui/icons-material';
import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  Select,
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
import { deleteholiday, fetchAllholiday } from 'store/thunk';

const HolidayConfigPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [holidayList, setHolidayList] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedHolidayId, setSelectedHolidayId] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handelYearChange = (value) => {
    setSelectedYear(value);
    fetchHoliday(value);
  };

  const fetchHoliday = async (value) => {
    try {
      const response = await dispatch(fetchAllholiday(value));
      setHolidayList(response || []);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
      setHolidayList([]);
      console.error('Error fetching employee data:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedHolidayId(id);
  };

  const handleDeleteHoliday = async () => {
    try {
      await dispatch(deleteholiday(selectedHolidayId, navigate));
      setOpenConfirmation(false);
      const response = await dispatch(fetchHoliday());
      setEmployeeData(response);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddHoliday = () => {
    navigate(`/addholiday`);
  };

  const handleUpdateHoliday = (id) => {
    navigate(`/updateholiday/${id}`);
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = currentYear - 1; i <= currentYear + 2; i++) {
      yearsArray.push(i);
    }
    setYearOptions(yearsArray);
    setSelectedYear(currentYear);
    fetchHoliday(currentYear);
  }, [navigate]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Holiday List
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Typography variant="subtitle1">Year :</Typography>
        <Select value={selectedYear} onChange={(e) => handelYearChange(e.target.value)} style={{ color: 'white' }}>
          {yearOptions?.map((year, index) => (
            <MenuItem value={year} key={index}>
              {year}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" color="secondary" style={{ margin: '16px' }} onClick={handleAddHoliday}>
          Add Holiday
        </Button>
      </div>
      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidayList?.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">
                  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                    <IconButton
                      sizeSmall
                      style={{
                        backgroundColor: 'green',
                        color: 'white',
                        borderRadius: 0.8
                      }}
                      onClick={() => handleUpdateHoliday(row.id)}
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
                      // disabled={!canDeleteEmployee()}
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
        count={holidayList?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this holiday?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleDeleteHoliday} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default HolidayConfigPage;
