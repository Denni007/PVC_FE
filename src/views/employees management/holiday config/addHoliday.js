import { Card, Grid, Typography, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { createholiday, getholiday, updateholiday } from 'store/thunk';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AddHolidayPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [formData, setFormData] = useState({
    date: '',
    name: ''
  });

  const handleaddHoliday = async () => {
    try {
      if (id) {
        await dispatch(updateholiday(id, formData, navigate));
      } else {
        await dispatch(createholiday(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating employee data:', error);
    }
  };

  const handleFormDateChange = (fieldName, date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormData({ ...formData, [fieldName]: formattedDate });
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  useEffect(() => {
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(getholiday(id));

          const { name, date } = response;
          setFormData({ name, date });
        }
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    viewData();
  }, [dispatch, id]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        {id ? 'Update Holiday' : 'Add Holiday'}
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: '16px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <DatePicker
            selected={formData.date}
            onChange={(date) => handleFormDateChange('date', date)}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showTimeSelect={false}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Name : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <input placeholder="Enter Name" id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
        </Grid>
      </Grid>
      {isMobile ? (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link style={{ textDecoration: 'none' }}>
              <button to="/holidayconfig" id="savebtncs">
                Cancel
              </button>
            </Link>
            <button id="savebtncs" onClick={handleaddHoliday}>
              Save
            </button>
          </div>
        </Grid>
      ) : (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
          <div>
            <Link to="/holidayconfig" style={{ textDecoration: 'none' }}>
              <button id="savebtncs">Cancel</button>
            </Link>
          </div>
          <div style={{ display: 'flex' }}>
            <button id="savebtncs" onClick={handleaddHoliday}>
              Save
            </button>
          </div>
        </Grid>
      )}
    </Card>
  );
};

export default AddHolidayPage;
