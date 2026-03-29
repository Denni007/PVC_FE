import React, { useState, useEffect } from 'react';
import {
  Paper,
  Grid,
  Typography,
  // Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  useMediaQuery,
  useTheme,
  Button
} from '@mui/material';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { ApproveWallet, getallusers, getWallet, getWalletcompanybalance, getWalletnormaluser } from 'store/thunk';
import { useNavigate } from 'react-router';
import useCan from 'views/permission managenment/checkpermissionvalue';

const Wallet = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState('');
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [walletData, setWalletData] = useState([]);
  const [walletuserData, setWalletuserData] = useState([]);
  const [walletcompanybalanceData, setWalletcompanyData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canseewalletuserledger, canseecompanybalacewallet } = useCan();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const getRoleFromSessionStorage = () => {
    return sessionStorage.getItem('role');
  };
  const createConfig1 = () => {
    const role = getRoleFromSessionStorage();
    return role;
  };

  const handleformDateChange = (date) => {
    setFormDate(date);
  };

  const handletoDateChange = (date) => {
    setToDate(date);
  };

  useEffect(() => {
    if (sessionStorage.getItem('role') === 'Super Admin' || sessionStorage.getItem('role') === 'Admin') {
      const fetchData = async () => {
        const userResponse = await dispatch(getallusers());
        if (Array.isArray(userResponse[0]?.users)) {
          const options = userResponse[0]?.users?.map((user) => ({
            value: user.id,
            label: user.username
          }));
          setUsers([...options]);
          const username = sessionStorage.getItem('username');
          const currentUser = options.find((value) => value.label === username);
          if (currentUser) {
            setUserId(currentUser.value);
            setUsername(currentUser.label);
            handleApplyForUser();
          }
        }
      };
      fetchData();
    }
  }, [dispatch]);

  const handleUserSelectChange = (selectedOption) => {
    if (selectedOption) {
      setUserId(selectedOption.value);
      setUsername(selectedOption.label);
    }
  };
  const handleApplyForUser = async () => {
    try {
      const newdata = await dispatch(getWalletnormaluser(formDate, toDate, navigate));
      setWalletuserData(newdata);
    } catch (error) {
      console.log('fetch data of wallet:', error);
    }
  };
  useEffect(() => {
    const handlecompanybalance = async () => {
      try {
        const data = await dispatch(getWalletcompanybalance(navigate));
        setWalletcompanyData(data);
      } catch (error) {
        console.log('fetch data of wallet:', error);
      }
    };
    const handleApply = async () => {
      try {
        if (userId) {
          const data = await dispatch(getWallet(userId, navigate));
          setWalletData(data);
        } else {
          const data = await dispatch(getWallet('me', navigate));
          setWalletData(data);
        }
      } catch (error) {
        console.log('fetch data of wallet:', error);
      }
    };
    handleApply();
    handlecompanybalance();
  }, [dispatch, userId, navigate]);

  const handleCheckboxChange = async (entry) => {
    if (entry.isApprove === false) {
      try {
        await dispatch(ApproveWallet(entry.id));
        const updatedData = await dispatch(getWallet(userId));
        setWalletData(updatedData);
      } catch (error) {
        console.error('Error approving transaction:', error);
      }
    }
  };
  const handledemandcash = () => {
    navigate('/claimcashlist');
  };
  const handleapprovecash = () => {
    navigate('/recieveclaimcashlist');
  };
  const handleSelfExpense = () => {
    navigate('/selfExpenselist');
  };

  return (
    <Paper elevation={4} style={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" id="mycss">
            Wallet
          </Typography>
        </Grid>

        {canseecompanybalacewallet() && (
          <Grid item container spacing={2}>
            <Grid item xs={12} sm={6} md={2}>
              <Typography>Company Name</Typography>

              <input placeholder="Comapny name" value={walletcompanybalanceData?.name} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Cash On Hand</Typography>
              <input placeholder="Amount" value={walletcompanybalanceData?.cashOnHand} />
              <Typography variant="caption" sx={{ display: "block", marginTop: "6px", color: "gray" }}              >
                Cash 1: ₹{walletcompanybalanceData?.cash1 || 0}
              </Typography>
              <Typography variant="caption" sx={{ display: "block", color: "gray" }}              >
                Cash 2: ₹{walletcompanybalanceData?.cash2 || 0}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Total Balance</Typography>
              <input placeholder="Total balance" value={walletcompanybalanceData?.totalBalance} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Bank Balance</Typography>
              <input placeholder="Total balance" value={walletcompanybalanceData?.bankBalance} />
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography variant="subtitle1">Self Expense</Typography>
              <input placeholder="Self expense" value={walletcompanybalanceData?.selfExpense} />
            </Grid>
          </Grid>
        )}
        <Grid item container spacing={2}>
          <Grid item xs={12} sm={6} md={2}>
            <Typography>User Name</Typography>

            {createConfig1() === 'Super Admin' || createConfig1() === 'Admin' ? (
              <div style={{ display: 'flex', width: '80%' }}>
                <Select
                  styles={{ container: (provided) => ({ ...provided, width: '100%' }) }}
                  options={users}
                  onChange={handleUserSelectChange}
                  value={{ value: userId, label: username }}
                  placeholder="Select User"
                />
              </div>
            ) : (
              <input placeholder="User Name" value={walletData?.userWallet?.userBalance?.username} />
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1">Cash On Hand</Typography>
            <input placeholder="Amount" value={walletData?.userWallet?.balance} />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="subtitle1">Total Balance</Typography>
            <input placeholder="Total balance" value={walletData?.userWallet?.incomes} />
          </Grid>
          <Grid item xs={12} sm={12} md={6} container sx={{ marginBottom: '8px' }} justifyContent="flex-start" alignItems="end" spacing={2}>
            <Grid item>
              <Typography variant="subtitle1">Self Expense</Typography>
              <input placeholder="Self expense" value={walletData?.userWallet?.selfExpense} />
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleSelfExpense}>
                Self Expense
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handledemandcash}>
                Demand Cash
              </Button>
            </Grid>
            <Grid item>
              <Button variant="contained" color="secondary" onClick={handleapprovecash}>
                Transfer Cash
              </Button>
            </Grid>
          </Grid>
        </Grid>
        {createConfig1() !== 'Super Admin' && canseewalletuserledger() && (
          <Grid item container spacing={2}>
            <Grid item xs={12} md={2} sm={6}>
              <Typography variant="subtitle1">From Date:</Typography>
              <DatePicker selected={formDate} onChange={handleformDateChange} dateFormat="dd/MM/yyyy" />
            </Grid>
            <Grid item xs={12} md={2} sm={6}>
              <Typography variant="subtitle1">To Date:</Typography>
              <DatePicker selected={toDate} onChange={handletoDateChange} dateFormat="dd/MM/yyyy" />
            </Grid>
            <Grid item xs={12} md={2} sm={6} sx={{ marginTop: '20px' }}>
              <Button variant="contained" color="secondary" onClick={handleApplyForUser}>
                Go
              </Button>
            </Grid>
          </Grid>
        )}
        {createConfig1() === 'Super Admin' && (
          <>
            <Grid container style={{ marginTop: '20px', overflowY: 'scroll' }}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  borderRight: { xs: 'none', md: '1px solid #ccc' },
                  paddingRight: { md: '16px' }
                }}
              >
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                  Credit
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      {createConfig1() === 'Super Admin' ? <TableCell style={{ textAlign: 'center' }}></TableCell> : ''}
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {walletData?.walletEntry?.records
                      ?.filter((entry) => entry.creditAmount)
                      .map((entry, index) => (
                        <TableRow key={index}>
                          {createConfig1() === 'Super Admin' ? (
                            <TableCell style={{ textAlign: 'center' }}>
                              <Checkbox
                                checked={entry.isApprove === true}
                                disabled={entry.isApprove === true}
                                onClick={() => handleCheckboxChange(entry)}
                              />
                            </TableCell>
                          ) : (
                            ''
                          )}
                          <TableCell style={{ textAlign: 'center' }}>{entry.creditAmount}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                        </TableRow>
                      ))}
                    {walletData?.walletEntry?.totals && (
                      <TableRow style={{ borderBottom: '0.2px solid lightgrey' }}>
                        <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Total Credit :</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                          {walletData?.walletEntry?.totals.totalCredit}
                        </TableCell>
                      </TableRow>
                    )}
                    {walletData?.walletEntry?.closingBalance && walletData?.walletEntry?.closingBalance.type === 'credit' && (
                      <TableRow style={{ borderBottom: '0.2px solid lightgrey' }}>
                        <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Closing Balance:</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                          {walletData?.walletEntry?.closingBalance.amount}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Grid>

              <Grid item xs={12} md={6} sx={{ paddingLeft: { md: '16px' } }}>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: isSmallScreen ? '20px' : '0px' }}>
                  Debit
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      {createConfig1() === 'Super Admin' ? <TableCell style={{ textAlign: 'center' }}></TableCell> : ''}
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {walletData?.walletEntry?.records
                      ?.filter((entry) => entry.debitAmount)
                      .map((entry, index) => (
                        <TableRow key={index} style={{ textAlign: 'center' }}>
                          {createConfig1() === 'Super Admin' ? (
                            <TableCell style={{ textAlign: 'center' }}>
                              <Checkbox
                                checked={entry.isApprove === true}
                                disabled={entry.isApprove === true}
                                onClick={() => handleCheckboxChange(entry)}
                              />
                            </TableCell>
                          ) : (
                            ''
                          )}
                          <TableCell style={{ textAlign: 'center' }}>{entry.debitAmount}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                        </TableRow>
                      ))}
                    {walletData?.walletEntry?.totals && (
                      <TableRow style={{ borderBottom: '0.2px solid lightgrey' }}>
                        <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Total Debit :</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                          {walletData?.walletEntry?.totals.totalDebit}
                        </TableCell>
                      </TableRow>
                    )}
                    {walletData?.walletEntry?.closingBalance && walletData?.walletEntry?.closingBalance.type === 'debit' && (
                      <TableRow style={{ borderBottom: '0.2px solid lightgrey' }}>
                        <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Closing Balance:</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>
                          {walletData?.walletEntry?.closingBalance.amount}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </>
        )}
        {createConfig1() !== 'Super Admin' && canseewalletuserledger() && (
          <>
            <Grid container style={{ marginTop: '20px', overflowY: 'scroll' }}>
              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  borderRight: { xs: 'none', md: '1px solid #ccc' },
                  paddingRight: { md: '16px' }
                }}
              >
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center' }}>
                  Credit
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      {createConfig1() === 'Super Admin' ? <TableCell style={{ textAlign: 'center' }}></TableCell> : ''}
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {walletuserData?.records
                      ?.filter((entry) => entry.creditAmount)
                      .map((entry, index) => (
                        <TableRow key={index}>
                          {createConfig1() === 'Super Admin' ? (
                            <TableCell style={{ textAlign: 'center' }}>
                              <Checkbox
                                checked={entry.isApprove === true}
                                disabled={entry.isApprove === true}
                                onClick={() => handleCheckboxChange(entry)}
                              />
                            </TableCell>
                          ) : (
                            ''
                          )}
                          <TableCell style={{ textAlign: 'center' }}>{entry.creditAmount}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                        </TableRow>
                      ))}
                    {walletuserData?.totals && (
                      <TableRow style={{ borderBottom: '0.2px solid lightgrey' }}>
                        <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Total Credit :</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>{walletuserData?.totals.totalCredit}</TableCell>
                      </TableRow>
                    )}
                    {walletuserData?.closingBalance && walletuserData?.closingBalance.type === 'credit' && (
                      <TableRow style={{ borderBottom: '0.2px solid lightgrey' }}>
                        <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Closing Balance:</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>{walletuserData?.closingBalance.amount}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Grid>

              <Grid item xs={12} md={6} sx={{ paddingLeft: { md: '16px' } }}>
                <Typography variant="h4" gutterBottom style={{ textAlign: 'center', marginTop: isSmallScreen ? '20px' : '0px' }}>
                  Debit
                </Typography>
                <Table>
                  <TableHead>
                    <TableRow>
                      {createConfig1() === 'Super Admin' ? <TableCell style={{ textAlign: 'center' }}></TableCell> : ''}
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Amount</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Name</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Particulars</TableCell>
                      <TableCell style={{ fontWeight: 'bold', textAlign: 'center' }}>Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {walletuserData?.records
                      ?.filter((entry) => entry.debitAmount)
                      .map((entry, index) => (
                        <TableRow key={index} style={{ textAlign: 'center' }}>
                          {createConfig1() === 'Super Admin' ? (
                            <TableCell style={{ textAlign: 'center' }}>
                              <Checkbox
                                checked={entry.isApprove === true}
                                disabled={entry.isApprove === true}
                                onClick={() => handleCheckboxChange(entry)}
                              />
                            </TableCell>
                          ) : (
                            ''
                          )}
                          <TableCell style={{ textAlign: 'center' }}>{entry.debitAmount}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{entry.personName}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{entry.details}</TableCell>
                          <TableCell style={{ textAlign: 'center' }}>{new Date(entry.date).toLocaleDateString('en-GB')}</TableCell>
                        </TableRow>
                      ))}
                    {walletuserData?.totals && (
                      <TableRow style={{ borderBottom: '0.2px solid lightgrey' }}>
                        <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Total Debit :</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>{walletuserData?.totals.totalDebit}</TableCell>
                      </TableRow>
                    )}
                    {walletuserData?.closingBalance && walletuserData?.closingBalance.type === 'debit' && (
                      <TableRow style={{ borderBottom: '0.2px solid lightgrey' }}>
                        <TableCell style={{ textAlign: 'end', fontWeight: 'bold' }}>Closing Balance:</TableCell>
                        <TableCell style={{ textAlign: 'center', fontWeight: 'bold' }}>{walletuserData?.closingBalance.amount}</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Paper>
  );
};

export default Wallet;
