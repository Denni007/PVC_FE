import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import Protected from 'service/Protected';
import ProtectedRoute from 'service/protectedcash';
import Pagenotification from 'component/notification';
import ItemgropuList from 'views/production managenment/Item Group/itemgrouplist';
import ItemcategoryList from 'views/production managenment/Item Category/itemcategorylist';
import ItemSubCategoryList from 'views/production managenment/Item Sub Category/itemsubcategorylist';
import Accountledgerlist from 'component/reports/financial report/accountledgerlist';
import Daybookledgerlist from 'component/reports/financial report/daybookledgerlist';
import Maintenchedulelist from 'views/machine managenment/mainten shedule/maintenschedulelist';
import Maintenscheduleadd from 'views/machine managenment/mainten shedule/maintenscheduleadd';
import Wallet from 'views/finacial managenment/Wallet/wallet';
import Cashaccountledgerlist from 'component/reports/financial cash report/cashaccountledgerlist';
import Cashdaybookledgerlist from 'component/reports/financial cash report/cashdaybookledgerlist';
import Cashbookledgerlist from 'component/reports/financial cash report/cashbookledgerlist';
import CashbookReport from 'views/finacial managenment/Wallet/cashbook';
import Wastagelist from 'views/general managenment/wastage/wastagelist';
import Maintenancelist from 'views/general managenment/maintenance/maintenancelist';
import Purposelist from 'views/general managenment/claim purpose/purposelist';
import Passbookreport from 'views/finacial managenment/Wallet/passbook';
import Passbookbookledgerlist from 'component/reports/financial cash report/passbookledgerlist';
import Maintenscheduleview from 'views/machine managenment/mainten shedule/maintenscheduleview';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/SamplePage')))
const Reports = Loadable(lazy(() => import('../views/finacial managenment/Ledgers/reports')))
const Reportcash = Loadable(lazy(() => import('../views/finacial managenment/Ledgers/reportscash')))
const Productcosting = Loadable(lazy(() => import('../views/production managenment/Product Costing/productcosting')))
const RecipeManagement = Loadable(lazy(() => import('../views/production managenment/Recipe Management/index')));


// ++++++++++++++++++++++++++++++++++++++++++++ Routes of Self Expense +++++++++++++++++++++++++++++++++++++++++++++++++++
const SelfExpenseList = Loadable(lazy(() => import('../views/finacial managenment/Self Expense/selfExpenseList')))
const SelfExpensepage = Loadable(lazy(() => import('../views/finacial managenment/Self Expense/selfExpense')))
// ++++++++++++++++++++++++++++++++++++++++++++ Routes of claim cash +++++++++++++++++++++++++++++++++++++++++++++++++++
const Claimcashlist = Loadable(lazy(() => import('../views/finacial managenment/Claim cash/cliamcashlist')))
const Cliamcashpage = Loadable(lazy(() => import('../views/finacial managenment/Claim cash/cliamcash')))
const Recieveclaimcashlist = Loadable(lazy(() => import('../views/finacial managenment/Claim cash/recieveclaimcashlist')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of salescash +++++++++++++++++++++++++++++++++++++++++++++++++++
const Salescash = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescash')))
const Salescashlist = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescashlist')))
const Salescashview = Loadable(lazy(() => import('../views/sale managenment/Sales cash/salescashview')))
//
// ++++++++++++++++++++++++++++++++++++++++++++ Routes of payment cash +++++++++++++++++++++++++++++++++++++++++++++++++++
const ExpenseListPage = Loadable(lazy(() => import('../views/finacial managenment/expense/expenselist')))
const ExpensePage = Loadable(lazy(() => import('../views/finacial managenment/expense/expense')))
const PaymentPage = Loadable(lazy(() => import('../views/finacial managenment/Payment cash/paymentcash')))
const PaymentListPage = Loadable(lazy(() => import('../views/finacial managenment/Payment cash/paymencashtlist')))
const Paymentrecieve = Loadable(lazy(() => import('../views/finacial managenment/Recieve cash/paymentrecievecash')))
const PaymentrecieveList = Loadable(lazy(() => import('../views/finacial managenment/Recieve cash/paymentrecievecashlist')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routs of payment bank ++++++++++++++++++++++++++++++++++++++++++++++++
const Paymentbank = Loadable(lazy(() => import('../views/finacial managenment/Payment Bank/paymentbank')))
const Paymentbanklist = Loadable(lazy(() => import('../views/finacial managenment/Payment Bank/paymentbanklist')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routs of payment recieve bank ++++++++++++++++++++++++++++++++++++++++++++++++
const Paymentrecievebank = Loadable(lazy(() => import('../views/finacial managenment/Payment recieve bank/paymentrecievebank')))
const Paymentrecievebanklist = Loadable(lazy(() => import('../views/finacial managenment/Payment recieve bank/paymentrecievebanklist')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of quotation +++++++++++++++++++++++++++++++++++++++++++++++++++
const Proformainvoice = Loadable(lazy(() => import('../views/sale managenment/Proformainvoice/proformainvoice')))
const ProformainvoiceList = Loadable(lazy(() => import('../views/sale managenment/Proformainvoice/proformainvoicelist')))
const Proformainvoiceviewpage = Loadable(lazy(() => import('../views/sale managenment/Proformainvoice/proformainvoiceview')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of quotation +++++++++++++++++++++++++++++++++++++++++++++++++++
const Purchaseorder = Loadable(lazy(() => import('../views/purches managenment/purchase order/purchaseorderadd')))
const Purchaseorderlist = Loadable(lazy(() => import('../views/purches managenment/purchase order/purchaseorderlist')))
const Purchaseorderview = Loadable(lazy(() => import('../views/purches managenment/purchase order/purchaseorderview')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of delivery challan +++++++++++++++++++++++++++++++++++++++++++++++++++
const Deliverychallan = Loadable(lazy(() => import('../views/sale managenment/Dileverychallan/dileverychalln')))
const DileveryChallanList = Loadable(lazy(() => import('../views/sale managenment/Dileverychallan/dileverychallanlist')))
const DileveryChallanView = Loadable(lazy(() => import('../views/sale managenment/Dileverychallan/dileverychallanview')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of Debit note +++++++++++++++++++++++++++++++++++++++++++++++++++
const DebitNote = Loadable(lazy(() => import('../views/sale managenment/Debit note/debitnote')))
const Debitnotelist = Loadable(lazy(() => import('../views/sale managenment/Debit note/debitnotelist')))
const Debitnoteview = Loadable(lazy(() => import('../views/sale managenment/Debit note/debitnoteview')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of Debit note cash +++++++++++++++++++++++++++++++++++++++++++++++++++
const Debitnotecash = Loadable(lazy(() => import('../views/sale managenment/Debit note cash/debitnotecash')))
const Debitnotecashlist = Loadable(lazy(() => import('../views/sale managenment/Debit note cash/debitnotecashlist')))
const Debitnotecashview = Loadable(lazy(() => import('../views/sale managenment/Debit note cash/debitnotecashview')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of credit note +++++++++++++++++++++++++++++++++++++++++++++++++++
const Creditnotecash = Loadable(lazy(() => import('../views/sale managenment/Credit note cash/creditnotecash')))
const Creditnotecashlist = Loadable(lazy(() => import('../views/sale managenment/Credit note cash/creditnotecashlist')))
const CreditnotecashView = Loadable(lazy(() => import('../views/sale managenment/Credit note cash/creditnotecashview')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of credit note +++++++++++++++++++++++++++++++++++++++++++++++++++
const Creditnote = Loadable(lazy(() => import('../views/sale managenment/Credit note/creditnote')))
const Creditnotelist = Loadable(lazy(() => import('../views/sale managenment/Credit note/creditnotelist')))
const CreditnoteView = Loadable(lazy(() => import('../views/sale managenment/Credit note/creditnoteview')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales invoice +++++++++++++++++++++++++++++++++++++++++++++++++++
const Salesinvoice = Loadable(lazy(() => import('../views/sale managenment/Sales invoice/salesinvoice')))
const Salesinvoicelist = Loadable(lazy(() => import('../views/sale managenment/Sales invoice/salesinvoicelist')))
const Salesinvoiceview = Loadable(lazy(() => import('../views/sale managenment/Sales invoice/salesinvoiceview')))

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Order processing ++++++++++++++++++++++++
const Orderprocessing = Loadable(lazy(() => import('../views/sale managenment/Order processing/orderprocessing')))
const Orderprocessinglist = Loadable(lazy(() => import('../views/sale managenment/Order processing/orderprocessinglist')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase bill +++++++++++++++++++++++++++++++++++++++++++++++++++
const Purchaseinvoice = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice/purchaseinvoice')))
const PurchaseinvoiceList = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice/purchaseinvoicelist')))
const Purchaseinvoiceview = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice/purchaseinvoiceview')))

// +++++++++++++++++++++++++++++++++++++++++ Routes of purchasse bill cash ++++++++++++++++++++++++++++++++++++++++++++
const Purchaseinvoicecash = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice cash/purchaseinvoicecash')))
const Purchaseinvoicecashlist = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice cash/purchaseinvoicecashlist')))
const Purchaseinvoicecashview = Loadable(lazy(() => import('../views/purches managenment/Purchase invoice cash/purchaseinvoicecashview')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of company +++++++++++++++++++++++++++++++++++++++++++++++++++
const CompanyList = Loadable(lazy(() => import('../views/company managenment/companylist')))
const AddCompanyForm = Loadable(lazy(() => import('../views/company managenment/addcompany')))
const CompanyviewPage = Loadable(lazy(() => import('../views/company managenment/companyview')))
const Singlebankledgerlist = Loadable(lazy(() => import('../views/company managenment/singlebankledger')))

// ++++++++++++++++++++++++++++++++++++++++++++ Routes of production +++++++++++++++++++++++++++++++++++++++++++++++++++
const Billofmateriallist = Loadable(lazy(() => import('../views/production managenment/Bill Of Material/billofmateriallist')))
const Addbillofmaterial = Loadable(lazy(() => import('../views/production managenment/Bill Of Material/addbillofmaterial')))
const Bomview = Loadable(lazy(() => import('../views/production managenment/Bill Of Material/billofmaterialview')))
const Product = Loadable(lazy(() => import('../views/production managenment/product')))

// ++++++++++++++++++++++++++++++++++++++++++++++ Route permission +++++++++++++++++++++++++++++++++++
const Permission = Loadable(lazy(() => import('../views/permission managenment/permission')))
const User = Loadable(lazy(() => import('../views/permission managenment/adduser')))
const UserList = Loadable(lazy(() => import('../views/permission managenment/userlist')))
const Userviewpage = Loadable(lazy(() => import('../views/permission managenment/userview')))

// ++++++++++++++++++++++++++++++++++++++++++++++++++ Product ++++++++++++++++++++++++++++++++++++++++
const ProductList = Loadable(lazy(() => import('../views/production managenment/Product/productList')))
const Productview = Loadable(lazy(() => import('../views/production managenment/Product/productview')))

// +++++++++++++++++++++++++++++++++++++++++++++++++ Raw material product ++++++++++++++++++++++++++++++++++++
const Rawmateriallist = Loadable(lazy(() => import('../views/production managenment/Raw material/rawmateriallist')))
const Rawmaterialview = Loadable(lazy(() => import('../views/production managenment/Raw material/rawmaterialview')))

// +++++++++++++++++++++++++++++++++++++++++++++++++ Spare product ++++++++++++++++++++++++++++++++++++
const Sparelist = Loadable(lazy(() => import('../views/production managenment/Spare/sparelist')))
const Spareview = Loadable(lazy(() => import('../views/production managenment/Spare/spareview')))

// +++++++++++++++++++++++++++++++++++++++++++++++++++++ Customer ++++++++++++++++++++++++++++++++++++++++++++++++
const CustomerList = Loadable(lazy(() => import('../views/general managenment/Customer/partylist')))
const Customerview = Loadable(lazy(() => import('../views/general managenment/Customer/partyview')))

// +++++++++++++++++++++++++++++++++++++++++++++++++ Stoke +++++++++++++++++++++++++++++++++++++++
const LowStock = Loadable(lazy(() => import('../views/stock managenment/lowStock')))

// +++++++++++++++++++++++++++++++++++++++++++++++++ Machine +++++++++++++++++++++++++++++++++
const Machineadd = Loadable(lazy(() => import('../views/machine managenment/machineadd')))
const MachineList = Loadable(lazy(() => import('../views/machine managenment/machinelist')))
const Machinescheduleadd = Loadable(lazy(() => import('../views/machine managenment/machineschedule/machinescheduleadd')))
const Machineschedulelist = Loadable(lazy(() => import('../views/machine managenment/machineschedule/machineschedulelist')))

const ReportPage = Loadable(lazy(() => import('../views/production managenment/productionreport')))

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Employee ++++++++++++++++++++++++
const EmployeePage = Loadable(lazy(() => import('../views/employees management/employeelist')))
const Employeeadd = Loadable(lazy(() => import('../views/employees management/employeeadd')))
const Employeeview = Loadable(lazy(() => import('../views/employees management/employeeview')))

const BonusConfigPage = Loadable(lazy(() => import('../views/employees management/bonus config/bonusConfig')))
const PenaltyConfigPage = Loadable(lazy(() => import('../views/employees management/penalty config/penaltyConfig')))
const HolidayConfigPage = Loadable(lazy(() => import('../views/employees management/holiday config/holidayConfig')))
const AddHolidayPage = Loadable(lazy(() => import('../views/employees management/holiday config/addHoliday')))
const AttendeesTypeConfigPage = Loadable(lazy(() => import('../views/employees management/attendees type/attendeesTypeConfig')))
const AddAttendeesTypePage = Loadable(lazy(() => import('../views/employees management/attendees type/addAttendeesType')))
const EmployeeSalary = Loadable(lazy(() => import('../views/employees management/employeeSalary')))
const EmployeeShift = Loadable(lazy(() => import('../views/employees management/shift config/shiftlist')))
const Attendees = Loadable(lazy(() => import('../views/employees management/attendees')))
const EmployeeDetails = Loadable(lazy(() => import('../views/employees management/employeeDetails')))

// const { canViewAllProformainvoiceQuotation } = useCan();
// ==============================|| MAIN ROUTES ||============================== //
const MainRoutes = {
  path: '/',
  element: (
    <Protected>
      <MainLayout />
    </Protected>
  ),
  children: [
    {
      path: '/dashboard',
      element: (
        <Protected>
          <DashboardDefault />
        </Protected>
      )
    },
    { path: '/profile', element: <SamplePage /> },
    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of Self Expense +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/selfExpense',
      element: <ProtectedRoute element={SelfExpensepage} resource="Self Expense" permissionName="create_selfExpense" />
    },
    {
      path: '/selfExpense/:id',
      element: <ProtectedRoute element={SelfExpensepage} resource="Self Expense" permissionName="update_selfExpense" />
    },
    {
      path: '/selfExpenselist',
      element: <ProtectedRoute element={SelfExpenseList} resource="Self Expense" permissionName="view_selfExpense" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++++++++ Routes of Claim cash +++++++++++++++++++++++++++++++++++++++++++
    { path: 'wallet', element: <ProtectedRoute element={Wallet} resource="Claim Cash" permissionName="view_wallet" /> },
    { path: '/claimcash', element: <ProtectedRoute element={Cliamcashpage} resource="Claim Cash" permissionName="create_claim" /> },
    { path: '/claimcash/:id', element: <ProtectedRoute element={Cliamcashpage} resource="Claim Cash" permissionName="update_claim" /> },
    { path: '/claimcashlist', element: <ProtectedRoute element={Claimcashlist} resource="Claim Cash" permissionName="view_myclaim" /> },
    {
      path: '/recieveclaimcashlist',
      element: <ProtectedRoute element={Recieveclaimcashlist} resource="Claim Cash" permissionName="view_reciveclaim" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of sales cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/salescash', element: <ProtectedRoute element={Salescash} resource="Sales Cash" permissionName="create_sales_cash" /> },
    { path: '/salescash/:id', element: <ProtectedRoute element={Salescash} resource="Sales Cash" permissionName="update_sales_cash" /> },
    {
      path: '/salescashlist',
      element: <ProtectedRoute element={Salescashlist} resource="Sales Cash" permissionName="view_all_sales_cash" />
    },
    {
      path: '/salescashview/:id',
      element: <ProtectedRoute element={Salescashview} resource="Sales Cash" permissionName="view_sales_cash" />
    },
    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/expense',
      element: <ProtectedRoute element={ExpensePage} resource="Expense" permissionName="create_expense" />
    },
    {
      path: '/expense/:id',
      element: <ProtectedRoute element={ExpensePage} resource="Expense" permissionName="update_expense" />
    },
    {
      path: '/expenselist',
      element: <ProtectedRoute element={ExpenseListPage} resource="Expense" permissionName="view_all_expense" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/paymentcash',
      element: <ProtectedRoute element={PaymentPage} resource="Payment Cash" permissionName="create_payment" />
    },
    {
      path: '/paymentcash/:id',
      element: <ProtectedRoute element={PaymentPage} resource="Payment Cash" permissionName="update_payment" />
    },
    {
      path: '/paymentcashlist',
      element: <ProtectedRoute element={PaymentListPage} resource="Payment Cash" permissionName="view_all_payment" />
    },
    {
      path: '/paymentrecieve',
      element: <ProtectedRoute element={Paymentrecieve} resource="Receipt Cash" permissionName="create_receipt" />
    },
    {
      path: '/paymentrecieve/:id',
      element: <ProtectedRoute element={Paymentrecieve} resource="Receipt Cash" permissionName="update_receipt" />
    },
    {
      path: '/paymentrecieveList',
      element: <ProtectedRoute element={PaymentrecieveList} resource="Receipt Cash" permissionName="view_all_receipt" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments bank +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/paymentbank',
      element: <ProtectedRoute element={Paymentbank} resource="Payment" permissionName="create_payment" />
    },
    {
      path: '/paymentbank/:id',
      element: <ProtectedRoute element={Paymentbank} resource="Payment" permissionName="update_payment" />
    },
    {
      path: '/paymentbanklist',
      element: <ProtectedRoute element={Paymentbanklist} resource="Payment" permissionName="view_all_payment" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of payments recieve bank +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/paymentrecievebank',
      element: <ProtectedRoute element={Paymentrecievebank} resource="Receipt" permissionName="create_receipt" />
    },
    {
      path: '/paymentrecievebank/:id',
      element: <ProtectedRoute element={Paymentrecievebank} resource="Receipt" permissionName="update_receipt" />
    },
    {
      path: '/paymentrecievebanklist',
      element: <ProtectedRoute element={Paymentrecievebanklist} resource="Receipt" permissionName="get_all_receipt" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase order +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/purchaseorderadd',
      element: <ProtectedRoute element={Purchaseorder} resource="Purchase Order" permissionName="create_purchaseOrder" />
    },
    {
      path: '/purchaseorderupdate/:id',
      element: <ProtectedRoute element={Purchaseorder} resource="Purchase Order" permissionName="update_purchaseOrder" />
    },
    {
      path: '/purchaseorderlist',
      element: <ProtectedRoute element={Purchaseorderlist} resource="Purchase Order" permissionName="view_all_purchaseOrder" />
    },
    {
      path: '/purchaseorderview/:id',
      element: <ProtectedRoute element={Purchaseorderview} resource="Purchase Order" permissionName="view_single_purchaseOrder" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of Proformainvoice +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/proformainvoice',
      element: <ProtectedRoute element={Proformainvoice} resource="ProFormaInvoice" permissionName="create_ProFormaInvoice" />
    },
    {
      path: '/proformainvoice/:id',
      element: <ProtectedRoute element={Proformainvoice} resource="ProFormaInvoice" permissionName="update_ProFormaInvoice" />
    },

    {
      path: '/proformainvoiceList',
      element: <ProtectedRoute element={ProformainvoiceList} resource="ProFormaInvoice" permissionName="view_all_ProFormaInvoice" />
    },
    {
      path: '/proformainvoiceviewpage/:id',
      element: <ProtectedRoute element={Proformainvoiceviewpage} resource="ProFormaInvoice" permissionName="view_single_ProFormaInvoice" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of salesinvoice +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/salesinvoice',
      element: <ProtectedRoute element={Salesinvoice} resource="Sales Invoice" permissionName="create_salesinvoice" />
    },
    {
      path: '/salesinvoice/:id',
      element: <ProtectedRoute element={Salesinvoice} resource="Sales Invoice" permissionName="update_salesInvoice" />
    },
    {
      path: '/salesinvoicelist',
      element: <ProtectedRoute element={Salesinvoicelist} resource="Sales Invoice" permissionName="view_all_salesInvoice" />
    },
    {
      path: '/salesinvoiceview/:id',
      element: <ProtectedRoute element={Salesinvoiceview} resource="Sales Invoice" permissionName="view_single_salesInvoice" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of deliverychallan +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/deliverychallan',
      element: <ProtectedRoute element={Deliverychallan} resource="Delivery Challan" permissionName="create_deliverychallan" />
    },
    {
      path: '/deliverychallan/:id',
      element: <ProtectedRoute element={Deliverychallan} resource="Delivery Challan" permissionName="update_deliverychallan" />
    },
    {
      path: '/deliverychallanlist',
      element: <ProtectedRoute element={DileveryChallanList} resource="Delivery Challan" permissionName="view_all_deliverychallan" />
    },
    {
      path: '/deliverychallanview/:id',
      element: <ProtectedRoute element={DileveryChallanView} resource="Delivery Challan" permissionName="view_single_deliverychallan" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of debit note +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/debitnote', element: <ProtectedRoute element={DebitNote} resource="Debit Note" permissionName="create_debitNote" /> },
    { path: '/debitnote/:id', element: <ProtectedRoute element={DebitNote} resource="Debit Note" permissionName="update_debitNote" /> },
    {
      path: '/debitnotelist',
      element: <ProtectedRoute element={Debitnotelist} resource="Debit Note" permissionName="view_all_debitNote" />
    },
    {
      path: '/debitnoteview/:id',
      element: <ProtectedRoute element={Debitnoteview} resource="Debit Note" permissionName="view_single_debitNote" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of credit note +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/creditnote', element: <ProtectedRoute element={Creditnote} resource="Credit Note" permissionName="create_creditNote" /> },
    { path: '/creditnote/:id', element: <ProtectedRoute element={Creditnote} resource="Credit Note" permissionName="update_creditNote" /> },
    {
      path: '/creditnotelist',
      element: <ProtectedRoute element={Creditnotelist} resource="Credit Note" permissionName="view_all_creditNote" />
    },
    {
      path: '/creditnoteview/:id',
      element: <ProtectedRoute element={CreditnoteView} resource="Credit Note" permissionName="view_single_creditNote" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of debit note cash+++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/debitnotecash',
      element: <ProtectedRoute element={Debitnotecash} resource="Debit Note Cash" permissionName="create_debitNote" />
    },
    {
      path: '/debitnotecashupdate/:id',
      element: <ProtectedRoute element={Debitnotecash} resource="Debit Note Cash" permissionName="update_debitNote" />
    },
    {
      path: '/debitnotecashlist',
      element: <ProtectedRoute element={Debitnotecashlist} resource="Debit Note Cash" permissionName="view_all_debitNote" />
    },
    {
      path: '/debitnotecashview/:id',
      element: <ProtectedRoute element={Debitnotecashview} resource="Debit Note Cash" permissionName="view_single_debitNote" />
    },
    // +++++++++++++++++++++++++++++++++++++++++ routes of item group ++++++++++++++++++++
    {
      path: '/itemgrouplist',
      element: <ProtectedRoute element={ItemgropuList} resource="Item Group" permissionName="view_all_itemGroup" />
    },
    // +++++++++++++++++++++++++++++++++++++++++ routes of item group ++++++++++++++++++++
    {
      path: '/itemcategorylist',
      element: <ProtectedRoute element={ItemcategoryList} resource="Item Category" permissionName="view_all_itemCategory" />
    },

    {
      path: '/itemsubcategorylist',
      element: <ProtectedRoute element={ItemSubCategoryList} resource="Item Sub Category" permissionName="view_all_itemSubCategory" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of credit note cash +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/creditnotecash',
      element: <ProtectedRoute element={Creditnotecash} resource="Credit Note Cash" permissionName="create_creditNote" />
    },
    {
      path: '/creditnotecashupdate/:id',
      element: <ProtectedRoute element={Creditnotecash} resource="Credit Note Cash" permissionName="update_creditNote" />
    },
    {
      path: '/creditnotecashlist',
      element: <ProtectedRoute element={Creditnotecashlist} resource="Credit Note Cash" permissionName="view_all_creditNote" />
    },
    {
      path: '/creditnotecashview/:id',
      element: <ProtectedRoute element={CreditnotecashView} resource="Credit Note Cash" permissionName="view_single_creditNote" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase invoice +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/purchaseinvoice',
      element: <ProtectedRoute element={Purchaseinvoice} resource="Purchase Invoice" permissionName="create_purchase_Invoice" />
    },
    {
      path: '/purchaseinvoice/:id',
      element: <ProtectedRoute element={Purchaseinvoice} resource="Purchase Invoice" permissionName="update_purchase_Invoice" />
    },
    {
      path: '/purchaseinvoiceList',
      element: <ProtectedRoute element={PurchaseinvoiceList} resource="Purchase Invoice" permissionName="view_all_purchase_Invoice" />
    },
    {
      path: '/purchaseinvoiceview/:id',
      element: <ProtectedRoute element={Purchaseinvoiceview} resource="Purchase Invoice" permissionName="view_single_purchase_Invoice" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of purchase invoice Cash  +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/purchaseinvoicecash',
      element: <ProtectedRoute element={Purchaseinvoicecash} resource="Purchase Cash" permissionName="create_purchase_cash" />
    },
    {
      path: '/purchaseinvoicecash/:id',
      element: <ProtectedRoute element={Purchaseinvoicecash} resource="Purchase Cash" permissionName="update_purchase_cash" />
    },
    {
      path: '/purchaseinvoicecashList',
      element: <ProtectedRoute element={Purchaseinvoicecashlist} resource="Purchase Cash" permissionName="view_all_purchase_cash" />
    },
    {
      path: '/purchaseinvoicecashview/:id',
      element: <ProtectedRoute element={Purchaseinvoicecashview} resource="Purchase Cash" permissionName="view_purchase_cash" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of company +++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/companylist', element: <ProtectedRoute element={CompanyList} resource="Company" permissionName="view_all_company" /> },
    {
      path: '/companyview/:id',
      element: <ProtectedRoute element={CompanyviewPage} resource="Company" permissionName="view_single_company" />
    },
    { path: '/addcompany', element: <ProtectedRoute element={AddCompanyForm} resource="Company" permissionName="create_company" /> },
    { path: '/addcompany/:id', element: <ProtectedRoute element={AddCompanyForm} resource="Company" permissionName="update_company" /> },
    {
      path: '/singlebankledger',
      element: <ProtectedRoute element={Singlebankledgerlist} resource="Company Bank Details" permissionName="view_single_bankLedger" />
    },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++ Product edit view ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    // { path: '/productlist', element: <ProductList /> },
    // { path: '/productview/:id', element: <Productview /> },
    { path: '/productlist', element: <ProtectedRoute element={ProductList} resource="Items" permissionName="view_all_item" /> },
    { path: '/productview/:id', element: <ProtectedRoute element={Productview} resource="Items" permissionName="view_single_item" /> },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++ Raw material product edit view ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/rawmateriallist',
      element: <ProtectedRoute element={Rawmateriallist} resource="Items" permissionName="view_all_item" />
    },
    {
      path: '/rawmaterialview/:id',
      element: <ProtectedRoute element={Rawmaterialview} resource="Items" permissionName="view_single_item" />
    },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++ Spare product edit view ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/sparelist',
      element: <ProtectedRoute element={Sparelist} resource="Items" permissionName="view_all_item" />
    },
    {
      path: '/spareview/:id',
      element: <ProtectedRoute element={Spareview} resource="Items" permissionName="view_single_item" />
    },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++ Customer edit view ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    { path: '/accountlist', element: <ProtectedRoute element={CustomerList} resource="Account" permissionName="view_all_account" /> },
    {
      path: '/accountview/:id',
      element: <ProtectedRoute element={Customerview} resource="Account" permissionName="view_one_account" />
    },

    // ++++++++++++++++++++++++++++++++++++++++++++ Routes of production +++++++++++++++++++++++++++++++++++++++++++++++++++
    {
      path: '/billofmateriallist',
      element: <ProtectedRoute element={Billofmateriallist} resource="Production" permissionName="view_all_production" />
    },
    {
      path: '/addbillofmaterial',
      element: <ProtectedRoute element={Addbillofmaterial} resource="Production" permissionName="create_production" />
    },
    {
      path: '/addbillofmaterial/:bomId',
      element: <ProtectedRoute element={Addbillofmaterial} resource="Production" permissionName="update_production" />
    },
    {
      path: '/billofmaterialview/:bomId',
      element: <ProtectedRoute element={Bomview} resource="Production" permissionName="view_production" />
    },
    { path: '/products', element: <Product /> },
    { path: '/productcosting', element: <Productcosting /> },
    { path: '/recipemanagement', element: <RecipeManagement /> },


    // ++++++++++++++++++++++++++++++++++++++++++++Routes of stock +++++++++++++++++++++++++++++++++++++++++++++++++++
    // { path: '/stocklist', element: <ProtectedRoute element={LowStock} resource="Stock" permissionName="view_all_product_stock" /> },
    { path: '/stocklist', element: <LowStock /> },

    // ++++++++++++++++++++++++++++++++++++++++++++++++++ Routes of Permission +++++++++++++++++++++++++++++++++++
    { path: '/permission', element: <Permission /> },
    { path: '/adduser', element: <ProtectedRoute element={User} resource="Login" permissionName="create_user" /> },
    { path: '/updateuser/:id', element: <ProtectedRoute element={User} resource="Login" permissionName="update_user" /> },
    { path: '/userlist', element: <ProtectedRoute element={UserList} resource="Login" permissionName="view_all_user" /> },
    { path: '/userview/:id', element: <ProtectedRoute element={Userviewpage} resource="Login" permissionName="view_user" /> },

    {
      path: '/notification',
      element: <ProtectedRoute element={Pagenotification} resource="Notification" permissionName="view_all_notification" />
    },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Employee ++++++++++++++++++++++++
    {
      path: '/employeelist',
      element: <ProtectedRoute element={EmployeePage} resource="Employee" permissionName="view_all_employee" />
    },
    {
      path: '/employeeadd',
      element: <ProtectedRoute element={Employeeadd} resource="Employee" permissionName="create_employee" />
    },
    {
      path: '/employeeupdate/:id',
      element: <ProtectedRoute element={Employeeadd} resource="Employee" permissionName="update_employee" />
    },
    {
      path: '/employeeview/:id',
      element: <ProtectedRoute element={Employeeview} resource="Employee" permissionName="view_one_employee" />
    },
    {
      path: '/bonusconfig',
      element: <ProtectedRoute element={BonusConfigPage} resource="Bonus Config" permissionName="view_bonus" />
    },
    {
      path: '/penaltyconfig',
      element: <ProtectedRoute element={PenaltyConfigPage} resource="Bonus Config" permissionName="view_bonus" />
    },
    {
      path: '/holidayconfig',
      element: <ProtectedRoute element={HolidayConfigPage} resource="Bonus Config" permissionName="view_bonus" />
    },
    {
      path: '/addholiday',
      element: <ProtectedRoute element={AddHolidayPage} resource="Bonus Config" permissionName="view_bonus" />
    },
    {
      path: '/updateholiday/:id',
      element: <ProtectedRoute element={AddHolidayPage} resource="Bonus Config" permissionName="view_bonus" />
    },
    {
      path: '/attendeestypeconfig',
      element: <ProtectedRoute element={AttendeesTypeConfigPage} resource="Bonus Config" permissionName="view_bonus" />
    },
    {
      path: '/addattendeestype',
      element: <ProtectedRoute element={AddAttendeesTypePage} resource="Bonus Config" permissionName="view_bonus" />
    },
    {
      path: '/updateattendeestype/:id',
      element: <ProtectedRoute element={AddAttendeesTypePage} resource="Bonus Config" permissionName="view_bonus" />
    },
    {
      path: '/employeesalary',
      element: <ProtectedRoute element={EmployeeSalary} resource="Employee" permissionName="view_all_employee" />
    },
    {
      path: '/shift',
      element: <ProtectedRoute element={EmployeeShift} resource="Shift" permissionName="view_all_shift" />
    },
    {
      path: '/Attendance',
      element: <ProtectedRoute element={Attendees} resource="Employee" permissionName="view_all_employee" />
    },
    {
      path: '/employeeDetails/:employeeId',
      element: <ProtectedRoute element={EmployeeDetails} resource="Employee" permissionName="view_one_employee" />
    },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Machine managed ++++++++++++++++++++
    { path: '/machinelist', element: <ProtectedRoute element={MachineList} resource="Machine" permissionName="view_all_machine" /> },
    { path: '/machineadd', element: <ProtectedRoute element={Machineadd} resource="Machine" permissionName="create_machine" /> },
    { path: '/updatemachine/:id', element: <ProtectedRoute element={Machineadd} resource="Machine" permissionName="update_machine" /> },
    {
      path: '/maintenschedulelist',
      element: <Maintenchedulelist />
    },
    {
      path: '/maintenscheduleadd',
      element: <Maintenscheduleadd />
    },
    {
      path: '/viewmaintenscheduleadd/:id',
      element: <Maintenscheduleview />
    },
    {
      path: '/updatemaintenscheduleadd/:id',
      element: <Maintenscheduleadd />
    },
    {
      path: '/machineschedulelist',
      element: <ProtectedRoute element={Machineschedulelist} resource="Machine Schedule" permissionName="view_all_machine_schedule" />
    },
    {
      path: '/machinescheduleadd',
      element: <ProtectedRoute element={Machinescheduleadd} resource="Machine Schedule" permissionName="create_machine_schedule" />
    },
    {
      path: '/updatemachineschedule/:id',
      element: <ProtectedRoute element={Machinescheduleadd} resource="Machine Schedule" permissionName="update_machine_schedule" />
    },

    // { path: '/stock', element: <StockManagement /> },
    { path: '/productionreport', element: <ReportPage /> },
    { path: '/reports', element: <Reports /> },
    { path: '/cashreports', element: <Reportcash /> },
    { path: '/cashaccountledger', element: <Cashaccountledgerlist /> },
    { path: '/cashdaybookledger', element: <Cashdaybookledgerlist /> },
    { path: '/accountledger', element: <Accountledgerlist /> },
    { path: '/daybookledger', element: <Daybookledgerlist /> },
    { path: '/cashbookledger', element: <Cashbookledgerlist /> },
    { path: '/passbookledger', element: <Passbookbookledgerlist /> },
    { path: '/cashbook', element: <CashbookReport /> },
    { path: '/passbookreport', element: <Passbookreport /> },
    { path: '/passbook', element: <Passbookreport /> },
    { path: '/purposelist', element: <Purposelist /> },
    {
      path: '/maintenancelist',
      element: <ProtectedRoute element={Maintenancelist} resource="Maintenance Type" permissionName="view_all_maintenanceType" />
    },
    {
      path: '/purposelist',
      element: <ProtectedRoute element={Purposelist} resource="Purpose" permissionName="view_all_purpose" />
    },
    { path: '/wastagelist', element: <ProtectedRoute element={Wastagelist} resource="Wastage" permissionName="view_all_wastage" /> },

    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Order processing ++++++++++++++++++++++++
    {
      path: '/orderprocessing',
      element: <ProtectedRoute element={Orderprocessing} resource="Order Processing" permissionName="create_order_processing" />
    },
    {
      path: '/orderprocessing/:id',
      element: <ProtectedRoute element={Orderprocessing} resource="Order Processing" permissionName="update_order_processing" />
    },
    {
      path: '/orderprocessinglist',
      element: <ProtectedRoute element={Orderprocessinglist} resource="Order Processing" permissionName="view_all_order_processing" />
    }
    // {
    //   path: '/orderprocessingview/:id',
    //   element: <ProtectedRoute element={Salesinvoiceview} resource="Sales Invoice" permissionName="view_single_salesInvoice" />
    // },
  ]
};

export default MainRoutes;