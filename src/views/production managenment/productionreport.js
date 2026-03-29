import React from 'react';
import { Typography, Grid, Paper } from '@material-ui/core';
import PropTypes from 'prop-types';

// Sample production data
const productionStatistics = {
  totalProducts: 1500,
  completedProducts: 1200,
  remainingProducts: 300,
  efficiency: '80%'
};

const productionTrendsData = [
  { month: 'Jan', production: 100 },
  { month: 'Feb', production: 200 },
  { month: 'Mar', production: 300 },
  { month: 'Apr', production: 400 }
];

// Component to display production statistics
const ProductionStatistics = ({ statistics }) => (
  <div style={{ padding: '19px' }}>
    <Typography variant="subtitle1" gutterBottom>
      Total Products: {statistics.totalProducts}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Completed Products: {statistics.completedProducts}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Remaining Products: {statistics.remainingProducts}
    </Typography>
    <Typography variant="subtitle1" gutterBottom>
      Efficiency: {statistics.efficiency}
    </Typography>
  </div>
);

ProductionStatistics.propTypes = {
  statistics: PropTypes.shape({
    totalProducts: PropTypes.number.isRequired,
    completedProducts: PropTypes.number.isRequired,
    remainingProducts: PropTypes.number.isRequired,
    efficiency: PropTypes.string.isRequired
  }).isRequired
};

// Component to display production trends
const ProductionTrends = ({ data }) => (
  <div style={{ padding: '10px' }}>
    <Typography variant="h6" gutterBottom>
      Production Trends
    </Typography>
    {/* Add chart or visualization component to display production trends */}
    <ul>
      {data.map((item) => (
        <li key={item.month}>
          {item.month}: {item.production} units
        </li>
      ))}
    </ul>
  </div>
);

// Prop types validation
ProductionTrends.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      month: PropTypes.string.isRequired,
      production: PropTypes.number.isRequired
    })
  ).isRequired
};
// Define the ReportPage component
const ReportPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper>
          <Typography variant="h5" align="center" gutterBottom id="mycss">
            Production Management Report
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>
          <ProductionStatistics statistics={productionStatistics} />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper>
          <ProductionTrends data={productionTrendsData} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper style={{ padding: '10px' }}>
          <Typography variant="h6" gutterBottom>
            Detailed Production Data
          </Typography>
          <ul>
            <li>Product 1</li>
            <li>Product 2</li>
            <li>Product 3</li>
          </ul>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ReportPage;
