import { Card, Grid, Typography, useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { createAttendeesType, getAttendeesType, updateAttendeesType } from 'store/thunk';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const AddAttendeesTypePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [formData, setFormData] = useState({
    code: '',
    description: '',
    salaryPerDay: ''
  });

  const handleAddAttendeesType = async () => {
    try {
      if (id) {
        await dispatch(updateAttendeesType(id, formData, navigate));
      } else {
        await dispatch(createAttendeesType(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating attendees type data:', error);
    }
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
          const response = await dispatch(getAttendeesType(id));

          const { code, description, salaryPerDay } = response;
          setFormData({ code, description, salaryPerDay });
        }
      } catch (error) {
        console.error('Error fetching attendees type:', error);
      }
    };
    viewData();
  }, [dispatch, id]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        {id ? 'Update Attendees Type' : 'Add Attendees Type'}
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: '16px' }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Code: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <input placeholder="Enter Code" id="code" value={formData.code} onChange={(e) => handleInputChange('code', e.target.value)} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Description: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <input
            placeholder="Enter Description"
            id="description"
            value={formData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1">
            Salary Per Day: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
          </Typography>
          <input
            type="number"
            placeholder="Enter Salary Per Day"
            id="salaryPerDay"
            value={formData.salaryPerDay}
            onChange={(e) => handleInputChange('salaryPerDay', e.target.value)}
          />
        </Grid>
      </Grid>
      {isMobile ? (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Link style={{ textDecoration: 'none' }}>
              <button to="/attendeestypeconfig" id="savebtncs">
                Cancel
              </button>
            </Link>
            <button id="savebtncs" onClick={handleAddAttendeesType}>
              Save
            </button>
          </div>
        </Grid>
      ) : (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
          <div>
            <Link to="/attendeestypeconfig" style={{ textDecoration: 'none' }}>
              <button id="savebtncs">Cancel</button>
            </Link>
          </div>
          <div style={{ display: 'flex' }}>
            <button id="savebtncs" onClick={handleAddAttendeesType}>
              Save
            </button>
          </div>
        </Grid>
      )}
    </Card>
  );
};

export default AddAttendeesTypePage;
