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
  useMediaQuery,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  CreditnoteExcel,
  CreditnoteHtml,
  CreditnoteImage,
  CreditnotePDF,
  CreditnoteSingleExcel,
  Creditnoteviewdata,
  deleteCreditnote,
  getallCreditnote
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

const Creditnotelist = () => {
  const {
    canUpdateCreditnote,
    canViewCreditnote,
    canCreateCreditnote,
    canDeleteCreditnote,
    canCreditnotepdf,
    canCreditnoteImage,
    canCreditnotesingleexcel,
    canCreditnoteexcel,
    canCreditnoteHtml
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

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
  };

  useEffect(() => {
    const fetchcreditnote = async () => {
      try {
        const data = await dispatch(getallCreditnote());
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
    navigate('/creditnote');
  };

  const handleUpdateCreditnote = (id) => {
    dispatch(Creditnoteviewdata(id));
    navigate(`/creditnote/${id}`);
  };

  const handleViewCreditnote = (id) => {
    dispatch(Creditnoteviewdata(id));
    navigate(`/creditnoteview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteCreditnote = async () => {
    try {
      await dispatch(deleteCreditnote(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallCreditnote());
      setCreditnote(data);
    } catch (error) {
      console.error('Error deleting credit note:', error);
    }
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
    dispatch(CreditnoteExcel(formDate, toDate));
    setFormDate(formDate);
    setToDate(toDate);
  };

  const handlepdf = async (id) => {
    await dispatch(CreditnotePDF(id, navigate, true));
  };

  const handleImage = async (id) => {
    await dispatch(CreditnoteImage(id, navigate));
  };

  const handleExcel = async (id) => {
    await dispatch(CreditnoteSingleExcel(id, navigate));
  };

  const handleHtml = async (id) => {
    await dispatch(CreditnoteHtml(id, navigate));
  };

  const handlePrint = async (id) => {
    const base64Data = await dispatch(CreditnotePDF(id, navigate, false)); // Do not download
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
        Credit Note List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleAddCreditnote}
          disabled={!canCreateCreditnote()}
        >
          Create Credit Note
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '10px' }}
          onClick={handleOpenLedgerDialog}
          disabled={!canCreditnoteexcel()}
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
                            backgroundColor: canViewCreditnote() ? 'Blue' : 'gray',
                            color: canViewCreditnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewCreditnote() && { opacity: 1 }),
                            ...(!canViewCreditnote() && { opacity: 0.5 }),
                            ...(!canViewCreditnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewCreditnote(row.id)}
                          disabled={!canViewCreditnote()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateCreditnote() ? 'green' : 'gray',
                            color: canUpdateCreditnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateCreditnote() && { opacity: 1 }),
                            ...(!canUpdateCreditnote() && { opacity: 0.5 }),
                            ...(!canUpdateCreditnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateCreditnote(row.id)}
                          disabled={!canUpdateCreditnote()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteCreditnote() ? 'Red' : 'gray',
                            color: canDeleteCreditnote() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteCreditnote() && { opacity: 1 }),
                            ...(!canDeleteCreditnote() && { opacity: 0.5 }),
                            ...(!canDeleteCreditnote() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeleteCreditnote()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sizeSmall onClick={(event) => handleMenuClick(event, row.id)} style={{ color: 'gray' }}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open && selectedId === row.id} onClose={handleMenuClose}>
                          {canCreditnotepdf() && (
                            <MenuItem onClick={() => handlepdf(row.id)}>
                              <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => handlePrint(row.id)}>
                            <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
                          </MenuItem>
                          {canCreditnotesingleexcel() && (
                            <MenuItem onClick={() => handleExcel(row.id)}>
                              <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
                            </MenuItem>
                          )}
                          {canCreditnoteImage() && (
                            <MenuItem onClick={() => handleImage(row.id)}>
                              <IoImage style={{ marginRight: '8px' }} /> JPEG image
                            </MenuItem>
                          )}
                          {canCreditnoteHtml() && (
                            <MenuItem onClick={() => handleHtml(row.id)}>
                              <BiSolidFileHtml style={{ marginRight: '8px' }} /> Html document
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    ) : column.id === 'creditdate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountCreditNo.accountName
                    ) : column.id === 'createdBy' ? (
                      row.creditCreateUser?.username
                    ) : column.id === 'updatedBy' ? (
                      row.creditUpdateUser?.username
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
        <DialogTitle>Download Credit Notes</DialogTitle>
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

export default Creditnotelist;
