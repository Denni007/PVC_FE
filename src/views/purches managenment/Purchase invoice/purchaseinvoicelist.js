// import React, { useState, useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { viewPurchaseinvoice, deletePurchaseinvoice, getallPurchaseinvoice, PurchaseInvoicePDF } from 'store/thunk';
// import { Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TablePagination from '@mui/material/TablePagination';
// import TableRow from '@mui/material/TableRow';
// import Button from '@mui/material/Button';
// import { Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import useCan from 'views/permission managenment/checkpermissionvalue';
// import { Delete, Edit } from '@mui/icons-material';
// import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

// const columns = [
//   { id: 'invoicedate', label: 'Invoice Date', minWidth: 100, align: 'center' },
//   { id: 'party', label: 'Party', minWidth: 100, align: 'center' },
//   { id: 'duedate', label: 'Due Date', minWidth: 100, align: 'center' },
//   { id: 'createdBy', label: 'Create By', align: 'center' },
//   { id: 'updatedBy', label: 'Update By', align: 'center' },
//   { id: 'action', label: 'Action', align: 'center' }
// ];

// export default function PurchaseinvoiceList() {
//   const {
//     canViewPurchaseinvoice,
//     canDeletePurchaseinvoice,
//     canDownloadPdfPurchaseInvoice,
//     canUpdatePurchaseinvoice,
//     canCreatePurchaseinvoice
//   } = useCan();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [purchasebill, setPurchasebill] = useState([]);
//   const [openConfirmation, setOpenConfirmation] = useState(false);
//   const [billid, setBillid] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await dispatch(getallPurchaseinvoice());
//         setPurchasebill(response.data);
//       } catch (error) {
//         if (error.response.status === 401) {
//           navigate('/');
//         }
//         console.error('Error fetching purchase invoice:', error);
//       }
//     };

//     fetchData();
//   }, [dispatch, navigate]);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   const handleViewPurchaseBill = (id) => {
//     dispatch(viewPurchaseinvoice(id));
//     navigate(`/purchaseinvoiceview/${id}`);
//   };

//   const handleUpdatePurchaseBill = (id) => {
//     dispatch(viewPurchaseinvoice(id));
//     navigate(`/purchaseinvoice/${id}`);
//   };
//   const handleAddpuchasebill = () => {
//     navigate('/purchaseinvoice');
//   };

//   const handleDeleteConfirmation = (id) => {
//     setOpenConfirmation(true);
//     setBillid(id);
//   };

//   const handleDeletePurchasebill = async () => {
//     try {
//       await dispatch(deletePurchaseinvoice(billid, navigate));
//       setOpenConfirmation(false);
//       const data = await dispatch(getallPurchaseinvoice());
//       setPurchasebill(data);
//     } catch (error) {
//       console.error('Error deleting purchase invoice:', error);
//     }
//   };

//   const handledownloadpdf = async (id) => {
//     await dispatch(PurchaseInvoicePDF(id, navigate));
//   };

//   return (
//     <Card sx={{ width: '100%', padding: '25px' }}>
//       <Typography variant="h4" align="center" id="mycss">
//         Purchase Invoice List
//       </Typography>
//       <Button
//         variant="contained"
//         color="secondary"
//         style={{ margin: '16px' }}
//         onClick={handleAddpuchasebill}
//         disabled={!canCreatePurchaseinvoice()}
//       >
//         Create Purchase Invoice
//       </Button>
//       <TableContainer sx={{ maxHeight: 575 }}>
//         <Table style={{ border: '1px solid lightgrey' }}>
//           <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)', color: 'white' }}>
//             <TableRow>
//               {columns.map((column) => (
//                 <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
//                   {column.label}
//                 </TableCell>
//               ))}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {purchasebill?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
//               <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
//                 {columns.map((column) => (
//                   <TableCell key={column.id} align={column.align}>
//                     {column.id === 'action' ? (
//                       <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
//                         <IconButton
//                           sizeSmall
//                           style={{
//                             backgroundColor: canViewPurchaseinvoice() ? 'Blue' : 'gray',
//                             color: canViewPurchaseinvoice() ? 'white' : 'white',
//                             borderRadius: 0.8,
//                             ...(canViewPurchaseinvoice() && { opacity: 1 }),
//                             ...(!canViewPurchaseinvoice() && { opacity: 0.5 }),
//                             ...(!canViewPurchaseinvoice() && { backgroundColor: 'gray' })
//                           }}
//                           onClick={() => handleViewPurchaseBill(row.id)}
//                           disabled={!canViewPurchaseinvoice()}
//                         >
//                           <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
//                         </IconButton>
//                         <IconButton
//                           sizeSmall
//                           style={{
//                             backgroundColor: canUpdatePurchaseinvoice() ? 'green' : 'gray',
//                             color: canUpdatePurchaseinvoice() ? 'white' : 'white',
//                             borderRadius: 0.8,
//                             ...(canUpdatePurchaseinvoice() && { opacity: 1 }),
//                             ...(!canUpdatePurchaseinvoice() && { opacity: 0.5 }),
//                             ...(!canUpdatePurchaseinvoice() && { backgroundColor: 'gray' })
//                           }}
//                           onClick={() => handleUpdatePurchaseBill(row.id)}
//                           disabled={!canUpdatePurchaseinvoice()}
//                         >
//                           <Edit style={{ fontSize: '16px' }} />
//                         </IconButton>
//                         <IconButton
//                           sizeSmall
//                           style={{
//                             backgroundColor: canDeletePurchaseinvoice() ? 'Red' : 'gray',
//                             color: canDeletePurchaseinvoice() ? 'white' : 'white',
//                             borderRadius: 0.8,
//                             ...(canDeletePurchaseinvoice() && { opacity: 1 }),
//                             ...(!canDeletePurchaseinvoice() && { opacity: 0.5 }),
//                             ...(!canDeletePurchaseinvoice() && { backgroundColor: 'gray' })
//                           }}
//                           onClick={() => handleDeleteConfirmation(row.id)}
//                           disabled={!canDeletePurchaseinvoice()}
//                         >
//                           <Delete style={{ fontSize: '16px' }} />
//                         </IconButton>
//                         <IconButton
//                           sizeSmall
//                           style={{
//                             backgroundColor: canDownloadPdfPurchaseInvoice() ? '#425466' : 'gray',
//                             color: canDownloadPdfPurchaseInvoice() ? 'white' : 'white',
//                             borderRadius: 0.8,
//                             ...(canDownloadPdfPurchaseInvoice() && { opacity: 1 }),
//                             ...(!canDownloadPdfPurchaseInvoice() && { opacity: 0.5 }),
//                             ...(!canDownloadPdfPurchaseInvoice() && { backgroundColor: 'gray' })
//                           }}
//                           onClick={() => handledownloadpdf(row.id)}
//                           disabled={!canDownloadPdfPurchaseInvoice()}
//                         >
//                           <PictureAsPdfIcon style={{ fontSize: '16px' }} />
//                         </IconButton>
//                       </div>
//                     ) : column.id === 'invoicedate' ? (
//                       new Date(row[column.id]).toLocaleDateString('en-GB')
//                     ) : column.id === 'duedate' ? (
//                       new Date(row[column.id]).toLocaleDateString('en-GB')
//                     ) : column.id === 'party' ? (
//                       row.accountPurchaseInv.accountName
//                     ) : column.id === 'updatedBy' ? (
//                       row.salesUpdateUser?.username
//                     ) : column.id === 'createdBy' ? (
//                       row.salesCreateUser?.username
//                     ) : (
//                       row[column.id]
//                     )}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={purchasebill.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//       <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
//         <DialogTitle>Confirmation</DialogTitle>
//         <DialogContent>Are you sure you want to delete this?</DialogContent>
//         <DialogActions>
//           <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button onClick={handleDeletePurchasebill} variant="contained" color="secondary">
//             Yes
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Card>
//   );
// }
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  viewPurchaseinvoice,
  deletePurchaseinvoice,
  getallPurchaseinvoice,
  PurchaseInvoicePDF,
  PurchaseInvoiceImage,
  purchaseInvoiceSingleExcel,
  PurchaseInvoiceExcel,
  PurchaseInvoiceHtml
} from 'store/thunk';
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme
} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from 'react-toastify';
import { BiSolidFilePdf } from 'react-icons/bi';
import { MdLocalPrintshop } from 'react-icons/md';
import { IoImage } from 'react-icons/io5';
import { BiSolidFileHtml } from 'react-icons/bi';
import { PiMicrosoftExcelLogoFill } from 'react-icons/pi';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const columns = [
  { id: 'invoicedate', label: 'Invoice Date', minWidth: 100, align: 'center' },
  { id: 'party', label: 'Party', minWidth: 100, align: 'center' },
  { id: 'duedate', label: 'Due Date', minWidth: 100, align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

export default function PurchaseinvoiceList() {
  const {
    canViewPurchaseinvoice,
    canDeletePurchaseinvoice,
    canUpdatePurchaseinvoice,
    canCreatePurchaseinvoice,
    canDownloadPdfPurchaseInvoice,
    canDownloadImagePurchaseInvoice,
    canDownloadPurchaseInvoiceExcel,
    canDownloadAllPurchaseInvoiceExcel,
    canDownloadHtmlPurchaseInvoice
  } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [purchasebill, setPurchasebill] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [billid, setBillid] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState(null);
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
    const fetchData = async () => {
      try {
        const response = await dispatch(getallPurchaseinvoice());
        setPurchasebill(response.data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching purchase invoice:', error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleViewPurchaseBill = (id) => {
    dispatch(viewPurchaseinvoice(id));
    navigate(`/purchaseinvoiceview/${id}`);
  };

  const handleUpdatePurchaseBill = (id) => {
    dispatch(viewPurchaseinvoice(id));
    navigate(`/purchaseinvoice/${id}`);
  };

  const handleAddpuchasebill = () => {
    navigate('/purchaseinvoice');
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setBillid(id);
  };

  const handleDeletePurchasebill = async () => {
    try {
      await dispatch(deletePurchaseinvoice(billid, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(getallPurchaseinvoice());
      setPurchasebill(data.data);
    } catch (error) {
      console.error('Error deleting purchase invoice:', error);
    }
  };

  const handledownloadpdf = async (id) => {
    const base64Data = await dispatch(PurchaseInvoicePDF(id, navigate, true));
    return base64Data;
  };

  const handlePrint = async (id) => {
    const base64Data = await dispatch(PurchaseInvoicePDF(id, navigate, false)); // Do not download
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
    setSelectedInvoiceId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handledownloadImage = async (id) => {
    await dispatch(PurchaseInvoiceImage(id, navigate));
  };

  const handledownloadExcel = async (id) => {
    await dispatch(purchaseInvoiceSingleExcel(id, navigate));
  };

  const handledownloadHtml = async (id) => {
    await dispatch(PurchaseInvoiceHtml(id, navigate));
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
    dispatch(PurchaseInvoiceExcel(formDate, toDate));
    setFormDate(formDate);
    setToDate(toDate);
  };

  return (
    <Card sx={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase Invoice List
      </Typography>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleAddpuchasebill}
          disabled={!canCreatePurchaseinvoice()}
        >
          Create Purchase Invoice
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ margin: '16px' }}
          onClick={handleOpenLedgerDialog}
          disabled={!canDownloadAllPurchaseInvoiceExcel()}
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
            {purchasebill?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewPurchaseinvoice() ? 'Blue' : 'gray',
                            color: canViewPurchaseinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewPurchaseinvoice() && { opacity: 1 }),
                            ...(!canViewPurchaseinvoice() && { opacity: 0.5 }),
                            ...(!canViewPurchaseinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewPurchaseBill(row.id)}
                          disabled={!canViewPurchaseinvoice()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdatePurchaseinvoice() ? 'green' : 'gray',
                            color: canUpdatePurchaseinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdatePurchaseinvoice() && { opacity: 1 }),
                            ...(!canUpdatePurchaseinvoice() && { opacity: 0.5 }),
                            ...(!canUpdatePurchaseinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdatePurchaseBill(row.id)}
                          disabled={!canUpdatePurchaseinvoice()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeletePurchaseinvoice() ? 'Red' : 'gray',
                            color: canDeletePurchaseinvoice() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeletePurchaseinvoice() && { opacity: 1 }),
                            ...(!canDeletePurchaseinvoice() && { opacity: 0.5 }),
                            ...(!canDeletePurchaseinvoice() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeletePurchaseinvoice()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton sizeSmall onClick={(event) => handleMenuClick(event, row.id)} style={{ color: 'gray' }}>
                          <MoreVertIcon />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={open && selectedInvoiceId === row.id} onClose={handleMenuClose}>
                          {canDownloadPdfPurchaseInvoice() && (
                            <MenuItem onClick={() => handledownloadpdf(row.id)}>
                              <BiSolidFilePdf style={{ marginRight: '8px' }} /> PDF
                            </MenuItem>
                          )}
                          <MenuItem onClick={() => handlePrint(row.id)}>
                            <MdLocalPrintshop style={{ marginRight: '8px' }} /> Print
                          </MenuItem>
                          {canDownloadImagePurchaseInvoice() && (
                            <MenuItem onClick={() => handledownloadImage(row.id)}>
                              <IoImage style={{ marginRight: '8px' }} /> JPEG image
                            </MenuItem>
                          )}
                          {canDownloadPurchaseInvoiceExcel() && (
                            <MenuItem onClick={() => handledownloadExcel(row.id)}>
                              <PiMicrosoftExcelLogoFill style={{ marginRight: '8px' }} /> Excel
                            </MenuItem>
                          )}
                          {canDownloadHtmlPurchaseInvoice() && (
                            <MenuItem onClick={() => handledownloadHtml(row.id)}>
                              <BiSolidFileHtml style={{ marginRight: '8px' }} /> Html document
                            </MenuItem>
                          )}
                        </Menu>
                      </div>
                    ) : column.id === 'invoicedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'duedate' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountPurchaseInv.accountName
                    ) : column.id === 'updatedBy' ? (
                      row.salesUpdateUser?.username
                    ) : column.id === 'createdBy' ? (
                      row.salesCreateUser?.username
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
        count={purchasebill.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this?</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpenConfirmation(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleDeletePurchasebill} variant="contained" color="secondary">
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
        <DialogTitle>Download Purchase Invoices</DialogTitle>
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
  );
}
