import React, { useState, useEffect } from 'react';
import {
  // Container,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TableContainer,
  TableHead,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  Grid,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  DebitnoteCashExcel,
  DebitnoteCashHtml,
  DebitnoteCashImage,
  DebitnoteCashPDF,
  DebitnoteCashSingleExcel,
  Debitnotecashviewdata,
  deleteDebitnotecash,
  getallDebitnotecash
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { BiSolidFilePdf } from 'react-icons/bi';
import { MdLocalPrintshop } from 'react-icons/md';
import { toast } from 'react-toastify';
import { IoImage } from 'react-icons/io5';
import { BiSolidFileHtml } from 'react-icons/bi';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const columns = [
  { id: 'debitnoteno', label: 'Debit Note No', minWidth: 100, align: 'center' },
  { id: 'debitdate', label: 'Date.', minWidth: 100, align: 'center' },
  { id: 'party', label: 'Party', minWidth: 100, align: 'center' },
  { id: 'createdBy', label: 'Created By', minWidth: 100, align: 'center' },
  { id: 'updatedBy', label: 'Updated By', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Debitnotecashlist = () => {
  const {
    canUpdateDebitnotecash,
    canDebitnotecashImage,
    canViewDebitnotecash,
    canCreateDebitnotecash,
    canDeleteDebitnotecash,
    canDebitnotecashpdf,
    canDebitnotecashExcel,
    canDebitnoteAllCashExcel,
    canDebitnotecashHtml
  } = useCan();
  const navigate = useNavigate();
  const [Debitnote, setDebitnote] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [openLedgerDialog, setOpenLedgerDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchDebitNote = async () => {
      try {
        const data = await dispatch(getallDebitnotecash());
        data.sort((a, b) => {
          const aNum = parseInt(a.debitnoteno);
          const bNum = parseInt(b.debitnoteno);
          return aNum - bNum;
        });
        setDebitnote(data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching debit note:', error);
      }
    };

    fetchDebitNote();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddDebitnote = () => {
    navigate('/debitnotecash');
  };

  const handleUpdateDebitnote = (id) => {
    dispatch(Debitnotecashviewdata(id));
    navigate(`/debitnotecashupdate/${id}`);
  };

  const handleViewDebitnote = (id) => {
    dispatch(Debitnotecashviewdata(id));
    navigate(`/debitnotecashview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
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

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
    setFormDate(new Date());
    setToDate(new Date());
  };

  const handleDeleteDebitnote = async () => {
    try {
      await dispatch(deleteDebitnotecash(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallDebitnotecash());
      setDebitnote(data);
    } catch (error) {
      console.error('Error deleting debit note:', error);
    }
  };

  const handlepdf = async (id) => {
    await dispatch(DebitnoteCashPDF(id, navigate, true));
  };

  const handleImage = async (id) => {
    await dispatch(DebitnoteCashImage(id, navigate, true));
  };

  const handleExcel = async (id) => {
    await dispatch(DebitnoteCashSingleExcel(id, navigate));
  };

  const handleHtml = async (id) => {
    await dispatch(DebitnoteCashHtml(id, navigate));
  };

  const handledownloadexcel = (formDate, toDate) => {
    dispatch(DebitnoteCashExcel(formDate, toDate));
    setFormDate(formDate);
    setToDate(toDate);
  };

  const handlePrint = async (id) => {
    const base64Data = await dispatch(DebitnoteCashPDF(id, navigate, false)); // Do not download
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
      printWindow.print();
      printWindow.onafterprint = () => {
        printWindow.close();
        URL.revokeObjectURL(blobUrl);
      };
    };
  };

  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Debit Note Cash List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddDebitnote}
          disabled={!canCreateDebitnotecash()}
        >
          Create Debit Note Cash
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleOpenLedgerDialog}
          disabled={!canDebitnoteAllCashExcel()}
        >
          Download Excel
        </Button>
      </div>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Debitnote?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewDebitnotecash() ? 'Blue' : 'gray',
                            color: canViewDebitnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewDebitnotecash() && { opacity: 1 }),
                            ...(!canViewDebitnotecash() && { opacity: 0.5 }),
                            ...(!canViewDebitnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewDebitnote(row.id)}
                          disabled={!canViewDebitnotecash()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateDebitnotecash() ? 'green' : 'gray',
                            color: canUpdateDebitnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateDebitnotecash() && { opacity: 1 }),
                            ...(!canUpdateDebitnotecash() && { opacity: 0.5 }),
                            ...(!canUpdateDebitnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateDebitnote(row.id)}
                          disabled={!canUpdateDebitnotecash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteDebitnotecash() ? 'Red' : 'gray',
                            color: canDeleteDebitnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteDebitnotecash() && { opacity: 1 }),
                            ...(!canDeleteDebitnotecash() && { opacity: 0.5 }),
                            ...(!canDeleteDebitnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteDebitnotecash()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sizeSmall onClick={(event) => handleMenuClick(event, row.id)} style={{ color: 'gray' }}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open && selectedId === row.id} onClose={handleMenuClose}>
                          {canDebitnotecashpdf() && (
                            <MenuItem onClick={() => handlepdf(row.id)}>
                              <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => handlePrint(row.id)}>
                            <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
                          </MenuItem>
                          {canDebitnotecashImage() && (
                            <MenuItem onClick={() => handleImage(row.id)}>
                              <IoImage style={{ marginRight: '8px' }} /> JPEG image
                            </MenuItem>
                          )}
                          {canDebitnotecashExcel() && (
                            <MenuItem onClick={() => handleExcel(row.id)}>
                              <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
                            </MenuItem>
                          )}
                          {canDebitnotecashHtml() && (
                            <MenuItem onClick={() => handleHtml(row.id)}>
                              <BiSolidFileHtml style={{ marginRight: '8px' }} /> Html document
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    ) : column.id === 'debitdate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountDebitNoCash.contactPersonName
                    ) : column.id === 'createdBy' ? (
                      row.debitCreateUserCash?.username
                    ) : column.id === 'updatedBy' ? (
                      row.debitUpdateUserCash?.username
                    ) : (
                      row[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[8, 25, 100]}
        component="div"
        count={Debitnote.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Debit note?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteDebitnote} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        PaperProps={{
          style: {
            height: 'auto',
            width: isMobile ? '90%' : '18%',
            margin: isMobile ? '0' : 'auto',
            maxWidth: isMobile ? '80%' : 'none'
          }
        }}
        open={openLedgerDialog}
        onClose={handleCloseLedgerDialog}
      >
        <DialogTitle>Download Debit Note Cash</DialogTitle>
        <DialogContent>
          <Typography>Select Date Range:</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <DatePicker selected={formDate} onChange={handleformDateChange} dateFormat="dd-MM-yyyy" />
            </Grid>
            <Grid item xs={12}>
              <DatePicker selected={toDate} onChange={handletoDateChange} dateFormat="dd-MM-yyyy" />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleCloseLedgerDialog} color="primary" style={{ marginRight: '10px' }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={() => handledownloadexcel(formDate, toDate)} color="secondary">
            Download Excel
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default Debitnotecashlist;
