import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import AnchorTemporaryDrawer from '../../../component/addparty';
import AnchorProductDrawer from '../../../component/productadd';
import { useMediaQuery } from '@mui/material';
import {
  Creditnotecashviewdata,
  createCreditnotecash,
  fetchAllAccountCash,
  fetchAllProductsCash,
  getallCreditnotecash,
  updateCreditnotecash
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { convertToIST } from 'component/details';

const Creditnotecash = () => {
  const { canseecreateAccount, canCreateItem } = useCan();
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: '', unit: '', rate: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    accountId: '',
    creditdate: convertToIST(new Date()),
    creditnoteNo: '',
    LL_RR_no: 0,
    dispatchThrough: '',
    motorVehicleNo: '',
    destination: '',
    mainTotal: 0
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [account, setaccount] = useState([]);
  const [selectaccount, setSelectaccount] = useState([]);
  const [accountState, setAccountState] = useState('');
  const [accountname, setAccountname] = useState('');
  const [product, setProduct] = useState('');
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [productResponse, setProductResponse] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  {
    console.log(productResponse, selectaccount);
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

  // called api of all product and account for show name of them in dropdown
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccountCash());
        if (Array.isArray(response)) {
          const options = response.map((account) => ({
            value: account.id,
            label: account.contactPersonName
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
            rate: product.salesprice,
            unit: product.unit,
            gstrate: product.gstrate
          }));
          setProduct([{ value: 'new', label: 'Create New Item', rate: '' }, ...options]);
          if (!canCreateProductvalue) {
            setProduct(options);
          }
        } else {
          console.error('fetchAllProducts returned an unexpected response:', productResponse);
        }
      } catch (error) {
        console.error('Error fetching credit note:', error);
      }
    };

    if (canCreateAccountValue !== null || canCreateProductvalue !== null) {
      fetchData();
    }
  }, [dispatch, accountState, id, canCreateAccountValue, canCreateProductvalue]);

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
      console.error('Invalid date provided to handleDateChange:', date);
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
    });

    const newSubtotal = updatedRows.reduce((acc, row) => acc + row.mrp, 0);
    setSubtotal(newSubtotal);
    setRows(updatedRows);
  };
  useEffect(() => {
    const data = async () => {
      try {
        if (id) {
          const response = await dispatch(Creditnotecashviewdata(id));
          const { accountCreditNoCash, LL_RR_no, creditdate, creditnoteNo, motorVehicleNo, dispatchThrough, destination, mainTotal } =
            response;
          setFormData({
            accountId: accountCreditNoCash.id,
            LL_RR_no,
            creditdate,
            creditnoteNo,
            motorVehicleNo,
            dispatchThrough,
            destination,
            mainTotal
          });
          setSelectaccount(accountCreditNoCash.id);
          setAccountState(accountCreditNoCash.accountDetail?.state);
          setAccountname(accountCreditNoCash.contactPersonName);
          const updatedRows = response.cashCreditNoteItem.map((item) => ({
            id: item.id,
            productId: item.CreditProductCash.id,
            product: item.CreditProductCash.productname,
            qty: item.qty,
            unit: item.unit,
            rate: item.rate,
            mrp: item.qty * item.rate
          }));
          setRows(updatedRows);
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
          const CreditnoteResponse = await dispatch(getallCreditnotecash());

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
        label: newAccountData?.contactPersonName
      }
    ]);
    setIsDrawerOpen(false);
  };

  const handlecreateCreditnote = async () => {
    try {
      const payload = {
        ...formData,
        totalQty: totalQuantity,
        mainTotal: parseFloat(subtotal),
        items: rows.map((row) => ({
          id: row.id || null,
          productId: row.productId,
          unit: row.unit,
          qty: parseFloat(row.qty),
          rate: parseFloat(row.rate),
          mrp: parseFloat(row.qty) * parseFloat(row.rate)
        }))
      };

      if (id) {
        await dispatch(updateCreditnotecash(id, payload, navigate));
      } else {
        await dispatch(createCreditnotecash(payload, navigate));
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
            Update Credit Note Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Credit Note Cash
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
              <Typography variant="subtitle1">RR-No. :</Typography>
              <input
                placeholder="0001"
                id="LL_RR_no "
                value={formData.LL_RR_no}
                onChange={(e) => setFormData({ ...formData, LL_RR_no: e.target.value })}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
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
                  <h3>Total Amt.</h3>
                  <h3>₹{Number(subtotal).toFixed(2)}</h3>
                </div>
              </>
            ) : (
              // For larger screens, show all totals on one line

              <div style={{ float: 'right', width: '30%' }}>
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
                <Link to="/creditnotecashlist" style={{ textDecoration: 'none' }}>
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
                <Link to="/creditnotecashlist" style={{ textDecoration: 'none' }}>
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

export default Creditnotecash;
