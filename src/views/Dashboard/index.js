import React, { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Grid } from '@mui/material';

//project import
// import SalesLineCard from './SalesLineCard';
// import SalesLineCardData from './chart/sale-chart-1';

// import RevenuChartCard from './RevenuChartCard';
// import RevenuChartCardData from './chart/revenu-chart';
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
// assets
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
// import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
// import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
// import BadgeIcon from '@mui/icons-material/Badge';
import { useDispatch } from 'react-redux';
import {
  getCompanyBankBalance,
  getCompanyCashBalance,
  TotalSalesDashboard,
  TotalPurchaseDashboard,
  TotalReceiveDashboard,
  TotalCashReceiveDashboard,
  TotalPaymentDashboard,
  TotalCashPaymentDashboard,
  TotalCashSalesDashboard,
  TotalCashPurchaseDashboard
} from 'store/thunk';
import useCan from 'views/permission managenment/checkpermissionvalue';
// import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';

// custom style
// const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
//   padding: '25px 25px',
//   borderLeft: '1px solid' + theme.palette.background.default,
//   [theme.breakpoints.down('sm')]: {
//     borderLeft: 'none',
//     borderBottom: '1px solid' + theme.palette.background.default
//   },
//   [theme.breakpoints.down('md')]: {
//     borderBottom: '1px solid' + theme.palette.background.default
//   }
// }));

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [balance, setBalance] = useState(0);
  const [Cbalance, setCBalance] = useState(0);
  const [salesbalance, setSalesBalance] = useState(0);
  const [purchasebalance, setPurchaseBalance] = useState(0);
  const [salescashbalance, setSalesCashBalance] = useState(0);
  const [purchasecashbalance, setPurchaseCashBalance] = useState(0);
  const [receiveable, setReceiveable] = useState(0);
  const [cashreceiveable, setCashReceiveable] = useState(0);
  const [payable, setPayable] = useState(0);
  const [cashpayable, setCashPayable] = useState(0);
  const {
    canSeeCompanyCashbalance,
    canSeeTotalReceive,
    canSeeTotalCashReceive,
    canSeeTotalPayment,
    canSeeTotalCashPayment,
    canSeeTotalSales,
    canSeeTotalCashSales,
    canSeeTotalPurchase,
    canSeeTotalCashPurchase
  } = useCan();

  const getRoleFromSessionStorage = () => {
    return sessionStorage.getItem('type');
  };
  const createConfig1 = () => {
    const type = getRoleFromSessionStorage();
    return type;
  };
  useEffect(() => {
    const fetchbankbalance = async () => {
      try {
        const data = await dispatch(getCompanyBankBalance());
        setBalance(data.balance);
      } catch (error) {
        console.log(error, 'fetch bank balance of company');
      }
    };
    const fetchcashbalance = async () => {
      try {
        const data = await dispatch(getCompanyCashBalance());
        setCBalance(data.balance);
      } catch (error) {
        console.log(error, 'fetch bank balance of company');
      }
    };
    const fetchtotalsalesbalance = async () => {
      try {
        const data = await dispatch(TotalSalesDashboard());
        setSalesBalance(data);
      } catch (error) {
        console.log(error, 'fetch total sales');
      }
    };
    const fetchtotalpurchasebalance = async () => {
      try {
        const data = await dispatch(TotalPurchaseDashboard());
        setPurchaseBalance(data);
      } catch (error) {
        console.log(error, 'fetch total purchase');
      }
    };
    const fetchtotalreceiveable = async () => {
      try {
        const data = await dispatch(TotalReceiveDashboard());
        setReceiveable(data);
      } catch (error) {
        console.log(error, 'fetch total receive');
      }
    };
    const fetchtotalcashreceiveable = async () => {
      try {
        const data = await dispatch(TotalCashReceiveDashboard());
        setCashReceiveable(data);
      } catch (error) {
        console.log(error, 'fetch total cash receive');
      }
    };
    const fetchtotalpayable = async () => {
      try {
        const data = await dispatch(TotalPaymentDashboard());
        setPayable(data);
      } catch (error) {
        console.log(error, 'fetch total payment');
      }
    };
    const fetchtotalcashpayable = async () => {
      try {
        const data = await dispatch(TotalCashPaymentDashboard());
        setCashPayable(data);
      } catch (error) {
        console.log(error, 'fetch total cash payment');
      }
    };
    const fetchtotalcashsalesbalance = async () => {
      try {
        const data = await dispatch(TotalCashSalesDashboard());
        setSalesCashBalance(data);
      } catch (error) {
        console.log(error, 'fetch total cash sales');
      }
    };
    const fetchtotalcashpurchasebalance = async () => {
      try {
        const data = await dispatch(TotalCashPurchaseDashboard());
        setPurchaseCashBalance(data);
      } catch (error) {
        console.log(error, 'fetch total cash purchase');
      }
    };
    fetchbankbalance();
    fetchcashbalance();
    fetchtotalsalesbalance();
    fetchtotalpurchasebalance();
    fetchtotalreceiveable();
    fetchtotalcashreceiveable();
    fetchtotalpayable();
    fetchtotalcashpayable();
    fetchtotalcashsalesbalance();
    fetchtotalcashpurchasebalance();
  });
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} sm={8} xs={12}>
            <ReportCard
              primary={balance}
              secondary="Total Bank Balance"
              color={theme.palette.warning.main}
              footerData="Balance Of Company In Bank"
              iconPrimary={CurrencyRupeeIcon}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          {canSeeCompanyCashbalance() && createConfig1() === 'C' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={Cbalance}
                secondary="Total Cash Balance"
                color={theme.palette.error.main}
                footerData="Balance Of Company In Cash"
                iconPrimary={CurrencyRupeeIcon}
                // iconFooter={TrendingDownIcon}
              />
            </Grid>
          )}
          {canSeeTotalSales() && createConfig1() === '' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={salesbalance}
                secondary="Total Sales"
                color={theme.palette.success.main}
                footerData="Total Sales"
                iconPrimary={CurrencyRupeeIcon}
              />
            </Grid>
          )}
          {canSeeTotalCashSales() && createConfig1() === 'C' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={salescashbalance}
                secondary="Total Cash Sales"
                color={theme.palette.success.main}
                footerData="Total Cash Sales"
                iconPrimary={CurrencyRupeeIcon}
              />
            </Grid>
          )}
          {canSeeTotalPayment() && createConfig1() === '' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={payable}
                secondary="Total Payable"
                color={theme.palette.primary.main}
                footerData="Payable Amount"
                iconPrimary={CurrencyRupeeIcon}
              />
            </Grid>
          )}
          {canSeeTotalCashPayment() && createConfig1() === 'C' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={cashpayable}
                secondary="Total Payable"
                color={theme.palette.primary.main}
                footerData="Payable Amount"
                iconPrimary={CurrencyRupeeIcon}
              />
            </Grid>
          )}
          {canSeeTotalReceive() && createConfig1() === '' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={receiveable}
                secondary="Total Recieve"
                color={theme.palette.info.main}
                footerData="Receiveable Amount"
                iconPrimary={CurrencyRupeeIcon}
              />
            </Grid>
          )}
          {canSeeTotalCashReceive() && createConfig1() === 'C' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={cashreceiveable}
                secondary="Total Recieve"
                color={theme.palette.info.main}
                footerData="Receiveable Amount"
                iconPrimary={CurrencyRupeeIcon}
              />
            </Grid>
          )}
          {canSeeTotalPurchase() && createConfig1() === '' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={purchasebalance}
                secondary="Total Purchase"
                color={theme.palette.secondary.main}
                footerData="Total Purchase"
                iconPrimary={CurrencyRupeeIcon}
              />
            </Grid>
          )}
          {canSeeTotalCashPurchase() && createConfig1() === 'C' && (
            <Grid item lg={4} sm={8} xs={12}>
              <ReportCard
                primary={purchasecashbalance}
                secondary="Total Cash Purchase"
                color={theme.palette.secondary.main}
                footerData="Total Cash Purchase"
                iconPrimary={CurrencyRupeeIcon}
              />
            </Grid>
          )}
        </Grid>
      </Grid>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <SalesLineCard
                      chartData={SalesLineCardData}
                      title="Sales Per Day"
                      percentage="60%"
                      icon={<TrendingUpIcon />}
                      footerData={[
                        {
                          value: '$30200',
                          label: 'Total Revenue'
                        },
                        {
                          value: '321',
                          label: 'Today Sales'
                        }
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: { md: 'block', sm: 'none' } }}>
                    <Card>
                      <CardContent sx={{ p: '0 !important' }}>
                        <Grid container alignItems="center" spacing={0}>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  REALTY
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.error.main }} align="right">
                                  -0.99
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  INFRA
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.success.main }} align="right">
                                  -7.66
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RevenuChartCard chartData={RevenuChartCardData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Traffic Sources
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Direct</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          80%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="direct" value={80} color="success" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Social</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          50%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Social" value={50} color="primary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Referral</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          20%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Referral" value={20} color="error" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Bounce</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          60%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Bounce" value={60} color="secondary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Internet</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          40%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Internet" value={40} color="info" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Default;
