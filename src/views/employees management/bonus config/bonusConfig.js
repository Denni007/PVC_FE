import {
  Card,
  Grid,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchBonusConfig, getDesciplineReward, updateBonusConfig, updateDesciplineReward } from 'store/thunk';

const BonusConfigPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [bonusData, setBonusData] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [desciplineReward, setDesciplineReward] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const handelYearChange = (value) => {
    setSelectedYear(value);
    fetchBonusConfigs(value);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...bonusData];
    updatedData[index][field] = value;
    setBonusData(updatedData);
  };

  const handleSave = async () => {
    const data = convertToApiFormat(bonusData, selectedYear);
    updateBonusConfigs(data);
    await dispatch(updateDesciplineReward(desciplineReward));
  };

  const updateBonusConfigs = async (value) => {
    await dispatch(updateBonusConfig(value));
  };

  const convertToApiFormat = (data, year = '2025') => {
    const monthMap = {
      Jan: '01',
      Feb: '02',
      Mar: '03',
      Apr: '04',
      May: '05',
      Jun: '06',
      Jul: '07',
      Aug: '08',
      Sep: '09',
      Oct: '10',
      Nov: '11',
      Dec: '12'
    };

    return data.map((item) => ({
      month: `${year}-${monthMap[item.month]}`,
      duty0To50: Number(item.duty0To50 || 0),
      duty51To75: Number(item.duty51To75 || 0),
      duty76To90: Number(item.duty76To90 || 0),
      duty91To100: Number(item.duty91To100 || 0),
      dutyAbove100: Number(item.dutyAbove100 || 0),
      workingDays: Number(item.workingDays || 0)
    }));
  };

  const fetchBonusConfigs = async (value) => {
    try {
      const response = await dispatch(fetchBonusConfig(value));
      const data = getRange(response);
      setBonusData(data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
      const data = getRange([]);
      setBonusData(data);
      console.error('Error fetching employee data:', error);
    }
  };

  const fetchDesciplineReward = async () => {
    try {
      const response = await dispatch(getDesciplineReward());
      setDesciplineReward(response.value);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        navigate('/');
      }
      setDesciplineReward('');
      console.error('Error fetching employee data:', error);
    }
  };

  const getRange = (data) => {
    const monthMap = {
      '01': 'Jan',
      '02': 'Feb',
      '03': 'Mar',
      '04': 'Apr',
      '05': 'May',
      '06': 'Jun',
      '07': 'Jul',
      '08': 'Aug',
      '09': 'Sep',
      '10': 'Oct',
      '11': 'Nov',
      '12': 'Dec'
    };

    const orderedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const result = orderedMonths.map((monthName) => ({
      month: monthName,
      duty0To50: '0',
      duty51To75: '0',
      duty76To90: '0',
      duty91To100: '0',
      dutyAbove100: '0',
      workingDays: '0'
    }));

    const getMonthName = (monthStr) => {
      const [, , monthNum] = monthStr.match(/(\d{4})-(\d{2})/);
      return monthMap[monthNum];
    };

    data.forEach((item) => {
      const monthName = getMonthName(item.month);
      const monthEntry = result.find((r) => r.month === monthName);

      if (monthEntry) {
        monthEntry.duty0To50 = String(item.duty0To50 || 0);
        monthEntry.duty51To75 = String(item.duty51To75 || 0);
        monthEntry.duty76To90 = String(item.duty76To90 || 0);
        monthEntry.duty91To100 = String(item.duty91To100 || 0);
        monthEntry.dutyAbove100 = String(item.dutyAbove100 || 0);
        monthEntry.workingDays = String(item.workingDays || 0);
      }
    });

    return result;
  };

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = currentYear - 1; i <= currentYear + 2; i++) {
      yearsArray.push(i);
    }
    setYearOptions(yearsArray);
    setSelectedYear(currentYear);

    fetchBonusConfigs(currentYear);
    fetchDesciplineReward();
  }, [navigate]);

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Bonus Configuration
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <Typography variant="subtitle1">Descipline Reward :</Typography>
        <input
          placeholder="Enter Descipline Reward"
          id="desciplineReward"
          value={desciplineReward}
          onChange={(e) => setDesciplineReward(e.target.value)}
          style={{ width: '18%' }}
        />
      </div>
      <TableContainer component={Paper}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              <TableCell align="center" style={{ paddingLeft: '10px ' }}>
                <Select value={selectedYear} onChange={(e) => handelYearChange(e.target.value)} style={{ color: 'white' }}>
                  {yearOptions.map((year) => (
                    <MenuItem value={year} key={year}>
                      {year}
                    </MenuItem>
                  ))}
                  {/* <MenuItem value="2025">2025</MenuItem>
                  <MenuItem value="2026">2026</MenuItem> */}
                </Select>
              </TableCell>
              <TableCell align="center">0-50%</TableCell>
              <TableCell align="center">51-75%</TableCell>
              <TableCell align="center">76-90%</TableCell>
              <TableCell align="center">91-100%</TableCell>
              <TableCell align="center">100% +</TableCell>
              <TableCell align="center">Working Days</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bonusData.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                <TableCell align="center">{row.month}</TableCell>
                <TableCell align="center">
                  <input value={row.duty0To50} onChange={(e) => handleInputChange(index, 'duty0To50', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.duty51To75} onChange={(e) => handleInputChange(index, 'duty51To75', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.duty76To90} onChange={(e) => handleInputChange(index, 'duty76To90', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.duty91To100} onChange={(e) => handleInputChange(index, 'duty91To100', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.dutyAbove100} onChange={(e) => handleInputChange(index, 'dutyAbove100', e.target.value)} />
                </TableCell>
                <TableCell align="center">
                  <input value={row.workingDays} onChange={(e) => handleInputChange(index, 'workingDays', e.target.value)} />
                </TableCell>
              </TableRow>
            ))}
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

export default BonusConfigPage;
