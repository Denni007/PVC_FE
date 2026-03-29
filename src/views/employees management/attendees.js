import React, { useState, useEffect } from 'react';
import {
  Card,
  Grid,
  Typography,
  Button,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Select,
  MenuItem,
  FormControl,
  Chip
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getEmployeeAttendance, fetchAllAttendeesType, updateEmployeeAttendance } from 'store/thunk';

const Attendees = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [presentEmployees, setPresentEmployees] = useState([]);
  const [absentEmployees, setAbsentEmployees] = useState([]);
  const [attendanceTypes, setAttendanceTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [attendanceTypesLoading, setAttendanceTypesLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
    fetchAttendanceTypes();
  }, []);

  const fetchAttendanceTypes = async () => {
    try {
      setAttendanceTypesLoading(true);
      const response = await dispatch(fetchAllAttendeesType());
      if (response) {
        setAttendanceTypes(response);
      }
    } catch (error) {
      console.error('Error fetching attendance types:', error);
      toast.error('Failed to fetch attendance types');
    } finally {
      setAttendanceTypesLoading(false);
    }
  };

  const fetchEmployees = async () => {
    try {
      setLoading(true);

      // Make API call to get employee status using thunk
      const response = await dispatch(getEmployeeAttendance());

      if (response && response.employees) {
        const employeeData = response.employees;

        // Process employees based on attendance status
        const present = employeeData.filter((emp) => {
          const status = emp.attendanceStatus || emp.status || emp.attendance_status;
          const code = emp.attendanceCode || emp.code;
          // Check if status exists and is not "Absent" or "A", or if code is P, M, or BM
          return (status && status !== 'Absent' && status !== 'A') || (code && ['P', 'M', 'BM'].includes(code));
        });
        const absent = employeeData.filter((emp) => {
          const status = emp.attendanceStatus || emp.status || emp.attendance_status;
          const code = emp.attendanceCode || emp.code;
          // Check if status is "Absent", "A", or doesn't exist, and code is not P, M, or BM
          return (!status || status === 'Absent' || status === 'A') && (!code || !['P', 'M', 'BM'].includes(code));
        });

        setPresentEmployees(present);
        setAbsentEmployees(absent);

        // toast.success(`Successfully loaded ${employeeData.length} employees`);
      } else {
        setPresentEmployees([]);
        setAbsentEmployees([]);
        toast.warning('No employee data found');
      }
    } catch (error) {
      console.error('Error fetching employees:', error);
      setPresentEmployees([]);
      setAbsentEmployees([]);
      toast.error('Failed to fetch employees. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleGoClick = async () => {
    // Fetch attendance data for the selected date
    try {
      setLoading(true);

      const formattedDate = selectedDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      const response = await dispatch(getEmployeeAttendance(formattedDate));

      if (response && response.employees) {
        const employeeData = response.employees;

        // Process employees based on attendance status for the selected date
        const present = employeeData.filter((emp) => {
          const status = emp.attendanceStatus || emp.status || emp.attendance_status;
          const code = emp.attendanceCode || emp.code;
          // Check if status exists and is not "Absent" or "A", or if code is P, M, or BM
          return (status && status !== 'Absent' && status !== 'A') || (code && ['P', 'M', 'BM'].includes(code));
        });
        const absent = employeeData.filter((emp) => {
          const status = emp.attendanceStatus || emp.status || emp.attendance_status;
          const code = emp.attendanceCode || emp.code;
          // Check if status is "Absent", "A", or doesn't exist, and code is not P, M, or BM
          return (!status || status === 'Absent' || status === 'A') && (!code || !['P', 'M', 'BM'].includes(code));
        });

        setPresentEmployees(present);
        setAbsentEmployees(absent);

        // toast.success(`Attendance data loaded for ${selectedDate.toLocaleDateString()}`);
      } else {
        toast.warning('No attendance data found for selected date');
      }
    } catch (error) {
      console.error('Error fetching attendance for date:', error);
      toast.error('Failed to fetch attendance data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAttendanceChange = async (employee, attendanceTypeId) => {
    try {
      // Update attendance status via thunk
      // Note: The API expects attendanceId and attendanceTypeId
      const attendanceId = employee.attendanceRecord.id; // Fallback
      await dispatch(updateEmployeeAttendance(attendanceId, attendanceTypeId));

      // Refresh data to ensure consistency
      handleGoClick();
    } catch (error) {
      console.error('Error updating attendance status:', error);
      toast.error('Failed to update attendance status. Please try again.');
    }
  };

  const handleEmployeeClick = (employeeId) => {
    console.log('employeeId: ', employeeId);
    navigate(`/employeeDetails/${employeeId}`);
  };

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss" style={{ marginBottom: '20px' }}>
        Employee Attendance
      </Typography>

      {/* Date Picker and Go Button Section */}
      <Grid container style={{ marginBottom: '20px' }}>
        <Grid item xs={12} md={3} sm={6}>
          <Typography variant="subtitle1">Select Date:</Typography>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showTimeSelect={false}
          />
        </Grid>
        <Grid item xs={12} md={3} sm={6} alignContent={'center'} sx={{ marginTop: '10px' }}>
          <Button onClick={handleGoClick} variant="contained" color="secondary" disabled={loading}>
            {loading ? 'Loading...' : 'GO'}
          </Button>
        </Grid>
      </Grid>

      {/* Main Content - Two Boxes */}
      <Grid container spacing={3}>
        {/* Left Box - Present Employees */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', height: '600px' }}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '2px solid #4caf50'
              }}
            >
              <Typography variant="h6" style={{ color: '#4caf50', fontWeight: 'bold' }}>
                Present
              </Typography>
              <Chip label={presentEmployees.length} color="success" variant="outlined" style={{ fontWeight: 'bold', fontSize: '16px' }} />
            </Box>

            <List style={{ maxHeight: '500px', overflow: 'auto' }}>
              {loading ? (
                <Box style={{ textAlign: 'center', padding: '20px' }}>
                  <Typography variant="body2" color="textSecondary">
                    Loading employees...
                  </Typography>
                </Box>
              ) : presentEmployees.length > 0 ? (
                presentEmployees.map((employee) => (
                  <ListItem
                    key={employee.employeeId}
                    style={{
                      border: '1px solid #e0e0e0',
                      marginBottom: '8px',
                      borderRadius: '4px',
                      backgroundColor: '#f9f9f9'
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            color: '#1976d2'
                          }}
                          onClick={() => handleEmployeeClick(employee.employeeId)}
                        >
                          {employee.firstName} {employee.lastName}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="textSecondary">
                          {employee.email}
                        </Typography>
                      }
                    />
                    <ListItemSecondaryAction>
                      <FormControl size="small" style={{ minWidth: '80px' }}>
                        <Select
                          value={employee.attendanceRecord?.attendanceType?.id}
                          onChange={(e) => handleAttendanceChange(employee, e.target.value)}
                          displayEmpty
                          style={{ height: '40px' }}
                          disabled={attendanceTypesLoading}
                        >
                          <MenuItem value="" disabled>
                            {attendanceTypesLoading ? 'Loading...' : 'Select Type'}
                          </MenuItem>
                          {attendanceTypes.map((type) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.code}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))
              ) : (
                <Box style={{ textAlign: 'center', padding: '20px' }}>
                  <Typography variant="body2" color="textSecondary">
                    No present employees found
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>

        {/* Right Box - Absent Employees */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} style={{ padding: '20px', height: '600px' }}>
            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px',
                paddingBottom: '10px',
                borderBottom: '2px solid #f44336'
              }}
            >
              <Typography variant="h6" style={{ color: '#f44336', fontWeight: 'bold' }}>
                Absent
              </Typography>
              <Chip label={absentEmployees.length} color="error" variant="outlined" style={{ fontWeight: 'bold', fontSize: '16px' }} />
            </Box>

            <List style={{ maxHeight: '500px', overflow: 'auto' }}>
              {loading ? (
                <Box style={{ textAlign: 'center', padding: '20px' }}>
                  <Typography variant="body2" color="textSecondary">
                    Loading employees...
                  </Typography>
                </Box>
              ) : absentEmployees.length > 0 ? (
                absentEmployees.map((employee) => (
                  <ListItem
                    key={employee.employeeId}
                    style={{
                      border: '1px solid #e0e0e0',
                      marginBottom: '8px',
                      borderRadius: '4px',
                      backgroundColor: '#f9f9f9'
                    }}
                  >
                    <ListItemText
                      primary={
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            color: '#1976d2'
                          }}
                        >
                          {employee.firstName} {employee.lastName}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="textSecondary">
                          {employee.email}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))
              ) : (
                <Box style={{ textAlign: 'center', padding: '20px' }}>
                  <Typography variant="body2" color="textSecondary">
                    No absent employees found
                  </Typography>
                </Box>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Legend */}
      <Box
        style={{
          marginTop: '20px',
          padding: '16px',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
          textAlign: 'center'
        }}
      >
        <Typography variant="body2" color="textSecondary">
          <strong>Legend:</strong>{' '}
          {attendanceTypes.map((type, index) => (
            <span key={type.id}>
              {type.code} = {type.description} (₹{type.salaryPerDay}){index < attendanceTypes.length - 1 ? ', ' : ''}
            </span>
          ))}
        </Typography>
      </Box>
    </Card>
  );
};

export default Attendees;
