import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Card, TablePagination, TableHead, TableContainer } from '@mui/material';
import { useDispatch } from 'react-redux';
import { CompanyBankLedger } from 'store/thunk';
import { useNavigate } from 'react-router';

const columns = [
  { id: 'date', label: 'Date', align: 'center', minWidth: 100 },
  { id: 'creditAmount', label: 'Credit', align: 'center', minWidth: 100 },
  { id: 'debitAmount', label: 'Debit', align: 'center', minWidth: 100 },
  { id: 'remainingBalance', label: 'Balance', align: 'center', minWidth: 100 }
];

const Singlebankledgerlist = () => {
  const [payments, setPayments] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ledgerBankId = sessionStorage.getItem('Cbankid');
  const formData = sessionStorage.getItem('CformDate');
  const toDate = sessionStorage.getItem('CtoDate');

  useEffect(() => {
    dispatch(CompanyBankLedger(ledgerBankId, formData, toDate))
      .then((data) => {
        console.log(data, 'datarecieve');
        setPayments(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching vendor ledger data:', error);
      });
  }, [dispatch, ledgerBankId, formData, toDate, navigate]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card style={{ width: '100%', padding: '25px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Company Bank Ledger List
      </Typography>
      <TableContainer>
        <Table style={{ border: '1px solid lightgrey' }}>
          <TableHead sx={{ backgroundColor: '#677684', color: 'white' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {payments?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((payment) => (
              <TableRow key={payment.id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ color: (column.id === 'creditAmount' && '#00CE00') || (column.id === 'debitAmount' && 'red') }}
                  >
                    {column.id === 'date'
                      ? new Date(payment[column.id]).toLocaleDateString('en-GB')
                      : column.id === 'creditAmount' || column.id === 'debitAmount'
                        ? payment[column.id] !== 0
                          ? payment[column.id]
                          : '-'
                        : column.id === 'remainingBalance'
                          ? parseFloat(payment.remainingBalance).toFixed(2)
                          : payment[column.id]}
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
        count={payments?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default Singlebankledgerlist;
