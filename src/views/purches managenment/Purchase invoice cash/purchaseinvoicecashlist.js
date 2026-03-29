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
  Grid,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  PurchaseCashExcel,
  PurchaseCashPDF,
  PurchaseInvoiceCashHtml,
  PurchaseInvoiceCashImage,
  PurchaseInvoiceviewCash,
  deletePurchaseInvoiceCash,
  getallPurchaseInvoiceCash,
  purchaseCashSingleExcel
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
  { id: 'purchaseNo', label: 'Purchase No', align: 'center' },
  { id: 'date', label: 'Date.', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Purchaseinvoicecashlist = () => {
  const {
    canCreatePurchasebillcash,
    canUpdatePurchasebillcash,
    canViewPurchasebillcash,
    canDeletePurchasebillcash,
    canDownloadPdfCashPurchase,
    canDownloadImageCashPurchase,
    canDownloadAllExcelCashPurchase,
    canDownloadExcelCashPurchase,
    canDownloadHtmlPurchaseInvoice
  } = useCan();
  const navigate = useNavigate();
  const [purchasebillcash, setPurchasebillcash] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
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
    const fetchsalesinvoicecash = async () => {
      try {
        const response = await dispatch(getallPurchaseInvoiceCash());
        const data = response.data;
        setPurchasebillcash(Array.isArray(data) ? data : []);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching purchase invoice cash:', error);
      }
    };

    fetchsalesinvoicecash();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
    setFormDate(new Date());
    setToDate(new Date());
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
    dispatch(PurchaseCashExcel(formDate, toDate));
    setFormDate(formDate);
    setToDate(toDate);
  };

  const handleAddPurchasebillCash = () => {
    navigate('/purchaseinvoicecash');
  };

  const handleUpdatePurchasebillCash = (id) => {
    dispatch(PurchaseInvoiceviewCash(id));
    navigate(`/purchaseinvoicecash/${id}`);
  };

  const handleViewPurchasebillCash = (id) => {
    dispatch(PurchaseInvoiceviewCash(id));
    navigate(`/purchaseinvoicecashview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handledeletepurchasecash = async () => {
    try {
      await dispatch(deletePurchaseInvoiceCash(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallPurchaseInvoiceCash());
      setPurchasebillcash(data.data);
    } catch (error) {
      console.error('Error deleting purchase invoice cash:', error);
    }
  };

  const handledownloadpdf = async (id) => {
    await dispatch(PurchaseCashPDF(id, navigate, true));
  };

  const handledownloadImage = async (id) => {
    await dispatch(PurchaseInvoiceCashImage(id, navigate));
  };

  const handledownloadHtml = async (id) => {
    await dispatch(PurchaseInvoiceCashHtml(id, navigate));
  };

  const handledownloadExcel = async (id) => {
    await dispatch(purchaseCashSingleExcel(id, navigate));
  };

  const handlePrint = async (id) => {
    const base64Data = await dispatch(PurchaseCashPDF(id, navigate, false));
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
        Purchase Cash List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddPurchasebillCash}
          disabled={!canCreatePurchasebillcash()}
        >
          Create Purchase cash
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleOpenLedgerDialog}
          disabled={!canDownloadAllExcelCashPurchase()}
        >
          Download Excel
        </Button>
      </div>
      <TableContainer sx={{ maxHeight: 575 }}>
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
            {purchasebillcash?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewPurchasebillcash() ? 'Blue' : 'gray',
                            color: canViewPurchasebillcash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewPurchasebillcash() && { opacity: 1 }),
                            ...(!canViewPurchasebillcash() && { opacity: 0.5 }),
                            ...(!canViewPurchasebillcash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewPurchasebillCash(row.id)}
                          disabled={!canViewPurchasebillcash()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdatePurchasebillcash() ? 'green' : 'gray',
                            color: canUpdatePurchasebillcash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdatePurchasebillcash() && { opacity: 1 }),
                            ...(!canUpdatePurchasebillcash() && { opacity: 0.5 }),
                            ...(!canUpdatePurchasebillcash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdatePurchasebillCash(row.id)}
                          disabled={!canUpdatePurchasebillcash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeletePurchasebillcash() ? 'Red' : 'gray',
                            color: canDeletePurchasebillcash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeletePurchasebillcash() && { opacity: 1 }),
                            ...(!canDeletePurchasebillcash() && { opacity: 0.5 }),
                            ...(!canDeletePurchasebillcash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeletePurchasebillcash()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sizeSmall onClick={(event) => handleMenuClick(event, row.id)} style={{ color: 'gray' }}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open && selectedId === row.id} onClose={handleMenuClose}>
                          {canDownloadPdfCashPurchase() && (
                            <MenuItem onClick={() => handledownloadpdf(row.id)}>
                              <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => handlePrint(row.id)}>
                            <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
                          </MenuItem>
                          {canDownloadExcelCashPurchase() && (
                            <MenuItem onClick={() => handledownloadExcel(row.id)}>
                              <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
                            </MenuItem>
                          )}
                          {canDownloadImageCashPurchase() && (
                            <MenuItem onClick={() => handledownloadImage(row.id)}>
                              <IoImage style={{ marginRight: '8px' }} /> JPEG image
                            </MenuItem>
                          )}
                          {canDownloadHtmlPurchaseInvoice() && (
                            <MenuItem onClick={() => handledownloadHtml(row.id)}>
                              <BiSolidFileHtml style={{ marginRight: '8px' }} /> Html document
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountPurchaseCash?.contactPersonName
                    ) : column.id === 'updatedBy' ? (
                      row.purchaseUpdateUser?.username
                    ) : column.id === 'createdBy' ? (
                      row.purchaseCreateUser?.username
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={purchasebillcash.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handledeletepurchasecash} variant="contained" color="secondary">
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

export default Purchaseinvoicecashlist;
