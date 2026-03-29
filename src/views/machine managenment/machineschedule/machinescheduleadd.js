// import React, { useEffect, useState } from 'react';
// import { Typography, Grid, Paper } from '@mui/material';
// import { useDispatch } from 'react-redux';
// import { useMediaQuery } from '@mui/material';
// import { createMachineSchedule, fetchAllMachine, fetchAllMaintenanceType, MachineScheduleview, updateMachineSchedule } from 'store/thunk';
// import { Link, useNavigate, useParams } from 'react-router-dom';
// import Select from 'react-select';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import Maintenancetype from 'component/maintenancetype';

// const Machinescheduleadd = () => {
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { id } = useParams();
//   const [machine, setMachine] = useState([]);
//   const [machinename, setmachinename] = useState('');
//   const [formData, setFormData] = useState({
//     machineId: '',
//     frequency: '',
//     date: new Date(),
//     interval: '',
//     type: '',
//     maintenanceType: []
//   });
//   const [maintenanceTypeOptions, setmaintenanceTypeOptions] = React.useState([]);
//   const [selectedmaintenanceType, setSelectedmaintenanceType] = React.useState('');
//   const [maintenanceTypeDrawerOpen, setmaintenanceTypeDrawerOpen] = React.useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await dispatch(fetchAllMachine());
//         if (Array.isArray(response)) {
//           const options = response.map((machine) => ({ value: machine.id, label: machine.name }));
//           setMachine([...options]);
//         }
//         const maintenanceType = await dispatch(fetchAllMaintenanceType());
//         if (Array.isArray(maintenanceType)) {
//           const options = maintenanceType.map((product) => ({
//             value: product.id,
//             label: product.name
//           }));
//           setmaintenanceTypeOptions([{ value: 'new_group', label: 'Create New Type' }, ...options]);
//         }
//       } catch (error) {
//         console.error('Error fetching machine:', error);
//       }
//     };

//     const viewData = async () => {
//       try {
//         if (id) {
//           const response = await dispatch(MachineScheduleview(id));
//           const { machineId, frequency, date, interval, type, maintenanceTypes, scheduleMachine } = response;
//           setFormData({
//             machineId,
//             frequency,
//             date: new Date(date),
//             interval,
//             type,
//             maintenanceType: maintenanceTypes.map((mt) => mt.id)
//           });
//           setmachinename(scheduleMachine.name);
//           const selectedOptions = formData.maintenanceType.filter((type) => maintenanceTypes.some((mt) => mt.id === type.id));
//           console.log(maintenanceTypes,"UPDATEDATA");

//           setSelectedmaintenanceType(selectedOptions);
//         }
//       } catch (error) {
//         console.error('Error fetching Machine:', error);
//       }
//     };
//     fetchData();
//     viewData();
//   }, [dispatch, id]);

//   const handlecreateMachinedetails = async () => {
//     try {
//       if (id) {
//         await dispatch(updateMachineSchedule(id, formData, navigate));
//       } else {
//         await dispatch(createMachineSchedule(formData, navigate));
//       }
//     } catch (error) {
//       console.error('Error creating machine data:', error);
//     }
//   };

//   const handleSelectChange = (selectedOption) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       machineId: selectedOption.value
//     }));
//     setmachinename(selectedOption.label);
//   };

//   const handleInputChange = (fieldName, value) => {
//     setFormData((prevState) => ({
//       ...prevState,
//       [fieldName]: value
//     }));
//   };

//   const handleTypeChange = (selectedOption) => {
//     setFormData({ ...formData, type: selectedOption.value });
//   };

//   const handleFrequencyChange = (selectedOption) => {
//     setFormData({ ...formData, frequency: selectedOption.value });
//   };

//   const handledateChange = (date) => {
//     setFormData({ ...formData, date: date });
//   };

//   const Types = [
//     { value: 'Regular', label: 'Regular' },
//     { value: 'Preventive', label: 'Preventive' }
//   ];

//   const Frequency = [
//     { value: 'Daily', label: 'Daily' },
//     { value: 'Weekly', label: 'Weekly' },
//     { value: 'Monthly', label: 'Monthly' }
//   ];

//   const handleMaintenanceTypeChange = (selectedOptions) => {
//     if (selectedOptions.some((option) => option.label === 'Create New Type')) {
//       setmaintenanceTypeDrawerOpen(true);
//     } else {
//       const selectedValues = selectedOptions.map((option) => option.value);
//       setSelectedmaintenanceType(selectedOptions);
//       setFormData((prevState) => ({
//         ...prevState,
//         maintenanceType: selectedValues
//       }));
//     }
//   };

//   return (
//     <Paper elevation={4} style={{ padding: '24px' }}>
//       <div>
//         {id ? (
//           <Typography variant="h4" align="center" gutterBottom id="mycss">
//             Update Machine Schedule
//           </Typography>
//         ) : (
//           <Typography variant="h4" align="center" gutterBottom id="mycss">
//             Add Machine Schedule
//           </Typography>
//         )}
//         <Grid container style={{ marginBottom: '16px' }}>
//           <Grid container spacing={2} style={{ marginBottom: '16px' }}>
//             <Grid item xs={12} sm={6} md={3}>
//               <Typography variant="subtitle1">
//                 Machine Id : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
//               </Typography>
//               <Select
//                 color="secondary"
//                 options={machine}
//                 value={{ value: formData.machineId, label: machinename }}
//                 onChange={handleSelectChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Typography variant="subtitle1">
//                 Frequency : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
//               </Typography>
//               <Select
//                 options={Frequency}
//                 value={Frequency.find((option) => option.value === formData.frequency)}
//                 onChange={handleFrequencyChange}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Typography variant="subtitle1">
//                 Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
//               </Typography>
//               <DatePicker
//                 selected={formData.date}
//                 onChange={(date) => handledateChange(date)}
//                 dateFormat="dd/MM/yyyy"
//                 isClearable={false}
//                 showTimeSelect={false}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Typography variant="subtitle1">
//                 Interval : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
//               </Typography>
//               <input
//                 placeholder="Enter interval"
//                 id="interval"
//                 type="number"
//                 value={formData.interval}
//                 onChange={(e) => handleInputChange('interval', e.target.value)}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Typography variant="subtitle1">
//                 Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
//               </Typography>
//               <Select options={Types} value={Types.find((option) => option.value === formData.type)} onChange={handleTypeChange} />
//             </Grid>
//             <Grid item xs={12} sm={6} md={3}>
//               <Typography variant="subtitle1">
//                 Maintance Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
//               </Typography>
//               <Select
//                 options={maintenanceTypeOptions}
//                 isMulti
//                 value={selectedmaintenanceType}
//                 onChange={(selectedOption) => handleMaintenanceTypeChange(selectedOption)}
//               />
//               <Maintenancetype anchor="Right" open={maintenanceTypeDrawerOpen} onClose={() => setmaintenanceTypeDrawerOpen(false)} />
//             </Grid>
//           </Grid>

//           {isMobile ? (
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
//               <div style={{ display: 'flex', justifyContent: 'space-around' }}>
//                 <Link style={{ textDecoration: 'none' }}>
//                   <button to="/machineschedulelist" id="savebtncs">
//                     Cancel
//                   </button>
//                 </Link>
//                 <button id="savebtncs" onClick={handlecreateMachinedetails}>
//                   Save
//                 </button>
//               </div>
//             </Grid>
//           ) : (
//             <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
//               <div>
//                 <Link to="/machineschedulelist" style={{ textDecoration: 'none' }}>
//                   <button id="savebtncs">Cancel</button>
//                 </Link>
//               </div>
//               <div style={{ display: 'flex' }}>
//                 <button id="savebtncs" onClick={handlecreateMachinedetails}>
//                   Save
//                 </button>
//               </div>
//             </Grid>
//           )}
//         </Grid>
//       </div>
//     </Paper>
//   );
// };

// export default Machinescheduleadd;
import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import { createMachineSchedule, fetchAllMachine, fetchAllMaintenanceType, MachineScheduleview, updateMachineSchedule } from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Maintenancetype from 'component/maintenancetype';

const Machinescheduleadd = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [machine, setMachine] = useState([]);
  const [machinename, setmachinename] = useState('');
  const [formData, setFormData] = useState({
    machineId: '',
    frequency: '',
    date: new Date(),
    interval: '',
    type: '',
    maintenanceType: []
  });
  const [maintenanceTypeOptions, setmaintenanceTypeOptions] = useState([]);
  const [selectedmaintenanceType, setSelectedmaintenanceType] = useState([]);
  const [maintenanceTypeDrawerOpen, setmaintenanceTypeDrawerOpen] = useState(false);

  useEffect(() => {
    const fetchMachineData = async () => {
      try {
        const response = await dispatch(fetchAllMachine());
        if (Array.isArray(response)) {
          const options = response.map((machine) => ({ value: machine.id, label: machine.name }));
          setMachine(options);
        }
      } catch (error) {
        console.error('Error fetching machines:', error);
      }
    };

    const fetchMaintenanceTypeData = async () => {
      try {
        const response = await dispatch(fetchAllMaintenanceType());
        if (Array.isArray(response)) {
          const options = response.map((type) => ({
            value: type.id,
            label: type.name
          }));
          setmaintenanceTypeOptions([{ value: 'new_group', label: 'Create New Type' }, ...options]);
        }
      } catch (error) {
        console.error('Error fetching maintenance types:', error);
      }
    };

    fetchMachineData();
    fetchMaintenanceTypeData();
  }, [dispatch]);

  useEffect(() => {
    const viewData = async () => {
      try {
        if (id) {
          const response = await dispatch(MachineScheduleview(id));
          const { machineId, frequency, date, interval, type, maintenanceTypes, scheduleMachine } = response;

          // Set form data
          setFormData({
            machineId,
            frequency,
            date: new Date(date),
            interval,
            type,
            maintenanceType: maintenanceTypes.map((mt) => mt.id)
          });
          setmachinename(scheduleMachine.name);

          // Set selected maintenance types
          const selectedOptions = maintenanceTypeOptions.filter((option) => maintenanceTypes.some((mt) => mt.id === option.value));
          setSelectedmaintenanceType(selectedOptions);
        }
      } catch (error) {
        console.error('Error fetching Machine:', error);
      }
    };

    viewData();
  }, [id, maintenanceTypeOptions, dispatch]);

  const handlecreateMachinedetails = async () => {
    try {
      if (id) {
        await dispatch(updateMachineSchedule(id, formData, navigate));
      } else {
        await dispatch(createMachineSchedule(formData, navigate));
      }
    } catch (error) {
      console.error('Error creating machine data:', error);
    }
  };

  const handleSelectChange = (selectedOption) => {
    setFormData((prevState) => ({
      ...prevState,
      machineId: selectedOption.value
    }));
    setmachinename(selectedOption.label);
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleTypeChange = (selectedOption) => {
    setFormData({ ...formData, type: selectedOption.value });
  };

  const handleFrequencyChange = (selectedOption) => {
    setFormData({ ...formData, frequency: selectedOption.value });
  };

  const handledateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const Types = [
    { value: 'Regular', label: 'Regular' },
    { value: 'Preventive', label: 'Preventive' },
    { value: 'Break Down', label: 'Break Down' }
  ];

  const Frequency = [
    { value: 'Daily', label: 'Daily' },
    { value: 'Weekly', label: 'Weekly' },
    { value: 'Monthly', label: 'Monthly' }
  ];

  const handleMaintenanceTypeChange = (selectedOptions) => {
    if (selectedOptions.some((option) => option.label === 'Create New Type')) {
      setmaintenanceTypeDrawerOpen(true);
    } else {
      const selectedValues = selectedOptions.map((option) => option.value);
      setSelectedmaintenanceType(selectedOptions);
      setFormData((prevState) => ({
        ...prevState,
        maintenanceType: selectedValues
      }));
    }
  };

  const handleNewMaintenanceAdded = (type) => {
    const data = [
      ...maintenanceTypeOptions,
      {
        value: type.id,
        label: type.name
      }
    ];
    setmaintenanceTypeOptions(data);
    setmaintenanceTypeDrawerOpen(false);
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Machine Schedule
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Add Machine Schedule
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Machine Id : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={machine}
                value={{ value: formData.machineId, label: machinename }}
                onChange={handleSelectChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Frequency : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                options={Frequency}
                value={Frequency.find((option) => option.value === formData.frequency)}
                onChange={handleFrequencyChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.date}
                onChange={(date) => handledateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Interval : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter interval"
                id="interval"
                type="number"
                value={formData.interval}
                onChange={(e) => handleInputChange('interval', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select options={Types} value={Types.find((option) => option.value === formData.type)} onChange={handleTypeChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Maintenance Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select options={maintenanceTypeOptions} isMulti value={selectedmaintenanceType} onChange={handleMaintenanceTypeChange} />
              <Maintenancetype
                anchor="Right"
                open={maintenanceTypeDrawerOpen}
                onClose={() => setmaintenanceTypeDrawerOpen(false)}
                onnewadded={handleNewMaintenanceAdded}
              />
            </Grid>
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link style={{ textDecoration: 'none' }} to="/machineschedulelist">
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" onClick={handlecreateMachinedetails}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/machineschedulelist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreateMachinedetails}>
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

export default Machinescheduleadd;
