import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Userview, createuser, updateUser } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const User = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileno: '',
    email: '',
    role: '',
    salary: '',
    password: '',
    confirmpassword: ''
  });
  const [entryTime, setEntryTime] = useState('');
  const [exitTime, setExitTime] = useState('');
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const { id } = useParams();
  const roledata = [
    { value: 'Admin', label: 'Admin' },
    { value: 'Account', label: 'Account' },
    { value: 'Employee', label: 'Employee' },
    { value: 'Workers', label: 'Workers' },
    { value: 'Other', label: 'Other' }
  ];

  // show data in feild for update user details
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchdata = async () => {
      try {
        if (id) {
          const response = await dispatch(Userview(id));
          console.log(response);
          const { username, role, email, exitTime, entryTime, mobileno, salary, password, confirmpassword } = response;
          const [firstName, lastName] = username.split(' ');
          setFormData({ firstName, lastName, role, email, mobileno, salary, password, confirmpassword });
          setExitTime(exitTime);
          setEntryTime(entryTime);
        }
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };
    fetchdata();
  }, [dispatch, id]);

  // handle use for create user and update user
  const handleCreateUser = async () => {
    try {
      const { firstName, lastName, ...rest } = formData;
      const data = {
        ...rest,
        username: `${firstName} ${lastName}`,
        entryTime,
        exitTime
      };
      if (!firstName) {
        toast.error('required field: Frist Name', { autoClose: 1000 });
        return;
      }
      if (!lastName) {
        toast.error('required field: Last Name', { autoClose: 1000 });
        return;
      }
      if (id) {
        await dispatch(updateUser(id, data, navigate));
      } else {
        await dispatch(createuser(data, navigate));
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update User
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create User
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                First Name :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Last Name :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Mobile No. :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Mobile number"
                id="mobileno"
                value={formData.mobileno}
                onChange={(e) => setFormData({ ...formData, mobileno: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Email: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Role: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={roledata}
                value={roledata.find((option) => option.value === formData.role)}
                onChange={(selectedOption) => setFormData({ ...formData, role: selectedOption.value })}
              />
            </Grid>
            {!id && (
              <>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">
                    Password: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Typography variant="subtitle1">
                    Confirm Password: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </Typography>
                  <input
                    type="password"
                    placeholder="Enter Confirm Password"
                    id="confirmpassword"
                    value={formData.confirmpassword}
                    onChange={(e) => setFormData({ ...formData, confirmpassword: e.target.value })}
                  />
                </Grid>
              </>
            )}
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Basic Salary: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Salary"
                id="salary"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Duty Entry Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                type="time"
                value={entryTime}
                onChange={(e) => {
                  setEntryTime(e.target.value);
                  setFormData({ ...formData, entryTime: e.target.value });
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Duty Exit Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                type="time"
                value={exitTime}
                onChange={(e) => {
                  setExitTime(e.target.value);
                  setFormData({ ...formData, exitTime: e.target.value });
                }}
              />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/userlist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handleCreateUser}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/userlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                {/* <button
                  id="savebtncs"
                  style={{
                    marginRight: '10px'
                  }}
                  onClick={handleCreateUser}
                >
                  Save & Next
                </button> */}
                <button id="savebtncs" onClick={handleCreateUser}>
                  Save
                </button>
              </div>
            </Grid>
          )}
        </Grid>
      </div>
    </Paper>
  );
};

export default User;
