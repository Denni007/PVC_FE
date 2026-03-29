import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
// import Select from 'react-select';
import { Employee } from 'store/thunk';
import { useDispatch } from 'react-redux';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';

const Employeeentry = () => {
  const [formData, setFormData] = useState([]);

  const dispatch = useDispatch();
  // const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(Employee());
      console.log(response, 'RSPONSE');

      const { username, exitTime, entryTime } = response;
      setFormData({ username, exitTime, entryTime });
    };
    fetchData();
  }, [dispatch]);

  // const handleCreateOrUpdateInvoice = async () => {
  //   try {
  //     const payload = {
  //       ...formData,
  //       startTime,
  //       endTime,
  //       items: rows.map((row) => ({
  //         id: row.id || null,
  //         productId: row.productId,
  //         qty: row.qty,
  //         unit: row.unit
  //       }))
  //     };
  //     if (bomId) {
  //       await dispatch(updateBom(bomId, payload, navigate));
  //     } else {
  //       await dispatch(createBom(payload, navigate));
  //     }
  //   } catch (error) {
  //     console.error('Error creating or updating invoice:', error);
  //   }
  // };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {/* {bomId ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Employee
          </Typography>
        ) : ( */}
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Create Employee
        </Typography>
        {/* )} */}
        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Employee Name :</Typography>
            <input placeholder="name" value={formData.username}></input>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Salary : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="QTY" type="number" value={formData.wastageQty} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Company Working Day :</Typography>
            <input placeholder="day" value={formData.unit}></input>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Company Off Day :</Typography>
            <input placeholder="off day" value={formData.unit}></input>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Shift : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="off day" value={formData.unit}></input>
            {/* <Select options={shift} value={shift.find((option) => option.value === formData.shift)} onChange={handleshiftChange} /> */}
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              In Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input type="time" value={formData.entryTime} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Out Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input type="time" value={formData.exitTime} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Delay Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input type="time" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Over Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input type="time" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Total Earn : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="total earn" type="number" value={formData.wastageQty} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Advance : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="QTY" type="number" value={formData.wastageQty} />
          </Grid>
        </Grid>

        {/* {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
              <Link to="/billofmateriallist" style={{ textDecoration: 'none' }}>
                <button id="savebtncs" style={{ marginRight: '5px' }}>
                  Cancel
                </button>
              </Link>
              <button id="savebtncs" onClick={handleCreateOrUpdateInvoice}>
                Save
              </button>
            </div>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
            <div>
              <Link to="/billofmateriallist" style={{ textDecoration: 'none' }}>
                <button id="savebtncs">Cancel</button>
              </Link>
            </div>
            <div style={{ display: 'flex' }}>
              <button id="savebtncs" onClick={handleCreateOrUpdateInvoice}>
                Save
              </button>
            </div>
          </Grid>
        )} */}
      </div>
    </Paper>
  );
};

export default Employeeentry;
