import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PurchaseorderView, deletePurchaseOrder, fetchpurchaseorderList } from 'store/thunk';
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
  { id: 'purchaseOrder_no', label: 'No.', align: 'center' },
  { id: 'party', label: 'Party', align: 'center' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'validtill', label: 'Valid Till', align: 'center' },
  { id: 'createdBy', label: 'Create By', align: 'center' },
  { id: 'updatedBy', label: 'Update By', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

export default function Purchaseorderlist() {
  const { canseeupdatePurchaseOrder, canseecreatePurchaseOrder, canseeviewPurchaseOrder, canseedeletePurchaseOrder } = useCan();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [purchaseorder, setPurchaseorder] = useState([]);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // called api of all quotation
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dispatch(fetchpurchaseorderList());
        response.sort((a, b) => {
          const aNum = parseInt(a.purchaseOrder_no);
          const bNum = parseInt(b.purchaseOrder_no);
          return aNum - bNum;
        });
        setPurchaseorder(response);
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
    dispatch(PurchaseorderView(id));
    navigate(`/purchaseorderview/${id}`);
  };
  const handleaddproforma = () => {
    navigate('/purchaseorderadd');
  };
  //use for edit button passed id of data
  const handleUpdateQuotation = (id) => {
    dispatch(PurchaseorderView(id));
    navigate(`/purchaseorderupdate/${id}`);
  };

  const handleDeleteConfirmation = async (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handleDeleteQuotation = async () => {
    try {
      await dispatch(deletePurchaseOrder(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(fetchpurchaseorderList());
      setPurchaseorder(data);
    } catch (error) {
      console.error('Error deleting proformainvoice:', error);
    }
  };

  return (
    <Card sx={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Purchase Order List
      </Typography>
      {/* <Link to="/qutation" style={{ textDecoration: 'none' }}> */}
      <Button
        variant="contained"
        onClick={handleaddproforma}
        color="secondary"
        style={{ margin: '10px' }}
        disabled={!canseecreatePurchaseOrder()}
      >
        Create Purchase Order
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
            {purchaseorder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseeviewPurchaseOrder() ? 'Blue' : 'gray',
                            color: canseeviewPurchaseOrder() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseeviewPurchaseOrder() && { opacity: 1 }),
                            ...(!canseeviewPurchaseOrder() && { opacity: 0.5 }),
                            ...(!canseeviewPurchaseOrder() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleViewQuotation(row.id)}
                          disabled={!canseeviewPurchaseOrder()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseeupdatePurchaseOrder() ? 'green' : 'gray',
                            color: canseeupdatePurchaseOrder() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseeupdatePurchaseOrder() && { opacity: 1 }),
                            ...(!canseeupdatePurchaseOrder() && { opacity: 0.5 }),
                            ...(!canseeupdatePurchaseOrder() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleUpdateQuotation(row.id)}
                          disabled={!canseeupdatePurchaseOrder()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canseedeletePurchaseOrder() ? 'Red' : 'gray',
                            color: canseedeletePurchaseOrder() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canseedeletePurchaseOrder() && { opacity: 1 }),
                            ...(!canseedeletePurchaseOrder() && { opacity: 0.5 }),
                            ...(!canseedeletePurchaseOrder() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handleDeleteConfirmation(row.id)}
                          disabled={!canseedeletePurchaseOrder()}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>
                      </div>
                    ) : column.id === 'date' || column.id === 'validtill' ? (
                      new Date(row[column.id]).toLocaleDateString('en-GB')
                    ) : column.id === 'party' ? (
                      row.accountPurchaseOrder?.accountName
                    ) : column.id === 'updatedBy' ? (
                      row.orderUpdateUser?.username
                    ) : column.id === 'createdBy' ? (
                      row.orderCreateUser?.username
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
        count={purchaseorder.length}
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
