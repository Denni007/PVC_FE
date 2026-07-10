import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { viewProduct } from 'store/thunk';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Productview = () => {
  const isMobile = useMediaQuery('(max-width:600px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  //called api for view data
  useEffect(() => {
    dispatch(viewProduct(id))
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        if (error.response.status === 401) {
          navigate('/');
        }
        console.error('Error fetching User data:', error);
      });
  }, [dispatch, id, navigate]);

  const formatBoolean = (value) => (value ? 'Yes' : 'No');
  const productFields = [
    { label: 'Item Type', value: data?.itemType?.name },
    { label: 'Product Name', value: data?.productname },
    { label: 'Description', value: data?.description },
    { label: 'Item Group', value: data?.itemGroup?.name },
    { label: 'Item Category', value: data?.itemCategory?.name },
    { label: 'Item Sub Category', value: data?.itemSubCategory?.name },
    { label: 'Size', value: data?.size },
    { label: 'Weight', value: data?.weight },
    { label: 'Unit', value: data?.unit },
    { label: 'Sales Price', value: data?.salesprice },
    { label: 'Purchase Price', value: data?.purchaseprice },
    { label: 'GST Rate', value: data?.gstrate !== undefined && data?.gstrate !== null ? `${data.gstrate}%` : null },
    { label: 'HSN Code', value: data?.HSNcode },
    { label: 'Opening Stock', value: formatBoolean(data?.openingstock) },
    { label: 'Negative Qty Allowed', value: formatBoolean(data?.nagativeqty) },
    { label: 'Low Stock Warning', value: formatBoolean(data?.lowstock) },
    { label: 'Low Stock Quantity', value: data?.lowStockQty },
    { label: 'Cess Enable', value: formatBoolean(data?.cess) },
    { label: 'Wastage', value: formatBoolean(data?.wastage) },
    { label: 'Finished Goods', value: formatBoolean(data?.finished_goods) },
    { label: 'Raw Material', value: formatBoolean(data?.raw_material) },
    { label: 'Spare Item', value: formatBoolean(data?.spare) }
  ];

  const displayValue = (value) => (value !== null && value !== undefined && value !== '' ? value : '-');

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Product View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        {productFields.map((field) => (
          <Grid item xs={12} sm={6} md={3} key={field.label}>
            <Typography variant="subtitle1">{field.label}</Typography>
            <Typography variant="subtitle2">{displayValue(field.value)}</Typography>
          </Grid>
        ))}

        {isMobile ? (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Link to="/productlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        ) : (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/productlist" style={{ textDecoration: 'none' }}>
              <div>
                <button id="savebtncs">Cancel</button>
              </div>
            </Link>
          </Grid>
        )}
      </Grid>
    </Paper>
  );
};

export default Productview;
