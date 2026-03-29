import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../../component/addparty';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import {
  Creditnoteviewdata,
  createCreditnote,
  fetchAllAccounts,
  fetchAllProducts,
  fetchuserwiseCompany,
  getallCreditnote,
  updateCreditnote
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const Creditnote = () => {
  const { canDeleteCreditnote, canseecreateAccount, canCreateItem } = useCan();
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: '', unit: '', rate: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    accountId: '',
    creditdate: convertToIST(new Date()),
    org_invoicedate: convertToIST(new Date()),
    creditnoteNo: '',
    org_invoiceno: '',
    LL_RR_no: 0,
    dispatchThrough: '',
    motorVehicleNo: '',
    destination: '',
    totalSgst: 0,
    totalIgst: 0,
    totalMrp: 0,
    mainTotal: 0
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [account, setaccount] = useState([]);
  const [selectaccount, setSelectaccount] = useState([]);
  const [accountState, setAccountState] = useState('');
  const [accountname, setAccountname] = useState('');
  const [companystate, setCompanystate] = useState('');
  const [product, setProduct] = useState('');
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [gststate, setGststate] = useState('');
  const [plusgst, setPlusgst] = useState(0);
  const [productResponse, setProductResponse] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  {
    console.log(companystate, selectaccount);
  }
  const [canCreateAccountValue, setCanCreateAccountValue] = useState(null);
  const [canCreateProductvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setCanCreateAccountValue(canseecreateAccount());
    setCanCreateProductvalue(canCreateItem());
  }, [canseecreateAccount, canCreateItem]);

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

  const handleAddRow = () => {
    const newRow = { product: '', qty: '', unit: '', rate: '', mrp: '' };
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

  // called api of all product and account for show name of them in dropdown
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
          setaccount([{ value: 'new', label: 'Create New Party', state: '' }, ...options]);
          if (!canCreateAccountValue) {
            setaccount(options);
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
          setProduct([{ value: 'new', label: 'Create New Item', rate: '', gstrate: '' }, ...options]);
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
        console.error('Error fetching credit note:', error);
      }
    };

    if (canCreateAccountValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, accountState, gststate, id, canCreateAccountValue, canCreateProductvalue]);

  // use for select Party name from dropdown
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

  const handleCreditDateChange = (date) => {
    if (date instanceof Date) {
      setFormData({ ...formData, creditdate: convertToIST(date) });
    } else {
      console.error('Invalid date provided to handleCreditDateChange:', date);
    }
  };

  const handleInvoiceDateChange = (date) => {
    if (date instanceof Date) {
      setFormData({ ...formData, org_invoicedate: convertToIST(date) });
    } else {
      console.error('Invalid date provided to handleInvoiceDateChange:', date);
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
  useEffect(() => {
    const data = async () => {
      try {
        if (id) {
          const response = await dispatch(Creditnoteviewdata(id));
          const {
            accountCreditNo,
            LL_RR_no,
            creditdate,
            creditnoteNo,
            org_invoiceno,
            org_invoicedate,
            motorVehicleNo,
            dispatchThrough,
            destination,
            totalSgst,
            mainTotal,
            totalMrp,
            totalIgst
          } = response;
          setFormData({
            accountId: accountCreditNo.id,
            LL_RR_no,
            creditdate,
            creditnoteNo,
            org_invoiceno,
            org_invoicedate,
            motorVehicleNo,
            dispatchThrough,
            destination,
            totalSgst,
            mainTotal,
            totalMrp,
            totalIgst
          });
          setSelectaccount(accountCreditNo.id);
          setAccountState(accountCreditNo.accountDetail?.state);
          setAccountname(accountCreditNo.accountName);
          const updatedRows = response.items.map((item) => ({
            id: item.id,
            productId: item.CreditProduct.id,
            product: item.CreditProduct.productname,
            qty: item.qty,
            unit: item.unit,
            rate: item.rate,
            mrp: item.qty * item.rate,
            gstrate: item.CreditProduct.gstrate,
            gst: item.mrp * (item.CreditProduct.gstrate / 100)
          }));
          setRows(updatedRows);
          const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
          setPlusgst(totalGST);
        }
      } catch (error) {
        console.log(error);
        if (error.response.status === 401) {
          navigate('/');
        }
      }
    };
    const generateAutoDebitnoteNumber = async () => {
      if (!id) {
        try {
          const CreditnoteResponse = await dispatch(getallCreditnote());
          console.log(CreditnoteResponse, 'CreditnoteResponse');
          let nextCreditnoteNumber = 1;
          if (CreditnoteResponse.length === 0) {
            const CreditnoteNumber = nextCreditnoteNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              creditnoteNo: Number(CreditnoteNumber)
            }));
            return;
          }
          const existingCreditnoteNumbers = CreditnoteResponse.map((Creditnote) => {
            const CreditnoteNumber = Creditnote.creditnoteNo;
            return parseInt(CreditnoteNumber);
          });
          const maxCreditnoteNumber = Math.max(...existingCreditnoteNumbers);
          if (!isNaN(maxCreditnoteNumber)) {
            nextCreditnoteNumber = maxCreditnoteNumber + 1;
          }

          const CreditnoteNumber = nextCreditnoteNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            creditnoteNo: Number(CreditnoteNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Debit Note number:', error);
        }
      }
    };
    generateAutoDebitnoteNumber();
    data();
  }, [dispatch, id, navigate]);
  //manage value of input of row

  //create new Party after show in dropdwon
  const handleNewAccount = (newAccountData) => {
    setaccount((prevAccounts) => [
      ...prevAccounts,
      {
        value: newAccountData?.id,
        label: newAccountData?.accountName,
        state: newAccountData?.accountDetail?.state
      }
    ]);
    setIsDrawerOpen(false);
  };

  const handlecreateCreditnote = async () => {
    try {
      const payload = {
        ...formData,
        totalQty: totalQuantity,
        totalMrp: parseFloat(subtotal),
        mainTotal: parseFloat(subtotal) + parseFloat(plusgst),
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          unit: row.unit,
          qty: parseFloat(row.qty),
          rate: parseFloat(row.rate),
          mrp: parseFloat(row.qty) * parseFloat(row.rate)
        }))
      };

      const gststate = companystate === accountState ? 'true' : 'false';
      if (gststate === 'true') {
        payload.totalSgst = parseFloat(plusgst);
        payload.totalIgst = 0;
      } else {
        payload.totalSgst = 0;
        payload.totalIgst = parseFloat(plusgst);
      }

      if (id) {
        await dispatch(updateCreditnote(id, payload, navigate));
      } else {
        await dispatch(createCreditnote(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating credit note:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Credit Note
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Credit Note
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
                Credit Note No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="creditnoteNo "
                value={formData.creditnoteNo}
                onChange={(e) => setFormData({ ...formData, creditnoteNo: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Credit Note Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.creditdate ? new Date(formData.creditdate) : null}
                onChange={(date) => handleCreditDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Org. Invoice No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="org_invoiceno "
                value={formData.org_invoiceno}
                onChange={(e) => setFormData({ ...formData, org_invoiceno: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Org. Invoice Date. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.org_invoicedate ? new Date(formData.org_invoicedate) : null}
                onChange={(date) => handleInvoiceDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">RR-No. :</Typography>
              <input
                placeholder="0001"
                id="LL_RR_no "
                value={formData.LL_RR_no}
                onChange={(e) => setFormData({ ...formData, LL_RR_no: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Transport :</Typography>
              <input
                placeholder="Enter Transport"
                id="dispatchThrough"
                value={formData.dispatchThrough}
                onChange={(e) => setFormData({ ...formData, dispatchThrough: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">Vehical No. :</Typography>
              <input
                placeholder="0001"
                id="motorVehicleNo"
                value={formData.motorVehicleNo}
                onChange={(e) => setFormData({ ...formData, motorVehicleNo: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">destination :</Typography>
              <input
                placeholder="Enter Destination"
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
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
                      <TableCell disabled={!canDeleteCreditnote()}>
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
                <Link to="/creditnotelist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handlecreateCreditnote}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/creditnotelist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreateCreditnote}>
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

export default Creditnote;
