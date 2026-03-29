import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Card,
  TablePagination,
  TableHead,
  TableContainer,
  IconButton
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { IsStatusclaimCash, viewRecieveClaimCash } from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
import { useNavigate } from 'react-router';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useState, useEffect } from 'react';

const useStyles = makeStyles(() => ({
  iconButton: {
    margin: '0 4px',
    padding: '3px'
  },
  approveIcon: {
    backgroundColor: 'green',
    color: 'white',
    padding: '5px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'green'
    }
  },
  rejectIcon: {
    backgroundColor: 'red',
    color: 'white',
    padding: '5px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'red'
    }
  }
}));

// Your existing component code...

const columns = [
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'user', label: 'Sender', align: 'center', minWidth: 100 },
  { id: 'amount', label: 'Amount', align: 'center', minWidth: 100 },
  { id: 'description', label: 'Description', align: 'center', minWidth: 100 },
  { id: 'purpose', label: 'Purpose', align: 'center', minWidth: 100 },
  { id: 'statusdate', label: 'Status Date', align: 'center', minWidth: 100 },
  { id: 'status', label: 'Status', align: 'center', minWidth: 100 }
];

const Recieveclaimcashlist = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { canIsapproveClaimcash } = useCan();
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);
  const [statuses, setStatuses] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(viewRecieveClaimCash());
        setPayments(data);
        const initialStatuses = data.reduce((acc, payment) => {
          acc[payment.id] = payment.isApproved === null ? 'Pending' : payment.isApproved ? 'Approve' : 'Reject';
          return acc;
        }, {});
        setStatuses(initialStatuses);
      } catch (error) {
        // if (error.response.status === 401) {
        //   navigate('/');
        // }
        console.error('Error fetching receive claim cash data:', error);
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 15));
    setPage(0);
  };

  const handleStatusChange = (paymentId, isApproved) => {
    const payment = payments.find((p) => p.id === paymentId);
    dispatch(IsStatusclaimCash(paymentId, payment.toUserId, isApproved, navigate))
      .then(() => {
        setStatuses((prevStatuses) => ({
          ...prevStatuses,
          [paymentId]: isApproved ? 'Approve' : 'Reject'
        }));
      })
      .catch((error) => {
        console.error('Error updating receive claim cash status:', error);
      });
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Approve Claim Cash List
      </Typography>

      <TableContainer>
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
            {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment, index) => (
              <TableRow key={payment.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'status' ? (
                      statuses[payment.id] === 'Pending' ? (
                        <div>
                          <IconButton
                            className={`${classes.iconButton} ${classes.approveIcon}`}
                            onClick={() => handleStatusChange(payment.id, true)}
                            disabled={!canIsapproveClaimcash()}
                          >
                            <CheckIcon />
                          </IconButton>
                          <IconButton
                            className={`${classes.iconButton} ${classes.rejectIcon}`}
                            onClick={() => handleStatusChange(payment.id, false)}
                            disabled={!canIsapproveClaimcash()}
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      ) : statuses[payment.id] === 'Approve' ? (
                        <div>
                          <IconButton className={`${classes.iconButton} ${classes.approveIcon}`}>
                            <CheckIcon />
                          </IconButton>
                        </div>
                      ) : statuses[payment.id] === 'Reject' ? (
                        <div>
                          <IconButton className={`${classes.iconButton} ${classes.rejectIcon}`}>
                            <CloseIcon />
                          </IconButton>
                        </div>
                      ) : (
                        <span className={classes.pending}>{statuses[payment.id]}</span>
                      )
                    ) : column.id === 'user' ? (
                      payment.fromUser.username
                    ) : column.id === 'date' ? (
                      new Date(payment.updatedAt).toLocaleDateString('en-GB')
                    ) : column.id === 'statusdate' ? (
                      payment.date ? (
                        new Date(payment.date).toLocaleDateString('en-GB')
                      ) : (
                        '-'
                      )
                    ) : (
                      payment[column.id]
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[15, 25, 100]}
        component="div"
        count={payments?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default Recieveclaimcashlist;
