import React, { useEffect, useState } from 'react';
import { Typography, Grid, Paper } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { viewRawMaterial } from 'store/thunk';

const Rawmaterialview = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    dispatch(viewRawMaterial(id))
      .then((rawMaterial) => {
        setData(rawMaterial || {});
      })
      .catch((error) => {
        if (error.response?.status === 401) {
          navigate('/');
        }
        console.error('Error fetching raw material data:', error);
      });
  }, [dispatch, id, navigate]);

  return (
    <Paper elevation={3} style={{ padding: '24px' }}>
      <Typography variant="h4" align="center" id="mycss">
        Raw Material View
      </Typography>
      <Grid container spacing={4} sx={{ padding: '0px 20px' }}>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Material Name</Typography>
          <Typography variant="subtitle2">{data?.name || '-'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Rate / KG</Typography>
          <Typography variant="subtitle2">Rs. {Number(data?.rate_per_kg || 0).toFixed(2)}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Company ID</Typography>
          <Typography variant="subtitle2">{data?.companyId || '-'}</Typography>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Typography variant="subtitle1">Last Updated</Typography>
          <Typography variant="subtitle2">{data?.updatedAt ? new Date(data.updatedAt).toLocaleString() : '-'}</Typography>
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link to="/rawmateriallist" style={{ textDecoration: 'none' }}>
            <div>
              <button id="savebtncs">Cancel</button>
            </div>
          </Link>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Rawmaterialview;
