import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import { createBom, fetchAllWastage, getAllBom, updateBom, viewSingleBom, getAllFinishedGoods, getAllRawMaterials } from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import Wastage from 'component/wastage';

const Addbillofmaterial = () => {
  const { canCreateItem, canseewastage } = useCan();
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: null, unit: '', wastage: 0 }]);
  const [formData, setFormData] = useState({
    bomNo: 0,
    date: new Date(),
    weight: 0,
    productId: '',
    qty: 0,
    unit: '',
    shift: '',
    wastageId: '',
    wastageQty: 0
  });

  const [startTime, setstartTime] = useState('');
  const [endTime, setendTime] = useState('');
  const [productname, setProductname] = useState('');
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [isrowproductDrawerOpen, setIsrowproductDrawerOpen] = useState(false);
  const [productOptions, setProductOptions] = useState([]);
  const [rawmaterialoption, setRawmaterialoptions] = useState([]);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  const [canCreateWastagevalue, setCanCreateWastagevalue] = useState(null);
  const [totalQty, setTotalQty] = useState(0);
  const [wastageOptions, setWastageOptions] = React.useState([]);
  const [wastagename, setWastagename] = React.useState('');
  const [wastageDrawerOpen, setWastageDrawerOpen] = React.useState(false);

  useEffect(() => {
    setCanCreateProductvalue(canCreateItem());
    setCanCreateWastagevalue(canseewastage());
  }, [canCreateItem, canseewastage]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bomId } = useParams();

  const handleDeleteRow = async (index) => {
    const deletedRowQty = rows[index].qty || 0;
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
    setTotalQty((prevTotal) => prevTotal - parseFloat(deletedRowQty));
  };

  const handleAddRow = () => {
    const newRow = { product: '', qty: null, unit: '', wastage: 0 };
    setRows((prevRows) => [...prevRows, newRow]);
  };
  const calculateTotalQty = (rows) => {
    const total = rows.reduce((sum, row) => sum + parseFloat(row.qty || 0), 0);
    setTotalQty(total);
  };
  const handleSelectProductChange = (selectedOption, rowIndex) => {
    if (selectedOption && selectedOption.label === 'Create New Item') {
      setIsrowproductDrawerOpen(true);
    } else {
      const updatedRows = rows.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...row,
            productId: selectedOption.value,
            productname: selectedOption.label,
            weight: selectedOption.weight,
            unit: selectedOption.unit
          };
        }
        return row;
      });
      setRows(updatedRows);
      setIsrowproductDrawerOpen(false);
      calculateTotalQty(updatedRows);
    }
  };

  const handleProductDrawerSelect = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Item') {
      setIsproductDrawerOpen(true);
    } else {
      setProductname(selectedOption.label);
      setFormData({
        ...formData,
        productId: selectedOption.value,
        weight: selectedOption.weight,
        unit: selectedOption.unit
      });
      setIsproductDrawerOpen(false);
    }
  };

  const handleNewProductAdded = (newProduct) => {
    const updatedProductList = [
      ...productOptions,
      {
        value: newProduct.id,
        label: newProduct.productname,
        weight: newProduct.weight,
        unit: newProduct.unit
      }
    ];
    setProductOptions(updatedProductList);
    setIsproductDrawerOpen(false);
  };

  const handleNewRawProductAdded = (newmaterial) => {
    const updatedProductList = [
      ...rawmaterialoption,
      {
        value: newmaterial.id,
        label: newmaterial.productname,
        weight: newmaterial.weight,
        unit: newmaterial.unit
      }
    ];
    setRawmaterialoptions(updatedProductList);
    setIsrowproductDrawerOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await dispatch(getAllFinishedGoods());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname,
            weight: product.weight,
            unit: product.unit
          }));
          setProductOptions([{ value: 'new', label: 'Create New Item' }, ...options]);
          const product = await dispatch(getAllRawMaterials());
          if (Array.isArray(product)) {
            const rowoptions = product.map((product) => ({
              value: product.id,
              label: product.productname,
              weight: product.weight,
              unit: product.unit
            }));
            setRawmaterialoptions([{ value: 'new', label: 'Create New Item' }, ...rowoptions]);
          }
          if (!canCreateProductvalue) {
            setProductOptions(options);
          }
        } else {
          console.error('fetchAllProductsCash returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    const wastage = async () => {
      try {
        const wastage = await dispatch(fetchAllWastage());
        if (Array.isArray(wastage)) {
          const options = wastage.map((product) => ({
            value: product.id,
            label: product.productname
          }));
          setWastageOptions([{ value: 'new_group', label: 'Create New Wastage' }, ...options]);
          if (!canCreateWastagevalue) {
            setWastageOptions(options);
          }
        }
      } catch (error) {
        console.log(error, 'fetch item Group');
      }
    };
    wastage();
    if (canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, canCreateProductvalue, canCreateWastagevalue]);

  const handleDateChange = (date) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      date: date
    }));
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        const numericValue = field === 'qty' ? parseFloat(value) : value;
        return { ...row, [field]: numericValue };
      }
      return row;
    });
    setRows(updatedRows);
    calculateTotalQty(updatedRows);
  };

  const shift = [
    { value: 'Day', label: 'Day' },
    { value: 'Night', label: 'Night' }
  ];
  const handleshiftChange = (selectedOption) => {
    let startTime = '';
    let endTime = '';

    if (selectedOption.value === 'Day') {
      startTime = '08:00';
      endTime = '20:00';
    } else if (selectedOption.value === 'Night') {
      startTime = '20:00';
      endTime = '08:00';
    }

    setstartTime(startTime);
    setendTime(endTime);
    setFormData({ ...formData, shift: selectedOption.value });
  };

  const handlewastageChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Wastage') {
      // setWastageDrawerOpen(true);
      setIsrowproductDrawerOpen(true);
    } else {
      setWastagename(selectedOption.label);
      setFormData({ ...formData, wastageId: selectedOption.value });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (bomId) {
        const response = await dispatch(viewSingleBom(bomId));
        const { bomNo, date, weight, bomProduct, qty, unit, shift, endTime, startTime, wastageQty, bomWastage } = response;
        setProductname(bomProduct.productname);
        setstartTime(startTime);
        setendTime(endTime);
        setWastagename(bomWastage.productname);
        setFormData({ wastageId: bomWastage.id, date, bomNo, weight, qty, productId: bomProduct.id, unit, shift, wastageQty });
        const updatedRows = response.bomItems.map((item) => ({
          id: item.id,
          productId: item.bomItemsProduct.id,
          productname: item.bomItemsProduct.productname,
          unit: item.unit,
          qty: item.qty
        }));
        setRows(updatedRows);
        calculateTotalQty(updatedRows);
      }
    };

    const generateAutoDebitnoteNumber = async () => {
      if (!bomId) {
        try {
          const BomResponse = await dispatch(getAllBom());
          let nextBomNumber = 1;
          if (BomResponse.length === 0) {
            const BomNumber = nextBomNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              bomNo: Number(BomNumber)
            }));
            return;
          }
          const existingBomNumbers = BomResponse.map((Bom) => {
            const BomNumber = Bom.bomNo;
            return parseInt(BomNumber);
          });
          const maxBomNumber = Math.max(...existingBomNumbers);
          if (!isNaN(maxBomNumber)) {
            nextBomNumber = maxBomNumber + 1;
          }

          const BomNumber = nextBomNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            bomNo: Number(BomNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Bom number:', error);
        }
      }
    };
    generateAutoDebitnoteNumber();
    fetchData();
  }, [dispatch, bomId]);

  const handleCreateOrUpdateInvoice = async () => {
    try {
      const payload = {
        ...formData,
        totalQty: totalQty,
        startTime,
        endTime,
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          qty: row.qty,
          unit: row.unit
        }))
      };
      if (bomId) {
        await dispatch(updateBom(bomId, payload, navigate));
      } else {
        await dispatch(createBom(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating or updating invoice:', error);
    }
  };

  const handleNewgroupadded = (newWastage) => {
    const updatedwastagelist = [
      ...wastageOptions,
      {
        value: newWastage.id,
        label: newWastage.name
      }
    ];
    setWastageOptions(updatedwastagelist);
    setWastageDrawerOpen(false);
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {bomId ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Production
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Production
          </Typography>
        )}
        <Grid container spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Product Name: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              color="secondary"
              onChange={(selectedOption) => handleProductDrawerSelect(selectedOption)}
              options={productOptions}
              value={{ value: formData.productId, label: productname }}
            />
            <AnchorProductDrawer
              open={isproductDrawerOpen}
              onClose={() => setIsproductDrawerOpen(false)}
              onSelectProduct={(selectedOption) => handleProductDrawerSelect(selectedOption)}
              onNewProductAdded={handleNewProductAdded}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              QTY : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="QTY" value={formData.qty} onChange={(e) => setFormData({ ...formData, qty: parseFloat(e.target.value) })} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Batch No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input placeholder="No." value={formData.bomNo} onChange={(e) => setFormData({ ...formData, bomNo: e.target.value })} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <DatePicker
              selected={formData.date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              isClearable={false}
              showTimeSelect={false}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Weight : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="Enter Weight"
              type="number"
              step="0.01"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">Unit :</Typography>
            <input placeholder="unit" value={formData.unit}></input>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Shift : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select options={shift} value={shift.find((option) => option.value === formData.shift)} onChange={handleshiftChange} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Start Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              type="time"
              value={startTime}
              onChange={(e) => {
                setstartTime(e.target.value);
                setFormData({ ...formData, startTime: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              End Time: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              type="time"
              value={endTime}
              onChange={(e) => {
                setendTime(e.target.value);
                setFormData({ ...formData, endTime: e.target.value });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Wastage :<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <Select
              id="itemgroup"
              options={wastageOptions}
              value={{ value: formData.wastageId, label: wastagename }}
              onChange={(selectedOption) => handlewastageChange(selectedOption)}
              styles={{
                container: (base) => ({
                  ...base,
                  width: '80%'
                })
              }}
            />
            <Wastage anchor="Right" onnewadded={handleNewgroupadded} open={wastageDrawerOpen} onClose={() => setWastageDrawerOpen(false)} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="subtitle1">
              Wastage QTY : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
            </Typography>
            <input
              placeholder="QTY"
              type="number"
              value={formData.wastageQty}
              onChange={(e) => setFormData({ ...formData, wastageQty: parseFloat(e.target.value) })}
            />
          </Grid>
        </Grid>

        <Grid item xs={12} style={isMobileX ? { overflowX: 'auto' } : {}}>
          <div style={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={500} sx={{ fontSize: '12px' }}>
                    RAW MATERIAL PRODUCT : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    QTY : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>UNIT :</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Select
                        color="secondary"
                        onChange={(selectedOption) => handleSelectProductChange(selectedOption, index)}
                        options={rawmaterialoption}
                        value={{ value: row.productId, label: row.productname }}
                      />
                    </TableCell>
                    <AnchorProductDrawer
                      open={isrowproductDrawerOpen}
                      onClose={() => setIsrowproductDrawerOpen(false)}
                      onSelectProduct={(selectedOption) => handleSelectProductChange(selectedOption, index)}
                      onNewProductAdded={handleNewRawProductAdded}
                    />
                    <TableCell id="newcs">
                      <input
                        placeholder="qty"
                        type="number"
                        value={row.qty}
                        onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                      />
                    </TableCell>

                    <TableCell>{row.unit}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => {
                          handleDeleteRow(index);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">Total Quantity:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{totalQty}</Typography>
                  </TableCell>
                </TableRow>
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
        )}
      </div>
    </Paper>
  );
};

export default Addbillofmaterial;