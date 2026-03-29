import React, { useState, useEffect } from 'react';
import { Typography, Table, TableBody, TableRow, TableCell, Card, TableContainer, TableHead, TablePagination } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchAllEmployeeSalary } from 'store/thunk';
import { useDispatch } from 'react-redux';

const columns = [
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'paymentType', label: 'Payment type', align: 'center' },
  { id: 'companybank', label: 'Company Bank', align: 'center' },
  { id: 'userbank', label: 'Employee Bank', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' }
];

const Employeeview = () => {
  const navigate = useNavigate();
  const [salaryData, setSalaryData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    const fetchSalaryData = async () => {
      try {
        const response = await dispatch(fetchAllEmployeeSalary(id));
        console.log(response, 'response');
        setSalaryData(response);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching salary data:', error);
      }
    };

    fetchSalaryData();
  }, [dispatch, navigate, id]);

  console.log('salaryData Data:', salaryData);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card style={{ width: '100%', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Salary
      </Typography>
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
            {salaryData?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={row.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'username'
                      ? row.employee?.username
                      : column.id === 'date'
                        ? new Date(row.date).toLocaleDateString('en-GB')
                        : column.id === 'companybank'
                          ? row?.salaryPaymentBank?.bankname || '-'
                          : column.id === 'userbank'
                            ? row?.salaryPaymentUserBank?.bankname || '-'
                            : row[column.id]}
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
        count={salaryData.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Card>
  );
};

export default Employeeview;
