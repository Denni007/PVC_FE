import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Card, Grid, Checkbox } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch } from 'react-redux';
import { getallPermissions, updatePermission } from 'store/thunk';
import { useNavigate } from 'react-router';
// import { Link } from 'react-router-dom';

export default function CollapsibleTable() {
  const navigate = useNavigate();
  const [openRows, setOpenRows] = React.useState([]);
  const [permissions, setPermissions] = React.useState([]);
  const [selectedUserRole, setSelectedUserRole] = React.useState(null);
  const [checkbox, setCheckbox] = React.useState({});
  const [selectedPermissions, setSelectedPermissions] = React.useState({});

  const dispatch = useDispatch();

  // api call to get all permissions
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getallPermissions());
        const filteredPermissions = data.filter((permission) => permission.role !== 'Super Admin');
        setPermissions(filteredPermissions);

        const initialState = {};
        data.forEach((permission) => {
          permission?.permissions?.forEach((pre) => {
            pre?.permissions?.forEach((p) => {
              initialState[p.id] = p.permissionValue;
            });
          });
        });
        setCheckbox(initialState);
      } catch (error) {
        if (error.response.status === 401) {
          navigate('/');
        }
      }
    };
    fetchData();
  }, [dispatch, navigate]);

  // open dropdown of row [role like super admin]
  const toggleRow = (index, userRole) => {
    setOpenRows((prevOpenRows) => {
      const isOpen = prevOpenRows.includes(index);
      if (isOpen) {
        return prevOpenRows.filter((rowIndex) => rowIndex !== index);
      } else {
        return [...prevOpenRows, index];
      }
    });
    setSelectedUserRole(userRole);
  };

  // remove underscores and capitalize first letter for permission name
  const formatPermissionName = (permissionName) => {
    const words = permissionName.split('_');
    return words.map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  // handle checkbox change
  // const handleCheckboxChange = async (permissionId, permissionValue) => {
  //   try {
  //     const updatedPermissions = [
  //       {
  //         id: permissionId,
  //         permissionValue: !permissionValue
  //       }
  //     ];
  //     const data = {
  //       userRole: selectedUserRole,
  //       permissions: updatedPermissions
  //     };
  //     await dispatch(updatePermission(data));

  //     // Update checkbox state
  //     setCheckbox((prevState) => ({
  //       ...prevState,
  //       [permissionId]: !permissionValue
  //     }));
  //   } catch (error) {
  //     console.error('Error updating permissions:', error);
  //   }
  // };
  const handleCheckboxChange = async (permissionId, permissionValue, resource) => {
    if (resource === 'Permission') {
      return;
    }
    try {
      // Update selectedPermissions state
      const updatedPermissions = {
        ...selectedPermissions,
        [permissionId]: !permissionValue
      };

      setSelectedPermissions(updatedPermissions);

      // Prepare data for API update
      const data = {
        userRole: selectedUserRole,
        permissions: [
          {
            id: permissionId,
            permissionValue: !permissionValue
          }
        ]
      };
      await dispatch(updatePermission(data));

      // Update checkbox state
      setCheckbox((prevState) => ({
        ...prevState,
        [permissionId]: !permissionValue
      }));
    } catch (error) {
      console.error('Error updating permissions:', error);
    }
  };

  const handleSelectAll = (resource) => {
    if (resource === 'Permission') {
      return;
    }

    const updatedCheckbox = { ...checkbox };
    const updatedPermissions = { ...selectedPermissions };

    let allChecked = true;
    permissions.forEach((permission) => {
      if (permission.role === selectedUserRole) {
        permission.permissions.forEach((pre) => {
          if (pre.resource === resource) {
            pre.permissions.forEach((p) => {
              if (!checkbox[p.id]) {
                allChecked = false;
              }
            });
          }
        });
      }
    });
    const newValue = !allChecked;
    permissions.forEach((permission) => {
      if (permission.role === selectedUserRole) {
        permission.permissions.forEach((pre) => {
          if (pre.resource === resource) {
            pre.permissions.forEach((p) => {
              updatedCheckbox[p.id] = newValue;
              updatedPermissions[p.id] = newValue;
            });
          }
        });
      }
    });
    setCheckbox(updatedCheckbox);
    setSelectedPermissions(updatedPermissions);
    const data = {
      userRole: selectedUserRole,
      permissions: Object.keys(updatedPermissions).map((permissionId) => ({
        id: permissionId,
        permissionValue: updatedPermissions[permissionId]
      }))
    };
    dispatch(updatePermission(data, navigate));
  };

  return (
    <Card style={{ height: 'auto' }}>
      <TableContainer style={{ padding: '20px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Permissions
        </Typography>
        <Table>
          <TableBody>
            {permissions?.map((permission, index) => (
              <React.Fragment key={index}>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                  <TableCell width={'16px'}>
                    <IconButton aria-label="expand row" size="small" onClick={() => toggleRow(index, permission.role)}>
                      {openRows.includes(index) ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                  </TableCell>
                  <TableCell>{permission.role}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openRows.includes(index)} timeout="auto" unmountOnExit>
                      <Box sx={{ margin: 1 }}>
                        <Grid container spacing={2}>
                          {permission.permissions?.map((pre, index) => (
                            <Grid
                              item
                              xs={12}
                              sm={3}
                              key={index}
                              sx={{
                                borderRight: '1px solid lightgrey',
                                borderBottom: '1px solid lightgrey',
                                borderLeft: '1px solid lightgrey',
                                borderTop: '1px solid lightgrey'
                              }}
                            >
                              <Box>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                  <Typography variant="h5">{pre.resource}</Typography>
                                  <Checkbox onClick={() => handleSelectAll(pre.resource)} disabled={pre.resource === 'Permission'} />
                                </div>
                                <Table size="small" aria-label="permissions">
                                  <TableBody>
                                    {pre.permissions?.map((p, i) => (
                                      <TableRow key={i} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography sx={{ display: 'flex', alignItems: 'center' }}>
                                          {formatPermissionName(p.permission)}
                                        </Typography>
                                        <Typography>
                                          <Checkbox
                                            checked={checkbox[p.id]}
                                            onChange={() => handleCheckboxChange(p.id, checkbox[p.id])}
                                            disabled={pre.resource === 'Permission'}
                                          />
                                        </Typography>
                                      </TableRow>
                                    ))}
                                  </TableBody>
                                </Table>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
