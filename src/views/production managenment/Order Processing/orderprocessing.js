import { useEffect, useState } from 'react';
import { Typography, Grid, Paper, Table, TableRow, TableBody, TableHead, TableCell } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Select from 'react-select';
import { useMediaQuery } from '@mui/material';
import { fetchAllProducts, getAllStoke } from 'store/thunk';
import { useDispatch } from 'react-redux';

const Orderprocessing = () => {
  const [rows, setRows] = useState([{ productId: '', qty: null, unit: '', avaliable: 0 }]);
  const isMobileX = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [productOptions, setProductOptions] = useState([]);
  const [totalQty, setTotalQty] = useState(0);
  const [stoke, setStoke] = useState([]);
  const dispatch = useDispatch();

  const handleAddRow = () => {
    const newRow = { product: '', qty: null, unit: '' };
    setRows((prevRows) => [...prevRows, newRow]);
  };

  const handleDeleteRow = async (index) => {
    const deletedRowQty = rows[index].qty || 0;
    const updatedRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(updatedRows);
    setTotalQty((prevTotal) => prevTotal - parseFloat(deletedRowQty));
  };

  const calculateTotalQty = (rows) => {
    const total = rows.reduce((sum, row) => sum + parseFloat(row.qty || 0), 0);
    setTotalQty(total);
  };

  const handleInputChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => {
      if (rowIndex === index) {
        const numericValue = field === 'qty' ? parseFloat(value) : value;
        return { ...row, [field]: numericValue };
      }
      return row;
    });
    setRows(updatedRows);
    calculateTotalQty(updatedRows);
  };

  const handleSelectProductChange = (selectedOption, rowIndex) => {
    const selectedItemStoke = stoke.find((item) => item.itemStock.id === selectedOption.value);
    const updatedRows = rows.map((row, index) => {
      if (index === rowIndex) {
        return {
          ...row,
          productId: selectedOption.value,
          productname: selectedOption.label,
          weight: selectedOption.weight,
          unit: selectedOption.unit,
          avaliable: selectedItemStoke ? selectedItemStoke.qty : 0
        };
      }
      return row;
    });
    setRows(updatedRows);
    calculateTotalQty(updatedRows);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productResponse = await dispatch(fetchAllProducts());
        if (Array.isArray(productResponse)) {
          const options = productResponse.map((product) => ({
            value: product.id,
            label: product.productname,
            weight: product.weight,
            unit: product.unit
          }));
          setProductOptions([...options]);
        } else {
          console.error('fetchAllProductsCash returned an unexpected response:', productResponse);
        }

        const updatedData = await dispatch(getAllStoke());
        setStoke(updatedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <Paper elevation={4} style={{ padding: '24px' }}>
      <div>
        <Typography variant="h4" align="center" gutterBottom id="mycss">
          Order Processing
        </Typography>

        <Grid item xs={12} style={isMobileX ? { overflowX: 'auto' } : {}}>
          <div style={{ maxWidth: '100%' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell width={500} sx={{ fontSize: '12px' }}>
                    Product Name
                  </TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>QTY</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>UNIT</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>AVALIABLE</TableCell>
                  <TableCell sx={{ fontSize: '12px' }}>DELETE</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows?.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Select
                        color="secondary"
                        onChange={(selectedOption) => handleSelectProductChange(selectedOption, index)}
                        options={productOptions}
                        value={{ value: row.productId, label: row.productname }}
                      />
                    </TableCell>
                    <TableCell id="newcs">
                      <input
                        placeholder="qty"
                        type="number"
                        value={row.qty}
                        onChange={(e) => handleInputChange(index, 'qty', e.target.value)}
                      />
                    </TableCell>

                    <TableCell>{row.unit}</TableCell>
                    <TableCell>{row.avaliable}</TableCell>
                    <TableCell>
                      <DeleteIcon
                        onClick={() => {
                          handleDeleteRow(index);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell></TableCell>
                  <TableCell align="right">
                    <Typography variant="h6">Total Quantity:</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6">{totalQty}</Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Grid>

        <Grid item xs={12}>
          <button id="buttoncs" onClick={handleAddRow}>
            <AddIcon sx={{ fontSize: '18px' }} /> Add Row
          </button>
        </Grid>
      </div>
    </Paper>
  );
};

export default Orderprocessing;
