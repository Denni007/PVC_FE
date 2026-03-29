import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Proformainvoiceview, fetchproformainvoiceList, deleteProformainvoice } from 'store/thunk';
import { Card, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
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
// import { Link } from 'react-router-dom';
import { Delete, Edit } from '@mui/icons-material';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import useCan from 'views/permission managenment/checkpermissionvalue';

const columns = [
  { id: 'ProFormaInvoice_no', label: 'No.', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'validtill', label: 'Valid Till', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

export default function ProformainvoiceList() {
  const {
    canUpdateProformainvoiceQuotation,
    canCreateProformainvoiceQuotation,
    canViewProformainvoiceQuotation,
    canDeProformainvoiceQuotation
  } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [quotations, setQuotations] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // called api of all quotation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchproformainvoiceList());
        response.sort((a, b) => {
          const aNum = parseInt(a.ProFormaInvoice_no.split('-')[1]);
          const bNum = parseInt(b.ProFormaInvoice_no.split('-')[1]);
          return aNum - bNum;
        });
        setQuotations(response);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching proformainvoice:', error);
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  // use for change page
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  //use for how many row show in page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // use for view single button passed id of data
  const handleViewQuotation = (id) => {
    dispatch(Proformainvoiceview(id, navigate));
    navigate(`/proformainvoiceviewpage/${id}`);
  };
  const handleaddproforma = () => {
    navigate('/proformainvoice');
  };
  //use for edit button passed id of data
  const handleUpdateQuotation = (id) => {
    dispatch(Proformainvoiceview(id));
    navigate(`/proformainvoice/${id}`);
  };

  const handleDeleteConfirmation = async (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteQuotation = async () => {
    try {
      await dispatch(deleteProformainvoice(selectedId, navigate));
      setOpenConfirmation(false);
      const response = await dispatch(fetchproformainvoiceList());
      setQuotations(response);
    } catch (error) {
      console.error('Error deleting proformainvoice:', error);
    }
  };

  return (
    <Card sx={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Pro Forma Invoice List
      </Typography>
      {/* <Link to="/qutation" style={{ textDecoration: 'none' }}> */}
      <Button
        variant="contained"
        onClick={handleaddproforma}
        color="secondary"
        style={{ margin: '10px' }}
        disabled={!canCreateProformainvoiceQuotation()}
      >
        Create Pro Forma Invoice
      </Button>
      {/* </Link> */}
      <TableContainer sx={{ maxHeight: 800, display: 'flex', alignItems: 'center' }}>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: 'rgba(66, 84, 102, 0.8)' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {quotations.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewProformainvoiceQuotation() ? 'Blue' : 'gray',
                            color: canViewProformainvoiceQuotation() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewProformainvoiceQuotation() && { opacity: 1 }),
                            ...(!canViewProformainvoiceQuotation() && { opacity: 0.5 }),
                            ...(!canViewProformainvoiceQuotation() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewQuotation(row.id)}
                          disabled={!canViewProformainvoiceQuotation()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateProformainvoiceQuotation() ? 'green' : 'gray',
                            color: canUpdateProformainvoiceQuotation() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateProformainvoiceQuotation() && { opacity: 1 }),
                            ...(!canUpdateProformainvoiceQuotation() && { opacity: 0.5 }),
                            ...(!canUpdateProformainvoiceQuotation() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateQuotation(row.id)}
                          disabled={!canUpdateProformainvoiceQuotation()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeProformainvoiceQuotation() ? 'Red' : 'gray',
                            color: canDeProformainvoiceQuotation() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeProformainvoiceQuotation() && { opacity: 1 }),
                            ...(!canDeProformainvoiceQuotation() && { opacity: 0.5 }),
                            ...(!canDeProformainvoiceQuotation() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canDeProformainvoiceQuotation()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' || column.id === 'validtill' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountProForma.accountName
                    ) : column.id === 'updatedBy' ? (
                      row.proUpdateUser?.username
                    ) : column.id === 'createdBy' ? (
                      row.proCreateUser?.username
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
        count={quotations.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this pro forma invoice?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleDeleteQuotation} color="secondary" variant="contained">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
