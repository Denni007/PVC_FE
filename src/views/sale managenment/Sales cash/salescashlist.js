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
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { BiSolidFilePdf } from 'react-icons/bi';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MdLocalPrintshop } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import {
  SalesCashExcel,
  SalesCashHtml,
  SalesCashImage,
  SalesCashPDF,
  SalesCashSingleExcel,
  SalesInvoiceCashview,
  deleteSalesinvoicecash,
  getallSalesInvoiceCash
} from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { toast } from 'react-toastify';
import { IoImage } from 'react-icons/io5';
import { BiSolidFileHtml } from 'react-icons/bi';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';

const columns = [
  { id: 'saleNo', label: 'Sale No', align: 'center' },
  { id: 'date', label: 'Date.', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const Salescashlist = () => {
  const {
    canCreateSalescash,
    canUpdateSalescash,
    canViewSalescash,
    canDeleteSalescash,
    canDownloadPdfCashSales,
    canDownloadImageCashSales,
    canSingleExcelSalesCash,
    canDownloadExcelSalescash,
    canSalesCashHtml
  } = useCan();
  const navigate = useNavigate();
  const [salescash, setsalescash] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [toDate, setToDate] = useState(new Date());
  const [formDate, setFormDate] = useState(new Date());
  const [openLedgerDialog, setOpenLedgerDialog] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchsalesinvoicecash = async () => {
      try {
        const data = await dispatch(getallSalesInvoiceCash());
        setsalescash(data.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching sales cash:', error);
      }
    };

    fetchsalesinvoicecash();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
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

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handledownloadexcel = (formDate, toDate) => {
    dispatch(SalesCashExcel(formDate, toDate));
    setFormDate(formDate);
    setToDate(toDate);
  };

  const handleAddSalescash = () => {
    navigate('/salescash');
  };

  const handleUpdateSalescash = (id) => {
    dispatch(SalesInvoiceCashview(id));
    navigate(`/salescash/${id}`);
  };

  const handleViewsalescash = (id) => {
    dispatch(SalesInvoiceCashview(id));
    navigate(`/salescashview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handledeletesalescash = async () => {
    try {
      await dispatch(deleteSalesinvoicecash(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallSalesInvoiceCash());
      setsalescash(data.data);
    } catch (error) {
      console.error('Error deleting sales cash:', error);
    }
  };

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
    setFormDate(new Date());
    setToDate(new Date());
  };

  const handledownloadpdf = async (id) => {
    await dispatch(SalesCashPDF(id, navigate, true));
  };

  const handledownloadImage = async (id) => {
    await dispatch(SalesCashImage(id, navigate));
  };
  const handledownloadExcel = async (id) => {
    await dispatch(SalesCashSingleExcel(id, navigate));
  };
  const handledownloadHtml = async (id) => {
    await dispatch(SalesCashHtml(id, navigate));
  };
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedInvoiceId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedInvoiceId(null);
  };

  const handlePrint = async (id) => {
    const base64Data = await dispatch(SalesCashPDF(id, navigate, false));
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

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Sales Cash List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddSalescash}
          disabled={!canCreateSalescash()}
        >
          Create Sales Cash
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleOpenLedgerDialog}
          disabled={!canDownloadExcelSalescash()}
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
            {salescash?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewSalescash() ? 'Blue' : 'gray',
                            color: canViewSalescash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewSalescash() && { opacity: 1 }),
                            ...(!canViewSalescash() && { opacity: 0.5 }),
                            ...(!canViewSalescash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewsalescash(row.id)}
                          disabled={!canViewSalescash()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateSalescash() ? 'green' : 'gray',
                            color: canUpdateSalescash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateSalescash() && { opacity: 1 }),
                            ...(!canUpdateSalescash() && { opacity: 0.5 }),
                            ...(!canUpdateSalescash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateSalescash(row.id)}
                          disabled={!canUpdateSalescash()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteSalescash() ? 'Red' : 'gray',
                            color: canDeleteSalescash() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteSalescash() && { opacity: 1 }),
                            ...(!canDeleteSalescash() && { opacity: 0.5 }),
                            ...(!canDeleteSalescash() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteSalescash()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sizeSmall style={{ color: 'gray' }} onClick={(event) => handleMenuClick(event, row.id)}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={openMenu && selectedInvoiceId === row.id} onClose={handleMenuClose}>
                          {canDownloadPdfCashSales() && (
                            <MenuItem onClick={() => handledownloadpdf(row.id)}>
                              <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => handlePrint(row.id)}>
                            <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
                          </MenuItem>
                          {canDownloadImageCashSales() && (
                            <MenuItem onClick={() => handledownloadImage(row.id)}>
                              <IoImage style={{ marginRight: '8px' }} /> JPEG image
                            </MenuItem>
                          )}
                          {canSingleExcelSalesCash() && (
                            <MenuItem onClick={() => handledownloadExcel(row.id)}>
                              <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
                            </MenuItem>
                          )}
                          {canSalesCashHtml() && (
                            <MenuItem onClick={() => handledownloadHtml(row.id)}>
                              <BiSolidFileHtml style={{ marginRight: '8px' }} /> Html document
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    ) : column.id === 'date' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountSaleCash.contactPersonName
                    ) : column.id === 'updatedBy' ? (
                      row.salesInvoiceUpdate?.username
                    ) : column.id === 'createdBy' ? (
                      row.salesInvoiceCreate?.username
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
        count={salescash.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Sales cash?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handledeletesalescash} variant="contained" color="secondary">
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
        <DialogTitle>Download Sales Cash Invoices</DialogTitle>
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

export default Salescashlist;
