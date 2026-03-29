import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowBack, Person, Phone, Email, Home, Badge, CreditCard, CalendarToday, AccessTime, Refresh } from '@mui/icons-material';
import {} from '@mui/icons-material';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEmployeeDetails } from 'store/thunk';
import { useDispatch } from 'react-redux';

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (employeeId) {
      fetchEmployeeAttendance();
    } else {
      setError('Employee ID is required');
      setLoading(false);
    }
  }, [employeeId, selectedMonth, selectedYear]);

  const fetchEmployeeAttendance = async () => {
    try {
      if (!attendanceData) {
        setLoading(true);
      } else {
        setRefreshing(true);
      }
      setError(null);

      const month = selectedMonth.toString().padStart(2, '0');
      const year = selectedYear.toString();

      const response = await dispatch(getEmployeeDetails(employeeId, month, year));

      if (response) {
        setAttendanceData(response);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching attendance data:', error);
      setError('Failed to fetch attendance data. Please try again.');
      toast.error('Failed to fetch attendance data');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getStatusColor = (status) => {
    if (!status) return 'default';

    switch (status.toString().toUpperCase()) {
      case 'P':
        return 'success';
      case 'A':
        return 'error';
      case 'O':
        return 'warning';
      case 'M':
        return 'info';
      case 'BM':
        return 'secondary';
      case 'H':
        return 'default';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status) => {
    if (!status) return 'Unknown';

    switch (status.toString().toUpperCase()) {
      case 'P':
        return 'Present';
      case 'A':
        return 'Absent';
      case 'O':
        return 'Off';
      case 'M':
        return 'M-Present';
      case 'BM':
        return 'BM-Present';
      case 'H':
        return 'Holiday';
      default:
        return status;
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '-';
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'UTC',
      });
    } catch (error) {
      return '-';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      });
    } catch (error) {
      return '-';
    }
  };

  const formatOvertime = (hoursString) => {
    if (!hoursString) return '00.00';
    
    const hoursFloat = parseFloat(hoursString);
    const isNegative = hoursFloat < 0;
    
    const totalMinutes = Math.round(Math.abs(hoursFloat) * 60);
    const hh = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
    const mm = String(totalMinutes % 60).padStart(2, '0');
    
    return `${isNegative ? '-' : ''}${hh}:${mm}`;
  };

  // const handleMonthChange = (increment) => {
  //     let newMonth = selectedMonth + increment;
  //     let newYear = selectedYear;

  //     if (newMonth > 12) {
  //         newMonth = 1;
  //         newYear += 1;
  //     } else if (newMonth < 1) {
  //         newMonth = 12;
  //         newYear -= 1;
  //     }

  //     setSelectedMonth(newMonth);
  //     setSelectedYear(newYear);
  // };

  if (loading) {
    return (
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="400px" gap={2}>
        <CircularProgress />
        <Typography variant="body1" color="textSecondary">
          Loading attendance data for Employee ID: {employeeId}
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!attendanceData) {
    return <Alert severity="info">No attendance data found for this employee.</Alert>;
  }

  const { monthInfo, employeeInfo, dailyAttendance, monthlySummary } = attendanceData;

  // Validate required data
  if (!monthInfo || !employeeInfo || !dailyAttendance || !monthlySummary) {
    return <Alert severity="error">Incomplete attendance data received. Please try refreshing the page.</Alert>;
  }

  return (
    <Card sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <IconButton onClick={() => navigate(-1)} sx={{ mr: 2 }}>
          <ArrowBack />
        </IconButton>
        <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
          Employee Attendance Details
        </Typography>
      </Box>

      {/* Month Navigation */}
      <Paper sx={{ p: 2, mb: 3, backgroundColor: '#f5f5f5' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 3 }}>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Month</InputLabel>
            <Select value={selectedMonth} label="Month" onChange={(e) => setSelectedMonth(e.target.value)}>
              <MenuItem value={1}>January</MenuItem>
              <MenuItem value={2}>February</MenuItem>
              <MenuItem value={3}>March</MenuItem>
              <MenuItem value={4}>April</MenuItem>
              <MenuItem value={5}>May</MenuItem>
              <MenuItem value={6}>June</MenuItem>
              <MenuItem value={7}>July</MenuItem>
              <MenuItem value={8}>August</MenuItem>
              <MenuItem value={9}>September</MenuItem>
              <MenuItem value={10}>October</MenuItem>
              <MenuItem value={11}>November</MenuItem>
              <MenuItem value={12}>December</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 100 }}>
            <InputLabel>Year</InputLabel>
            <Select value={selectedYear} label="Year" onChange={(e) => setSelectedYear(e.target.value)}>
              {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i).map((year) => (
                <MenuItem key={year} value={year}>
                  {year}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {refreshing && <CircularProgress size={20} sx={{ ml: 2 }} />}

          <IconButton onClick={fetchEmployeeAttendance} disabled={refreshing} sx={{ ml: 2 }} title="Refresh Data">
            <Refresh />
          </IconButton>
        </Box>
      </Paper>

      {/* Employee Details Section */}
      <Paper sx={{ p: 3, mb: 3, backgroundColor: '#e3f2fd' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: '#1565c0' }}>
          EMPLOYEE DETAILS
        </Typography>
        <Grid container spacing={3}>
          {/* Left side */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                EMP. CODE: {employeeInfo.id}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Person sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Name: {employeeInfo.fullName}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Phone sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Phone: {employeeInfo?.phoneNumber || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Email sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Email: {employeeInfo?.email || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Home sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Address: {employeeInfo?.address || 'N/A'}
              </Typography>
            </Box>
          </Grid>

          {/* Right side */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Badge sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                PAN No.: {employeeInfo?.panNumber || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CreditCard sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                Aadhar No.: {employeeInfo?.aadharNumber || 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <CalendarToday sx={{ mr: 1, color: '#1976d2' }} />
              <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                DOB: {employeeInfo?.dob ? formatDate(employeeInfo.dob) : 'N/A'}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'start', mb: 2 }}>
              <AccessTime sx={{ mr: 1, color: '#1976d2' }} />
              <Box>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  Shift: {employeeInfo?.shift?.shiftName || 'N/A'}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {employeeInfo?.shift?.shiftStartTime && employeeInfo?.shift?.shiftEndTime
                    ? `${employeeInfo.shift.shiftStartTime} - ${employeeInfo.shift.shiftEndTime}`
                    : 'N/A'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Daily Attendance Section */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
          Daily Attendance
        </Typography>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} lg={12}> */}
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Day</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>ATT</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>O.T Hrs</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>In Time</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Break In</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Break Out</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Out Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dailyAttendance.length > 0 ? (
                    dailyAttendance.map((day) => (
                      <TableRow key={day.day}>
                        <TableCell>
                          <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                            {day.dayOfWeek}-{day.day}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip label={day.status} color={getStatusColor(day.status)} size="small" title={getStatusLabel(day.status)} />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {day.overtimeHours !== '0.00' && day.overtimeHours !== 0 ? formatOvertime(day.overtimeHours) : '-'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color={day.latePunch ? 'error' : 'inherit'}>
                            {formatTime(day.inTime)}
                            {day.latePunch && ' (Late)'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{formatTime(day.breakIn)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{formatTime(day.breakOut)}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">{formatTime(day.outTime)}</Typography>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body2" color="textSecondary">
                          No attendance data for days 1-15
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          {/* </Grid> */}
        </Grid>
      </Paper>

      {/* Monthly Summary Section */}
      <Paper sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 3, color: '#1976d2' }}>
          Monthly Summary
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Category</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Days</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>O.T Hours</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>G-GENERAL</TableCell>
                    <TableCell>{monthlySummary.general || 0}</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>P-PRESENT</TableCell>
                    <TableCell>{monthlySummary.presentDays || 0}</TableCell>
                    <TableCell>{monthlySummary.totalOvertime || '0'}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>M-PRESENT</TableCell>
                    <TableCell>{monthlySummary.mixer || 0}</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>BM-PRESENT</TableCell>
                    <TableCell>{monthlySummary.bigMixer || 0}</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>A-ABSENT</TableCell>
                    <TableCell>{monthlySummary.absent || 0}</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>O-OFF</TableCell>
                    <TableCell>{monthlySummary.off || 0}</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>H-HOLIDAY</TableCell>
                    <TableCell>{monthlySummary.leave || 0}</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                  <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                    <TableCell sx={{ fontWeight: 'bold' }}>TOTAL</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{monthlySummary.totalDays}</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>{monthlySummary.totalOvertime || '0'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ p: 2, backgroundColor: '#e8f5e8', borderRadius: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#2e7d32' }}>
                Attendance Statistics
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Attendance Percentage:
                </Typography>
                <Typography variant="h4" sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
                  {monthlySummary.attendancePercentage?.toFixed(1) || 0}%
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Working Days:
                </Typography>
                <Typography variant="h6" sx={{ color: '#1976d2' }}>
                  {monthInfo.workingDays}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Attendance
                </Typography>
                <Typography variant="h6" sx={{ color: '#1976d2' }}>
                  {monthlySummary.presentDays}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Over Time
                </Typography>
                <Typography variant="h6" sx={{ color: '#1976d2' }}>
                  {monthlySummary.totalOvertime}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Total Working Hours:
                </Typography>
                <Typography variant="h6" sx={{ color: '#ed6c02' }}>
                  {monthlySummary.totalWorkingHours || '0'}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {/* Legend */}
      <Paper sx={{ p: 2, mt: 3, backgroundColor: '#fff3e0' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, color: '#e65100' }}>
          Legend
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          <Chip label="P = Present" color="success" size="small" />
          <Chip label="A = Absent" color="error" size="small" />
          <Chip label="O = Off" color="warning" size="small" />
          <Chip label="M = Mixer-Present" color="info" size="small" />
          <Chip label="BM = Big Mixer-Present" color="secondary" size="small" />
          <Chip label="H = Holiday" color="default" size="small" />
        </Box>
      </Paper>
    </Card>
  );
};

export default EmployeeDetails;
