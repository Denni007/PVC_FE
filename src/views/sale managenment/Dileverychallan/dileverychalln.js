import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import { useDispatch } from 'react-redux';
import AnchorTemporaryDrawer from '../../../component/addparty';
import AnchorProductDrawer from '../../../component/productadd';
import 'react-toastify/dist/ReactToastify.css';
import { createDeliveryChallan, fetchAllAccounts, getallDeliverychallan, getallSalesInvoice, updateDileveryChallan } from 'store/thunk';
import { fetchAllProducts } from 'store/thunk';
import { Link } from 'react-router-dom';

import { Deliverychallanview } from 'store/thunk';
import { useNavigate, useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const Deliverychallan = () => {
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { id } = useParams();
  console.log(id, 'id');
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canseecreateAccount, canCreateItem } = useCan();
  const [rows, setRows] = useState([{ product: '', qty: '', unit: '' }]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [account, setaccount] = useState([]);
  const [invoice, setinvoice] = useState([]);
  const [selectaccount, setSelectaccount] = useState('');
  const [accountname, setAccountname] = useState('');
  const [invoicelabel, setInvoicelabel] = useState('');
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountId: '',
    date: convertToIST(new Date()),
    challanno: 0,
    saleInvoiceId: ''
  });
  const [canseecreateAccountValue, setcanseecreateAccountValue] = useState(null);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setcanseecreateAccountValue(canseecreateAccount());
    setCanCreateProductvalue(canCreateItem());
  }, [canseecreateAccount, canCreateItem]);
  // to add multiple row for product item
  const handleAddRow = () => {
    const newRow = {
      product: '',
      qty: '',
      unit: ''
    };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  useEffect(() => {
    const updateTotalQuantity = () => {
      let total = 0;
      rows.forEach((row) => {
        total += parseInt(row.qty);
      });
      setTotalQuantity(total);
    };
    updateTotalQuantity();
  }, [rows]);
  //set input's target value
  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        return { ...row, [field]: value };
      }
      return row;
    });
    setRows(updatedRows);
    let total = 0;
    rows.forEach((row) => {
      total += parseInt(row.qty);
    });
    setTotalQuantity(total);
  };

  // use for delete row
  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    updatedRows.splice(index, 1);
    setRows(updatedRows);
  };

  //use for select customer name from dropdown
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

  const handleSelectinvoicenoChange = async (selectedOption) => {
    if (selectedOption && selectedOption.value) {
      try {
        setFormData((prevFormData) => ({
          ...prevFormData,
          saleInvoiceId: selectedOption.value
        }));
        setInvoicelabel(selectedOption.label);

        const invoiceresponse = await dispatch(getallSalesInvoice());
        const selectedInvoice = invoiceresponse.data.find((inv) => inv.id === selectedOption.value);

        if (selectedInvoice && selectedInvoice.items) {
          const updatedRows = selectedInvoice.items.map((item) => ({
            productId: item.productId,
            product: item.InvoiceProduct.productname,
            qty: item.qty,
            unit: item.unit
          }));
          setRows(updatedRows);
        }
      } catch (error) {
        console.error('Error fetching and updating invoice items:', error);
      }
    }
  };

  //use for select product name from dropdown
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
            product: selectedOption.label,
            unit: selectedOption.unit
          };
        }
        return row;
      });

      setRows(updatedRows);
      setSelectproduct(selectedOption.value);
      setIsproductDrawerOpen(false);
    }
  };
  const handleNewProductAdded = (newProduct) => {
    const updatedProductList = [
      ...product,
      {
        value: newProduct.id,
        label: newProduct.productname,
        unit: newProduct.unit
      }
    ];
    setProduct(updatedProductList);
    setIsproductDrawerOpen(false);
  };

  const handleChallanDateChange = (date) => {
    if (date instanceof Date) {
      setFormData({ ...formData, date: convertToIST(date) });
    } else {
      console.error('Invalid date provided to handleChallanDateChange:', date);
    }
  };

  // call all customer and all product api's
  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoiceresponse = await dispatch(getallSalesInvoice());

        if (Array.isArray(invoiceresponse.data)) {
          const options = invoiceresponse.data.map((invoice) => ({ value: invoice.id, label: invoice.invoiceno }));
          setinvoice([...options]);
        }
        const response = await dispatch(fetchAllAccounts());
        if (Array.isArray(response)) {
          const options = response.map((account) => ({ value: account.id, label: account.accountName }));
          setaccount([{ value: 'new', label: 'Create New Party' }, ...options]);
          if (!canseecreateAccountValue) {
            setaccount(options);
          }
        }
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname,
            unit: product.unit
          }));
          setProduct([{ value: 'new', label: 'Create New Item' }, ...options]);
          if (!canCreateProductvalue) {
            setProduct(options);
          }
        } else {
          console.error('fetchAllProducts returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching delivery challan:', error);
      }
    };
    if (canseecreateAccountValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, id, canseecreateAccountValue, canCreateProductvalue]);

  useEffect(() => {
    const data = async () => {
      try {
        if (id) {
          console.log(id, 'viewid');
          const response = await dispatch(Deliverychallanview(id));
          const { accountDelivery, date, challanno, saleDeliveryChallan } = response;
          setFormData({ accountId: accountDelivery.id, date, challanno, saleInvoiceId: saleDeliveryChallan.id });
          setSelectaccount(accountDelivery.id);
          setAccountname(accountDelivery.accountName);
          setInvoicelabel(saleDeliveryChallan.invoiceno);
          const updatedRows = response.items.map((item) => ({
            id: item.id,
            productId: item.DeliveryProduct.id,
            product: item.DeliveryProduct.productname,
            unit: item.unit,
            qty: item.qty
          }));
          setRows(updatedRows);
        }
      } catch (error) {
        console.error('Error fetching delivery challan view:', error);
        if (error.response.status === 401) {
          navigate('/');
        }
      }
    };

    const generateAutoChallanNumber = async () => {
      if (!id) {
        try {
          const ChallanResponse = await dispatch(getallDeliverychallan());
          let nextChallanNumber = 1;
          if (ChallanResponse.length === 0) {
            const ChallanNumber = nextChallanNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              challanno: Number(ChallanNumber)
            }));
            return;
          }
          const existingChallanNumbers = ChallanResponse.map((Challan) => {
            const ChallanNumber = Challan.challanno;
            return parseInt(ChallanNumber);
          });
          const maxChallanNumber = Math.max(...existingChallanNumbers);
          if (!isNaN(maxChallanNumber)) {
            nextChallanNumber = maxChallanNumber + 1;
          }

          const ChallanNumber = nextChallanNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            challanno: Number(ChallanNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Delivery Challan number:', error);
        }
      }
    };

    generateAutoChallanNumber();
    data();
  }, [dispatch, id, navigate]);

  //create new account after show in dropdwon
  const handleNewAccount = (newAccountData) => {
    setaccount((prevAccounts) => [...prevAccounts, { value: newAccountData.id, label: newAccountData.accountName }]);
    setIsDrawerOpen(false);
  };
  //call craete and update deliverychallan and deliverychallan items
  const handlecreatedeliverychallan = async () => {
    try {
      if (id) {
        const payload = {
          ...formData,
          challanno: formData.challanno,
          totalQty: totalQuantity,
          items: rows.map((row) => ({
            id: row.id || null,
            productId: row.productId,
            qty: Number(row.qty),
            unit: row.unit
          }))
        };
        dispatch(updateDileveryChallan(id, payload, navigate));
      } else {
        const payload = {
          ...formData,
          totalQty: totalQuantity,
          items: rows.map((row) => ({
            productId: row.productId,
            qty: Number(row.qty),
            unit: row.unit
          }))
        };
        await dispatch(createDeliveryChallan(payload, navigate));
        console.log(selectaccount);
      }
    } catch (error) {
      console.error('Error creating delivery challan:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Delivery Challan
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Delivery Challan
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
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
                Invoice No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={Array.isArray(invoice) ? invoice : invoice}
                value={{ value: formData.saleInvoiceId, label: invoicelabel }}
                onChange={handleSelectinvoicenoChange}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Challan No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="challanno"
                value={formData.challanno}
                onChange={(e) => setFormData({ ...formData, challanno: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Challan Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.date ? new Date(formData.date) : null}
                onChange={(date) => handleChallanDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
          </Grid>

          <Grid item xs={12} style={isMobileX ? { overflowX: 'auto' } : {}}>
            <div style={{ maxWidth: '100%' }}>
              <Table>
                <TableHead>
                  <TableCell sx={{ fontSize: '12px' }}>
                    PRODUCT : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    QTY:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>UNIT:</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell id="newcs">
                          <Select
                            color="secondary"
                            onChange={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                            options={product}
                            value={{ value: row.productId, label: row.product }}
                          />
                        </TableCell>
                        <AnchorProductDrawer
                          open={isproductDrawerOpen}
                          onClose={() => setIsproductDrawerOpen(false)}
                          onNewProductAdded={handleNewProductAdded}
                        />

                        <TableCell id="newcs">
                          <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                        </TableCell>
                        <TableCell>{row.unit}</TableCell>

                        <TableCell sx={{ display: 'flex', justifyContent: 'left' }}>
                          <DeleteIcon onClick={() => handleDeleteRow(index)} />
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
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

          {/* <Grid item xs={12}>
            {isMobile ? (
              // For mobile screens, show each total on separate lines
              <>
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹{subtotal}</p>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹{subtotal}</p>
                </div>
              </div>
            )}
          </Grid> */}

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/deliverychallanlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
                <button id="savebtncs" style={{ marginLeft: '5px' }} onClick={handlecreatedeliverychallan}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/deliverychallanlist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                {/* <button id="savebtncs" style={{ marginRight: '5px' }} onClick={handlecreatedeliverychallan}>
                  Save & Next
                </button> */}
                <button id="savebtncs" onClick={handlecreatedeliverychallan}>
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

export default Deliverychallan;
