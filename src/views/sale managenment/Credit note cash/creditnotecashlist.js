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
  useTheme,
  Grid,
  useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  CreditnoteCashExcel,
  CreditnoteCashHtml,
  CreditnoteCashImage,
  CreditnoteCashPDF,
  CreditnoteCashSingleExcel,
  Creditnotecashviewdata,
  deleteCreditnotecash,
  getallCreditnotecash
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
  { id: 'creditnoteNo', label: 'Credit Note No', minWidth: 170, align: 'center' },
  { id: 'creditdate', label: 'Date.', minWidth: 170, align: 'center' },
  { id: 'party', label: 'Party', minWidth: 170, align: 'center' },
  { id: 'createdBy', label: 'Created By', minWidth: 100, align: 'center' },
  { id: 'updatedBy', label: 'Updated By', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Creditnotecashlist = () => {
  const {
    canUpdateCreditnotecash,
    canCreditnotecashImage,
    canViewCreditnotecash,
    canCreateCreditnotecash,
    canDeleteCreditnotecash,
    canCreditnotecashpdf,
    canCreditnotecashsingleexcel,
    canCreditnotecashexcel,
    canCreditnotecashHtml
  } = useCan();
  const navigate = useNavigate();
  const [Creditnote, setCreditnote] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [openLedgerDialog, setOpenLedgerDialog] = useState(false);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchcreditnote = async () => {
      try {
        const data = await dispatch(getallCreditnotecash());
        data.sort((a, b) => {
          const aNum = parseInt(a.creditnoteNo);
          const bNum = parseInt(b.creditnoteNo);
          return aNum - bNum;
        });
        setCreditnote(data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching Credit note:', error);
      }
    };

    fetchcreditnote();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCreditnote = () => {
    navigate('/creditnotecash');
  };

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
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

  const handledownloadexcel = (formDate, toDate) => {
    dispatch(CreditnoteCashExcel(formDate, toDate));
    setFormDate(formDate);
    setToDate(toDate);
  };

  const handleUpdateCreditnote = (id) => {
    dispatch(Creditnotecashviewdata(id));
    navigate(`/creditnotecashupdate/${id}`);
  };

  const handleViewCreditnote = (id) => {
    dispatch(Creditnotecashviewdata(id));
    navigate(`/creditnotecashview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteCreditnote = async () => {
    try {
      await dispatch(deleteCreditnotecash(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallCreditnotecash());
      setCreditnote(data);
    } catch (error) {
      console.error('Error deleting credit note:', error);
    }
  };

  const handlepdf = async (id) => {
    await dispatch(CreditnoteCashPDF(id, navigate, true));
  };

  const handleImagedownload = async (id) => {
    await dispatch(CreditnoteCashImage(id, navigate, true));
  };

  const handleExceldownload = async (id) => {
    await dispatch(CreditnoteCashSingleExcel(id, navigate, true));
  };

  const handlePrint = async (id) => {
    const base64Data = await dispatch(CreditnoteCashPDF(id, navigate, false)); // Do not download
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

  const handleHtml = async (id) => {
    await dispatch(CreditnoteCashHtml(id, navigate));
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Credit Note Cash List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddCreditnote}
          disabled={!canCreateCreditnotecash()}
        >
          Create Credit Note Cash
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleOpenLedgerDialog}
          disabled={!canCreditnotecashexcel()}
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
            {Creditnote?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewCreditnotecash() ? 'Blue' : 'gray',
                            color: canViewCreditnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewCreditnotecash() && { opacity: 1 }),
                            ...(!canViewCreditnotecash() && { opacity: 0.5 }),
                            ...(!canViewCreditnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewCreditnote(row.id)}
                          disabled={!canViewCreditnotecash()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateCreditnotecash() ? 'green' : 'gray',
                            color: canUpdateCreditnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateCreditnotecash() && { opacity: 1 }),
                            ...(!canUpdateCreditnotecash() && { opacity: 0.5 }),
                            ...(!canUpdateCreditnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateCreditnote(row.id)}
                          disabled={!canUpdateCreditnotecash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteCreditnotecash() ? 'Red' : 'gray',
                            color: canDeleteCreditnotecash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteCreditnotecash() && { opacity: 1 }),
                            ...(!canDeleteCreditnotecash() && { opacity: 0.5 }),
                            ...(!canDeleteCreditnotecash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteCreditnotecash()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sizeSmall onClick={(event) => handleMenuClick(event, row.id)} style={{ color: 'gray' }}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open && selectedId === row.id} onClose={handleMenuClose}>
                          {canCreditnotecashpdf() && (
                            <MenuItem onClick={() => handlepdf(row.id)}>
                              <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => handlePrint(row.id)}>
                            <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
                          </MenuItem>
                          {canCreditnotecashsingleexcel() && (
                            <MenuItem onClick={() => handleExceldownload(row.id)}>
                              <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
                            </MenuItem>
                          )}
                          {canCreditnotecashImage() && (
                            <MenuItem onClick={() => handleImagedownload(row.id)}>
                              <IoImage style={{ marginRight: '8px' }} /> JPEG image
                            </MenuItem>
                          )}
                          {canCreditnotecashHtml() && (
                            <MenuItem onClick={() => handleHtml(row.id)}>
                              <BiSolidFileHtml style={{ marginRight: '8px' }} /> Html document
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    ) : column.id === 'creditdate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountCreditNoCash.contactPersonName
                    ) : column.id === 'createdBy' ? (
                      row.creditCreateUserCash?.username
                    ) : column.id === 'updatedBy' ? (
                      row.creditUpdateUserCash?.username
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
        count={Creditnote.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Credit Note?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteCreditnote} variant="contained" color="secondary">
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
        <DialogTitle>Download Sales Invoices</DialogTitle>
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

export default Creditnotecashlist;
