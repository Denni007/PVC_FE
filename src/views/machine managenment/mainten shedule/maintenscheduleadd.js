import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, TableCell, TableBody, TableRow, Table, TableHead } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useMediaQuery } from '@mui/material';
import {
  createAddMaintenance,
  fetchAllMachine,
  fetchAllMaintenanceType,
  fetchAllProducts,
  updateAddMaintenance,
  viewAddMaintenance
} from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Maintenancetype from 'component/maintenancetype';
import AnchorProductDrawer from 'component/productadd';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

const Maintenscheduleadd = () => {
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: '' }]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const [machine, setMachine] = useState([]);
  const [machinename, setmachinename] = useState('');
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [product, setProduct] = useState('');
  const [selectproduct, setSelectproduct] = useState([]);
  const [formData, setFormData] = useState({
    machineId: '',
    date: new Date(),
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
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname,
            unit: product.unit
          }));
          setProduct([{ value: 'new', label: 'Create New Item' }, ...options]);
          if (!canCreateRawmaterialvalue) {
            setProduct(options);
          }
        } else {
          console.error('fetchAllProductsCash returned an unexpected response:', productResponse);
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
          const response = await dispatch(viewAddMaintenance(id));
          const { machineId, date, type, mMaintenanceTypes, machineMaintenance, maintenanceItems } = response;

          // Set form data
          setFormData({
            machineId,
            date: new Date(date),
            type
            // maintenanceType: mMaintenanceTypes.map((mt) => mt.id)
          });
          setmachinename(machineMaintenance.name);
          const updatedRows = maintenanceItems.map((item) => ({
            id: item.id,
            productId: item.maintenanceProduct.id,
            productname: item.maintenanceProduct.productname,
            qty: item.qty
          }));
          setRows(updatedRows);
          // Set selected maintenance types
          const selectedOptions = maintenanceTypeOptions?.filter((option) => mMaintenanceTypes?.some((mt) => mt.id === option.value));
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
      const payload = {
        ...formData,
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          qty: Number(row.qty)
        }))
      };
      if (id) {
        await dispatch(updateAddMaintenance(id, payload, navigate));
      } else {
        await dispatch(createAddMaintenance(payload, navigate));
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

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleTypeChange = (selectedOption) => {
    setFormData({ ...formData, type: selectedOption.value });
  };

  const handledateChange = (date) => {
    setFormData({ ...formData, date });
  };

  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1)[0];
    setRows(updatedRows);
  };

  const handleAddRow = () => {
    const newRow = { product: '', qty: '' };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  // use for select product name from dropdown
  const handleSelectproductChange = (selectedOption, index) => {
    console.log(selectproduct);
    if (selectedOption && selectedOption.label === 'Create New Item') {
      setIsproductDrawerOpen(true);
    } else {
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === index) {
          return {
            ...row,
            productId: selectedOption.value,
            productname: selectedOption.label
          };
        }
        return row;
      });

      setRows(updatedRows);
      setSelectproduct(selectedOption.value);
      setIsproductDrawerOpen(false);
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

  const Types = [
    { value: 'Regular', label: 'Regular' },
    { value: 'Preventive', label: 'Preventive' },
    { value: 'Breakdown', label: 'Break Down' }
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

  const handleNewProductAdded = (newProduct) => {
    const updatedProductList = [
      ...product,
      {
        value: newProduct.id,
        label: newProduct.productname
      }
    ];
    setProduct(updatedProductList);
    setIsproductDrawerOpen(false);
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Mainten Schedule
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Add Mainten Schedule
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
                Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select options={Types} value={Types.find((option) => option.value === formData.type)} onChange={handleTypeChange} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Machine Type : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
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
          <Grid item xs={12} style={isMobileX ? { overflowX: 'auto' } : {}}>
            <div style={{ maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell width={500} sx={{ fontSize: '12px' }}>
                    PRODUCT : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    QTY : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ width: '80px' }}>
                        <Select
                          color="secondary"
                          onChange={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                          options={product}
                          value={{ value: row.productId, label: row.productname }}
                        />
                      </TableCell>
                      <AnchorProductDrawer
                        open={isproductDrawerOpen}
                        onClose={() => setIsproductDrawerOpen(false)}
                        onSelectProduct={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                        onNewProductAdded={handleNewProductAdded}
                      />
                      <TableCell id="newcs">
                        <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                      </TableCell>
                      <TableCell>
                        <DeleteIcon
                          onClick={() => {
                            handleDeleteRow(index);
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Grid>
          <Grid item xs={12}>
            <button id="buttoncs" onClick={handleAddRow}>
              <AddIcon sx={{ fontSize: '18px' }} /> Add Row
            </button>
          </Grid>
          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link style={{ textDecoration: 'none' }} to="/maintenschedulelist">
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
                <Link to="/maintenschedulelist" style={{ textDecoration: 'none' }}>
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

export default Maintenscheduleadd;
