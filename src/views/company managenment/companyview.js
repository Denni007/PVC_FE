import React, { useEffect, useState } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useTheme
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CompanyBankLedger, Companyview, createCompanyBank, deleteCompanyBank, updateCompanyBank } from 'store/thunk';
import { toast } from 'react-toastify';
import useCan from 'views/permission managenment/checkpermissionvalue';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CloseIcon from '@mui/icons-material/Close';
import Singlebankledgerlist from './singlebankledger';
import { Delete, Edit } from '@mui/icons-material';

const CompanyviewPage = () => {
  const theme = useTheme();
  const isMobiledialog = useMediaQuery(theme.breakpoints.down('sm'));
  const isMobile = useMediaQuery('(max-width:600px)');
  const { canCreateCompanyBank, canUpdateCompanyBank, canDeleteCompanyBank, canViwAllCompanyBank } = useCan();
  const [open, setOpen] = useState(false);
  const [openLedger, setOpenLedger] = useState(false);
  const [ledgerBankId, setLedgerBankId] = useState(null);
  const [formDate, setFormDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [bankdata, setBankdata] = useState({
    accountname: '',
    bankname: '',
    accountnumber: '',
    ifsccode: '',
    branch: ''
  });
  const showLedgerlist = false;

  const handleInputChange = (field, value) => {
    setBankdata({ ...bankdata, [field]: value });
  };

  const handleClickOpen = () => {
    setSelectedBank(null);
    setBankdata({
      accountname: '',
      bankname: '',
      accountnumber: '',
      ifsccode: '',
      branch: ''
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLedgerClose = () => {
    setOpenLedger(false);
    setLedgerBankId(null);
  };

  const handleformDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setFormDate(formattedDate);
  };

  const handletoDateChange = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    setToDate(formattedDate);
  };

  const handleViewLedger = async () => {
    await dispatch(CompanyBankLedger(ledgerBankId, formDate, toDate));
    sessionStorage.setItem('Cbankid', ledgerBankId);
    sessionStorage.setItem('CformDate', formDate);
    sessionStorage.setItem('CtoDate', toDate);
    navigate('/singlebankledger');
    handleLedgerClose();
  };

  useEffect(() => {
    dispatch(Companyview(id))
      .then((data) => {
        console.log(data, 'DATA');
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching Company data:', error);
      });
  }, [dispatch, id, navigate]);

  const handleEdit = (id) => {
    const bank = data.comapnyBank[id];
    setSelectedBank(bank.id);
    setBankdata(bank);
    setOpen(true);
  };

  const handleSave = async () => {
    try {
      const bankdetails = {
        companyId: data.id,
        ...bankdata
      };
      if (selectedBank) {
        await dispatch(updateCompanyBank(selectedBank, bankdetails));
        setData((prevData) => ({
          ...prevData,
          comapnyBank: prevData.comapnyBank.map((bank) => (bank.id === selectedBank ? bankdetails : bank))
        }));
      } else {
        const response = await dispatch(createCompanyBank(bankdetails, navigate));
        setData((prevData) => ({
          ...prevData,
          comapnyBank: [...prevData.comapnyBank, response.data.data]
        }));
        toast.success(response.data.message, {
          icon: <img src={require('../../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      setOpen(false);
    } catch (error) {
      console.error('Error updating or creating bank details:', error);
    }
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteBank = async () => {
    try {
      await dispatch(deleteCompanyBank(selectedId, navigate));
      setOpenConfirmation(false);
      setData((prevData) => ({
        ...prevData,
        comapnyBank: prevData.comapnyBank.filter((bank) => bank.id !== selectedId)
      }));
    } catch (error) {
      console.error('Error deleting bank details:', error);
    }
  };

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      {showLedgerlist && <Singlebankledgerlist ledgerBankId={ledgerBankId} fromDate={formDate} toDate={toDate} />}
      <Typography variant="h4" align="center" id="mycss">
        Company View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Company Name</Typography>
          <Typography variant="subtitle2">{data?.companyname}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle2">{data?.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <Typography variant="subtitle2">{data?.mobileno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Address 1</Typography>
          <Typography variant="subtitle2">{data?.address1}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Address 2</Typography>
          <Typography variant="subtitle2">{data?.address2}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">GST No.</Typography>
          <Typography variant="subtitle2">{data?.gstnumber}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">Pincode</Typography>
          <Typography variant="subtitle2">{data?.pincode}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">State</Typography>
          <Typography variant="subtitle2">{data?.state}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1">City</Typography>
          <Typography variant="subtitle2">{data?.city}</Typography>
        </Grid>
        <Grid item container style={{ display: 'flex', justifyContent: 'end', justifyItems: 'center' }}>
          <button id="buttoncs" style={{ width: '150px' }} onClick={handleClickOpen} disabled={!canCreateCompanyBank()}>
            Add Bank Details
          </button>
        </Grid>
        {data?.comapnyBank && data.comapnyBank.length > 0 && (
          <Grid item xs={12}>
            {!canViwAllCompanyBank() ? (
              ''
            ) : (
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow style={{ backgroundColor: '#677684' }}>
                      <TableCell align="center">Account Name</TableCell>
                      <TableCell align="center">Bank Name</TableCell>
                      <TableCell align="center">Account Number</TableCell>
                      <TableCell align="center">IFSC Code</TableCell>
                      <TableCell align="center">Branch</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data?.comapnyBank?.map((bank, index) => (
                      <TableRow key={index}>
                        <TableCell align="center">{bank.accountname}</TableCell>
                        <TableCell align="center">{bank.bankname}</TableCell>
                        <TableCell align="center">{bank.accountnumber}</TableCell>
                        <TableCell align="center">{bank.ifsccode}</TableCell>
                        <TableCell align="center">{bank.branch}</TableCell>
                        <TableCell>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <IconButton
                              sizeSmall
                              style={{
                                backgroundColor: canUpdateCompanyBank() ? 'green' : 'gray',
                                color: canUpdateCompanyBank() ? 'white' : 'white',
                                borderRadius: 0.8,
                                ...(canUpdateCompanyBank() && { opacity: 1 }),
                                ...(!canUpdateCompanyBank() && { opacity: 0.5 }),
                                ...(!canUpdateCompanyBank() && { backgroundColor: 'gray' })
                              }}
                              onClick={() => handleEdit(index)}
                              disabled={!canUpdateCompanyBank()}
                            >
                              <Edit style={{ fontSize: '16px' }} />
                            </IconButton>
                            <IconButton
                              sizeSmall
                              style={{
                                backgroundColor: canDeleteCompanyBank() ? 'Red' : 'gray',
                                color: canDeleteCompanyBank() ? 'white' : 'white',
                                borderRadius: 0.8,
                                ...(canDeleteCompanyBank() && { opacity: 1 }),
                                ...(!canDeleteCompanyBank() && { opacity: 0.5 }),
                                ...(!canDeleteCompanyBank() && { backgroundColor: 'gray' })
                              }}
                              onClick={() => handleDeleteConfirmation(bank.id)}
                              disabled={!canDeleteCompanyBank()}
                            >
                              <Delete style={{ fontSize: '16px' }} />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Grid>
        )}

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{selectedBank ? 'Edit' : 'Add'} Bank Details</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Account Name:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  id="accountname"
                  placeholder="Account Name"
                  onChange={(e) => handleInputChange('accountname', e.target.value)}
                  value={bankdata.accountname}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  IFSC Code:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="IFSC Code"
                  id="ifsccode"
                  onChange={(e) => handleInputChange('ifsccode', e.target.value)}
                  value={bankdata.ifsccode}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Branch:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Branch"
                  id="branch"
                  onChange={(e) => handleInputChange('branch', e.target.value)}
                  value={bankdata.branch}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Bank Name:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Bank Name"
                  id="bankname"
                  onChange={(e) => handleInputChange('bankname', e.target.value)}
                  value={bankdata.bankname}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Account Number:<span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <input
                  placeholder="Account Number"
                  id="accountnumber"
                  onChange={(e) => handleInputChange('accountnumber', e.target.value)}
                  value={bankdata.accountnumber}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} id="savebtncs" variant="outlined">
              Cancel
            </Button>
            <Button onClick={handleSave} id="savebtncs" variant="outlined">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={openLedger}
          onClose={handleLedgerClose}
          PaperProps={{
            style: {
              height: 'auto',
              width: isMobiledialog ? '90%' : '18%',
              margin: isMobiledialog ? '0' : 'auto',
              maxWidth: isMobiledialog ? '80%' : 'none'
            }
          }}
        >
          <div style={{ display: 'flex', padding: '0px 24px', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Ledger Details</h3>
            <span>
              <IconButton onClick={handleLedgerClose}>
                <CloseIcon />
              </IconButton>
            </span>
          </div>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  From Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <DatePicker
                  selected={formDate}
                  onChange={(date) => handleformDateChange(date)}
                  dateFormat="dd/MM/yyyy"
                  isClearable={false}
                  showTimeSelect={false}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  To Date: <span style={{ color: 'red', fontWeight: 'bold', fontSize: '17px' }}>&#42;</span>
                </Typography>
                <DatePicker
                  selected={toDate}
                  onChange={(date) => handletoDateChange(date)}
                  dateFormat="dd/MM/yyyy"
                  isClearable={false}
                  showTimeSelect={false}
                />
              </Grid>
              <Button onClick={handleViewLedger} variant="contained" color="secondary" style={{ marginLeft: '60%' }}>
                GO
              </Button>
            </Grid>
          </DialogContent>
        </Dialog>
        <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>Are you sure you want to delete this Bank?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
              Cancel
            </Button>
            <Button onClick={handleDeleteBank} color="secondary" variant="contained">
              Yes
            </Button>
          </DialogActions>
        </Dialog>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: isMobile ? 'center' : 'space-between' }}>
          <Link to="/companylist" style={{ textDecoration: 'none' }}>
            <Button variant="outlined" color="secondary" id="savebtncs">
              Cancel
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default CompanyviewPage;
