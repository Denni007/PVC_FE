import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
// import { withStyles } from '@mui/styles';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import { useDispatch } from 'react-redux';
import AnchorTemporaryDrawer from '../../../component/addparty';
import {
  fetchAllProducts,
  createSalesInvoice,
  SalesInvoiceview,
  updateSalesinvoice,
  fetchuserwiseCompany,
  getallSalesInvoice,
  fetchproformainvoiceList,
  fetchAllAccounts
} from 'store/thunk';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AnchorProductDrawer from 'component/productadd';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const Salesinvoice = () => {
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const [rows, setRows] = useState([{ product: '', qty: '', unit: '', rate: '', mrp: '' }]);
  const { canseecreateAccount, canCreateItem } = useCan();
  const isMobile = useMediaQuery('(max-width:600px)');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [accountname, setAccountname] = useState('');
  const [companystate, setCompanystate] = useState('');
  const [accountState, setAccountState] = useState('');
  const [gststate, setGststate] = useState('');
  const [plusgst, setPlusgst] = useState(0);
  const [productResponse, setProductResponse] = useState([]);
  const [account, setAccount] = useState([]);
  const [selectaccount, setSelectaccount] = useState([]);
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [proformainvoice, setProformainvoice] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [formData, setFormData] = useState({
    accountId: '',
    destination: null,
    dispatchThrough: null,
    dispatchno: null,
    LL_RR_no: null,
    motorVehicleNo: null,
    invoiceno: null,
    invoicedate: convertToIST(new Date()),
    termsOfDelivery: '',
    terms: '',
    proFormaNo: ''
  });
  const { id } = useParams();
  const [subtotal, setSubtotal] = useState(0);
  const navigate = useNavigate();
  const [canCreateAccountValue, setCanCreateAccountValue] = useState(null);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setCanCreateAccountValue(canseecreateAccount());
    setCanCreateProductvalue(canCreateItem());
  }, [canseecreateAccount, canCreateItem]);

  const handleAddRow = () => {
    const newRow = { product: '', qty: '', rate: '', mrp: '' };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    const deletedRow = updatedRows.splice(index, 1)[0];

    if (deletedRow.mrp) {
      const deletedAmount = parseFloat(deletedRow.mrp);
      const newSubtotal = subtotal - deletedAmount;
      setSubtotal(newSubtotal < 0 ? 0 : newSubtotal);
    }

    if (deletedRow.gst) {
      const deletedGST = parseFloat(deletedRow.gst);
      const newPlusgst = plusgst - deletedGST;
      setPlusgst(newPlusgst < 0 ? 0 : newPlusgst);
    }

    setRows(updatedRows);
  };

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label === 'Create New Party') {
      setIsDrawerOpen(true);
    } else {
      formData.accountId = selectedOption.value;
      setFormData(formData);
      setAccountname(selectedOption.label);
      setAccountState(selectedOption.state);
      setIsDrawerOpen(false);
    }
  };

  const handleSelectproductChange = (selectedOption, index) => {
    console.log(selectproduct);
    if (selectedOption && selectedOption.label === 'Create New Item') {
      setIsproductDrawerOpen(true);
    } else {
      const updatedRows = rows.map((row, rowIndex) => {
        if (rowIndex === index) {
          const newMrp = row.qty * selectedOption.rate;
          const newGst = newMrp * (selectedOption.gstrate / 100);
          return {
            ...row,
            productId: selectedOption.value,
            product: selectedOption.label,
            rate: selectedOption.rate,
            unit: selectedOption.unit,
            mrp: newMrp,
            gstrate: selectedOption.gstrate,
            gst: newGst
          };
        }
        return row;
      });

      // Move the total GST calculation outside the map function
      const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
      setPlusgst(totalGST);
      setRows(updatedRows);
      setSelectproduct(selectedOption.value);
      setIsproductDrawerOpen(false);
    }
  };

  const handleInvoiceDateChange = (date) => {
 if (date instanceof Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    setFormData({ ...formData, invoicedate: formattedDate });
  } else {
    console.error('Invalid date provided to handleDateChange:', date);
  }
  };

  useEffect(() => {
    const generateAutoInvoiceNumber = async () => {
      if (!id) {
        try {
          const invoiceResponse = await dispatch(getallSalesInvoice());
          let nextInvoiceNumber = 1;
          if (invoiceResponse.data.length === 0) {
            const InvoiceNumber = nextInvoiceNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              invoiceno: InvoiceNumber
            }));
            return;
          }
          const existingInvoiceNumbers = invoiceResponse.data.map((Invoice) => {
            const InvoiceNumber = Invoice.invoiceno;
            return parseInt(InvoiceNumber);
          });
          const maxInvoiceNumber = Math.max(...existingInvoiceNumbers);
          if (!isNaN(maxInvoiceNumber)) {
            nextInvoiceNumber = maxInvoiceNumber + 1;
          }
          const invoiceNumber = nextInvoiceNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            invoiceno: invoiceNumber
          }));
        } catch (error) {
          console.error('Error generating auto Sales invoice number:', error);
        }
      }
    };
    generateAutoInvoiceNumber();
  }, [dispatch, id]);

  const handleNewProductAdded = (newProduct) => {
    const updatedProductList = [
      ...product,
      {
        value: newProduct.id,
        label: newProduct.productname,
        rate: newProduct.salesprice,
        unit: newProduct.unit,
        gstrate: newProduct.gstrate
      }
    ];
    setProduct(updatedProductList);
    setIsproductDrawerOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccounts());
        if (Array.isArray(response)) {
          const options = response.map((account) => ({
            value: account.id,
            label: account.accountName,
            state: account.accountDetail?.state
          }));
          setAccount([{ value: 'new', label: 'Create New Party', state: '' }, ...options]);
          if (!canCreateAccountValue) {
            setAccount(options);
          }
        }
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          setProductResponse(productResponse);
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname,
            rate: product.salesprice,
            unit: product.unit,
            gstrate: product.gstrate
          }));
          setProduct([{ value: 'new', label: 'Create New Item', rate: '', gstrate: '', unit: '' }, ...options]);
          if (!canCreateProductvalue) {
            setProduct(options);
          }
        } else {
          console.error('fetchAllProducts returned an unexpected response:', productResponse);
        }

        const data = await dispatch(fetchuserwiseCompany());
        const defaultCompany = data.find((company) => company.setDefault === true);
        if (defaultCompany) {
          setCompanystate(defaultCompany.companies.state);
          const isGstState = defaultCompany.companies.state === accountState;
          setGststate(isGstState);
        } else {
          console.error('No default company found');
        }
      } catch (error) {
        console.error('Error fetching sales invoice:', error);
      }
    };
    if (canCreateAccountValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, companystate, accountState, canCreateAccountValue, canCreateProductvalue]);

  const handleproformnumber = (selectedOption) => {
    console.log(selectedOption, 'Options');
    const updatedFormData = {
      ...selectedOption,
      proFormaNo: selectedOption.value
    };
    setAccountname(selectedOption.accountProForma.accountName);
    setAccountState(selectedOption.accountProForma.accountDetail?.state);
    setFormData({
      ...updatedFormData,
      invoiceno: formData.invoiceno,
      dispatchno: formData.invoiceno
    });
    console.log(updatedFormData, 'form');
    const selectedProFormaItems = selectedOption.items.map((item) => ({
      productId: item.product.id,
      product: item.product.productname,
      qty: item.qty,
      rate: item.rate,
      unit: item.unit,
      mrp: item.qty * item.rate,
      gstrate: item.product.gstrate,
      gst: item.mrp * (item.product.gstrate / 100)
    }));

    setRows(selectedProFormaItems);
    const totalGST = selectedProFormaItems.reduce((acc, row) => acc + row.gst, 0);
    setPlusgst(totalGST);
  };

  useEffect(() => {
    const data = async () => {
      const proformainvoiceresponse = await dispatch(fetchproformainvoiceList());
      const options = proformainvoiceresponse.map((item) => ({
        value: item.ProFormaInvoice_no,
        label: `${item.ProFormaInvoice_no}  ${item.accountProForma?.accountName}`,
        dispatchThrough: item.dispatchThrough,
        motorVehicleNo: item.motorVehicleNo,
        LL_RR_no: item.LL_RR_no,
        dispatchno: item.dispatchno,
        destination: item.destination,
        termsOfDelivery: item.termsOfDelivery,
        terms: item.terms,
        accountId: item.accountId,
        customer: item.customer,
        invoicedate: convertToIST(new Date()),
        items: item.items,
        accountProForma: item.accountProForma
      }));
      setProformainvoice(options);
      if (id) {
        const response = await dispatch(SalesInvoiceview(id));
        const {
          accountSaleInv,
          dispatchThrough,
          motorVehicleNo,
          LL_RR_no,
          destination,
          deliverydate,
          invoiceno,
          invoicedate,
          terms,
          termsOfDelivery,
          duedate,
          proFormaNo
        } = response;
        setFormData({
          accountId: accountSaleInv.id,
          dispatchThrough,
          motorVehicleNo,
          LL_RR_no,
          proFormaNo,
          destination,
          deliverydate,
          invoiceno,
          invoicedate,
          terms,
          termsOfDelivery,
          duedate
        });
        setSelectaccount(accountSaleInv.id);
        setAccountState(accountSaleInv.accountDetail?.state);
        setAccountname(accountSaleInv.accountName);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.InvoiceProduct.id,
          product: item.InvoiceProduct.productname,
          unit: item.unit,
          qty: item.qty,
          rate: item.rate,
          mrp: item.qty * item.rate,
          gstrate: item.InvoiceProduct.gstrate,
          gst: item.mrp * (item.InvoiceProduct.gstrate / 100)
        }));
        setRows(updatedRows);
        const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
        setPlusgst(totalGST);
      }
    };
    data();
  }, [dispatch, id]);

  useEffect(() => {
    const initialSubtotal = rows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(initialSubtotal);
    const updateTotalQuantity = () => {
      let total = 0;
      rows.forEach((row) => {
        total += parseInt(row.qty);
      });
      setTotalQuantity(total);
    };
    updateTotalQuantity();
  }, [rows]);

  //create new Account after show in dropdwon
  const handleNewAccount = (newAccountData) => {
    setAccount((prevAccount) => [
      ...prevAccount,
      {
        value: newAccountData.id,
        label: newAccountData.accountName,
        state: newAccountData.accountDetail?.state
      }
    ]);
    setIsDrawerOpen(false);
  };

  const handleSalesinvoice = async () => {
    try {
      console.log(selectaccount);
      const payload = {
        ...formData,
        dispatchno: formData.invoiceno,
        totalQty: totalQuantity,
        totalMrp: subtotal,
        mainTotal: Number(subtotal) + Number(plusgst),
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          rate: row.rate,
          unit: row.unit,
          qty: Number(row.qty),
          mrp: row.mrp
        }))
      };
      const gststate = companystate === accountState ? 'true' : 'false';
      if (gststate === 'true') {
        payload.totalSgst = plusgst;
        payload.totalIgst = 0;
      } else {
        payload.totalSgst = 0;
        payload.totalIgst = plusgst;
      }
      if (id) {
        await dispatch(updateSalesinvoice(id, payload, navigate));
      } else {
        await dispatch(createSalesInvoice(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating Sales Invoice:', error);
    }
  };
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

    updatedRows.forEach((row) => {
      const amount = row.qty * row.rate;
      row.mrp = amount;
      const gstAmount = row.mrp * (row.gstrate / 100);
      row.gst = gstAmount;
    });

    const newSubtotal = updatedRows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(newSubtotal);
    if (id && gststate) {
      const newPlusgst = updatedRows.reduce((acc, row) => acc + row.gst, 0);
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalSgst: newPlusgst
      }));
    } else {
      const newPlusgst = updatedRows.reduce((acc, row) => acc + row.gst, 0);
      setFormData((prevFormData) => ({
        ...prevFormData,
        totalIgst: newPlusgst
      }));
    }
    setRows(updatedRows);

    const rowId = rows[index];
    const selectedProduct = productResponse.find((product) => product.gstrate === rowId.gstrate);
    if (selectedProduct) {
      const updatedRowsWithGST = updatedRows.map((row) => {
        const gstAmount = row.mrp * (row.gstrate / 100);
        return { ...row, gst: gstAmount };
      });
      const totalGST = updatedRowsWithGST.reduce((acc, row) => acc + row.gst, 0);
      setPlusgst(totalGST);
    }
  };

  const handleTermsChange = (selectedOption) => {
    setFormData({ ...formData, terms: selectedOption.value });
  };

  const termsOptions = [
    { value: 'Immediate', label: 'Immediate' },
    { value: 'Advance', label: 'Advance' },
    { value: 'Terms', label: 'Terms' }
  ];

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Sales Invoice
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Sales Invoice
          </Typography>
        )}

        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Pro forma invoice No. :</Typography>
              <Select
                color="secondary"
                options={proformainvoice}
                value={{ value: formData.proFormaNo, label: formData.proFormaNo }}
                onChange={handleproformnumber}
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
                Invoice No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="invoiceno"
                value={formData.invoiceno}
                onChange={(e) => setFormData({ ...formData, invoiceno: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Invoice Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.invoicedate ? new Date(formData.invoicedate) : null}
                onChange={(date) => handleInvoiceDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Destination :</Typography>
              <input
                placeholder="Destination"
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Dispatch Through :</Typography>
              <input
                id="dispatchThrough"
                value={formData.dispatchThrough}
                onChange={(e) => setFormData({ ...formData, dispatchThrough: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">LR-RR No. :</Typography>
              <input
                placeholder="LR-RR No"
                id="LL_RR_no"
                value={formData.LL_RR_no}
                onChange={(e) => setFormData({ ...formData, LL_RR_no: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Motor Vehical No. :</Typography>
              <input
                placeholder="Vehical No"
                id="motorVehicleNo"
                value={formData.motorVehicleNo}
                onChange={(e) => setFormData({ ...formData, motorVehicleNo: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Dispatch Doc No. :</Typography>
              <input placeholder="Enter Dispatch Doc No." id="dispatchno" value={formData.invoiceno} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Terms : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                options={termsOptions}
                value={termsOptions.find((option) => option.value === formData.terms)}
                onChange={handleTermsChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Terms of Delivery :</Typography>
              <input
                placeholder="Terms of delivery"
                id="termsOfDelivery"
                value={formData.termsOfDelivery}
                onChange={(e) => setFormData({ ...formData, termsOfDelivery: e.target.value })}
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
                  <TableCell sx={{ fontSize: '12px' }}>UNIT :</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    RATE (₹) : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>
                    AMOUNT (₹) : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell sx={{ padding: '5px' }}>
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
                        onSelectProduct={(selectedOption) => handleSelectproductChange(selectedOption, index)}
                        onNewProductAdded={handleNewProductAdded}
                      />
                      <TableCell id="newcs">
                        <input placeholder="qty" value={row.qty} onChange={(e) => handleInputChange(index, 'qty', e.target.value)} />
                      </TableCell>
                      <TableCell>{row.unit}</TableCell>
                      <TableCell id="newcs">
                        <input placeholder="rate" value={row.rate} onChange={(e) => handleInputChange(index, 'rate', e.target.value)} />
                      </TableCell>
                      <TableCell id="newcs" style={{ fontSize: '16px' }}>
                        {row.mrp}
                      </TableCell>
                      <TableCell>
                        <DeleteIcon onClick={() => handleDeleteRow(index)} />
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
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹{subtotal}</p>
                </div>
                {gststate ? (
                  <>
                    <div id="subtotalcs">
                      <p>SGST</p>
                      <p>₹{(plusgst / 2).toFixed(2)}</p>
                    </div>
                    <div id="subtotalcs">
                      <p>CGST</p>
                      <p>₹{(plusgst / 2).toFixed(2)}</p>
                    </div>
                  </>
                ) : (
                  <div id="subtotalcs">
                    <p>IGST</p>
                    <p>₹{plusgst.toFixed(2)}</p>
                  </div>
                )}
                <div id="subtotalcs">
                  <h3>Total Amt.</h3>
                  <h3>₹{(Number(subtotal) + Number(plusgst)).toFixed(2)}</h3>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line
              <div style={{ float: 'right', width: '30%' }}>
                <div id="subtotalcs">
                  <p>Sub Total</p>
                  <p>₹{subtotal}</p>
                </div>
                {gststate ? (
                  <>
                    <div id="subtotalcs">
                      <p>SGST</p>
                      <p>₹{(plusgst / 2).toFixed(2)}</p>
                    </div>
                    <div id="subtotalcs">
                      <p>CGST</p>
                      <p>₹{(plusgst / 2).toFixed(2)}</p>
                    </div>
                  </>
                ) : (
                  <div id="subtotalcs">
                    <p>IGST</p>
                    <p>₹{plusgst.toFixed(2)}</p>
                  </div>
                )}
                <div
                  id="subtotalcs"
                  style={{
                    borderBottom: 'none'
                  }}
                >
                  <h3>Total Amt.</h3>
                  <h3>₹{(Number(subtotal) + Number(plusgst)).toFixed(2)}</h3>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/salesinvoicelist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handleSalesinvoice}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/salesinvoicelist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handleSalesinvoice}>
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

export default Salesinvoice;
