import React, { useState, useEffect } from 'react';
import {
  Typography,
  Grid,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { createUserBank, deleteUserBank, updateUserBank, Userview } from 'store/thunk';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useCan from './checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Userviewpage = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const { canUserViewAllBank, canUserCreateBank, canUserUpdateBank, canUserDeleteBank } = useCan();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});
  const [selectedBank, setSelectedBank] = useState(null);
  const [open, setOpen] = useState(false);
  const [bankdata, setBankdata] = useState({
    accountname: '',
    bankname: '',
    accountnumber: '',
    ifsccode: '',
    branch: ''
  });

  //called api for view data
  useEffect(() => {
    dispatch(Userview(id))
      .then((data) => {
        console.log(data, 'DATA');
        setData(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching User data:', error);
      });
  }, [dispatch, id, navigate]);

  const handleInputChange = (field, value) => {
    setBankdata({ ...bankdata, [field]: value });
  };
  const handleEdit = (id) => {
    const bank = data.userBankAccount[id];
    setSelectedBank(bank.id);
    setBankdata(bank);
    setOpen(true);
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

  const handleSave = async () => {
    try {
      const bankdetails = {
        userId: data.id,
        ...bankdata
      };
      console.log(bankdetails, 'bankdetails');
      if (selectedBank) {
        await dispatch(updateUserBank(selectedBank, bankdetails, navigate));
        setData((prevData) => ({
          ...prevData,
          userBankAccount: prevData.userBankAccount.map((bank) => (bank.id === selectedBank ? bankdetails : bank))
        }));
      } else {
        const response = await dispatch(createUserBank(bankdetails, navigate));
        setData((prevData) => ({
          ...prevData,
          userBankAccount: [...prevData.userBankAccount, response.data.data]
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
      await dispatch(deleteUserBank(selectedId, navigate));
      setOpenConfirmation(false);
      setData((prevData) => ({
        ...prevData,
        userBankAccount: prevData.userBankAccount.filter((bank) => bank.id !== selectedId)
      }));
    } catch (error) {
      console.error('Error deleting bank details:', error);
    }
  };
  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        User View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">User</Typography>
          <Typography variant="subtitle2">{data?.username}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Mobile No.</Typography>
          <Typography variant="subtitle2">{data?.mobileno}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Email</Typography>
          <Typography variant="subtitle2">{data?.email}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Role</Typography>
          <Typography variant="subtitle2">{data?.role}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Basic Salary</Typography>
          <Typography variant="subtitle2">{data?.salary}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Duty Entry Time</Typography>
          <Typography variant="subtitle2">{data?.entryTime}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Duty Exit Time</Typography>
          <Typography variant="subtitle2">{data?.exitTime}</Typography>
        </Grid>
        <Grid item container style={{ display: 'flex', justifyContent: 'end', justifyItems: 'center' }}>
          {canUserCreateBank() ? (
            <button id="buttoncs" style={{ width: '150px' }} onClick={handleClickOpen}>
              Add Bank Details
            </button>
          ) : (
            ''
          )}
        </Grid>
        {data?.userBankAccount && data.userBankAccount.length > 0 && (
          <Grid item xs={12}>
            {!canUserViewAllBank() ? (
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
                    {data.userBankAccount.map((bank, index) => (
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
                                backgroundColor: canUserUpdateBank() ? 'green' : 'gray',
                                color: canUserUpdateBank() ? 'white' : 'white',
                                borderRadius: 0.8,
                                ...(canUserUpdateBank() && { opacity: 1 }),
                                ...(!canUserUpdateBank() && { opacity: 0.5 }),
                                ...(!canUserUpdateBank() && { backgroundColor: 'gray' })
                              }}
                              onClick={() => handleEdit(index)}
                              disabled={!canUserUpdateBank()}
                            >
                              <Edit style={{ fontSize: '16px' }} />
                            </IconButton>
                            <IconButton
                              sizeSmall
                              style={{
                                backgroundColor: canUserDeleteBank() ? 'Red' : 'gray',
                                color: canUserDeleteBank() ? 'white' : 'white',
                                borderRadius: 0.8,
                                ...(canUserDeleteBank() && { opacity: 1 }),
                                ...(!canUserDeleteBank() && { opacity: 0.5 }),
                                ...(!canUserDeleteBank() && { backgroundColor: 'gray' })
                              }}
                              onClick={() => handleDeleteConfirmation(bank.id)}
                              disabled={!canUserDeleteBank()}
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

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/userlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/userlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Userviewpage;
