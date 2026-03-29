import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../../component/addparty';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import {
  Debitnoteviewdata,
  createDebitnote,
  fetchuserwiseCompany,
  fetchAllProducts,
  getallDebitnote,
  getallPurchaseinvoice,
  updateDebitnote,
  fetchAllAccounts
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const DebitNote = () => {
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const { canDeleteDebitnote, canseecreateAccount, canCreateItem } = useCan();
  const [rows, setRows] = useState([{ product: '', unit: '', qty: '', rate: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    accountId: '',
    debitdate: convertToIST(new Date()),
    debitnoteno: '',
    pinvoiceno: '',
    pdate: convertToIST(new Date()),
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
  const [purchaseinvoicedata, setPurchaseinvoicedata] = useState([]);
  const [purchasedata, setPurchasedata] = useState('');
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

  // called api of all product and customer for show name of them in dropdown
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
            unit: product.unit,
            rate: product.salesprice,
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
        console.log(defaultCompany.companies.state, 'defaultcompany');
        if (defaultCompany) {
          setCompanystate(defaultCompany.companies.state);
          const isGstState = defaultCompany.companies.state === accountState;
          setGststate(isGstState);
        } else {
          console.error('No default company found');
        }
      } catch (error) {
        console.error('Error fetching debit note:', error);
      }
    };

    if (canCreateAccountValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, accountState, gststate, id, canCreateAccountValue, canCreateProductvalue]);

  // use for select customer name from dropdown
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

  const handleDebitDateChange = (date) => {
    if (date instanceof Date) {
      setFormData({ ...formData, debitdate: convertToIST(date) });
    } else {
      console.error('Invalid date provided to handleDebitDateChange:', date);
    }
  };

  const handlePurchaseDateChange = (date) => {
    if (date instanceof Date) {
      setFormData({ ...formData, pdate: convertToIST(date) });
    } else {
      console.error('Invalid date provided to handlePurchaseDateChange:', date);
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
  const handlepurchaseinvoiceSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      const updatefromdata = {
        ...formData,
        invoiceId: selectedOption.value,
        invoicedate: selectedOption.invoicedate
      };
      setPurchasedata(selectedOption.label);
      setFormData(updatefromdata);
    }
  };
  useEffect(() => {
    const data = async () => {
      const purchseinvoice = await dispatch(getallPurchaseinvoice());

      const options = purchseinvoice.data.map((item) => ({
        value: item.id,
        label: item.supplyInvoiceNo,
        invoicedate: item.invoicedate
      }));
      setPurchaseinvoicedata(options);
      if (id) {
        const response = await dispatch(Debitnoteviewdata(id));
        const { accountDebitNo, invoiceId, invoicedate, purchaseData, debitnoteno, debitdate, totalSgst, mainTotal, totalMrp, totalIgst } =
          response;
        setFormData({
          accountId: accountDebitNo.id,
          debitdate,
          debitnoteno,
          invoiceId,
          pdate: invoicedate,
          totalSgst,
          mainTotal,
          totalMrp,
          totalIgst
        });
        setPurchasedata(purchaseData.supplyInvoiceNo);
        setSelectaccount(accountDebitNo.id);
        setAccountState(accountDebitNo.accountDetail?.state);
        setAccountname(accountDebitNo.accountName);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.DebitProduct.id,
          product: item.DebitProduct.productname,
          unit: item.unit,
          qty: item.qty,
          rate: item.rate,
          mrp: item.qty * item.rate,
          gstrate: item.DebitProduct.gstrate,
          gst: item.mrp * (item.DebitProduct.gstrate / 100)
        }));
        setRows(updatedRows);
        const totalGST = updatedRows.reduce((acc, row) => acc + row.gst, 0);
        setPlusgst(totalGST);
      }
    };
    const generateAutoDebitnoteNumber = async () => {
      if (!id) {
        try {
          const DebitnoteResponse = await dispatch(getallDebitnote());
          let nextDebitnoteNumber = 1;
          if (DebitnoteResponse.length === 0) {
            const DebitnoteNumber = nextDebitnoteNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              debitnoteno: Number(DebitnoteNumber)
            }));
            return;
          }
          const existingDebitnoteNumbers = DebitnoteResponse.map((Debitnote) => {
            const DebitnoteNumber = Debitnote.debitnoteno;
            return parseInt(DebitnoteNumber);
          });
          const maxDebitnoteNumber = Math.max(...existingDebitnoteNumbers);
          if (!isNaN(maxDebitnoteNumber)) {
            nextDebitnoteNumber = maxDebitnoteNumber + 1;
          }

          const DebitnoteNumber = nextDebitnoteNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            debitnoteno: Number(DebitnoteNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Debit Note number:', error);
        }
      }
    };
    generateAutoDebitnoteNumber();
    data();
  }, [dispatch, id]);

  //create new customer after show in dropdwon
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

  const handlecreateDebitnote = async () => {
    try {
      const payload = {
        ...formData,
        invoicedate: formData.pdate,
        totalQty: totalQuantity,
        totalMrp: subtotal,
        mainTotal: Number(subtotal) + Number(plusgst),
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          qty: Number(row.qty),
          unit: row.unit,
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
        await dispatch(updateDebitnote(id, payload, navigate));
      } else {
        await dispatch(createDebitnote(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating debit note:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Debit Note
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Debit Note
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
                Debit Note No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="debitnoteno"
                value={formData.debitnoteno}
                onChange={(e) => setFormData({ ...formData, debitnoteno: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Debit Note Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.debitdate ? new Date(formData.debitdate) : null}
                onChange={(date) => handleDebitDateChange(date)}
                dateFormat="dd/MM/yyyy"
                isClearable={false}
                showTimeSelect={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Purchase Inv. No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <Select
                color="secondary"
                options={purchaseinvoicedata}
                value={{ value: formData.pinvoiceno, label: purchasedata }}
                onChange={handlepurchaseinvoiceSelectChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Purchase Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.pdate ? new Date(formData.pdate) : null}
                onChange={(date) => handlePurchaseDateChange(date)}
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
                      <TableCell disabled={!canDeleteDebitnote()}>
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
                <Link to="/debitnotelist" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handlecreateDebitnote}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/debitnotelist" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreateDebitnote}>
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

export default DebitNote;
