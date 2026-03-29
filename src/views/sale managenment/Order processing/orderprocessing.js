import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../../component/addparty';
import { useMediaQuery } from '@mui/material';
import {
  Orderprocessingview,
  createOrderprocessing,
  fetchAllAccountCash,
  getallOrderItems,
  getallOrderprocessing,
  updateOrderprocessing
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const Orderprocessing = () => {
  const { canDeleteOrderProcessing, canseecreateAccount } = useCan();
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: '', unit: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    accountId: '',
    date: convertToIST(new Date()),
    orderProcessingNo: ''
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [account, setAccount] = useState([]);
  const [accountname, setAccountname] = useState('');
  const [product, setProduct] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [orderprocessingData, setOrderprocessingData] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [canCreateAccountValue, setCanCreateAccountValue] = useState(null);

  useEffect(() => {
    setCanCreateAccountValue(canseecreateAccount());
  }, [canseecreateAccount]);

  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    const deletedRow = updatedRows.splice(index, 1)[0];
    setRows(updatedRows);

    const deletedAmount = deletedRow.mrp;
    const newSubtotal = subtotal - deletedAmount;
    setSubtotal(newSubtotal < 0 ? 0 : newSubtotal);
    const newQty = totalQuantity - deletedRow.qty;
    setTotalQuantity(newQty < 0 ? 0 : newQty);
  };

  const handleAddRow = () => {
    const newRow = { product: '', qty: '', unit: '', mrp: '' };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  // use for select product name from dropdown
  const handleSelectproductChange = (selectedOption, index) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return {
          ...row,
          productId: selectedOption.value,
          productname: selectedOption.label,
          unit: selectedOption.unit
        };
      }
      return row;
    });

    setRows(updatedRows);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccountCash());
        if (Array.isArray(response)) {
          const options = response.map((account) => ({ value: account.id, label: account.contactPersonName }));
          setAccount([{ value: 'new', label: 'Create New Party' }, ...options]);
          if (!canCreateAccountValue) {
            setAccount(options);
          }
        }
        const productResponse = await dispatch(getallOrderItems());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({
            value: product.productId,
            label: product.productname,
            unit: product.unit,
            availableQty: product.availableQtyAfterOrder,
            currentStock: product.currentStock,
            orderedQty: product.orderedQty
          }));
          setProduct(options);
        } else {
          console.error('fetchAllProductsCash returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching order processing:', error);
      }
    };

    if (canCreateAccountValue !== null) {
      fetchData();
    }
  }, [dispatch, id, canCreateAccountValue]);

  // use for select account name from dropdown
  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Party') {
      setIsDrawerOpen(true);
    } else {
      formData.accountId = selectedOption.value;
      setFormData(formData);
      setAccountname(selectedOption.label);
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    const initialSubtotal = rows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(initialSubtotal);
    const initialtotalQty = rows.reduce((acc, row) => acc + Number(row.qty), 0);
    setTotalQuantity(initialtotalQty);
  }, [rows]);

  const handleDateChange = (date) => {
    if (date instanceof Date) {
      setFormData({ ...formData, date: convertToIST(date) });
    } else {
      console.error('Invalid date provided to handleDateChange:', date);
    }
  };

  //manage value of input of row
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    updatedRows.forEach((row) => {
      const amount = row.qty * row.rate || 0;
      row.mrp = amount;
    });
    setRows(updatedRows);
  };

  useEffect(() => {
    const data = async () => {
      if (id) {
        const response = await dispatch(Orderprocessingview(id));
        setOrderprocessingData(response);
        const { date, totalMrp, totalQty, orderAccount, orderProcessingNo, status } = response;
        setFormData({ date, totalMrp, totalQty, orderProcessingNo, accountId: orderAccount.id, status });
        setAccountname(orderAccount.contactPersonName);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.orderProduct.id,
          productname: item.orderProduct.productname,
          unit: item.unit,
          qty: item.qty,
          rate: item.rate,
          mrp: item.qty * item.rate
        }));
        setRows(updatedRows);
      }
    };
    const generateAutoOrderNumber = async () => {
      if (!id) {
        try {
          const orderprocessingResponse = await dispatch(getallOrderprocessing());
          let nextOrderNumber = 1;
          if (orderprocessingResponse.data.length === 0) {
            const OrderNumber = nextOrderNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              orderProcessingNo: Number(OrderNumber)
            }));
            return;
          }
          const existingOrderNumbers = orderprocessingResponse.data.map((order) => {
            const OrderNumber = order.orderProcessingNo;
            return parseInt(OrderNumber);
          });
          const maxOrderNumber = Math.max(...existingOrderNumbers);
          if (!isNaN(maxOrderNumber)) {
            nextOrderNumber = maxOrderNumber + 1;
          }

          const OrderNumber = nextOrderNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            orderProcessingNo: Number(OrderNumber)
          }));
        } catch (error) {
          console.error('Error generating auto order number:', error);
        }
      }
    };
    generateAutoOrderNumber();
    data();
  }, [dispatch, id]);
  //create new customer after show in dropdwon
  const handleNewAccount = (newAccountData) => {
    setAccount((prevAccounts) => [...prevAccounts, { value: newAccountData.id, label: newAccountData.contactPersonName }]);
    setIsDrawerOpen(false);
  };

  const handlecreateOrder = async () => {
    try {
      if (id) {
        const payload = {
          ...formData,
          totalQty: totalQuantity,
          totalMrp: subtotal,
          items: rows.map((row) => ({
            id: row.id || null,
            productId: row.productId,
            unit: row.unit,
            qty: Number(row.qty)
          }))
        };
        await dispatch(updateOrderprocessing(id, payload, navigate));
      } else {
        const payload = {
          ...formData,
          totalQty: totalQuantity,
          totalMrp: subtotal,
          items: rows.map((row) => ({
            productId: row.productId,
            unit: row.unit,
            qty: Number(row.qty)
          }))
        };
        await dispatch(createOrderprocessing(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating order processing:', error);
    }
  };

  const getStock = (row) => {
    if (row.qty == '' || product.length == 0) {
      return '';
    }
    const item = product.find((pro) => pro.value === row.productId);

    if (!item) {
      return '';
    }

    let oldQty = 0;
    if (id && orderprocessingData) {
      const oldItem = orderprocessingData.items.find((pro) => pro.productId === row.productId);
      if (oldItem) {
        oldQty = oldItem.qty;
      }
    }
    const currentStock = item.currentStock || 0;
    const orderedQty = item.orderedQty || 0;
    const itemStock = currentStock - row.qty;

    let color = 'black';
    let message = `${currentStock}`;

    if (itemStock < 0) {
      color = 'red'; // insufficient stock
      message = `${itemStock}`;
    } else if (itemStock >= 0 && currentStock - (orderedQty - oldQty) < row.qty) {
      color = 'orange'; // alert zone: low stock
      message = `${currentStock}`;
    } else {
      color = 'green'; // sufficient stock
      message = `${currentStock}`;
    }
    return <div style={{ color: color }}>{message}</div>;
  };

  const getCurrentOrder = (row) => {
    if (row.qty == '' || product.length == 0) {
      return '';
    }
    const item = product.find((pro) => pro.value === row.productId);

    if (!item) {
      return '';
    }
    return <div>{item.orderedQty || 0}</div>;
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Order Processing
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Order Processing
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Order Processing No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="orderProcessingNo"
                value={formData.orderProcessingNo}
                onChange={(e) => setFormData({ ...formData, orderProcessingNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Party : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={account}
                value={{ value: formData.accountId, label: accountname }}
                onChange={handleSelectChange}
              />
            </Grid>
            <AnchorTemporaryDrawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} onAccountCreate={handleNewAccount} />

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.date ? new Date(formData.date) : null}
                onChange={(date) => handleDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            {id && (
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="subtitle1">Status :</Typography>
                <input placeholder="Status" id="orderStatus" value={formData.status} disabled />
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} style={isMobileX ? { overflowX: 'auto' } : {}}>
            <div style={{ maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell width={500} sx={{ fontSize: '12px' }}>
                    PRODUCT : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>UNIT :</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    QTY : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>In Stock / Out of Stock :</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>Order</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Select
                          color="secondary"
                          onChange={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                          options={product}
                          value={{ value: row.productId, label: row.productname }}
                        />
                      </TableCell>
                      <TableCell>{row.unit}</TableCell>
                      <TableCell id="newcs">
                        <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                      </TableCell>
                      <TableCell id="newcs" style={{ fontSize: '16px' }}>
                        {getStock(row)}
                      </TableCell>
                      <TableCell id="newcs" style={{ fontSize: '16px' }}>
                        {getCurrentOrder(row)}
                      </TableCell>
                      <TableCell disabled={!canDeleteOrderProcessing()}>
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

          <Grid item xs={12}>
            {isMobile ? (
              // For mobile screens, show each total on separate lines
              <>
                {/* <div id="subtotalcs">
                  <h3>Total Amt.</h3>
                  <h3>₹{subtotal}</h3>
                </div> */}
                <div id="subtotalcs">
                  <h3>Total QTY.</h3>
                  <h3>₹{totalQuantity}</h3>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line

              <div style={{ float: 'right', width: '30%' }}>
                {/* <div
                  id="subtotalcs"
                  style={{
                    borderBottom: 'none'
                  }}
                >
                  <h3>Total Amt.</h3>
                  <h3>₹{subtotal}</h3>
                </div> */}
                <div
                  id="subtotalcs"
                  style={{
                    borderBottom: 'none'
                  }}
                >
                  <h3>Total QTY.</h3>
                  <h3>{totalQuantity}</h3>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/orderprocessinglist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handlecreateOrder}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/orderprocessinglist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreateOrder}>
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

export default Orderprocessing;
