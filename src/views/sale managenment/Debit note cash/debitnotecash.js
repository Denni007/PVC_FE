import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../../component/addparty';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import {
  fetchAllProductsCash,
  updateDebitnotecash,
  createDebitnotecash,
  Debitnotecashviewdata,
  getallPurchaseInvoiceCash,
  fetchAllAccountCash,
  getallDebitnotecash
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const Debitnotecash = () => {
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const { canseecreateAccount, canCreateItem } = useCan();
  const [rows, setRows] = useState([{ product: '', unit: '', qty: '', rate: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    accountId: '',
    debitdate: convertToIST(new Date()),
    debitnoteno: '',
    purchaseId: null,
    purchaseDate: convertToIST(new Date()),
    totalMrp: 0,
    mainTotal: 0
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [account, setaccount] = useState([]);
  const [selectaccount, setSelectaccount] = useState([]);
  const [accountname, setAccountname] = useState('');
  const [product, setProduct] = useState('');
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [productResponse, setProductResponse] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [purchaseinvoicedata, setPurchaseinvoicedata] = useState([]);
  const [purchasedata, setPurchasedata] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  {
    console.log(selectaccount, productResponse);
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
          return {
            ...row,
            productId: selectedOption.value,
            product: selectedOption.label,
            rate: selectedOption.rate,
            unit: selectedOption.unit,
            mrp: newMrp
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
        const response = await dispatch(fetchAllAccountCash());
        if (Array.isArray(response)) {
          const options = response.map((account) => ({
            value: account.id,
            label: account.contactPersonName,
            state: account.accountDetail?.state
          }));
          setaccount([{ value: 'new', label: 'Create New Party', state: '' }, ...options]);
          if (!canCreateAccountValue) {
            setaccount(options);
          }
        }
        const productResponse = await dispatch(fetchAllProductsCash());
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
          console.error('fetchAllProductsCash returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching debit note:', error);
      }
    };

    if (canCreateAccountValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, id, canCreateAccountValue, canCreateProductvalue]);

  // use for select customer name from dropdown
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
      setFormData({ ...formData, purchaseDate: convertToIST(date) });
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
    });

    const newSubtotal = updatedRows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(newSubtotal);

    setRows(updatedRows);
  };
  const handlepurchaseinvoiceSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      const updatefromdata = {
        ...formData,
        purchaseId: selectedOption.value,
        invoicedate: selectedOption.invoicedate
      };
      setPurchasedata(selectedOption.label);
      setFormData(updatefromdata);
    }
  };
  useEffect(() => {
    const data = async () => {
      const purchseinvoice = await dispatch(getallPurchaseInvoiceCash());
      const options = purchseinvoice.data.map((item) => ({
        value: item.id,
        label: item.purchaseNo
      }));
      setPurchaseinvoicedata(options);
      if (id) {
        const response = await dispatch(Debitnotecashviewdata(id));
        const { accountDebitNoCash, purchaseId, purchaseDate, purchaseDataCash, debitnoteno, debitdate, mainTotal, totalMrp } = response;
        setFormData({
          accountId: accountDebitNoCash.id,
          debitdate,
          debitnoteno,
          purchaseId,
          purchaseDate,
          mainTotal,
          totalMrp
        });
        setPurchasedata(purchaseDataCash.purchaseNo);
        setSelectaccount(accountDebitNoCash.id);
        setAccountname(accountDebitNoCash.contactPersonName);
        const updatedRows = response.cashDebitNoteItem.map((item) => ({
          id: item.id,
          productId: item.DebitProductCash.id,
          product: item.DebitProductCash.productname,
          unit: item.unit,
          qty: item.qty,
          rate: item.rate,
          mrp: item.qty * item.rate
        }));
        setRows(updatedRows);
      }
    };
    const generateAutoDebitnoteNumber = async () => {
      if (!id) {
        try {
          const DebitnoteResponse = await dispatch(getallDebitnotecash());
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
        label: newAccountData?.contactPersonName
      }
    ]);
    setIsDrawerOpen(false);
  };

  const handlecreateDebitnote = async () => {
    try {
      const payload = {
        ...formData,
        purchaseDate: formData.purchaseDate,
        totalQty: totalQuantity,
        totalMrp: subtotal,
        mainTotal: Number(subtotal),
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          qty: Number(row.qty),
          unit: row.unit,
          rate: row.rate,
          mrp: row.mrp
        }))
      };
      if (id) {
        await dispatch(updateDebitnotecash(id, payload, navigate));
      } else {
        await dispatch(createDebitnotecash(payload, navigate));
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
            Update Debit Cash Note
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Debit Cash Note
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
              <Typography variant="subtitle1">Purchase Inv. No. :</Typography>
              <Select
                color="secondary"
                options={purchaseinvoicedata}
                value={{ value: formData.purchaseId, label: purchasedata }}
                onChange={handlepurchaseinvoiceSelectChange}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Purchase Date : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <DatePicker
                selected={formData.purchaseDate ? new Date(formData.purchaseDate) : null}
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
                {/* <div id="subtotalcs">
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
                )} */}
                <div id="subtotalcs">
                  <h3>Total Amt.</h3>
                  <h3>₹{Number(subtotal).toFixed(2)}</h3>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line

              <div style={{ float: 'right', width: '30%' }}>
                {/* <div id="subtotalcs">
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
                )} */}
                <div
                  id="subtotalcs"
                  style={{
                    borderBottom: 'none'
                  }}
                >
                  <h3>Total Amt.</h3>
                  <h3>₹{Number(subtotal).toFixed(2)}</h3>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/debitnotecashlist" style={{ textDecoration: 'none' }}>
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
                <Link to="/debitnotecashlist" style={{ textDecoration: 'none' }}>
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

export default Debitnotecash;
