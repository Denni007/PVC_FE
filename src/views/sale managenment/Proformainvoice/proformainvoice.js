import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableHead, TableCell, TableBody, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useMediaQuery } from '@mui/material';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import AnchorTemporaryDrawer from '../../../component/addparty';
import AnchorProductDrawer from '../../../component/productadd';
import { useDispatch } from 'react-redux';
import {
  createProformainvoice,
  Proformainvoiceview,
  updateProformainvoice,
  fetchproformainvoiceList,
  fetchuserwiseCompany,
  fetchAllAccounts
} from 'store/thunk';
import { fetchAllProducts } from 'store/thunk';
import { useNavigate, useParams } from 'react-router-dom';
import useCan from 'views/permission managenment/checkpermissionvalue';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { convertToIST } from 'component/details';

const Proformainvoice = () => {
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const { canseecreateAccount, canCreateItem } = useCan();
  const [rows, setRows] = useState([{ product: '', qty: '', unit: '', rate: '', mrp: '' }]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [account, setaccount] = useState([]);
  const [selectaccount, setSelectaccount] = useState('');
  const [accountState, setAccountState] = useState('');
  const [accountname, setAccountname] = useState('');
  const [companystate, setCompanystate] = useState('');
  const [product, setProduct] = useState([]);
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gststate, setGststate] = useState('');
  const [formData, setFormData] = useState({
    accountId: '',
    date: convertToIST(new Date()),
    ProFormaInvoice_no: '',
    destination: null,
    dispatchThrough: null,
    LL_RR_no: null,
    motorVehicleNo: null,
    termsOfDelivery: '',
    terms: '',
    validtill: '',
    totalSgst: 0,
    totalIgst: 0,
    totalMrp: 0,
    mainTotal: 0
  });
  const [plusgst, setPlusgst] = useState(formData.totalSgst || formData.totalIgst || 0);
  const [productResponse, setProductResponse] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [canCreateAccountValue, setCanCreateAccountValue] = useState(null);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setCanCreateAccountValue(canseecreateAccount());
    setCanCreateProductvalue(canCreateItem());
  }, [canseecreateAccount, canCreateItem]);

  // manage button of addrow
  const handleAddRow = () => {
    const newRow = { product: '', qty: '', unit: '', rate: '', mrp: '' };
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

  // use for select product name from dropdown
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
      const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
      setPlusgst(totalGST);

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
          let options = response.map((account) => ({
            value: account.id,
            label: account.accountName,
            state: account.accountDetail?.state
          }));
          setaccount([{ value: 'new', label: 'Create New Party', state: '' }, ...options]);
          if (!canCreateAccountValue) {
            setaccount(options);
          }
        }

        const productResponse = await dispatch(fetchAllProducts());
        setProductResponse(productResponse);

        if (Array.isArray(productResponse)) {
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
        console.log(defaultCompany.companies.state, 'defaultcompany');
        if (defaultCompany) {
          setCompanystate(defaultCompany.companies.state);
          const isGstState = defaultCompany.companies.state === accountState;
          setGststate(isGstState);
        } else {
          console.error('No default company found');
        }
      } catch (error) {
        console.error('Error fetching proformainvoice:', error);
      }
    };

    if (canCreateAccountValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, accountState, id, canCreateAccountValue, canCreateProductvalue]);

  useEffect(() => {
    const data = async () => {
      if (id) {
        const response = await dispatch(Proformainvoiceview(id));
        const {
          accountProForma,
          date,
          ProFormaInvoice_no,
          validtill,
          totalSgst,
          mainTotal,
          totalMrp,
          totalIgst,
          dispatchThrough,
          motorVehicleNo,
          LL_RR_no,
          termsOfDelivery,
          terms,
          destination
        } = response;
        setFormData({
          accountId: accountProForma.id,
          date,
          ProFormaInvoice_no,
          validtill,
          totalSgst,
          mainTotal,
          totalMrp,
          totalIgst,
          dispatchThrough,
          motorVehicleNo,
          LL_RR_no,
          termsOfDelivery,
          terms,
          destination
        });
        setSelectaccount(accountProForma.id);
        setAccountState(accountProForma.accountDetail?.state);
        setAccountname(accountProForma.accountName);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.product.id,
          product: item.product.productname,
          qty: item.qty,
          unit: item.unit,
          rate: item.rate,
          mrp: item.rate * item.qty,
          gstrate: item.product.gstrate,
          gst: item.mrp * (item.product.gstrate / 100)
        }));
        setRows(updatedRows);
        const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
        setPlusgst(totalGST);
      }
    };
    data();
  }, [dispatch, id]);

  //create new customer after show in dropdwon
  const handleNewAccount = (newAccountData) => {
    console.log(newAccountData, 'newAccount');
    setaccount((prevAccount) => [
      ...prevAccount,
      {
        value: newAccountData.id,
        label: newAccountData.accountName,
        state: newAccountData.accountDetail?.state
      }
    ]);
    setIsDrawerOpen(false);
  };

  // use for select Account name from dropdown
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

  const handleCreateQuotation = async () => {
    try {
      const payload = {
        ...formData,
        totalQty: totalQuantity,
        totalMrp: subtotal,
        mainTotal: Number(subtotal) + Number(plusgst),
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          unit: row.unit,
          qty: Number(row.qty),
          rate: row.rate,
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
        await dispatch(updateProformainvoice(id, payload, navigate));
      } else {
        console.log(selectaccount);
        await dispatch(createProformainvoice(payload, navigate));
      }
    } catch (error) {
      console.log(error);
      console.error('Error creating proformainvoice:', error);
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

  const handleValidTillDateChange = (date) => {
    setFormData({ ...formData, validtill: convertToIST(date) });
  };

  const calculateValidTillDate = (proformaInvoiceDate) => {
    const defaultValidityPeriod = 7;
    const validTillDate = new Date(proformaInvoiceDate);
    validTillDate.setDate(validTillDate.getDate() + defaultValidityPeriod);
    return validTillDate;
  };

  const handleQuotationDateChange = (date) => {
    const newValidTill = convertToIST(calculateValidTillDate(date));
    setFormData({ ...formData, date: convertToIST(date), validtill: newValidTill });
  };

  useEffect(() => {
    const initialValidTill = calculateValidTillDate(formData.date);
    setFormData((prevFormData) => ({
      ...prevFormData,
      validtill: convertToIST(initialValidTill)
    }));
    const generateAutoQuotationNumber = async () => {
      if (!id) {
        try {
          const quotationResponse = await dispatch(fetchproformainvoiceList());
          let nextQuotationNumber = 1;
          if (quotationResponse.length === 0) {
            const quotationNumber = `Q-${nextQuotationNumber}`;
            setFormData((prevFormData) => ({
              ...prevFormData,
              ProFormaInvoice_no: quotationNumber
            }));
            return;
          }
          const existingQuotationNumbers = quotationResponse.map((quotation) => {
            const quotationNumber = quotation.ProFormaInvoice_no.split('-')[1];
            return parseInt(quotationNumber);
          });
          const maxQuotationNumber = Math.max(...existingQuotationNumbers);
          if (!isNaN(maxQuotationNumber)) {
            nextQuotationNumber = maxQuotationNumber + 1;
          }

          const quotationNumber = `Q-${nextQuotationNumber}`;
          setFormData((prevFormData) => ({
            ...prevFormData,
            ProFormaInvoice_no: quotationNumber
          }));
        } catch (error) {
          console.error('Error generating auto proformainvoice number:', error);
        }
      }
    };
    generateAutoQuotationNumber();
  }, [dispatch, formData.date, id]);

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
            Update Pro Forma Invoice
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Pro Forma Invoice
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
                Pro forma invoice No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="Enter Quotation No."
                id="ProFormaInvoice_no"
                value={formData.ProFormaInvoice_no}
                onChange={(e) => setFormData({ ...formData, ProFormaInvoice_no: e.target.value })}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Pro forma invoice Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.date ? new Date(formData.date) : null}
                onChange={(date) => handleQuotationDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Valid Till : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.validtill ? new Date(formData.validtill) : null}
                onChange={(date) => handleValidTillDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
                minDate={formData.date}
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
                placeholder="Enter dispatch thourgh"
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
                  {rows?.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
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
                        <input placeholder="Rate" value={row.rate} onChange={(e) => handleInputChange(index, 'rate', e.target.value)} />
                      </TableCell>
                      <TableCell id="newcs" style={{ fontSize: '16px' }}>
                        {row.mrp}
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
                <Link to="/proformainvoiceList" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handleCreateQuotation}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/proformainvoiceList" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handleCreateQuotation}>
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

export default Proformainvoice;
