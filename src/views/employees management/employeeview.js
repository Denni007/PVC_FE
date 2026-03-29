import { Check, Close } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { Employeeview, getAttendances, getLeave, updateLeaveStatus } from 'store/thunk';
import { format } from 'date-fns';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'inTime', label: 'Punch In', align: 'center' },
  { id: 'outTime', label: 'Punch Out', align: 'center' },
  { id: 'breakStart', label: 'Break In', align: 'center' },
  { id: 'breakEnd', label: 'Break Out', align: 'center' },
  { id: 'overtime', label: 'OT / UT', align: 'center' }
];

const leaveColumns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'leaveType', label: 'Leave Type', align: 'center' },
  { id: 'reason', label: 'Reason', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const EmployeeviewPage = () => {
  const [data, setData] = useState({});
  const [months] = useState([
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ]);
  const [filterDate, setFilterDate] = useState(null);
  const [leaveFilterDate, setLeaveFilterDate] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [openAttendance, setOpenAttendance] = useState(false);
  const [openLeave, setOpenLeave] = useState(false);
  const [attendanceData, setAttendanceData] = useState([]);
  const [leaveData, setLeaveData] = useState([]);

  const handleClickAttendance = () => {
    setOpenAttendance(true);
  };

  const handleClickLeave = () => {
    setOpenLeave(true);
  };

  const handleClose = () => {
    setOpenAttendance(false);
    setOpenLeave(false);
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      setFilterDate(selectedOption);
      const year = new Date().getFullYear();
      const yearMonth = `${year}-${selectedOption.value}`;
      getEmployeeAttendances(yearMonth);
    }
  };

  const handleSelectDateChange = (selectedOption) => {
    if (selectedOption) {
      setLeaveFilterDate(selectedOption);
      const year = new Date().getFullYear();
      const yearMonth = `${year}-${selectedOption.value}`;
      getEmployeeLeave(yearMonth);
    }
  };

  const getEmployeeAttendances = (date) => {
    dispatch(getAttendances(id, date))
      .then((data) => {
        setAttendanceData(data);
      })
      .catch((error) => {
        console.error('Error fetching Attendances data:', error);
      });
  };
  const getEmployeeLeave = (date) => {
    dispatch(getLeave(id, date))
      .then((data) => {
        setLeaveData(data);
      })
      .catch((error) => {
        console.error('Error fetching Leave data:', error);
      });
  };

  const handleUpdateLeave = (leave, status) => {
    dispatch(updateLeaveStatus(leave.id, { status, approvedBy: 1 }))
      .then(() => {
        const year = new Date().getFullYear();
        const yearMonth = `${year}-${leaveFilterDate.value}`;
        getEmployeeLeave(yearMonth);
      })
      .catch((error) => {
        console.error('Error fetching Leave data:', error);
      });
  };

  const formatDateTime = (datetime, name) => {
    if (!datetime) return '-';

    const date = format(new Date(datetime.replace('Z', '')), 'dd-MM-yyyy');
    const time = format(new Date(datetime.replace('Z', '')), 'hh:mm a');

    return name === 'date' ? (
      date
    ) : (
      <>
        {date}
        <br />
        {time}
      </>
    );
  };

  useEffect(() => {
    dispatch(Employeeview(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching Employee data:', error);
      });

    const today = new Date();
    const currentMonthIndex = today.getMonth() + 1;
    const year = today.getFullYear();
    const currentMonth = months.find((month) => month.value == currentMonthIndex);
    setFilterDate(currentMonth);
    setLeaveFilterDate(currentMonth);

    const yearMonth = `${year}-${currentMonth?.value}`;
    getEmployeeLeave(yearMonth);
    getEmployeeAttendances(yearMonth);
  }, [dispatch, id, navigate]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Employee View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> First Name </Typography>
          <Typography variant="subtitle2">{data?.firstName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Last Name </Typography>
          <Typography variant="subtitle2">{data?.lastName}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Email </Typography>
          <Typography variant="subtitle2">{data?.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Phone Number </Typography>
          <Typography variant="subtitle2">{data?.phoneNumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Address </Typography>
          <Typography variant="subtitle2">{data?.address}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Date of Birth </Typography>
          <Typography variant="subtitle2">{formatDateTime(data?.dob, 'date')}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> PAN No. </Typography>
          <Typography variant="subtitle2">{data?.panNumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Aadhar No. </Typography>
          <Typography variant="subtitle2">{data?.aadharNumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Shift </Typography>
          <Typography variant="subtitle2">{data?.shift?.shiftName}</Typography>
          <Typography variant="subtitle2">
            {data?.shift?.shiftStartTime} - {data?.shift?.shiftEndTime}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Role </Typography>
          <Typography variant="subtitle2">{data?.role}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Salary Per Day </Typography>
          <Typography variant="subtitle2">{data?.salaryPerDay}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Hire Date </Typography>
          <Typography variant="subtitle2">{formatDateTime(data?.hireDate, 'date')}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Personal Leaves Balance </Typography>
          <Typography variant="subtitle2">{data?.personalLeaves}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1"> Emergency Leaves Balance </Typography>
          <Typography variant="subtitle2">{data?.emergencyLeaves}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'space-between' }}>
          <Button variant="outlined" color="secondary" id="savebtncs" onClick={handleClickAttendance}>
            Attendance
          </Button>
          <Button variant="outlined" color="secondary" id="savebtncs" onClick={handleClickLeave}>
            Leave
          </Button>
          <Link to="/employeelist" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" id="savebtncs">
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>

      <Dialog
        open={openLeave}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: 'auto',
            width: isMobile ? '90%' : '60%',
            margin: isMobile ? '0' : 'auto',
            maxWidth: isMobile ? '80%' : 'none'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h4" align="center" id="mycss">
            Leave
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <Select options={months} onChange={handleSelectDateChange} value={leaveFilterDate} placeholder="Filter By Month" />
            </Grid>
          </Grid>
          <TableContainer sx={{ maxHeight: 575 }}>
            <Table style={{ border: '1px solid lightgrey' }}>
              <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
                {leaveColumns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableHead>
              <TableBody>
                {leaveData?.map((row, index) => (
                  <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                    {leaveColumns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ maxWidth: column.id === 'reason' ? '90px' : undefined }}>
                        {column.id === 'action' ? (
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            {row.status == 'Pending' && (
                              <>
                                <IconButton
                                  sizeSmall
                                  style={{
                                    backgroundColor: 'green',
                                    color: 'white',
                                    borderRadius: 0.8
                                  }}
                                  onClick={() => handleUpdateLeave(row, 'Approved')}
                                >
                                  <Check style={{ fontSize: '16px' }} />
                                </IconButton>
                                <IconButton
                                  sizeSmall
                                  style={{
                                    backgroundColor: 'Red',
                                    color: 'white',
                                    borderRadius: 0.8
                                  }}
                                  onClick={() => handleUpdateLeave(row, 'Rejected')}
                                >
                                  <Close style={{ fontSize: '16px' }} />
                                </IconButton>
                              </>
                            )}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} id="savebtncs" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openAttendance}
        onClose={handleClose}
        PaperProps={{
          style: {
            height: 'auto',
            width: isMobile ? '90%' : '60%',
            margin: isMobile ? '0' : 'auto',
            maxWidth: isMobile ? '80%' : 'none'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h4" align="center" id="mycss">
            Attendance
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item>
              <Select options={months} onChange={handleSelectChange} value={filterDate} placeholder="Filter By Month" />
            </Grid>
          </Grid>
          <TableContainer sx={{ maxHeight: 575 }}>
            <Table style={{ border: '1px solid lightgrey' }}>
              <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableHead>
              <TableBody>
                {attendanceData?.map((row, index) => (
                  <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align}>
                        {['date', 'inTime', 'outTime', 'breakStart', 'breakEnd'].includes(column.id)
                          ? formatDateTime(row[column.id], column.id)
                          : row[column.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} id="savebtncs" variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default EmployeeviewPage;
