import { Card, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { getpenaltyConfig, updatepenaltyConfig } from 'store/thunk';

const PenaltyConfigPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [penaltyData, setpenaltyData] = useState([]);

  const handleSave = async () => {
    await dispatch(updatepenaltyConfig([penaltyData]));
  };

  const handleInputChange = (field, value) => {
    setpenaltyData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(getpenaltyConfig());
        const { firstPenalty, secondPenalty, thirdPenalty, fourthPenalty, fifthPenalty, type } = response[0];
        setpenaltyData({ firstPenalty, secondPenalty, thirdPenalty, fourthPenalty, fifthPenalty, type });
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        setpenaltyData({
          firstPenalty: '',
          secondPenalty: '',
          thirdPenalty: '',
          fourthPenalty: '',
          fifthPenalty: '',
          type: 'leaves'
        });
        console.error('Error fetching employee data:', error);
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Penalty Configuration
      </Typography>
      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              <TableCell align="center">1st Leave</TableCell>
              <TableCell align="center">2nd Leave</TableCell>
              <TableCell align="center">3rd Leave</TableCell>
              <TableCell align="center">4th Leave</TableCell>
              <TableCell align="center">5th Leave</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center">
                <input value={penaltyData.firstPenalty} onChange={(e) => handleInputChange('firstPenalty', e.target.value)} />
              </TableCell>
              <TableCell align="center">
                <input value={penaltyData.secondPenalty} onChange={(e) => handleInputChange('secondPenalty', e.target.value)} />
              </TableCell>
              <TableCell align="center">
                <input value={penaltyData.thirdPenalty} onChange={(e) => handleInputChange('thirdPenalty', e.target.value)} />
              </TableCell>
              <TableCell align="center">
                <input value={penaltyData.fourthPenalty} onChange={(e) => handleInputChange('fourthPenalty', e.target.value)} />
              </TableCell>
              <TableCell align="center">
                <input value={penaltyData.fifthPenalty} onChange={(e) => handleInputChange('fifthPenalty', e.target.value)} />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', margin: '10px 0px' }}>
        <div style={{ display: 'flex' }}>
          <button id="savebtncs" onClick={handleSave}>
            Save
          </button>
        </div>
      </Grid>
    </Card>
  );
};

export default PenaltyConfigPage;
