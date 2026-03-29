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
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Companyview, deleteCompany, fetchuserwiseCompany, setDefaultCompany } from 'store/thunk';
import { useDispatch } from 'react-redux';
import useCan from 'views/permission managenment/checkpermissionvalue';
import Switch from '@mui/material/Switch';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Delete, Edit } from '@mui/icons-material';

const label = { inputProps: { 'aria-label': 'Switch demo' } };
const columns = [
  { id: 'companyname', label: 'Company Name', minWidth: 100, align: 'center' },
  { id: 'email', label: 'Email.', minWidth: 100, align: 'center' },
  { id: 'mobileno', label: 'Mobile No.', minWidth: 100, align: 'center' },
  { id: 'action', label: 'Action', align: 'center' }
];

const CompanyList = () => {
  const { canCreateCompany, canUpdateCompany, canViewCompany, canDeleteCompany } = useCan();
  const navigate = useNavigate();
  const [Company, setCompany] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const dispatch = useDispatch();
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const data = await dispatch(fetchuserwiseCompany());
        setCompany(data);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching company:', error);
      }
    };
    fetchCompany();
  }, [dispatch, navigate]);

  const handlesetcompany = async (id) => {
    try {
      await dispatch(setDefaultCompany(id));
      window.location.reload();
      // console.log(data, 'data');
      setCompany((prevCompanies) =>
        prevCompanies.map((company) => (company.id === id ? { ...company, setDefault: true } : { ...company, setDefault: false }))
      );
    } catch (error) {
      console.error('Error setting default company:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddCompany = () => {
    navigate('/addcompany');
  };

  const handlecompanyupdate = (id) => {
    dispatch(Companyview(id));
    navigate(`/addcompany/${id}`);
  };

  const handlecompanyview = (id) => {
    dispatch(Companyview(id));
    navigate(`/companyview/${id}`);
  };

  const handleDeleteConfirmation = (id) => {
    setOpenConfirmation(true);
    setSelectedId(id);
  };

  const handlecompanydelete = async () => {
    try {
      await dispatch(deleteCompany(selectedId, navigate));
      setOpenConfirmation(false);
      const data = await dispatch(fetchuserwiseCompany());
      setCompany(data);
      setCompany((preCompany) => preCompany.filter((comapny) => comapny.id !== selectedId));
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  return (
    // <Container>
    <Card style={{ width: 'auto', padding: '20px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Company List
      </Typography>
      <Button
        variant="contained"
        color="secondary"
        style={{ mb: 2, margin: '10px' }}
        onClick={handleAddCompany}
        disabled={!canCreateCompany()}
      >
        Add Company
      </Button>
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
            {Company?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow key={index} sx={{ backgroundColor: index % 2 === 0 ? 'white' : 'rgba(66, 84, 102, 0.1)' }}>
                {columns.map((column) => (
                  <TableCell key={column.id} align={column.align}>
                    {column.id === 'action' ? (
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canViewCompany() ? 'Blue' : 'gray',
                            color: canViewCompany() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canViewCompany() && { opacity: 1 }),
                            ...(!canViewCompany() && { opacity: 0.5 }),
                            ...(!canViewCompany() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handlecompanyview(row.companyId)}
                          disabled={!canViewCompany()}
                        >
                          <RemoveRedEyeIcon style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canUpdateCompany() ? 'green' : 'gray',
                            color: canUpdateCompany() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canUpdateCompany() && { opacity: 1 }),
                            ...(!canUpdateCompany() && { opacity: 0.5 }),
                            ...(!canUpdateCompany() && { backgroundColor: 'gray' })
                          }}
                          onClick={() => handlecompanyupdate(row.companyId)}
                          disabled={!canUpdateCompany()}
                        >
                          <Edit style={{ fontSize: '16px' }} />
                        </IconButton>
                        <IconButton
                          sizeSmall
                          style={{
                            backgroundColor: canDeleteCompany() ? 'Red' : 'gray',
                            color: canDeleteCompany() ? 'white' : 'white',
                            borderRadius: 0.8,
                            ...(canDeleteCompany() && { opacity: 1 }),
                            ...(!canDeleteCompany() && { opacity: 0.5 }),
                            ...(!canDeleteCompany() && { backgroundColor: 'gray' })
                          }}
                          disabled={!canDeleteCompany()}
                          onClick={() => handleDeleteConfirmation(row.companyId)}
                        >
                          <Delete style={{ fontSize: '16px' }} />
                        </IconButton>

                        <Switch {...label} color="success" checked={row.setDefault} onChange={() => handlesetcompany(row.companyId)} />
                      </div>
                    ) : column.id === 'companyname' ? (
                      row.companies?.companyname
                    ) : column.id === 'email' ? (
                      row.companies?.email
                    ) : column.id === 'mobileno' ? (
                      row.companies?.mobileno
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
        count={Company?.length || 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Dialog open={openConfirmation} onClose={() => setOpenConfirmation(false)} fullWidth maxWidth="sm">
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>Are you sure you want to delete this Company?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenConfirmation(false)} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handlecompanydelete} variant="contained" color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
    // </Container>
  );
};

export default CompanyList;
