import React, { useState, useEffect } from 'react';
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableHead,
  TableContainer,
  Grid,
  Paper,
  styled,
  Button,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AccountExcel, AccountledgerHtml, AccountledgerImage, AccountPDF, fetchAllAccounts, getallAccountledger } from 'store/thunk';
import { useNavigate } from 'react-router';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { IoMdMenu } from 'react-icons/io';
import { BiSolidFilePdf } from 'react-icons/bi';
import { MdLocalPrintshop } from 'react-icons/md';
import { toast } from 'react-toastify';
import { IoImage } from 'react-icons/io5';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import { BiSolidFileHtml } from 'react-icons/bi';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'particulars', label: 'Particulars', align: 'center' },
  { id: 'vchType', label: 'Vch Type', align: 'center' },
  { id: 'vchNo', label: 'Vch No.', align: 'center' },
  { id: 'debitAmount', label: 'Debit', align: 'center' },
  { id: 'creditAmount', label: 'Credit', align: 'center' }
];

const CustomTableRow = styled(TableRow)({
  padding: '5px 0px'
});

const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'short', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-GB', options);
};

const Accountledgerlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [yearData, setYearData] = useState({});
  const [getdata, setGetdata] = useState({});
  const [gettodata, setGettodata] = useState({});
  const [formDatec, setFormDate] = useState(new Date());
  const [toDatec, setToDate] = useState(new Date());
  const [AccountIdc, setAccountId] = useState(null);
  const [Account, setAccount] = useState([]);
  const [Accountname, setAccountname] = useState('');
  const { canaccountpdf, canseeaccountledgerexcel, canseeaccountledgerjpg, canseeaccountledgerhtml } = useCan();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleSelectChange = (selectedOption) => {
    if (selectedOption && selectedOption.label) {
      setAccountId(selectedOption.value);
      setAccountname(selectedOption.label);
    }
  };

  const handleFormDateChange = (date) => {
    setFormDate(date);
  };

  const handleToDateChange = (date) => {
    setToDate(date);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchAllAccounts());

        if (Array.isArray(response)) {
          const options = response.map((account) => ({
            value: account.id,
            label: account.accountName
          }));
          setAccount(options);
        }
      } catch (error) {
        console.error('Error fetching ledger:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const AccountId = sessionStorage.getItem('RAccountId');
  const formData = sessionStorage.getItem('RAccountformDate');
  const toDate = sessionStorage.getItem('RAccounttoDate');

  useEffect(() => {
    dispatch(getallAccountledger(AccountId, formData, toDate))
      .then((data) => {
        if (data) {
          setYearData(data.years || {});
          setGetdata(data.form);
          setGettodata(data.to);
        } else {
          console.error('Data is undefined.');
          if (error.response && error.response.status === 401) {
            navigate('/');
          }
        }
      })
      .catch((error) => {
        console.error('Error fetching payment ledger data:', error);
      });
  }, [dispatch, AccountId, formData, toDate, navigate]);
  
  const formatDateForApi = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleLedger = async () => {
    const formattedFormDate = formatDateForApi(formDatec);
    const formattedToDate = formatDateForApi(toDatec);
    const data = await dispatch(getallAccountledger(AccountIdc, formattedFormDate, formattedToDate));
    setYearData(data.years || {});
    setGetdata(data.form);
    setGettodata(data.to);
    navigate('/accountledger');
    sessionStorage.setItem('RAccountId', AccountIdc);
    sessionStorage.setItem('RAccountformDate', formattedFormDate);
    sessionStorage.setItem('RAccounttoDate', formattedToDate);
  };

  const handlepdf = async () => {
    if (AccountIdc) {
      await dispatch(AccountPDF(AccountIdc, formDatec, toDatec, navigate));
    } else {
      await dispatch(AccountPDF(AccountId, formData, toDate, navigate));
    }
  };

  const handleImage = async () => {
    if (AccountIdc) {
      await dispatch(AccountledgerImage(AccountIdc, formDatec, toDatec, navigate));
    } else {
      await dispatch(AccountledgerImage(AccountId, formData, toDate, navigate));
    }
  };

  const handleHtml = async () => {
    if (AccountIdc) {
      await dispatch(AccountledgerHtml(AccountIdc, formDatec, toDatec, navigate));
    } else {
      await dispatch(AccountledgerHtml(AccountId, formData, toDate, navigate));
    }
  };

  const handleExcel = async () => {
    if (AccountIdc) {
      await dispatch(AccountExcel(AccountIdc, formDatec, toDatec, navigate));
    } else {
      await dispatch(AccountExcel(AccountId, formData, toDate, navigate));
    }
  };

  const handlePrint = async () => {
    try {
      const accountIdToUse = AccountIdc ? AccountIdc : AccountId;
      const formDataToUse = AccountIdc ? formDatec : formData;
      const toDateToUse = AccountIdc ? toDatec : toDate;

      const base64Data = await dispatch(AccountPDF(accountIdToUse, formDataToUse, toDateToUse, navigate, false));

      if (!base64Data) {
        toast.error('Unable to retrieve PDF for printing');
        return;
      }

      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);

      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: 'application/pdf' });
      const blobUrl = URL.createObjectURL(blob);

      const printWindow = window.open(blobUrl);
      if (!printWindow || printWindow.closed || typeof printWindow.closed === 'undefined') {
        toast.error('Print window blocked by browser. Please enable popups for this site.');
        return;
      }

      printWindow.onload = () => {
        printWindow.focus();
        printWindow.print();
        printWindow.onafterprint = () => {
          printWindow.close();
          URL.revokeObjectURL(blobUrl);
        };
      };
    } catch (error) {
      console.error('Error printing the PDF:', error);
      toast.error('An error occurred while trying to print the PDF');
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Grid container>
        <Grid item xs={12} md={2} sm={6}>
          <Typography variant="subtitle1">Account:</Typography>
          <Select
            options={Account}
            value={AccountId ? { value: AccountId, label: Accountname } : null}
            onChange={handleSelectChange}
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              menu: (provided) => ({
                ...provided,
                zIndex: 9999,
                maxHeight: '300px',
                overflowY: 'auto'
              })
            }}
          />
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <Typography variant="subtitle1">From Date:</Typography>
          <DatePicker
            selected={formDatec}
            onChange={handleFormDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showPopperArrow={false}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={2} sm={6}>
          <Typography variant="subtitle1">To Date:</Typography>
          <DatePicker
            selected={toDatec}
            onChange={handleToDateChange}
            dateFormat="dd/MM/yyyy"
            isClearable={false}
            showPopperArrow={false}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={2} sm={6} style={{ marginTop: '20px' }}>
          <Button onClick={handleLedger} variant="contained" color="secondary">
            GO
          </Button>
        </Grid>

        <Grid item style={{ marginTop: '20px' }}>
          <IconButton onClick={handleMenuOpen}>
            <IoMdMenu />
          </IconButton>
          <Menu anchorEl={anchorEl} open={isMenuOpen} onClose={handleMenuClose}>
            {canaccountpdf() && (
              <MenuItem onClick={handlepdf}>
                <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
              </MenuItem>
            )}
            <MenuItem onClick={handlePrint}>
              <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
            </MenuItem>
            {canseeaccountledgerjpg() && (
              <MenuItem onClick={handleImage}>
                <IoImage style={{ marginRight: '8px' }} /> JPEG Image
              </MenuItem>
            )}
            {canseeaccountledgerexcel() && (
              <MenuItem onClick={handleExcel}>
                <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
              </MenuItem>
            )}
            {canseeaccountledgerhtml() && (
              <MenuItem onClick={handleHtml}>
                <BiSolidFileHtml style={{ marginRight: '8px' }} /> Html document
              </MenuItem>
            )}
          </Menu>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} align="center">
          <Typography variant="h6">From:</Typography>
          <Typography variant="h4">{getdata.companyname}</Typography>
          <Typography>{getdata.address1}</Typography>
          <Typography>
            {getdata.city} {getdata.state} {getdata.pincode}
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography variant="h6">To:</Typography>
          <Typography variant="h4">{gettodata.accountName}</Typography>
          <Typography>Ledger Account</Typography>
          <Typography>{gettodata.accountDetail?.address1}</Typography>
          <Typography>
            {gettodata.accountDetail?.city} {gettodata.accountDetail?.state} {gettodata.accountDetail?.pincode}
          </Typography>
          <Typography>Email: {gettodata.accountDetail?.email}</Typography>
        </Grid>
      </Grid>

      {Object.entries(yearData).map(([year, data]) => (
        <React.Fragment key={year}>
          <Typography variant="h6" align="center" style={{ marginTop: '20px' }}>
            {data.dateRange}
          </Typography>
          <TableContainer component={Paper}>
            <Table style={{ border: '1px solid lightgrey' }}>
              <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
                <TableRow sx={{ padding: '5px 0px' }}>
                  {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(data.records).map(([date, records]) =>
                  Array.isArray(records) ? (
                    records.map((record, idx) => (
                      <CustomTableRow key={`${date}-${idx}`}>
                        {columns.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            style={{
                              color: column.id === 'creditAmount' ? '#00CE00' : column.id === 'debitAmount' ? 'red' : 'inherit'
                            }}
                          >
                            {column.id === 'creditAmount' && record[column.id] !== 0 ? record[column.id] : ''}
                            {column.id === 'debitAmount' && record[column.id] !== 0 ? record[column.id] : ''}
                            {column.id === 'date' && (idx === 0 || records[idx - 1]?.date !== record.date)
                              ? formatDate(record[column.id])
                              : ''}
                            {column.id !== 'creditAmount' && column.id !== 'debitAmount' && column.id !== 'date' && record[column.id]}
                          </TableCell>
                        ))}
                      </CustomTableRow>
                    ))
                  ) : (
                    <TableRow key={''}>
                      <TableCell colSpan={columns.length} align="center">
                        No records available
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
              <TableBody>
                <TableRow>
                  <TableCell colSpan={4} align="right"></TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: 'red' }}>
                      {data.totals.totalDebit.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#00CE00' }}>
                      {data.totals.totalCredit.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
                {data.closingBalance.type === 'credit' && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Closing Balance :</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" style={{ color: '#00CE00' }}>
                      {data.closingBalance.amount.toFixed(2)}
                    </TableCell>
                  </TableRow>
                )}
                {data.closingBalance.type === 'debit' && (
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell align="center">Closing Balance :</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell align="center" style={{ color: 'red' }}>
                      {data.closingBalance.amount.toFixed(2)}
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                )}
                <TableRow>
                  <TableCell colSpan={4} align="right"></TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: 'red' }}>
                      {data.totalAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="subtitle1" style={{ color: '#00CE00' }}>
                      {data.totalAmount.toFixed(2)}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </React.Fragment>
      ))}
    </Card>
  );
};

export default Accountledgerlist;
