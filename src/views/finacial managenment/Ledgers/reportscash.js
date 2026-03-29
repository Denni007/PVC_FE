import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography } from '@mui/material';
import BarChartIcon from '@mui/icons-material/BarChart';
import Ledgeraccountcashreport from 'component/reports/financial cash report/ledgercashreport';
import Cashdaybookreport from 'component/reports/financial cash report/cashdaybook';
import useCan from 'views/permission managenment/checkpermissionvalue';
import Cashbookreport from 'component/reports/financial cash report/cashbookreport';
import Passbookreport from 'component/reports/financial cash report/passbookreport';

const Reportcash = () => {
  const [openLedgerDialog, setOpenLedgerDialog] = useState(false);
  const [cashLedgerDialog, setCashLedgerDialog] = useState(false);
  const [passbookLedgerDialog, setPassbookLedgerDialog] = useState(false);
  const [opendaybookLedgerDialog, setOpendaybookLedgerDialog] = useState(false);
  const { canseeaccountcashledger, canseedaybookcashledger, canseecashbookcashledger, canseePassbookcashledger } = useCan();

  const handleOpenLedgerDialog = () => {
    setOpenLedgerDialog(true);
  };

  const handleCloseLedgerDialog = () => {
    setOpenLedgerDialog(false);
  };

  const handleOpenCashbookLedgerDialog = () => {
    setCashLedgerDialog(true);
  };

  const handleCloseCashbookLedgerDialog = () => {
    setCashLedgerDialog(false);
  };

  const handleOpenPassbookLedgerDialog = () => {
    setPassbookLedgerDialog(true);
  };

  const handleClosePassbookLedgerDialog = () => {
    setPassbookLedgerDialog(false);
  };

  const handleOpenLDayBookedgerDialog = () => {
    setOpendaybookLedgerDialog(true);
  };

  const handleCloseDayBookLedgerDialog = () => {
    setOpendaybookLedgerDialog(false);
  };
  return (
    <div>
      <Card variant="outlined" style={{ padding: '30px' }}>
        <Typography variant="h4" align="center" id="mycss">
          Cash Reports
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  General
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Sales Summary
                </Typography>

                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Sales Register
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Sales Return Summary
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Sales Return Item Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Purchase Summary
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Purchase Register
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Expense Summary
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Unbilled Challan
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  Item Rate Card
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Financial
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Trial Balance
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Balance Sheet
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Profit and Lost
                </Typography>
                {canseeaccountcashledger() && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}
                      onClick={handleOpenLedgerDialog}
                      style={{ cursor: 'pointer' }}
                    >
                      Ledger
                    </Typography>
                    {openLedgerDialog && <Ledgeraccountcashreport Open={handleOpenLedgerDialog} onClose={handleCloseLedgerDialog} />}
                  </>
                )}
                {canseedaybookcashledger() && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}
                      onClick={handleOpenLDayBookedgerDialog}
                      style={{ cursor: 'pointer' }}
                    >
                      Daybook
                    </Typography>
                    {opendaybookLedgerDialog && (
                      <Cashdaybookreport Open={handleOpenLDayBookedgerDialog} onClose={handleCloseDayBookLedgerDialog} />
                    )}
                  </>
                )}

                {canseecashbookcashledger() && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}
                      style={{ cursor: 'pointer' }}
                      onClick={handleOpenCashbookLedgerDialog}
                    >
                      Cashbook
                    </Typography>
                    {cashLedgerDialog && <Cashbookreport Open={handleOpenCashbookLedgerDialog} onClose={handleCloseCashbookLedgerDialog} />}
                  </>
                )}
                {canseePassbookcashledger() && (
                  <>
                    <Typography
                      variant="body1"
                      sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}
                      style={{ cursor: 'pointer' }}
                      onClick={handleOpenPassbookLedgerDialog}
                    >
                      Passbook
                    </Typography>
                    {passbookLedgerDialog && (
                      <Passbookreport Open={handleOpenPassbookLedgerDialog} onClose={handleClosePassbookLedgerDialog} />
                    )}
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Receivable
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Invoice Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Customer Wise Receivable
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Customer and Invoice Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Customer Outstanding
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Accont Receivable Aging Detail
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Payment Receivable
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  Customer Wise Pending Invoice
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Second Row */}
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Payable
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Bill Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Vendor Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Vendor Wise Total Payable
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Bill and Vendor Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Vendor Outstanding
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  Purchase Payment
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Item
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Stoke Summary (Inventory)
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Stoke Valuation
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Sales Summary (Item Wise Sales)
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Low Stoke Summary
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Stoke Register
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Customer Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Vendor Wise
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Betch Wise Stoke
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Costing Analyze
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Adjusted Costing
                </Typography>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  Item Date and Customer Wise
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  Item Date and Vendor Wise
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={8} md={4}>
            <Card variant="outlined">
              <CardContent sx={{ borderBottom: '0.2px solid grey' }}>
                <Typography variant="h5" component="h2" style={{ display: 'flex', alignItems: 'center' }}>
                  <BarChartIcon sx={{ fontSize: '30px', marginRight: '10px' }} />
                  Statutory
                </Typography>
              </CardContent>
              <CardContent sx={{ height: '230px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '0' } }}>
                <Typography variant="body1" sx={{ borderBottom: '0.2px solid lightgrey', marginTop: '2px' }}>
                  TDS
                </Typography>
                <Typography variant="body1" sx={{ marginTop: '2px' }}>
                  TCS
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

export default Reportcash;
