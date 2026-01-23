import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import { useMediaQuery } from '@mui/material';
import {
  PurchaseInvoiceviewCash,
  createPurchaseInvoiceCash,
  fetchAllAccountCash,
  fetchAllProductsCash,
  getallPurchaseInvoiceCash,
  updatePurchaseInvoiceCash
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import AnchorTemporaryDrawer from '../../../component/addparty';
import AnchorProductDrawer from 'component/productadd';
import { convertToIST } from 'component/details';

const Purchaseinvoicecash = () => {
  const { canDeleteSalescash, canseecreateAccount, canCreateItem } = useCan();
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const [rows, setRows] = useState([{ product: '', qty: '', unit: '', rate: '', mrp: '' }]);
  const [formData, setFormData] = useState({
    accountId: '',
    date: convertToIST(new Date()),
    purchaseNo: ''
  });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isproductDrawerOpen, setIsproductDrawerOpen] = useState(false);
  const [account, setAccount] = useState([]);
  const [selectaccount, setSelectaccount] = useState([]);
  const [accountname, setAccountname] = useState('');
  const [product, setProduct] = useState('');
  const [selectproduct, setSelectproduct] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [canCreateAccountValue, setCanCreateAccountValue] = useState(null);
  const [canCreateRawmaterialvalue, setCanCreateProductvalue] = useState(null);
  useEffect(() => {
    setCanCreateAccountValue(canseecreateAccount());
    setCanCreateProductvalue(canCreateItem());
  }, [canseecreateAccount, canCreateItem]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  {
    console.log(selectaccount);
  }

  const handleDeleteRow = async (index) => {
    const updatedRows = [...rows];
    const deletedRow = updatedRows.splice(index, 1)[0];
    setRows(updatedRows);

    const deletedAmount = deletedRow.mrp;
    const newSubtotal = subtotal - deletedAmount;
    setSubtotal(newSubtotal < 0 ? 0 : newSubtotal);
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

  // called api of all product and account for show name of them in dropdown
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
        const productResponse = await dispatch(fetchAllProductsCash());
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
        console.error('Error fetching purchase invoice cash:', error);
      }
    };
    if (canCreateAccountValue !== null || canCreateRawmaterialvalue !== null) {
      fetchData();
    }
  }, [dispatch, id, canCreateAccountValue, canCreateRawmaterialvalue]);

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
  }, [rows]);

  const handleDateChange = (date) => {
    if (date instanceof Date) {
      // This creates a YYYY-MM-DD string that ignores timezones
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = `${year}-${month}-${day}`;

      setFormData({ ...formData, date: formattedDate });
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
        const response = await dispatch(PurchaseInvoiceviewCash(id));
        const { date, totalMrp, purchaseNo, accountPurchaseCash } = response;
        setFormData({ date, totalMrp, purchaseNo, accountId: accountPurchaseCash.id });
        setSelectaccount(accountPurchaseCash.id);
        setAccountname(accountPurchaseCash.contactPersonName);
        const updatedRows = response.items.map((item) => ({
          id: item.id,
          productId: item.ProductPurchase.id,
          productname: item.ProductPurchase.productname,
          qty: item.qty,
          unit: item.unit,
          rate: item.rate,
          mrp: item.qty * item.rate
        }));
        setRows(updatedRows);
      }
    };
    const generateAutoPurchaseNumber = async () => {
      if (!id) {
        try {
          const PurchaseResponse = await dispatch(getallPurchaseInvoiceCash());
          let nextPurchaseNumber = 1;
          if (PurchaseResponse.data.length === 0) {
            const PurchaseNumber = nextPurchaseNumber;
            setFormData((prevFormData) => ({
              ...prevFormData,
              purchaseNo: Number(PurchaseNumber)
            }));
            return;
          }
          const existingPurchaseNumbers = PurchaseResponse.data.map((Purchase) => {
            const PurchaseNumber = Purchase.purchaseNo;
            return parseInt(PurchaseNumber);
          });
          const maxPurchaseNumber = Math.max(...existingPurchaseNumbers);
          if (!isNaN(maxPurchaseNumber)) {
            nextPurchaseNumber = maxPurchaseNumber + 1;
          }

          const PurchaseNumber = nextPurchaseNumber;
          setFormData((prevFormData) => ({
            ...prevFormData,
            purchaseNo: Number(PurchaseNumber)
          }));
        } catch (error) {
          console.error('Error generating auto Purchase cash number:', error);
        }
      }
    };
    generateAutoPurchaseNumber();
    data();
  }, [dispatch, id]);

  //create new Vendor after show in dropdwon
  const handleNewAccount = (newAccountData) => {
    setAccount((preAccount) => [
      ...preAccount,
      {
        value: newAccountData?.id,
        label: newAccountData?.contactPersonName
      }
    ]);
    setIsDrawerOpen(false);
  };

  const handlecreatePurchaseinvoicecash = async () => {
    try {
      if (id) {
        const payload = {
          ...formData,
          // totalQty: totalQuantity,
          totalMrp: subtotal,
          items: rows.map((row) => ({
            id: row.id || null,
            productId: row.productId,
            qty: Number(row.qty),
            unit: row.unit,
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        await dispatch(updatePurchaseInvoiceCash(id, payload, navigate));
      } else {
        const payload = {
          ...formData,
          // totalQty: totalQuantity,
          totalMrp: subtotal,
          items: rows.map((row) => ({
            id: row.id || null,
            productId: row.productId,
            qty: Number(row.qty),
            unit: row.unit,
            rate: row.rate,
            mrp: row.mrp
          }))
        };
        console.log(selectaccount);
        await dispatch(createPurchaseInvoiceCash(payload, navigate));
      }
    } catch (error) {
      console.error('Error creating purchase invoice cash:', error);
    }
  };

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        {id ? (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Update Purchase Cash
          </Typography>
        ) : (
          <Typography variant="h4" align="center" gutterBottom id="mycss">
            Create Purchase Cash
          </Typography>
        )}
        <Grid container style={{ marginBottom: '16px' }}>
          <Grid container spacing={2} style={{ marginBottom: '16px' }}>
            <Grid item xs={12} sm={6} md={3}>
              <Typography variant="subtitle1">
                Purchase No. : <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
              </Typography>
              <input
                placeholder="0001"
                id="purchaseNo"
                value={formData.purchaseNo}
                onChange={(e) => setFormData({ ...formData, purchaseNo: e.target.value })}
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
                      <TableCell>{row.unit}</TableCell>
                      <TableCell id="newcs">
                        <input placeholder="Rate" value={row.rate} onChange={(e) => handleInputChange(index, 'rate', e.target.value)} />
                      </TableCell>
                      <TableCell id="newcs" style={{ fontSize: '16px' }}>
                        {row.mrp}
                      </TableCell>
                      <TableCell disabled={!canDeleteSalescash()}>
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
                  <h3>₹{subtotal}</h3>
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
                  <h3>₹{subtotal}</h3>
                </div>
              </div>
            )}
          </Grid>

          {isMobile ? (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Link to="/purchaseinvoicecashList" style={{ textDecoration: 'none' }}>
                  <button
                    id="savebtncs"
                    style={{
                      marginRight: '5px'
                    }}
                  >
                    Cancel
                  </button>
                </Link>
                <button id="savebtncs" onClick={handlecreatePurchaseinvoicecash}>
                  Save
                </button>
              </div>
            </Grid>
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', margin: '10px 0px' }}>
              <div>
                <Link to="/purchaseinvoicecashList" style={{ textDecoration: 'none' }}>
                  <button id="savebtncs">Cancel</button>
                </Link>
              </div>
              <div style={{ display: 'flex' }}>
                <button id="savebtncs" onClick={handlecreatePurchaseinvoicecash}>
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

export default Purchaseinvoicecash;
