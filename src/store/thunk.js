// thunks.js
import axios from 'axios';
// import React from 'react';
import { saveAs } from 'file-saver';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  // LOGIN
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  // QUOTATION ++++++++++++++++++++++++++++++
  fetchProformainvoiceRequest,
  fetchProformainvoiceSuccess,
  fetchProformainvoiceFailure,
  createProformainvoiceRequest,
  createProformainvoiceSuccess,
  createProformainvoiceFailure,
  deleteProformainvoiceRequest,
  deleteProformainvoiceSuccess,
  deleteProformainvoiceFailure,
  updateProformainvoiceRequst,
  updateProformainvoicesuccess,
  updateProformainvoicefailure,
  viewProformainvoiceRequest,
  viewProformainvoiceSuccess,
  viewProformainvoiceFailure,
  // PURCHASE ORDER ++++++++++++++++++++++++++++
  createPurchaseorderRequest,
  createPurchaseorderSuccess,
  createPurchaseorderFailure,
  updatePurchaseOrderRequst,
  updatePurchaseOrdersuccess,
  updatePurchaseOrderfailure,
  deletePurchaseOrderRequest,
  deletePurchaseOrderSuccess,
  deletePurchaseOrderFailure,
  viewPurchaseOrderRequest,
  viewPurchaseOrderSuccess,
  viewPurchaseOrderFailure,
  fetchPurchaseOrderRequest,
  fetchPurchaseOrderSuccess,
  fetchPurchaseOrderFailure,

  // PRODUCT ++++++++++++++++++++++++++++++++++
  fetchAllProdutscashRequest,
  fetchAllProdutscashSuccess,
  fetchAllProdutrscashFailure,
  fetchAllProdutsRequest,
  fetchAllProdutsSuccess,
  fetchAllProdutrsFailure,
  createProductRequest,
  createProductFailure,
  createProductSuccess,
  deleteProductSuccess,
  deleteProductRequest,
  deleteProductFailure,
  viewProductRequest,
  viewProductSuccess,
  viewProductFailure,
  updateProductRequest,
  updateProductSuccess,
  updateProductFailure,
  //  DELIVERYCHALLAN +++++++++++++++++++++++
  createDeliveryChallanRequest,
  createDeliveryChallanSuccess,
  createDeliveryChallanFailure,
  getAllDeliverychallanRequest,
  getAllDeliverychallanSuccess,
  getAllDeliverychallanFailure,
  viewDeliverychallanRequest,
  viewDeliverychallanSuccess,
  viewDeliverychallanFailure,
  updateDileverychallanRequest,
  updateDileverychallanFailure,
  updateDileverychallanSuccess,
  deleteDileverychallanItemRequest,
  deleteDileverychallanItemFailure,
  deleteDileverychallanItemSuccess,
  //  PAYMENT CASH +++++++++++++++++++++++++++
  createPaymentCashRequest,
  createPaymentCashSuccess,
  createPaymentCashFailure,
  updatePaymentCashRequest,
  updatePaymentCashFailure,
  updatePaymentCashSuccess,
  getallPaymentCashRequest,
  getallPaymentCashSuccess,
  getallPaymentCashFailure,
  viewPaymentCashRequest,
  viewPaymentCashSuccess,
  viewPaymentCashFailure,
  deletePaymentCashRequest,
  deletePaymentCashSuccess,
  deletePaymentCashFailure,
  //  SALESINVOICE ++++++++++++++++++++++
  getAllSalesinvoiceRequest,
  getAllSalesinvoiceSuccess,
  getAllSalesinvoiceFailure,
  viewSalesinvoiceRequest,
  viewSalesinvoiceSuccess,
  viewSalesinvoiceFailure,
  createSalesinvoiceRequest,
  createSalesinvoiceSuccess,
  createSalesinvoiceFailure,
  updateSalesinvoiceRequest,
  updateSalesinvoiceSuccess,
  updateSalesinvoiceFailure,
  deleteSalesinvoiceRequest,
  deleteSalesinvoiceSuccess,
  deleteSalesinvoiceFailure,
  //  SALESINVOICE ++++++++++++++++++++++
  createSalesinvoicecashRequest,
  createSalesinvoicecashSuccess,
  createSalesinvoicecashFailure,
  deleteSalesinvoicecashRequest,
  deleteSalesinvoicecashSuccess,
  deleteSalesinvoicecashFailure,
  updateSalesinvoicecashRequest,
  updateSalesinvoicecashSuccess,
  updateSalesinvoicecashFailure,
  getAllSalesinvoicecashRequest,
  getAllSalesinvoicecashSuccess,
  getAllSalesinvoicecashFailure,
  viewSalesinvoicecashRequest,
  viewSalesinvoicecashSuccess,
  viewSalesinvoicecashFailure,
  // ORDER PROCESSING ++++++++++++++++++++++
  createOrderprocessingRequest,
  createOrderprocessingSuccess,
  createOrderprocessingFailure,
  updateOrderprocessingRequest,
  updateOrderprocessingSuccess,
  updateOrderprocessingFailure,
  // PURCHASE INVOICE +++++++++++++++
  createPurchaseinvoiceRequest,
  createPurchaseinvoiceSuccess,
  createPurchaseinvoiceFailure,
  updatePurchaseinvoiceRequest,
  updatePurchaseinvoiceSuccess,
  updatePurchaseinvoiceFailure,
  getAllPurchaseinvoiceRequest,
  getAllPurchaseinvoiceSuccess,
  getAllPurchaseinvoiceFailure,
  viewPurchaseinvoiceRequest,
  viewPurchaseinvoiceSuccess,
  viewPurchaseinvoiceFailure,
  deletePurchaseinvoiceRequest,
  deletePurchaseinvoiceSuccess,
  deletePurchaseinvoiceFailure,
  // PURCHASE INVOICE CASH +++++++++++
  createPurchaseinvoiceCashRequest,
  createPurchaseinvoiceCashSuccess,
  createPurchaseinvoiceCashFailure,
  getAllPurchaseinvoiceCashRequest,
  getAllPurchaseinvoiceCashSuccess,
  getAllPurchaseinvoiceCashFailure,
  viewPurchaseinvoiceCashRequest,
  viewPurchaseinvoiceCashSuccess,
  viewPurchaseinvoiceCashFailure,
  updatePurchaseinvoiceCashRequest,
  updatePurchaseinvoiceCashSuccess,
  updatePurchaseinvoiceCashFailure,
  deletePurchaseinvoiceCashRequest,
  deletePurchaseinvoiceCashSuccess,
  deletePurchaseinvoiceCashFailure,
  // PERMISSION ++++++++++++++++++++++
  getAllPermissionsRequest,
  getAllPermissionsSuccess,
  getAllPermissionsFailure,
  updatePermissionsRequest,
  updatePermissionsSuccess,
  updatePermissionsFailure,
  // USER ++++++++++++++++++++++++
  createUserRequest,
  createUserSuccess,
  createUserFailure,
  getallUserRequest,
  getallUserSuccess,
  getallUserFailure,
  viewUserRequest,
  viewUserSuccess,
  viewUserFailure,
  UpdateUserRequest,
  UpdateUserSuccess,
  UpdateUserFailure,
  deleteUserRequest,
  deleteUserSuccess,
  deleteUserFailure,
  getUserBalanceRequest,
  getUserBalanceSuccess,
  getUserBalanceFailure,
  CheckUserRequest,
  CheckUserSuccess,
  CheckUserFailure,
  addUserRequest,
  addUserSuccess,
  addUserFailure,
  //  COMPANY ++++++++++++++++++++++++
  CreateCompanyRequest,
  CreateCompanySuccess,
  CreateCompanyFailure,
  ViewCompanyRequest,
  ViewCompanySuccess,
  ViewCompanyFailure,
  UpdateCompanyRequest,
  UpdateCompanySuccess,
  UpdateCompanyFailure,
  DeleteCompanyRequest,
  DeleteCompanySuccess,
  DeleteCompanyFailure,
  fetchAllCompanyRequest,
  fetchAllCompanySuccess,
  fetchAllCompanyFailure,
  setDefaultCompanyRequest,
  setDefaultCompanySuccess,
  setDefaultCompanyFailure,
  CompanyBankBalanceRequest,
  CompanyBankBalanceSuccess,
  CompanyBankBalanceFailure,
  CompanyCashBalanceRequest,
  CompanyCashBalanceSuccess,
  CompanyCashBalanceFailure,
  //  COMPANY BANK ++++++++++++++++++++++++
  CreateCompanyBankRequest,
  CreateCompanyBankSuccess,
  CreateCompanyBankFailure,
  UpdateCompanyBankRequest,
  UpdateCompanyBankSuccess,
  UpdateCompanyBankFailure,
  DeleteCompanyBankRequest,
  DeleteCompanyBankSuccess,
  DeleteCompanyBankFailure,
  fetchAllCompanyBankRequest,
  fetchAllCompanyBankSuccess,
  fetchAllCompanyBankFailure,
  CompanyBankLedgerRequest,
  CompanyBankLedgerSuccess,
  CompanyBankLedgerFailure,
  // DEBIT NOTE+++++++++++++++++++++
  createDebitnoteRequest,
  createDebitnoteSuccess,
  createDebitnoteFailure,
  getAllDebitnoteRequest,
  getAllDebitnoteSuccess,
  getAllDebitnoteFailure,
  viewDebitnoteRequest,
  viewDebitnoteSuccess,
  viewDebitnoteFailure,
  updateDebitnoteRequest,
  updateDebitnoteSuccess,
  updateDebitnoteFailure,
  deleteDebitnoteRequest,
  deleteDebitnoteSuccess,
  deleteDebitnoteFailure,
  DebitnotePdfRequest,
  DebitnotePdfSuccess,
  DebitnotePdfFailure,
  DebitnoteImageRequest,
  DebitnoteImageSuccess,
  DebitnoteImageFailure,
  DebitnoteHtmlRequest,
  DebitnoteHtmlSuccess,
  DebitnoteHtmlFailure,
  DebitnoteSingleExcelRequest,
  DebitnoteSingleExcelSuccess,
  DebitnoteSingleExcelFailure,
  DebitnoteExcelRequest,
  DebitnoteExcelSuccess,
  DebitnoteExcelFailure,
  // DEBIT NOTE+++++++++++++++++++++
  createDebitnotecashRequest,
  createDebitnotecashSuccess,
  createDebitnotecashFailure,
  getAllDebitnotecashRequest,
  getAllDebitnotecashSuccess,
  getAllDebitnotecashFailure,
  viewDebitnotecashRequest,
  viewDebitnotecashSuccess,
  viewDebitnotecashFailure,
  updateDebitnotecashRequest,
  updateDebitnotecashSuccess,
  updateDebitnotecashFailure,
  deleteDebitnotecashRequest,
  deleteDebitnotecashSuccess,
  deleteDebitnotecashFailure,
  DebitnotecashPdfRequest,
  DebitnotecashPdfSuccess,
  DebitnotecashPdfFailure,
  DebitnoteCashImageRequest,
  DebitnoteCashImageSuccess,
  DebitnoteCashImageFailure,
  DebitnoteCashHtmlRequest,
  DebitnoteCashHtmlSuccess,
  DebitnoteCashHtmlFailure,
  DebitnoteCashExcelRequest,
  DebitnoteCashExcelSuccess,
  DebitnoteCashExcelFailure,
  DebitnoteCashSingleExcelRequest,
  DebitnoteCashSingleExcelSuccess,
  DebitnoteCashSingleExcelFailure,
  // Credit NOTE+++++++++++++++++++++
  createCreditnoteRequest,
  createCreditnoteSuccess,
  createCreditnoteFailure,
  getAllCreditnoteRequest,
  getAllCreditnoteSuccess,
  getAllCreditnoteFailure,
  viewCreditnoteRequest,
  viewCreditnoteSuccess,
  viewCreditnoteFailure,
  updateCreditnoteRequest,
  updateCreditnoteSuccess,
  updateCreditnoteFailure,
  deleteCreditnoteRequest,
  deleteCreditnoteSuccess,
  deleteCreditnoteFailure,
  CreditnotePdfRequest,
  CreditnotePdfSuccess,
  CreditnotePdfFailure,
  CreditnoteImageRequest,
  CreditnoteImageSuccess,
  CreditnoteImageFailure,
  CreditnoteHtmlRequest,
  CreditnoteHtmlSuccess,
  CreditnoteHtmlFailure,
  CreditnoteSingleExcelRequest,
  CreditnoteSingleExcelSuccess,
  CreditnoteSingleExcelFailure,
  CreditnoteExcelRequest,
  CreditnoteExcelSuccess,
  CreditnoteExcelFailure,
  // Credit NOTE CASH +++++++++++++++++++++
  createCreditnotecashRequest,
  createCreditnotecashSuccess,
  createCreditnotecashFailure,
  getAllCreditnotecashRequest,
  getAllCreditnotecashSuccess,
  getAllCreditnotecashFailure,
  viewCreditnotecashRequest,
  viewCreditnotecashSuccess,
  viewCreditnotecashFailure,
  updateCreditnotecashRequest,
  updateCreditnotecashSuccess,
  updateCreditnotecashFailure,
  deleteCreditnotecashRequest,
  deleteCreditnotecashSuccess,
  deleteCreditnotecashFailure,
  CreditnotecashPdfRequest,
  CreditnotecashPdfSuccess,
  CreditnotecashPdfFailure,
  CreditnoteCashImageRequest,
  CreditnoteCashImageSuccess,
  CreditnoteCashImageFailure,
  CreditnoteCashSingleExcelRequest,
  CreditnoteCashSingleExcelSuccess,
  CreditnoteCashSingleExcelFailure,
  CreditnoteCashExcelRequest,
  CreditnoteCashExcelSuccess,
  CreditnoteCashExcelFailure,
  CreditnoteCashHtmlRequest,
  CreditnoteCashHtmlSuccess,
  CreditnoteCashHtmlFailure,
  // ECIEVE CASH +++++++++++++
  createRecieveCashRequest,
  createRecieveCashSuccess,
  createRecieveCashFailure,
  getAllRecieveCashRequest,
  getAllRecieveCashSuccess,
  getAllRecieveCashFailure,
  viewRecieveCashRequest,
  viewRecieveCashSuccess,
  viewRecieveCashFailure,
  updateRecieveCashRequest,
  updateRecieveCashSuccess,
  updateRecieveCashFailure,
  deleteRecieveCashRequest,
  deleteRecieveCashSuccess,
  deleteRecieveCashFailure,
  // USER CLAIM +++++++++++
  getAllclaimuserRequest,
  getAllclaimuserSuccess,
  getAllclaimuserFailure,
  createClaimCashRequest,
  createClaimCashSuccess,
  createClaimCashFailure,
  viewClaimCashRequest,
  viewClaimCashSuccess,
  viewClaimCashFailure,
  updateClaimCashRequest,
  updateClaimCashSuccess,
  updateClaimCashFailure,
  deleteClaimCashRequest,
  deleteClaimCashSuccess,
  deleteClaimCashFailure,
  viewsingleClaimCashRequest,
  viewsingleClaimCashSuccess,
  viewsingleClaimCashFailure,
  viewRecieveClaimCashRequest,
  viewRecieveClaimCashSuccess,
  viewRecieveClaimCashFailure,
  // PAYMENT BANK +++++++++++++
  createPaymentbankRequest,
  createPaymentbankSuccess,
  createPaymentbankFailure,
  ViewsinglepaymentbankRequest,
  ViewsinglepaymentbankSuccess,
  ViewsinglepaymentbankFailure,
  updatepaymentbankRequest,
  updatepaymentbankSuccess,
  updatepaymentbankFailure,
  deletepaymentbankRequest,
  deletepaymentbankSuccess,
  deletepaymentbankFailure,
  fetchallpaymentbankRequest,
  fetchallpaymentbankSuccess,
  fetchallpaymentbankFailure,
  //  PAYMENT RECIEVE BANK +++++++++++++++
  createPaymentRecievebankRequest,
  createPaymentRecievebankSuccess,
  createPaymentRecievebankFailure,
  ViewsinglepaymentrecievebankRequest,
  ViewsinglepaymentrecievebankSuccess,
  ViewsinglepaymentrecievebankFailure,
  updatepaymentrecievebankRequest,
  updatepaymentrecievebankSuccess,
  updatepaymentrecievebankFailure,
  deletepaymentrecievebankRequest,
  deletepaymentrecievebankSuccess,
  deletepaymentrecievebankFailure,
  fetchallpaymentrecievebankRequest,
  fetchallpaymentrecievebankSuccess,
  fetchallpaymentrecievebankFailure,
  // BILL OF MATERIAL ++++++++++++++
  getAllBomRequest,
  getAllBomSuccess,
  getAllBomFailure,
  createBomRequest,
  createBomSuccess,
  createBomFailure,
  viewBomRequest,
  viewBomSuccess,
  viewBomFailure,
  updateBomRequest,
  updateBomSuccess,
  updateBomFailure,
  deleteBomRequest,
  deleteBomSuccess,
  deleteBomFailure,
  // STOKE ++++++++++++++++++++++++++
  getAllStokeRequest,
  getAllStokeSuccess,
  getAllStokeFailure,
  viewStokeRequest,
  viewStokeSuccess,
  viewStokeFailure,
  updateStokeRequest,
  updateStokeSuccess,
  updateStokeFailure,
  // Notification ++++++++++
  getAllNotificationRequest,
  getAllNotificationSuccess,
  getAllNotificationFailure,
  // EMPLOYEE ++++++++++++++++++
  getAllEmployeesalaryRequest,
  getAllEmployeesalarySuccess,
  getAllEmployeesalaryFailure,
  EmployeeRequest,
  EmployeeSuccess,
  EmployeeFailure,
  //  USER BANK ++++++++++++++++++++++++
  CreateUserBankRequest,
  CreateUserBankSuccess,
  CreateUserBankFailure,
  ViewUserBankRequest,
  ViewUserBankSuccess,
  ViewUserBankFailure,
  UpdateUserBankRequest,
  UpdateUserBankSuccess,
  UpdateUserBankFailure,
  DeleteUserBankRequest,
  DeleteUserBankSuccess,
  DeleteUserBankFailure,
  fetchAllUserBankRequest,
  fetchAllUserBankSuccess,
  fetchAllUserBankFailure,
  //  EMPLOYEE SALARY ++++++++++++++++++++++++
  CreateemployeesalaryRequest,
  CreateemployeesalarySuccess,
  CreateemployeesalaryFailure,
  UpdateemployeesalaryRequest,
  UpdateemployeesalarySuccess,
  UpdateemployeesalaryFailure,
  DeleteemployeesalaryRequest,
  DeleteemployeesalarySuccess,
  DeleteemployeesalaryFailure,
  fetchAllemployeesalaryRequest,
  fetchAllemployeesalarySuccess,
  fetchAllemployeesalaryFailure,
  // MAINTENANCE TYPE+++++++++++++
  CreateMaintenanceTypeRequest,
  CreateMaintenanceTypeSuccess,
  CreateMaintenanceTypeFailure,
  UpdateMaintenanceTypeRequest,
  UpdateMaintenanceTypeSuccess,
  UpdateMaintenanceTypeFailure,
  DeleteMaintenanceTypeRequest,
  DeleteMaintenanceTypeSuccess,
  DeleteMaintenanceTypeFailure,
  ViewsingleMaintenancetypeRequest,
  ViewsingleMaintenancetypeSuccess,
  ViewsingleMaintenancetypeFailure,
  fetchAllMaintenanceTypeRequest,
  fetchAllMaintenanceTypeSuccess,
  fetchAllMaintenanceTypeFailure,
  // MACHINE +++++++++++++++++++++++
  CreateMachineRequest,
  CreateMachineSuccess,
  CreateMachineFailure,
  fetchAllMachineRequest,
  fetchAllMachineSuccess,
  fetchAllMachineFailure,
  ViewsingleMachineRequest,
  ViewsingleMachineSuccess,
  ViewsingleMachineFailure,
  UpdateMachineRequest,
  UpdateMachineSuccess,
  UpdateMachineFailure,
  DeleteMachineRequest,
  DeleteMachineSuccess,
  DeleteMachineFailure,
  // MACHINE SCHEDULE+++++++++++++++++++++++
  CreateMachineScheduleRequest,
  CreateMachineScheduleSuccess,
  CreateMachineScheduleFailure,
  fetchAllMachineScheduleRequest,
  fetchAllMachineScheduleSuccess,
  fetchAllMachineScheduleFailure,
  ViewsingleMachineScheduleRequest,
  ViewsingleMachineScheduleSuccess,
  ViewsingleMachineScheduleFailure,
  UpdateMachineScheduleRequest,
  UpdateMachineScheduleSuccess,
  UpdateMachineScheduleFailure,
  DeleteMachineScheduleRequest,
  DeleteMachineScheduleSuccess,
  DeleteMachineScheduleFailure,
  // PDF VENDOR BANK +++++++++++
  SalesCashPdfRequest,
  SalesCashPdfSuccess,
  SalesCashPdfFailure,
  SalesCashImageRequest,
  SalesCashImageSuccess,
  SalesCashImageFailure,
  SalesInvoiceHtmlRequest,
  SalesInvoiceHtmlSuccess,
  SalesInvoiceHtmlFailure,
  SalesCashHtmlRequest,
  SalesCashHtmlSuccess,
  SalesCashHtmlFailure,
  SalesInvoicePdfRequest,
  SalesInvoicePdfSuccess,
  SalesInvoicePdfFailure,
  SalesInvoiceImageRequest,
  SalesInvoiceImageSuccess,
  SalesInvoiceImageFailure,
  SalesInvoiceExcelRequest,
  SalesInvoiceExcelSuccess,
  SalesInvoiceExcelFailure,
  SalesCashExcelRequest,
  SalesCashExcelSuccess,
  SalesCashExcelFailure,
  SalesInvoiceSingleExcelRequest,
  SalesInvoiceSingleExcelSuccess,
  SalesInvoiceSingleExcelFailure,
  SalesCashSingleExcelRequest,
  SalesCashSingleExcelSuccess,
  SalesCashSingleExcelFailure,
  PurchaseCashPdfRequest,
  PurchaseCashPdfSuccess,
  PurchaseCashPdfFailure,
  PurchaseCashExcelRequest,
  PurchaseCashExcelSuccess,
  PurchaseCashExcelFailure,
  PurchaseCashSingleExcelRequest,
  PurchaseCashSingleExcelSuccess,
  PurchaseCashSingleExcelFailure,
  PurchaseInvoiceSingleExcelRequest,
  PurchaseInvoiceSingleExcelSuccess,
  PurchaseInvoiceSingleExcelFailure,
  PurchaseInvoicePdfRequest,
  PurchaseInvoicePdfSuccess,
  PurchaseInvoicePdfFailure,
  PurchaseInvoiceImageRequest,
  PurchaseInvoiceImageSuccess,
  PurchaseInvoiceImageFailure,
  PurchaseInvoiceHtmlRequest,
  PurchaseInvoiceHtmlSuccess,
  PurchaseInvoiceHtmlFailure,
  PurchaseInvoiceCashImageRequest,
  PurchaseInvoiceCashImageSuccess,
  PurchaseInvoiceCashImageFailure,
  PurchaseInvoiceCashHtmlRequest,
  PurchaseInvoiceCashHtmlSuccess,
  PurchaseInvoiceCashHtmlFailure,
  PurchaseInvoiceExcelRequest,
  PurchaseInvoiceExcelSuccess,
  PurchaseInvoiceExcelFailure,
  // DASHBORAD +++++++++++++++
  GetTotalCashPurchaseRequest,
  GetTotalCashPurchaseSuccess,
  GetTotalCashPurchaseFailure,
  GetTotalPurchaseRequest,
  GetTotalPurchaseSuccess,
  GetTotalPurchaseFailure,
  GetTotalCashSalesRequest,
  GetTotalCashSalesSuccess,
  GetTotalCashSalesFailure,
  GetTotalSalesRequest,
  GetTotalSalesSuccess,
  GetTotalSalesFailure,
  GetTotalReceiveRequest,
  GetTotalReceiveSuccess,
  GetTotalReceiveFailure,
  GetTotalPaymentRequest,
  GetTotalPaymentSuccess,
  GetTotalPaymentFailure,
  GetTotalCashReceiveRequest,
  GetTotalCashReceiveSuccess,
  GetTotalCashReceiveFailure,
  GetTotalCashPaymentRequest,
  GetTotalCashPaymentSuccess,
  GetTotalCashPaymentFailure,
  // ITEM GROUP +++++++++++++
  CreateItemGroupRequest,
  CreateItemGroupSuccess,
  CreateItemGroupFailure,
  fetchAllItemGroupRequest,
  fetchAllItemGroupSuccess,
  fetchAllItemGroupFailure,
  ViewItemGroupRequest,
  ViewItemGroupSuccess,
  ViewItemGroupFailure,
  UpdateItemGroupRequest,
  UpdateItemGroupSuccess,
  UpdateItemGroupFailure,
  DeleteItemGroupRequest,
  DeleteItemGroupSuccess,
  DeleteItemGroupFailure,
  // WASTAGE ++++++++++++
  CreateWastageRequest,
  CreateWastageSuccess,
  CreateWastageFailure,
  fetchAllWastageRequest,
  fetchAllWastageSuccess,
  fetchAllWastageFailure,
  ViewWastageRequest,
  ViewWastageSuccess,
  ViewWastageFailure,
  UpdateWastageRequest,
  UpdateWastageSuccess,
  UpdateWastageFailure,
  DeleteWastageRequest,
  DeleteWastageSuccess,
  DeleteWastageFailure,
  // PURPOSE ++++++++++++
  CreatePurposeRequest,
  CreatePurposeSuccess,
  CreatePurposeFailure,
  fetchAllPurposeRequest,
  fetchAllPurposeSuccess,
  fetchAllPurposeFailure,
  ViewPurposeRequest,
  ViewPurposeSuccess,
  ViewPurposeFailure,
  UpdatePurposeRequest,
  UpdatePurposeSuccess,
  UpdatePurposeFailure,
  DeletePurposeRequest,
  DeletePurposeSuccess,
  DeletePurposeFailure,
  // ITEM Category +++++++++++++
  CreateItemCategoryRequest,
  CreateItemCategorySuccess,
  CreateItemCategoryFailure,
  fetchAllItemCategoryRequest,
  fetchAllItemCategorySuccess,
  fetchAllItemCategoryFailure,
  ViewItemCategoryRequest,
  ViewItemCategorySuccess,
  ViewItemCategoryFailure,
  UpdateItemCategoryRequest,
  UpdateItemCategorySuccess,
  UpdateItemCategoryFailure,
  DeleteItemCategoryRequest,
  DeleteItemCategorySuccess,
  DeleteItemCategoryFailure,
  getAllItemCategoryRequest,
  getAllItemCategorySuccess,
  getAllItemCategoryFailure,
  // LEDGER OPTIONS +++++++++++++
  fetchAllAccountOptionsRequest,
  fetchAllAccountOptionsSuccess,
  fetchAllAccountOptionsFailure,
  CreateAccountRequest,
  CreateAccountSuccess,
  CreateAccountFailure,
  ViewAccountRequest,
  ViewAccountSuccess,
  ViewAccountFailure,
  fetchAllAccountsRequest,
  fetchAllAccountsSuccess,
  fetchAllAccountsFailure,
  UpdateAccountRequest,
  UpdateAccountSuccess,
  UpdateAccountFailure,
  DeleteAccountRequest,
  DeleteAccountSuccess,
  DeleteAccountFailure,
  fetchAllAccountcashRequest,
  fetchAllAccountcashSuccess,
  fetchAllAccountcashFailure,
  // LEdger+++++++++++
  deleteCashLedgerSettlementRequest,
  deleteCashLedgerSettlementSuccess,
  deleteCashLedgerSettlementFailure,
  getAllAccountLedgerRequest,
  getAllAccountLedgerSuccess,
  getAllAccountLedgerFailure,
  AccountExcelRequest,
  AccountExcelSuccess,
  AccountExcelFailure,
  AccountCashExcelRequest,
  AccountCashExcelSuccess,
  AccountCashExcelFailure,
  AccountImageRequest,
  AccountImageSuccess,
  AccountImageFailure,
  AccountHtmlRequest,
  AccountHtmlSuccess,
  AccountHtmlFailure,
  AccountCashHtmlRequest,
  AccountCashHtmlSuccess,
  AccountCashHtmlFailure,
  AccountCashImageRequest,
  AccountCashImageSuccess,
  AccountCashImageFailure,
  AccountPdfRequest,
  AccountPdfSuccess,
  AccountPdfFailure,
  getAllCashAccountLedgerRequest,
  getAllCashAccountLedgerSuccess,
  getAllCashAccountLedgerFailure,
  AccountCashPdfRequest,
  AccountCashPdfSuccess,
  AccountCashPdfFailure,
  getAllCashbookLedgerRequest,
  getAllCashbookLedgerSuccess,
  getAllCashbookLedgerFailure,
  getAllPassbookLedgerRequest,
  getAllPassbookLedgerSuccess,
  getAllPassbookLedgerFailure,
  getAllDaybookLedgerRequest,
  getAllDaybookLedgerSuccess,
  getAllDaybookLedgerFailure,
  getAllCashDaybookLedgerRequest,
  getAllCashDaybookLedgerSuccess,
  getAllCashDaybookLedgerFailure,
  getWalletRequest,
  getWalletSuccess,
  getWalletFailure,
  getWalletBalanceRequest,
  getWalletBalanceSuccess,
  getWalletBalanceFailure,
  getWalletuserRequest,
  getWalletuserSuccess,
  getWalletuserFailure,
  approveWalletRequest,
  approveWalletSuccess,
  approveWalletFailure,
  // ADD MAINTENANCE+++++++++++++
  CreateAddMaintenanceRequest,
  CreateAddMaintenanceSuccess,
  CreateAddMaintenanceFailure,
  UpdateAddMaintenanceRequest,
  UpdateAddMaintenanceSuccess,
  UpdateAddMaintenanceFailure,
  DeleteAddMaintenanceRequest,
  DeleteAddMaintenanceSuccess,
  DeleteAddMaintenanceFailure,
  ViewsingleAddMaintenanceRequest,
  ViewsingleAddMaintenanceSuccess,
  ViewsingleAddMaintenanceFailure,
  fetchAllAddMaintenanceRequest,
  fetchAllAddMaintenanceSuccess,
  fetchAllAddMaintenanceFailure
} from './actions';
import { jwtDecode } from 'jwt-decode';
const createConfig = () => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      token: token,
      'ngrok-skip-browser-warning': '69420'
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIN ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const loginAdmin = (credentials, navigate) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user_login`, credentials);
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      const tokentype = decodedToken.type;
      sessionStorage.setItem('type', tokentype);
      const roletype = decodedToken.role;
      sessionStorage.setItem('role', roletype);
      const username = decodedToken.username;
      sessionStorage.setItem('username', username);
      const userId = decodedToken.userId;
      sessionStorage.setItem('userId', userId);
      const companyId = decodedToken.companyId;
      sessionStorage.setItem('companyId', companyId);
      const userData = response.data;
      sessionStorage.setItem('user', JSON.stringify(userData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/dashboard');
        }
      });
      dispatch(loginSuccess(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data.message, { autoClose: 1000 });
      dispatch(loginFailure(error.message));
    }
  };
};
export const logoutAdmin = (navigate) => {
  return async (dispatch) => {
    dispatch(logoutRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user_logout`, {}, config);

      const userData = response.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/');
        }
      });
      dispatch(logoutSuccess(userData));
      return userData;
    } catch (error) {
      toast.error(error.response.data.error, { autoClose: 1000 });
      dispatch(logoutFailure(error.message));
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++  QOUTATION  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

export const fetchproformainvoiceList = () => {
  return async (dispatch) => {
    dispatch(fetchProformainvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/profromainvoice/get_all_ProFormaInvoice`, config);
      const data = await response.data.data;
      dispatch(fetchProformainvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchProformainvoiceFailure(error));
    }
  };
};
export const createProformainvoice = (quotationData, navigate) => {
  return async (dispatch) => {
    dispatch(createProformainvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/profromainvoice/create_ProFormaInvoice`, quotationData, config);
      const createdQuotation = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/proformainvoiceList');
        }
      });
      dispatch(createProformainvoiceSuccess(createdQuotation));
      return createdQuotation;
    } catch (error) {
      dispatch(createProformainvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const updateProformainvoice = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateProformainvoiceRequst());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/profromainvoice/update_ProFormaInvoice/${id}`, formData, config);
      const updateQuotationData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/proformainvoiceList');
        }
      });
      dispatch(updateProformainvoicesuccess(updateQuotationData));
      return updateQuotationData;
    } catch (error) {
      dispatch(updateProformainvoicefailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const Proformainvoiceview = (id) => {
  return async (dispatch) => {
    dispatch(viewProformainvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/profromainvoice/view_single_ProFormaInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewProformainvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewProformainvoiceFailure(error.message));
    }
  };
};
export const deleteProformainvoice = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteProformainvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/profromainvoice/delete_ProFormaInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteProformainvoiceSuccess());
    } catch (error) {
      dispatch(deleteProformainvoiceFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE ORDER ++++++++++++++++++++++++++++++++
export const createPurchaseOrder = (quotationData, navigate) => {
  return async (dispatch) => {
    dispatch(createPurchaseorderRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/create_purchaseOrder`, quotationData, config);
      const createdpurchaseorder = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/purchaseorderlist');
        }
      });
      dispatch(createPurchaseorderSuccess(createdpurchaseorder));
      return createdpurchaseorder;
    } catch (error) {
      dispatch(createPurchaseorderFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const updatePurchaseOrder = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updatePurchaseOrderRequst());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/update_purchaseOrder/${id}`, formData, config);
      const updatePrchaseOrderData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/purchaseorderlist');
        }
      });
      dispatch(updatePurchaseOrdersuccess(updatePrchaseOrderData));
      return updatePrchaseOrderData;
    } catch (error) {
      dispatch(updatePurchaseOrderfailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const deletePurchaseOrder = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deletePurchaseOrderRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/delete_purchaseOrder/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deletePurchaseOrderSuccess());
    } catch (error) {
      dispatch(deletePurchaseOrderFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const PurchaseorderView = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseOrderRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/view_single_purchaseOrder/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseOrderSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseOrderFailure(error.message));
    }
  };
};
export const fetchpurchaseorderList = () => {
  return async (dispatch) => {
    dispatch(fetchPurchaseOrderRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseOrder/get_all_purchaseOrder`, config);
      const data = await response.data.data;
      dispatch(fetchPurchaseOrderSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchPurchaseOrderFailure(error));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DELIVERYCHALLAN ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallDeliverychallan = () => {
  return async (dispatch) => {
    dispatch(getAllDeliverychallanRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/deliverychallan/get_all_deliverychallan`, config);
      const getallDeliverychallan = response.data.data;
      dispatch(getAllDeliverychallanSuccess(getallDeliverychallan));
      return getallDeliverychallan;
    } catch (error) {
      dispatch(getAllDeliverychallanFailure(error));
    }
  };
};
export const createDeliveryChallan = (ChallanData, navigate) => {
  return async (dispatch) => {
    dispatch(createDeliveryChallanRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/deliverychallan/create_deliverychallan`, ChallanData, config);
      const createdDeliverychallan = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/deliverychallanlist');
        }
      });
      dispatch(createDeliveryChallanSuccess(createdDeliverychallan));
      return createdDeliverychallan;
    } catch (error) {
      dispatch(createDeliveryChallanFailure(error));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const Deliverychallanview = (id) => {
  return async (dispatch) => {
    dispatch(viewDeliverychallanRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/deliverychallan/view_deliverychallan/${id}`, config);
      const data = response.data.data;
      dispatch(viewDeliverychallanSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDeliverychallanFailure(error));
    }
  };
};
export const updateDileveryChallan = (id, ChallanData, navigate) => {
  return async (dispatch) => {
    dispatch(updateDileverychallanRequest());
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/deliverychallan/update_deliverychallan/${id}`,
        ChallanData,
        config
      );
      const updateChallanData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/deliverychallanlist');
        }
      });
      dispatch(updateDileverychallanSuccess(updateChallanData));
      return updateChallanData;
    } catch (error) {
      dispatch(updateDileverychallanFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const deleteDileveryChallan = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteDileverychallanItemRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/deliverychallan/delete_deliverychallan/${id}`, config);
      const deleteChallanItem = response;
      dispatch(deleteDileverychallanItemSuccess(deleteChallanItem));
      toast.success(response.data.message, { autoClose: 1000 });
      return deleteChallanItem;
    } catch (error) {
      dispatch(deleteDileverychallanItemFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PRODUCT ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const fetchAllProductsCash = () => {
  return async (dispatch) => {
    dispatch(fetchAllProdutscashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/item/C_get_all_item`, config);
      const data = response.data.data;
      dispatch(fetchAllProdutscashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllProdutrscashFailure(error.message));
    }
  };
};
export const fetchAllProducts = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllProdutsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/item/get_all_items`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllProdutsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllProdutrsFailure(error.message));
    }
  };
};
export const createProduct = (data, navigate) => {
  return async (dispatch) => {
    dispatch(createProductRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/item/create_item`, data, config);
      const createProductData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(createProductSuccess(createProductData));
      return createProductData;
    } catch (error) {
      dispatch(createProductFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const DeleteProduct = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteProductRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/item/delete_item/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteProductSuccess(data));
      return data;
    } catch (error) {
      dispatch(deleteProductFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewProduct = (id) => {
  return async (dispatch) => {
    dispatch(viewProductRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/item/view_item/${id}`, config);
      const data = response.data.data;
      dispatch(viewProductSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewProductFailure(error.message));
    }
  };
};
export const updateProduct = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(updateProductRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/item/update_item/${id}`, data, config);
      const upadteProductData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(updateProductSuccess(upadteProductData));
      return upadteProductData;
    } catch (error) {
      dispatch(updateProductFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SELF EXPENSE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallSelfExpense = () => {
  return async () => {
    // dispatch(getallPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/selfExpense/C_get_all_selfExpense`, config);
      const getallSelfExpense = response.data.data;
      // dispatch(getallPaymentCashSuccess(getallpaymentCash));
      return getallSelfExpense;
    } catch (error) {
      console.log('error: ', error);
      toast.error(error.response.data.error);
      // dispatch(getallPaymentCashFailure(error.message));
    }
  };
};
export const deleteSelfExpense = async (id, navigate) => {
  try {
    const config = createConfig();
    const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/selfExpense/C_delete_selfExpense/${id}`, config);
    const data = response.data.data;
    toast.success(response.data.message, {
      icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
      autoClose: 1000
    });
    return data;
  } catch (error) {
    if (error.response.status === 401) {
      navigate('/');
    } else {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
    }
  }
};
export const selfExpenseview = (id) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/selfExpense/C_view_selfExpense/${id}`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('view Self Expense Failure: ', error);
    }
  };
};
export const createSelfExpense = (formData, navigate, isNeedToNavigate = true) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/selfExpense/C_create_selfExpense`, formData, config);
      const createdSelfExpense = response;
      if (isNeedToNavigate) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000,
          onClose: () => {
            navigate('/selfExpenselist');
          }
        });
      }
      return createdSelfExpense;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
      throw error;
    }
  };
};
export const updateSelfExpense = (id, formData, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/selfExpense/C_update_selfExpense/${id}`, formData, config);
      const upadteSelfExpenseData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/selfExpenselist');
        }
      });
      return upadteSelfExpenseData;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const getAllSelfExpenseByUserId = (id, fromDate, toDate) => {
  return async () => {
    try {
      const config = createConfig();
      const queryParams = `?fromDate=${fromDate}&toDate=${toDate}`;
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/selfExpense/C_view_selfExpense_userid/${id}${queryParams}`,
        config
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('view Self Expense Failure: ', error);
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT CASH ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPaymentCash = (formData, navigate, isFrom = 'Expense') => {
  return async (dispatch) => {
    dispatch(createPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/C_create_paymentCash`, formData, config);
      const createdpayment = response;
      if (isFrom != 'employee') {
        toast.success(isFrom === 'Expense' ? 'Expense Created Successfully' : response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000,
          onClose: () => {
            if (isFrom === 'Expense') {
              navigate('/expenselist');
            } else {
              navigate('/paymentcashlist');
            }
          }
        });
      }
      dispatch(createPaymentCashSuccess(createdpayment));
      return createdpayment;
    } catch (error) {
      dispatch(createPaymentCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const getallPaymentCash = () => {
  return async (dispatch) => {
    dispatch(getallPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/C_get_all_paymentCash`, config);
      const getallpaymentCash = response.data;
      dispatch(getallPaymentCashSuccess(getallpaymentCash));
      return getallpaymentCash;
    } catch (error) {
      dispatch(getallPaymentCashFailure(error.message));
    }
  };
};
export const paymentCashview = (id) => {
  return async (dispatch) => {
    dispatch(viewPaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/C_view_paymentCash/${id}`, config);
      const data = response.data.data;
      dispatch(viewPaymentCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPaymentCashFailure(error.message));
    }
  };
};
export const updatePaymentCash = (id, formData, navigate, isFromExpense = false) => {
  return async (dispatch) => {
    dispatch(updatePaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/C_update_paymentCash/${id}`, formData, config);
      const upadtePaymentCashData = response;
      toast.success(isFromExpense ? 'Expense Updated Successfully' : response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          if (isFromExpense) {
            navigate('/expenselist');
          } else {
            navigate('/paymentcashlist');
          }
        }
      });
      dispatch(updatePaymentCashSuccess(upadtePaymentCashData));
      return upadtePaymentCashData;
    } catch (error) {
      dispatch(updatePaymentCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const paymentCashDelete = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deletePaymentCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/payment/C_soft_delete_paymentCash/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deletePaymentCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(deletePaymentCashFailure(error.message));
      if (error.response && error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.message || error.message, {
          autoClose: 1000
        });
      }
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALESINVOICE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createSalesInvoice = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/salesinvoice/create_salesinvoice`, payload, config);
      const cretesalesinvoice = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/salesinvoicelist');
        }
      });
      dispatch(createSalesinvoiceSuccess(cretesalesinvoice));
      return cretesalesinvoice;
    } catch (error) {
      dispatch(createSalesinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallSalesInvoice = () => {
  return async (dispatch) => {
    dispatch(getAllSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/get_all_salesInvoice`, config);
      const getallSalesinvoice = response.data;
      dispatch(getAllSalesinvoiceSuccess(getallSalesinvoice));
      return getallSalesinvoice;
    } catch (error) {
      dispatch(getAllSalesinvoiceFailure(error.message));
    }
  };
};
export const SalesInvoiceview = (id) => {
  return async (dispatch) => {
    dispatch(viewSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/view_salesInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewSalesinvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewSalesinvoiceFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++ Attendance Functions +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getEmployeeAttendance = (date = null) => {
  return async () => {
    try {
      const config = createConfig();
      let url = `${process.env.REACT_APP_BASE_URL}/attendance/employee_status`;

      if (date) {
        url += `?date=${date}`;
      }

      const response = await axios.get(url, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
};

export const updateEmployeeAttendance = (attendanceId, attendanceTypeId) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/attendance/update_attendance_type/${attendanceId}`,
        {
          attendanceTypeId
        },
        config
      );

      const data = response.data.data;
      toast.success(response.data.message || 'Attendance status updated successfully', {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        throw error;
      } else {
        toast.error(error.response?.data?.message || 'Failed to update attendance status', {
          autoClose: 1000
        });
        throw error;
      }
    }
  };
};

export const getAttendanceSummary = (date = null) => {
  return async () => {
    try {
      const config = createConfig();
      let url = `${process.env.REACT_APP_BASE_URL}/attendance/employee_status`;

      if (date) {
        url += `?date=${date}`;
      }

      const response = await axios.get(url, config);
      const data = response.data.data;

      // Extract summary from response
      if (data && data.summary) {
        return data.summary;
      }

      // If no summary in response, calculate from employees data
      if (data && data.employees) {
        const totalEmployees = data.employees.length;
        const present = data.employees.filter(
          (emp) =>
            emp.attendanceStatus === 'Present' ||
            emp.attendanceStatus === 'P' ||
            emp.attendanceStatus === 'M' ||
            emp.attendanceStatus === 'BM'
        ).length;
        const absent = totalEmployees - present;

        return {
          totalEmployees,
          present,
          absent
        };
      }

      return null;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
};

export const getEmployeeAttendanceHistory = (employeeId, startDate, endDate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attendance/employee_history`, {
        ...config,
        params: {
          employeeId,
          startDate,
          endDate
        }
      });

      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  };
};

export const bulkUpdateAttendance = (attendanceData) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/attendance/bulk_update`, attendanceData, config);

      const data = response.data.data;
      toast.success(response.data.message || 'Bulk attendance update completed successfully', {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return data;
    } catch (error) {
      if (error.response?.status === 401) {
        throw error;
      } else {
        toast.error(error.response?.data?.message || 'Failed to update bulk attendance', {
          autoClose: 1000
        });
        throw error;
      }
    }
  };
};
export const updateSalesinvoice = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/salesinvoice/update_salesInvoice/${id}`, payload, config);
      const updateSalesinvoiceData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/salesinvoicelist');
        }
      });
      dispatch(updateSalesinvoiceSuccess(updateSalesinvoiceData));
      return updateSalesinvoiceData;
    } catch (error) {
      dispatch(updateSalesinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteSalesinvoice = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteSalesinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/salesinvoice/delete_salesInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteSalesinvoiceSuccess());
    } catch (error) {
      dispatch(deleteSalesinvoiceFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALESINVOICE ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createSalesInvoiceCash = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_create_salesinvoice`, payload, config);
      const cretesalesinvoicecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/salescashlist');
        }
      });
      dispatch(createSalesinvoicecashSuccess(cretesalesinvoicecash));
      return cretesalesinvoicecash;
    } catch (error) {
      dispatch(createSalesinvoicecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallSalesInvoiceCash = () => {
  return async (dispatch) => {
    dispatch(getAllSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_get_all_salesInvoice`, config);
      const getallSalesinvoiceCash = response.data;
      dispatch(getAllSalesinvoicecashSuccess(getallSalesinvoiceCash));
      return getallSalesinvoiceCash;
    } catch (error) {
      dispatch(getAllSalesinvoicecashFailure(error.message));
    }
  };
};
export const SalesInvoiceCashview = (id) => {
  return async (dispatch) => {
    dispatch(viewSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_view_salesInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewSalesinvoicecashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewSalesinvoicecashFailure(error.message));
    }
  };
};
export const updateSalesinvoiceCash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_update_salesinvoice/${id}`, payload, config);
      const updateSalesinvoiceCashData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/salescashlist');
        }
      });
      dispatch(updateSalesinvoicecashSuccess(updateSalesinvoiceCashData));
      return updateSalesinvoiceCashData;
    } catch (error) {
      dispatch(updateSalesinvoicecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteSalesinvoicecash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteSalesinvoicecashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_delete_salesInvoice/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteSalesinvoicecashSuccess());
    } catch (error) {
      dispatch(deleteSalesinvoicecashFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ORDER PROCESSING ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createOrderprocessing = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createOrderprocessingRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/orderProcessing/create_order_processing`, payload, config);
      const createOrderprocessing = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/orderprocessinglist');
        }
      });
      dispatch(createOrderprocessingSuccess(createOrderprocessing));
      return createOrderprocessing;
    } catch (error) {
      dispatch(createOrderprocessingFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallOrderprocessing = () => {
  return async () => {
    // dispatch(getAllOrderprocessingRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orderProcessing/get_all_order_processing`, config);
      const getallOrderprocessing = response.data;
      // dispatch(getAllOrderprocessingSuccess(getallOrderprocessing));
      return getallOrderprocessing;
    } catch (error) {
      console.log('error: ', error);
      return {};
      // dispatch(getAllOrderprocessingFailure(error.message));
    }
  };
};
export const Orderprocessingview = (id) => {
  return async () => {
    // dispatch(viewOrderprocessingRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orderProcessing/view_order_processing/${id}`, config);
      const data = response.data.data;
      // dispatch(viewOrderprocessingSuccess(data));
      return data;
    } catch (error) {
      console.log('error: ', error);
      return {};
      // dispatch(viewOrderprocessingFailure(error.message));
    }
  };
};
export const updateOrderprocessing = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateOrderprocessingRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/orderProcessing/update_order_processing/${id}`, payload, config);
      const updateOrderData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/orderprocessinglist');
        }
      });
      dispatch(updateOrderprocessingSuccess(updateOrderData));
      return updateOrderData;
    } catch (error) {
      dispatch(updateOrderprocessingFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteOrderprocessing = (id, navigate) => {
  return async () => {
    // dispatch(deleteOrderprocessingRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/orderProcessing/delete_order_processing/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      // dispatch(deleteOrderprocessingSuccess());
    } catch (error) {
      console.log('error: ', error);
      // dispatch(deleteOrderprocessingFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getallOrderItems = () => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orderProcessing/get_all_order_items`, config);
      return response.data.data;
    } catch (error) {
      console.log('error: ', error);
      return {};
    }
  };
};
export const changeOrderStatus = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateOrderprocessingRequest());
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/orderProcessing/update_status_order_processing/${id}`,
        payload,
        config
      );
      const updateOrderStatusData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(updateOrderprocessingSuccess(updateOrderStatusData));
      return updateOrderStatusData;
    } catch (error) {
      dispatch(updateOrderprocessingFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEBIT NOTE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createDebitnote = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/debitnote/create_debitNote`, payload, config);
      const createDebitnote = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/debitnotelist');
        }
      });
      dispatch(createDebitnoteSuccess(createDebitnote));
      return createDebitnote;
    } catch (error) {
      dispatch(createDebitnoteFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallDebitnote = () => {
  return async (dispatch) => {
    dispatch(getAllDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/get_all_debitNote`, config);
      const getallDebitnote = response.data.data;
      dispatch(getAllDebitnoteSuccess(getallDebitnote));
      return getallDebitnote;
    } catch (error) {
      dispatch(getAllDebitnoteFailure(error.message));
    }
  };
};
export const Debitnoteviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/view_single_debitNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewDebitnoteSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDebitnoteFailure(error.message));
    }
  };
};
export const updateDebitnote = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/debitnote/update_debitNote/${id}`, payload, config);
      const updateDebitnoteData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/debitnotelist');
        }
      });
      dispatch(updateDebitnoteSuccess(updateDebitnoteData));
      return updateDebitnoteData;
    } catch (error) {
      dispatch(updateDebitnoteFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteDebitnote = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteDebitnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/debitnote/delete_debitNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteDebitnoteSuccess());
    } catch (error) {
      dispatch(deleteDebitnoteFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const DebitnotePDF = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(DebitnotePdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/debitNote_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'debit_note.pdf');
      }
      dispatch(DebitnotePdfSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnotePdfFailure(error.message));
    }
  };
};
export const DebitnoteImage = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DebitnoteImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/debitNote_jpg/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `debitnote_${id}.jpeg`);
      dispatch(DebitnoteImageSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching image:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnoteImageFailure(error.message));
    }
  };
};
export const DebitnoteHtml = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DebitnoteHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/debitNote_html/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `debitnote_${id}.html`);
      dispatch(DebitnoteHtmlSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching image:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnoteHtmlFailure(error.message));
    }
  };
};
export const DebitnoteSingleExcel = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DebitnoteSingleExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/debitNote_single_excel/${id}`, config);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `debit_note_${id}.xlsx`);
          dispatch(DebitnoteSingleExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnoteSingleExcelFailure(error.message));
    }
  };
};
export const DebitnoteExcel = (fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(DebitnoteExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/debitnote/debitNote_excel?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `debit_note.xlsx`);
          dispatch(DebitnoteExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnoteExcelFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEBIT NOTE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createDebitnotecash = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/debitnote/C_create_debitNote`, payload, config);
      const createDebitnotecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/debitnotecashlist');
        }
      });
      dispatch(createDebitnotecashSuccess(createDebitnotecash));
      return createDebitnotecash;
    } catch (error) {
      dispatch(createDebitnotecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallDebitnotecash = () => {
  return async (dispatch) => {
    dispatch(getAllDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/C_get_all_debitNote`, config);
      const getallDebitnotecash = response.data.data;
      dispatch(getAllDebitnotecashSuccess(getallDebitnotecash));
      return getallDebitnotecash;
    } catch (error) {
      dispatch(getAllDebitnotecashFailure(error.message));
    }
  };
};
export const Debitnotecashviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/C_view_single_debitNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewDebitnotecashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewDebitnotecashFailure(error.message));
    }
  };
};
export const updateDebitnotecash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/debitnote/C_update_debitNote/${id}`, payload, config);
      const updateDebitnotecashData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/debitnotecashlist');
        }
      });
      dispatch(updateDebitnotecashSuccess(updateDebitnotecashData));
      return updateDebitnotecashData;
    } catch (error) {
      dispatch(updateDebitnotecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteDebitnotecash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteDebitnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/debitnote/C_delete_debitNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteDebitnotecashSuccess());
    } catch (error) {
      dispatch(deleteDebitnotecashFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const DebitnoteCashPDF = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(DebitnotecashPdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/C_debitNote_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'debit_note_cash.pdf');
      }
      dispatch(DebitnotecashPdfSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnotecashPdfFailure(error.message));
    }
  };
};
export const DebitnoteCashImage = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DebitnoteCashImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/C_debitNote_jpg/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `debitnote_cash_${id}.jpeg`);
      dispatch(DebitnoteCashImageSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching image:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnoteCashImageFailure(error.message));
    }
  };
};
export const DebitnoteCashHtml = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DebitnoteCashHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/C_debitNote_html/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `debitnote_cash_${id}.html`);
      dispatch(DebitnoteCashHtmlSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching image:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnoteCashHtmlFailure(error.message));
    }
  };
};
export const DebitnoteCashSingleExcel = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DebitnoteCashSingleExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/debitnote/C_debitNote_single_excel/${id}`, config);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `debit_note_cash_${id}.xlsx`);
          dispatch(DebitnoteCashSingleExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnoteCashSingleExcelFailure(error.message));
    }
  };
};
export const DebitnoteCashExcel = (fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(DebitnoteCashExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/debitnote/C_debitNote_excel?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `debit_note_cash.xlsx`);
          dispatch(DebitnoteCashExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(DebitnoteCashExcelFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CREDIT NOTE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createCreditnote = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/creditnote/create_creditNote`, payload, config);
      const createCreditnote = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/creditnotelist');
        }
      });
      dispatch(createCreditnoteSuccess(createCreditnote));
      return createCreditnote;
    } catch (error) {
      dispatch(createCreditnoteFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallCreditnote = () => {
  return async (dispatch) => {
    dispatch(getAllCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/get_all_creditNote`, config);
      const getallCreditnote = response.data.data;
      dispatch(getAllCreditnoteSuccess(getallCreditnote));
      return getallCreditnote;
    } catch (error) {
      dispatch(getAllCreditnoteFailure(error.message));
    }
  };
};
export const Creditnoteviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/view_single_creditNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewCreditnoteSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewCreditnoteFailure(error.message));
    }
  };
};
export const updateCreditnote = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/creditnote/update_creditNote/${id}`, payload, config);
      const updateCreditnoteData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/creditnotelist');
        }
      });
      dispatch(updateCreditnoteSuccess(updateCreditnoteData));
      return updateCreditnoteData;
    } catch (error) {
      dispatch(updateCreditnoteFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteCreditnote = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteCreditnoteRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/creditnote/delete_creditNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteCreditnoteSuccess());
    } catch (error) {
      dispatch(deleteCreditnoteFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const CreditnotePDF = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(CreditnotePdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/creditNote_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }

      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'credit_note.pdf');
      }
      dispatch(CreditnotePdfSuccess(base64Data));

      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnotePdfFailure(error.message));
    }
  };
};
export const CreditnoteImage = (id, navigate) => {
  return async (dispatch) => {
    dispatch(CreditnoteImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/creditNote_jpg/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `creditnote_${id}.jpeg`);

      dispatch(CreditnoteImageSuccess(base64Data));

      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });

      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnoteImageFailure(error.message));
    }
  };
};
export const CreditnoteHtml = (id, navigate) => {
  return async (dispatch) => {
    dispatch(CreditnoteHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/creditNote_html/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `creditnote_${id}.html`);

      dispatch(CreditnoteHtmlSuccess(base64Data));

      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });

      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnoteHtmlFailure(error.message));
    }
  };
};
export const CreditnoteSingleExcel = (id, navigate) => {
  return async (dispatch) => {
    dispatch(CreditnoteSingleExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/creditNote_single_excel/${id}`, config);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `credit_note_${id}.xlsx`);
          dispatch(CreditnoteSingleExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnoteSingleExcelFailure(error.message));
    }
  };
};
export const CreditnoteExcel = (fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(CreditnoteExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/creditnote/creditNote_excel?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `credit_note.xlsx`);
          dispatch(CreditnoteExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnoteExcelFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CREDIT NOTE++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createCreditnotecash = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/creditnote/C_create_creditNote`, payload, config);
      const createCreditnotecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/creditnotecashlist');
        }
      });
      dispatch(createCreditnotecashSuccess(createCreditnotecash));
      return createCreditnotecash;
    } catch (error) {
      dispatch(createCreditnotecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallCreditnotecash = () => {
  return async (dispatch) => {
    dispatch(getAllCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/C_get_all_creditNote`, config);
      const getallCreditnotecash = response.data.data;
      dispatch(getAllCreditnotecashSuccess(getallCreditnotecash));
      return getallCreditnotecash;
    } catch (error) {
      dispatch(getAllCreditnotecashFailure(error.message));
    }
  };
};
export const Creditnotecashviewdata = (id) => {
  return async (dispatch) => {
    dispatch(viewCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/C_view_single_creditNote/${id}`, config);
      const data = response.data.data;
      dispatch(viewCreditnotecashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewCreditnotecashFailure(error.message));
    }
  };
};
export const updateCreditnotecash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updateCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/creditnote/C_update_creditNote/${id}`, payload, config);
      const updateCreditnotecashData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/creditnotecashlist');
        }
      });
      dispatch(updateCreditnotecashSuccess(updateCreditnotecashData));
      return updateCreditnotecashData;
    } catch (error) {
      dispatch(updateCreditnotecashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deleteCreditnotecash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteCreditnotecashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/creditnote/C_delete_creditNote/${id}`, config);
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteCreditnotecashSuccess());
    } catch (error) {
      dispatch(deleteCreditnotecashFailure());
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const CreditnoteCashPDF = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(CreditnotecashPdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/C_creditNote_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'credit_note_cash.pdf');
      }
      dispatch(CreditnotecashPdfSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnotecashPdfFailure(error.message));
    }
  };
};
export const CreditnoteCashImage = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(CreditnoteCashImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/C_creditNote_jpg/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'image/jpeg' });
        saveAs(blob, `creditnote_cash_${id}.jpeg`);
      }
      dispatch(CreditnoteCashImageSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnoteCashImageFailure(error.message));
    }
  };
};
export const CreditnoteCashHtml = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(CreditnoteCashHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/C_creditNote_html/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'text/html' });
        saveAs(blob, `creditnote_cash_${id}.html`);
      }
      dispatch(CreditnoteCashHtmlSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnoteCashHtmlFailure(error.message));
    }
  };
};
export const CreditnoteCashSingleExcel = (id, navigate) => {
  return async (dispatch) => {
    dispatch(CreditnoteCashSingleExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/creditnote/C_creditNote_single_excel/${id}`, config);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `credit_note_cash_${id}.xlsx`);
          dispatch(CreditnoteCashSingleExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnoteCashSingleExcelFailure(error.message));
    }
  };
};
export const CreditnoteCashExcel = (fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(CreditnoteCashExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/creditnote/C_creditNote_excel?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `credit_note_cash.xlsx`);
          dispatch(CreditnoteCashExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(CreditnoteCashExcelFailure(error.message));
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE BILL ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPurchaseinvoice = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/create_purchaseInvoice`, payload, config);
      const cretepurchasebill = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 900,
        onClose: () => {
          navigate('/purchaseinvoiceList');
        }
      });
      dispatch(createPurchaseinvoiceSuccess(cretepurchasebill));
      return cretepurchasebill;
    } catch (error) {
      dispatch(createPurchaseinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallPurchaseinvoice = () => {
  return async (dispatch) => {
    dispatch(getAllPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/get_all_purchaseInvoice`, config);
      const getallPurchasebill = response.data;
      dispatch(getAllPurchaseinvoiceSuccess(getallPurchasebill));
      return getallPurchasebill;
    } catch (error) {
      dispatch(getAllPurchaseinvoiceFailure(error.message));
    }
  };
};
export const viewPurchaseinvoice = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/view_purchaseInvoice/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseinvoiceSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseinvoiceFailure(error.message));
    }
  };
};
export const updatePurchaseinvoice = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updatePurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/update_purchaseInvoice/${id}`, payload, config);
      const updatePurchasebillData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 900,
        onClose: () => {
          navigate('/purchaseinvoiceList');
        }
      });
      dispatch(updatePurchaseinvoiceSuccess(updatePurchasebillData));
      return updatePurchasebillData;
    } catch (error) {
      dispatch(updatePurchaseinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deletePurchaseinvoice = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deletePurchaseinvoiceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/delete_purchaseInvoice/${id}`, config);
      const deletePurchasebillData = response;
      dispatch(deletePurchaseinvoiceSuccess(deletePurchasebillData));
      toast.success(response.data.message, { autoClose: 1000 });
      return deletePurchasebillData;
    } catch (error) {
      dispatch(deletePurchaseinvoiceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE INVOICE CASH++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPurchaseInvoiceCash = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(createPurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_create_purchaseCash
      `,
        payload,
        config
      );
      const cretepurchasebillcash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 900,
        onClose: () => {
          navigate('/purchaseinvoicecashList');
        }
      });
      dispatch(createPurchaseinvoiceCashSuccess(cretepurchasebillcash));
      return cretepurchasebillcash;
    } catch (error) {
      dispatch(createPurchaseinvoiceCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const getallPurchaseInvoiceCash = () => {
  return async (dispatch) => {
    dispatch(getAllPurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_get_all_purchaseCash`, config);
      const getallPurchasebillcash = response.data;
      dispatch(getAllPurchaseinvoiceCashSuccess(getallPurchasebillcash));
      return getallPurchasebillcash;
    } catch (error) {
      dispatch(getAllPurchaseinvoiceCashFailure(error.message));
    }
  };
};
export const PurchaseInvoiceviewCash = (id) => {
  return async (dispatch) => {
    dispatch(viewPurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_view_purchaseCash/${id}`, config);
      const data = response.data.data;
      dispatch(viewPurchaseinvoiceCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewPurchaseinvoiceCashFailure(error.message));
    }
  };
};
export const updatePurchaseInvoiceCash = (id, payload, navigate) => {
  return async (dispatch) => {
    dispatch(updatePurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_update_purchaseCash/${id}`, payload, config);
      const updatePurchasebillData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 900,
        onClose: () => {
          navigate('/purchaseinvoicecashList');
        }
      });
      dispatch(updatePurchaseinvoiceCashSuccess(updatePurchasebillData));
      return updatePurchasebillData;
    } catch (error) {
      dispatch(updatePurchaseinvoiceCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, { autoClose: 1000 });
      }
    }
  };
};
export const deletePurchaseInvoiceCash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deletePurchaseinvoiceCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_delete_purchaseCash/${id}`, config);
      const deletePurchasebillData = response;
      dispatch(deletePurchaseinvoiceCashSuccess(deletePurchasebillData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return deletePurchasebillData;
    } catch (error) {
      dispatch(deletePurchaseinvoiceCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PERMISSION +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallPermissions = () => {
  return async (dispatch) => {
    dispatch(getAllPermissionsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/permission/get_all_permissions`, config);
      const getallPermission = response.data.data;
      dispatch(getAllPermissionsSuccess(getallPermission));
      return getallPermission;
    } catch (error) {
      dispatch(getAllPermissionsFailure(error.message));
    }
  };
};
export const updatePermission = (data, navigate) => {
  return async (dispatch) => {
    dispatch(updatePermissionsRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/permission/update_permissions`, data, config);
      const updatePermissionData = response.data.data;
      dispatch(updatePermissionsSuccess(updatePermissionData));
      return updatePermissionData;
    } catch (error) {
      dispatch(updatePermissionsFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ User +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createuser = (data, navigate) => {
  return async (dispatch) => {
    dispatch(createUserRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/create_user`, data, config);
      const userData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/userlist');
        }
      });
      dispatch(createUserSuccess(userData));
      return userData;
    } catch (error) {
      dispatch(createUserFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getallusers = (params = {}) => {
  return async (dispatch) => {
    dispatch(getallUserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_user?{search}=`, { ...config, params: params });
      const getallUsers = response.data.data;
      dispatch(getallUserSuccess(getallUsers));
      return getallUsers;
    } catch (error) {
      dispatch(getallUserFailure(error.message));
    }
  };
};
export const getallcompanyusers = (params = {}) => {
  return async (dispatch) => {
    dispatch(getallUserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/get_all_company_user?{search}=`, { ...config, params: params });
      const getallUsers = response.data.data;
      dispatch(getallUserSuccess(getallUsers));
      return getallUsers;
    } catch (error) {
      dispatch(getallUserFailure(error.message));
    }
  };
};
export const Userview = (id) => {
  return async (dispatch) => {
    dispatch(viewUserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_user/${id}`, config);
      const data = response.data.data;
      dispatch(viewUserSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(viewUserFailure(error.message));
    }
  };
};
export const updateUser = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateUserRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/update_user/${id}`, formData, config);
      const updateUserData = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/userlist');
        }
      });
      dispatch(UpdateUserSuccess(updateUserData));
      return updateUserData;
    } catch (error) {
      dispatch(UpdateUserFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteUser = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteUserRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/remove_company/${id}`, config);
      const deleteUser = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteUserSuccess(deleteUser));
      return deleteUser;
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getuserbalance = () => {
  return async (dispatch) => {
    dispatch(getUserBalanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_user_balance`, config);
      const getallUsers = response.data.data;
      dispatch(getUserBalanceSuccess(getallUsers));
      return getallUsers;
    } catch (error) {
      dispatch(getUserBalanceFailure(error.message));
    }
  };
};
export const Checkuser = (data) => {
  return async (dispatch) => {
    dispatch(CheckUserRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/check_user`, data, config);
      const userData = response;
      dispatch(CheckUserSuccess(userData));
      return userData;
    } catch (error) {
      dispatch(CheckUserFailure(error.message));
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
    }
  };
};
export const Adduser = (userid) => {
  return async (dispatch) => {
    dispatch(addUserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/add_user/${userid}`, config);
      const userData = response;
      dispatch(addUserSuccess(userData));
      return userData;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(addUserFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createCompany = (data) => {
  return async (dispatch) => {
    dispatch(CreateCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/company/create_company`, data, config);
      const Companydata = response;
      dispatch(CreateCompanySuccess(Companydata));
      return Companydata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(CreateCompanyFailure(error.message));
    }
  };
};
export const updateCompany = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/company/update_company/${id}`, formData, config);
      const updateCompanyData = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/companylist');
        }
      });
      dispatch(UpdateCompanySuccess(updateCompanyData));
      return updateCompanyData;
    } catch (error) {
      dispatch(UpdateCompanyFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const Companyview = (id) => {
  return async (dispatch) => {
    dispatch(ViewCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/view_single_company/${id}`, config);
      const data = response.data.data;
      dispatch(ViewCompanySuccess(data));
      return data;
    } catch (error) {
      dispatch(ViewCompanyFailure(error.message));
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
    }
  };
};
export const deleteCompany = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/company/delete_company/${id}`, config);
      const deletecompany = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteCompanySuccess(deletecompany));
      return deletecompany;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(DeleteCompanyFailure(error.message));
    }
  };
};
export const fetchAllCompany = () => {
  return async (dispatch) => {
    dispatch(fetchAllCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/get_all_company`, config);
      const data = response.data.data;
      dispatch(fetchAllCompanySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCompanyFailure(error.message));
    }
  };
};
export const fetchuserwiseCompany = () => {
  return async (dispatch) => {
    dispatch(fetchAllCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_all_userTOComapny`, config);
      const data = response.data.data;
      dispatch(fetchAllCompanySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCompanyFailure(error.message));
    }
  };
};
export const setDefaultCompany = (id) => {
  return async (dispatch) => {
    dispatch(setDefaultCompanyRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/set_default_comapny/${id}`, config);
      const data = response.data.data;
      const token = response.data.token;
      sessionStorage.setItem('token', token);
      const decodedToken = jwtDecode(token);
      sessionStorage.setItem('companyId', decodedToken.companyId);
      dispatch(setDefaultCompanySuccess(data));
      return data;
    } catch (error) {
      dispatch(setDefaultCompanyFailure(error.message));
    }
  };
};
export const getCompanyBankBalance = () => {
  return async (dispatch) => {
    dispatch(CompanyBankBalanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/view_company_balance`, config);
      const data = response.data.data;
      dispatch(CompanyBankBalanceSuccess(data));
      return data;
    } catch (error) {
      dispatch(CompanyBankBalanceFailure(error.message));
    }
  };
};
export const getCompanyCashBalance = () => {
  return async (dispatch) => {
    dispatch(CompanyCashBalanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/company/view_company_cash_balance`, config);
      const data = response.data.data;
      dispatch(CompanyCashBalanceSuccess(data));
      return data;
    } catch (error) {
      dispatch(CompanyCashBalanceFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createCompanyBank = (bankdetails) => {
  return async (dispatch) => {
    dispatch(CreateCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/companybank/create_company_bankDetails`, bankdetails, config);
      const Companybankdata = response;
      dispatch(CreateCompanyBankSuccess(Companybankdata));
      return Companybankdata;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(CreateCompanyBankFailure(error.message));
    }
  };
};
export const updateCompanyBank = (id, formData) => {
  return async (dispatch) => {
    dispatch(UpdateCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/companybank/update_company_bankDetails/${id}`, formData, config);
      const updateCompanyBankData = response.data.data;
      dispatch(UpdateCompanyBankSuccess(updateCompanyBankData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateCompanyBankData;
    } catch (error) {
      dispatch(UpdateCompanyBankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteCompanyBank = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/companybank/delete_company_bankDetails/${id}`, config);
      const deleteCompanybank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteCompanyBankSuccess(deleteCompanybank));
      return deleteCompanybank;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(DeleteCompanyBankFailure(error.message));
    }
  };
};
export const fetchAllCompanyBank = () => {
  return async (dispatch) => {
    dispatch(fetchAllCompanyBankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/companybank/view_all_company_bankDetails`, config);
      const data = response.data.data;
      dispatch(fetchAllCompanyBankSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllCompanyBankFailure(error.message));
    }
  };
};
export const CompanyBankLedger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(CompanyBankLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/companybank/view_single_bankLedger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const data = response.data.data;
      dispatch(CompanyBankLedgerSuccess(data));
      return data;
    } catch (error) {
      dispatch(CompanyBankLedgerFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT RECIEVE CASH +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createRecievecash = (data, navigate) => {
  return async (dispatch) => {
    dispatch(createRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/receive/C_create_receiveCash`, data, config);
      const Recievedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentrecieveList');
        }
      });
      dispatch(createRecieveCashSuccess(Recievedata));
      return Recievedata;
    } catch (error) {
      dispatch(createRecieveCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getallRecieveCash = () => {
  return async (dispatch) => {
    dispatch(getAllRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/receive/C_get_all_receiveCash`, config);
      const getallRecievecash = response.data.data;
      dispatch(getAllRecieveCashSuccess(getallRecievecash));
      return getallRecievecash;
    } catch (error) {
      dispatch(getAllRecieveCashFailure(error.message));
    }
  };
};
export const viewRecieveCash = (id) => {
  return async (dispatch) => {
    dispatch(viewRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/receive/C_view_receiveCash/${id}`, config);
      const data = response.data.data;
      dispatch(viewRecieveCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewRecieveCashFailure(error.message));
    }
  };
};
export const updateRecieveCash = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/receive/C_update_receiveCash/${id}`, formData, config);
      const updatRecievecashdata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentrecieveList');
        }
      });
      dispatch(updateRecieveCashSuccess(updatRecievecashdata));
      return updatRecievecashdata;
    } catch (error) {
      dispatch(updateRecieveCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteRecieveCash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteRecieveCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/receive/C_soft_delete_receiveCash/${id}`, config);
      const deleteRecievecash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteRecieveCashSuccess(deleteRecievecash));
      return deleteRecievecash;
    } catch (error) {
      dispatch(deleteRecieveCashFailure(error.message));
      if (error.response && error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.message || error.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ CALAIM+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getallclaimuser = () => {
  return async (dispatch) => {
    dispatch(getAllclaimuserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/get_all_ClaimUser`, config);
      const getallclaimuserlist = response.data.data;
      dispatch(getAllclaimuserSuccess(getallclaimuserlist));
      return getallclaimuserlist;
    } catch (error) {
      dispatch(getAllclaimuserFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const createClaimcash = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/claim/create_claim`, formData, config);
      const Cliamdata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/claimcashlist');
        }
      });
      dispatch(createClaimCashSuccess(Cliamdata));
      return Cliamdata;
    } catch (error) {
      dispatch(createClaimCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewClaimCash = () => {
  return async (dispatch) => {
    dispatch(viewClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_myclaim`, config);
      const data = response.data.data;
      dispatch(viewClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewClaimCashFailure(error.message));
    }
  };
};
export const viewSingleclaimCash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(viewsingleClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_single_claim/${id}`, config);
      const data = response.data.data;
      dispatch(viewsingleClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewsingleClaimCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const updateClaimCash = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/claim/update_claim/${id}`, formData, config);
      const updatClaimcashdata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/claimcashlist');
        }
      });
      dispatch(updateClaimCashSuccess(updatClaimcashdata));
      return updatClaimcashdata;
    } catch (error) {
      dispatch(updateClaimCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteClaimCash = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/claim/delete_claim/${id}`, config);
      const deleteClaimcash = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteClaimCashSuccess(deleteClaimcash));
      return deleteClaimcash;
    } catch (error) {
      dispatch(deleteClaimCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewRecieveClaimCash = () => {
  return async (dispatch) => {
    dispatch(viewRecieveClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_reciveclaim`, config);
      const data = response.data.data;
      dispatch(viewRecieveClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewRecieveClaimCashFailure(error.message));
    }
  };
};
export const IsStatusclaimCash = (id, toUserId, isApproved, navigate) => {
  return async (dispatch) => {
    dispatch(viewsingleClaimCashRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/claim/isapproved_claim/${id}`, { toUserId, isApproved }, config);
      const data = response.data.data;
      dispatch(viewsingleClaimCashSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewsingleClaimCashFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ PAYMENT BANK+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPaymentBank = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createPaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/payment/create_payment_bank`, formData, config);
      const Paymentbank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentbanklist');
        }
      });
      dispatch(createPaymentbankSuccess(Paymentbank));
      return Paymentbank;
    } catch (error) {
      dispatch(createPaymentbankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewSinglePaymentBank = (id, navigate) => {
  return async (dispatch) => {
    dispatch(ViewsinglepaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/view_payment_bank/${id}`, config);
      const data = response.data.data;
      dispatch(ViewsinglepaymentbankSuccess(data));
      return data;
    } catch (error) {
      dispatch(ViewsinglepaymentbankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const updatePaymentbank = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updatepaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/payment/update_payment_bank/${id}`, formData, config);
      const updatpaymentbankdata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentbanklist');
        }
      });
      dispatch(updatepaymentbankSuccess(updatpaymentbankdata));
      return updatpaymentbankdata;
    } catch (error) {
      dispatch(updatepaymentbankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deletePaymentbank = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deletepaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/payment/delete_payment_bank/${id}`, config);
      const deletepaymentbank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deletepaymentbankSuccess(deletepaymentbank));
      return deletepaymentbank;
    } catch (error) {
      dispatch(deletepaymentbankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getAllPaymentbank = () => {
  return async (dispatch) => {
    dispatch(fetchallpaymentbankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/payment/view_all_payment_bank`, config);
      const data = response.data.data;
      dispatch(fetchallpaymentbankSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchallpaymentbankFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ PAYMENT BANK+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createPaymentRecieveBank = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createPaymentRecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/receive/create_receive_bank`, formData, config);
      const Paymentrecievebank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentrecievebanklist');
        }
      });
      dispatch(createPaymentRecievebankSuccess(Paymentrecievebank));
      return Paymentrecievebank;
    } catch (error) {
      dispatch(createPaymentRecievebankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewSinglePaymentRecieveBank = (id, navigate) => {
  return async (dispatch) => {
    dispatch(ViewsinglepaymentrecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/receive/view_receive_bank/${id}`, config);
      const data = response.data.data;
      dispatch(ViewsinglepaymentrecievebankSuccess(data));
      return data;
    } catch (error) {
      dispatch(ViewsinglepaymentrecievebankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const updatePaymentRecievebank = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updatepaymentrecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/receive/update_receive_bank/${id}`, formData, config);
      const updatpaymentbankdata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/paymentrecievebanklist');
        }
      });
      dispatch(updatepaymentrecievebankSuccess(updatpaymentbankdata));
      return updatpaymentbankdata;
    } catch (error) {
      dispatch(updatepaymentrecievebankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deletePaymentRecievebank = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deletepaymentrecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/receive/delete_receive_bank/${id}`, config);
      const deletepaymentbank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deletepaymentrecievebankSuccess(deletepaymentbank));
      return deletepaymentbank;
    } catch (error) {
      dispatch(deletepaymentrecievebankFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getAllPaymentRecievebank = () => {
  return async (dispatch) => {
    dispatch(fetchallpaymentrecievebankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/receive/get_all_receive_bank`, config);
      const data = response.data.data;
      dispatch(fetchallpaymentrecievebankSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchallpaymentrecievebankFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++ PAYMENT BANK+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createBom = (formData, navigate) => {
  return async (dispatch) => {
    dispatch(createBomRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/bom/create_bom`, formData, config);
      const Bom = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/billofmateriallist');
        }
      });
      dispatch(createBomSuccess(Bom));
      return Bom;
    } catch (error) {
      dispatch(createBomFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewSingleBom = (id, navigate) => {
  return async (dispatch) => {
    dispatch(viewBomRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/bom/view_bom/${id}`, config);
      const data = response.data.data;
      dispatch(viewBomSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewBomFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const updateBom = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateBomRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/bom/update_bom/${id}`, formData, config);
      const updateBom = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/billofmateriallist');
        }
      });
      dispatch(updateBomSuccess(updateBom));
      return updateBom;
    } catch (error) {
      dispatch(updateBomFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteBom = (id, navigate) => {
  return async (dispatch) => {
    dispatch(deleteBomRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/bom/delete_bom/${id}`, config);
      const deleteBom = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(deleteBomSuccess(deleteBom));
      return deleteBom;
    } catch (error) {
      dispatch(deleteBomFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getAllBom = () => {
  return async (dispatch) => {
    dispatch(getAllBomRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/bom/view_all_bom`, config);
      const data = response.data.data;
      dispatch(getAllBomSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllBomFailure(error.message));
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Product STOKE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const getAllStoke = (params = {}) => {
  return async (dispatch) => {
    dispatch(getAllStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/view_all_item_stock`, { ...config, params: params });
      const data = response.data.data;
      dispatch(getAllStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllStokeFailure(error.message));
    }
  };
};
export const viewSingleStoke = (id, navigate) => {
  return async (dispatch) => {
    dispatch(viewStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/stock/view_item_stock/${id}`, config);
      const data = response.data.data;
      dispatch(viewStokeSuccess(data));
      return data;
    } catch (error) {
      dispatch(viewStokeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const updateStoke = (id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(updateStokeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/stock/update_item_stock/${id}`, formData, config);
      const updateStoke = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000,
        onClose: () => {
          navigate('/stocklist');
        }
      });
      dispatch(updateStokeSuccess(updateStoke));
      return updateStoke;
    } catch (error) {
      dispatch(updateStokeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Notification ++++++++++++++++++++++++++
export const getAllNotification = (value, navigate) => {
  return async (dispatch) => {
    dispatch(getAllNotificationRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/notification/view_all_notification?isFront=${value}`, config);
      const data = response.data.data;
      dispatch(getAllNotificationSuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllNotificationFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Notification ++++++++++++++++++++++++++
export const getAllEmployeeSalary = () => {
  return async (dispatch) => {
    dispatch(getAllEmployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salary/view_all_salary`, config);
      const data = response.data.data;
      dispatch(getAllEmployeesalarySuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllEmployeesalaryFailure(error.message));
      throw error;
    }
  };
};
export const Employee = () => {
  return async (dispatch) => {
    dispatch(EmployeeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salary/employee`, config);
      const data = response.data.data;
      dispatch(EmployeeSuccess(data));
      return data;
    } catch (error) {
      dispatch(EmployeeFailure(error.message));
      throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createUserBank = (bankdetails, navigate) => {
  return async (dispatch) => {
    dispatch(CreateUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/add_user_bank_account`, bankdetails, config);
      const Userbankdata = response;
      dispatch(CreateUserBankSuccess(Userbankdata));
      return Userbankdata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(CreateUserBankFailure(error.message));
    }
  };
};
export const updateUserBank = (accountId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/edit_user_bank_account/${accountId}`, formData, config);
      const updateUserBankData = response.data.data;
      dispatch(UpdateUserBankSuccess(updateUserBankData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateUserBankData;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(UpdateUserBankFailure(error.message));
    }
  };
};
export const UserBankview = (id) => {
  return async (dispatch) => {
    dispatch(ViewUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_user_bank_account/${id}`, config);
      const data = response.data.data;
      dispatch(ViewUserBankSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewUserBankFailure(error.message));
    }
  };
};
export const deleteUserBank = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/delete_user_bank_account/${id}`, config);
      const deleteUserbank = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteUserBankSuccess(deleteUserbank));
      return deleteUserbank;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
      dispatch(DeleteUserBankFailure(error.message));
    }
  };
};
export const fetchAllUserBank = (userId) => {
  return async (dispatch) => {
    dispatch(fetchAllUserBankRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/view_all_user_bank_account/${userId}`, config);
      const data = response.data.data;
      dispatch(fetchAllUserBankSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllUserBankFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALARY OF EMPLOYEE  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createEmployeesalary = (salaryId, data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateemployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/salary/add_salary_payment/${salaryId}`, data, config);
      const employeesalarydata = response;
      dispatch(CreateemployeesalarySuccess(employeesalarydata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/employeedirectory');
      return employeesalarydata;
    } catch (error) {
      dispatch(CreateemployeesalaryFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const updateEmployeesalary = (salaryPaymentId, formData) => {
  return async (dispatch) => {
    dispatch(UpdateemployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/salary/edit_salary_payment/${salaryPaymentId}`, formData, config);
      const updateemployeesalaryData = response.data.data;
      dispatch(UpdateemployeesalarySuccess(updateemployeesalaryData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateemployeesalaryData;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(UpdateemployeesalaryFailure(error.message));
      throw error;
    }
  };
};
export const deleteEmployeesalary = (salaryPaymentId) => {
  return async (dispatch) => {
    dispatch(DeleteemployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/salary/delete_salary_payment/${salaryPaymentId}`, config);
      const deleteEmployeesalary = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteemployeesalarySuccess(deleteEmployeesalary));
      return deleteEmployeesalary;
    } catch (error) {
      toast.error(error.response.data.message, {
        autoClose: 1000
      });
      dispatch(DeleteemployeesalaryFailure(error.message));
      throw error;
    }
  };
};
export const fetchAllEmployeeSalary = (salaryId) => {
  return async (dispatch) => {
    dispatch(fetchAllemployeesalaryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salary/view_all_salary_payment/${salaryId}`, config);
      const data = response.data.data;
      dispatch(fetchAllemployeesalarySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllemployeesalaryFailure(error.message));
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  EMPLOYEE  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createEmployee = (data, navigate) => {
  return async () => {
    // dispatch(CreateEmployeeRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/employee/create_employee`, data, config);
      const addemployeedata = response;
      // dispatch(CreateEmployeeSuccess(addemployeedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/employeelist');
      return addemployeedata;
    } catch (error) {
      // dispatch(CreateEmployeeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllEmployee = () => {
  return async () => {
    // dispatch(fetchAllEmployeeRequest());
    try {
      let config = createConfig();

      // config.params = {};
      // if (search) config.params.search = search;
      // if (pageNo) config.params.pageNo = pageNo;
      // if (pageSize) config.params.pageSize = pageSize;

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee/view_all_employees`, config);
      const data = response.data.data;
      // dispatch(fetchAllEmployeeSuccess(data));
      return data;
    } catch (error) {
      console.log('error: ', error);
      // dispatch(fetchAllEmployeeFailure(error.message));
    }
  };
};
export const Employeeview = (employeeId) => {
  return async () => {
    // dispatch(ViewsingleEmployeeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee/view_employee/${employeeId}`, config);
      const data = response.data.data;
      // dispatch(ViewsingleEmployeeSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      // dispatch(ViewsingleEmployeeFailure(error.message));
    }
  };
};
export const updateEmployee = (employeeId, formData, navigate) => {
  return async () => {
    // dispatch(UpdateEmployeeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/employee/update_employee/${employeeId}`, formData, config);
      const updateemployeedata = response.data.data;
      // dispatch(UpdateEmployeeSuccess(updateemployeedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/employeelist');
      return updateemployeedata;
    } catch (error) {
      // dispatch(UpdateEmployeeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteEmployee = (employeeId, navigate) => {
  return async () => {
    // dispatch(DeleteEmployeeRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/employee/delete_employee/${employeeId}`, config);
      const deleteemployeedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      // dispatch(DeleteEmployeeSuccess(deleteemployeedata));
      return deleteemployeedata;
    } catch (error) {
      // dispatch(DeleteEmployeeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getAttendances = (employeeId, date) => {
  return async () => {
    try {
      let config = createConfig();

      config.params = {};
      if (employeeId) config.params.employeeId = employeeId;
      if (date) config.params.date = date;

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attendance/view_all_attendances`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      // dispatch(getAttendancesFailure(error.message));
    }
  };
};
export const getLeave = (employeeId, date) => {
  return async () => {
    try {
      let config = createConfig();

      config.params = {};
      if (employeeId) config.params.employeeId = employeeId;
      if (date) config.params.date = date;

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/leave/view_all_leave_requests`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      // dispatch(getAttendancesFailure(error.message));
    }
  };
};
export const fetchBonusConfig = (search) => {
  return async () => {
    try {
      let config = createConfig();

      config.params = {};
      if (search) config.params.search = search;

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/bonusConfiguration/view_all_bonus_configurations`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return [];
    }
  };
};
export const updateBonusConfig = (data) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/bonusConfiguration/update_bonus_configuration`, data, config);
      const updateBonusConfig = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateBonusConfig;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getPenalty = () => {
  return async () => {
    try {
      let config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/systemSettings/view_system_setting_by_name?name=penalty`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return {};
    }
  };
};
export const updatePenalty = (value) => {
  return async () => {
    try {
      let config = createConfig();

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/systemSettings/update_system_setting/1`,
        { field: 'penalty', value },
        config
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return {};
    }
  };
};
export const getDesciplineReward = () => {
  return async () => {
    try {
      let config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/systemSettings/view_system_setting_by_name?name=desciplineReward`,
        config
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return {};
    }
  };
};
export const updateDesciplineReward = (value) => {
  return async () => {
    try {
      let config = createConfig();

      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/systemSettings/update_system_setting/2`,
        { field: 'desciplineReward', value },
        config
      );
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return {};
    }
  };
};
export const updateLeaveStatus = (id, data) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/leave/update_leave_request_status/${id}`, data, config);
      const updateLeaveStatus = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateLeaveStatus;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getpenaltyConfig = () => {
  return async () => {
    try {
      let config = createConfig();

      // config.params = {};
      // if (search) config.params.search = search;

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/penaltyConfiguration/view_all_penalty_configurations`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return {};
    }
  };
};
export const updatepenaltyConfig = (data) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/penaltyConfiguration/update_penalty_configuration`, data, config);
      const updatedpenaltyConfig = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updatedpenaltyConfig;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const createholiday = (data, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/holiday/create_holiday`, data, config);
      const addholidaydata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/holidayconfig');
      return addholidaydata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllholiday = (search) => {
  console.log('search: ', search);
  return async () => {
    try {
      let config = createConfig();

      // config.params = {};
      // if (search) config.params.search = search;

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/holiday/view_all_holidays`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };
};
export const getholiday = (holidayId) => {
  return async () => {
    try {
      let config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/holiday/view_holiday/${holidayId}`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };
};
export const updateholiday = (holidayId, formData, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/holiday/update_holiday/${holidayId}`, formData, config);
      const updateholidaydata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/holidayconfig');
      return updateholidaydata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteholiday = (holidayId, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/holiday/delete_holiday/${holidayId}`, config);
      const deleteholidaydata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return deleteholidaydata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchSalarySummary = (employeeId) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/employee/get_salary_summary/${employeeId}`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };
};
export const deleteAdvance = (data, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/employee/delete_advance`, data, config);
      const addemployeedata = response.data.data;
      return addemployeedata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const addAdvance = (data, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/employee/add_advance`, data, config);
      const addemployeedata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return addemployeedata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  SHIFT  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createShift = (data, navigate) => {
  return async () => {
    // dispatch(CreateShiftRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/shift/create_shift`, data, config);
      const createShiftData = response;
      // dispatch(CreateShiftSuccess(createShiftData));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return createShiftData;
    } catch (error) {
      // dispatch(CreateShiftFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllShift = () => {
  return async () => {
    // dispatch(fetchAllShiftRequest());
    try {
      let config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/shift/view_all_shift`, config);
      const data = response.data.data;
      // dispatch(fetchAllShiftSuccess(data));
      return data;
    } catch (error) {
      console.log('error: ', error);
      // dispatch(fetchAllShiftFailure(error.message));
    }
  };
};
export const fetchShift = (id) => {
  return async () => {
    // dispatch(fetchAllShiftRequest());
    try {
      let config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/shift/view_shift/${id}`, config);
      const data = response.data.data;
      // dispatch(fetchAllShiftSuccess(data));
      return data;
    } catch (error) {
      console.log('error: ', error);
      // dispatch(fetchAllShiftFailure(error.message));
    }
  };
};
export const updateShift = (id, data, navigate) => {
  return async () => {
    // dispatch(updateShiftRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/shift/update_shift/${id}`, data, config);
      const upadteShiftData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      // dispatch(updateShiftSuccess(upadteShiftData));
      return upadteShiftData;
    } catch (error) {
      // dispatch(updateShiftFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const deleteShift = (shiftId, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/shift/delete_shift/${shiftId}`, config);
      const deleteemployeedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return deleteemployeedata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MACHINE CREATE  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createMachine = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/machine/create_machine`, data, config);
      const addMachinedata = response;
      dispatch(CreateMachineSuccess(addMachinedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/machinelist');
      return addMachinedata;
    } catch (error) {
      dispatch(CreateMachineFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllMachine = () => {
  return async (dispatch) => {
    dispatch(fetchAllMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/machine/view_all_machine`, config);
      const data = response.data.data;
      dispatch(fetchAllMachineSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllMachineFailure(error.message));
    }
  };
};
export const Machineview = (machineId) => {
  return async (dispatch) => {
    dispatch(ViewsingleMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/machine/view_one_machine/${machineId}`, config);
      const data = response.data.data;
      dispatch(ViewsingleMachineSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleMachineFailure(error.message));
    }
  };
};
export const updateMachine = (machineId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/machine/update_machine/${machineId}`, formData, config);
      const updatemachinedata = response.data.data;
      dispatch(UpdateMachineSuccess(updatemachinedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/machinelist');
      return updatemachinedata;
    } catch (error) {
      dispatch(UpdateMachineFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteMachine = (machineId, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteMachineRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/machine/delete_machine/${machineId}`, config);
      const deletemachinedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteMachineSuccess(deletemachinedata));
      return deletemachinedata;
    } catch (error) {
      dispatch(DeleteMachineFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++ MAINTENANCE TYPE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createMaintenancType = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateMaintenanceTypeRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/maintenanceType/create_maintenanceType`, data, config);
      const addMaintenancedata = response;
      dispatch(CreateMaintenanceTypeSuccess(addMaintenancedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return addMaintenancedata;
    } catch (error) {
      dispatch(CreateMaintenanceTypeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const updateMaintenanceType = (MaintenanceTypeId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateMaintenanceTypeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/maintenanceType/update_maintenanceType/${MaintenanceTypeId}`,
        formData,
        config
      );
      const updateMaintenanceTypedata = response.data.data;
      dispatch(UpdateMaintenanceTypeSuccess(updateMaintenanceTypedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return updateMaintenanceTypedata;
    } catch (error) {
      dispatch(UpdateMaintenanceTypeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const MaintenanceTypeview = (machineId) => {
  return async (dispatch) => {
    dispatch(ViewsingleMaintenancetypeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/maintenanceType/view_single_maintenanceType/${machineId}`,
        config
      );
      const data = response.data.data;
      dispatch(ViewsingleMaintenancetypeSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleMaintenancetypeFailure(error.message));
    }
  };
};
export const deleteMaintenanceType = (MaintenanceTypeId, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteMaintenanceTypeRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/maintenanceType/delete_maintenanceType/${MaintenanceTypeId}`,
        config
      );
      const deleteMaintenanceTypedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteMaintenanceTypeSuccess(deleteMaintenanceTypedata));
      return deleteMaintenanceTypedata;
    } catch (error) {
      dispatch(DeleteMaintenanceTypeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllMaintenanceType = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllMaintenanceTypeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/maintenanceType/get_all_maintenanceType`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllMaintenanceTypeSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllMaintenanceTypeFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MACHINE CREATE  ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createMachineSchedule = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/schedule/create_machine_schedule`, data, config);
      const addMachinescheduledata = response;
      dispatch(CreateMachineScheduleSuccess(addMachinescheduledata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/machineschedulelist');
      return addMachinescheduledata;
    } catch (error) {
      dispatch(CreateMachineScheduleFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllMachineSchedule = () => {
  return async (dispatch) => {
    dispatch(fetchAllMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/schedule/view_all_machine_schedule`, config);
      const data = response.data.data;
      dispatch(fetchAllMachineScheduleSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllMachineScheduleFailure(error.message));
    }
  };
};
export const MachineScheduleview = (machineId) => {
  return async (dispatch) => {
    dispatch(ViewsingleMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/schedule/view_machine_schedule/${machineId}`, config);
      const data = response.data.data;
      dispatch(ViewsingleMachineScheduleSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleMachineScheduleFailure(error.message));
    }
  };
};
export const updateMachineSchedule = (machineId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/schedule/update_machine_schedule/${machineId}`, formData, config);
      const updatemachineScheduledata = response.data.data;
      dispatch(UpdateMachineScheduleSuccess(updatemachineScheduledata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/machineschedulelist');
      return updatemachineScheduledata;
    } catch (error) {
      dispatch(UpdateMachineScheduleFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteMachineSchedule = (machineId, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteMachineScheduleRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/schedule/delete_machine_schedule/${machineId}`, config);
      const deletemachineScheduledata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteMachineScheduleSuccess(deletemachineScheduledata));
      return deletemachineScheduledata;
    } catch (error) {
      dispatch(DeleteMachineScheduleFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Vendor pdf of bank +++++++++++++++++++++++++++++++++++++
export const SalesCashPDF = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(SalesCashPdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_view_salesInvoice_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) throw new Error('PDF data not found in response');

      let blob;

      // 🧩 Detect if data is Base64 or comma-separated bytes
      if (/^[0-9,\s]+$/.test(base64Data)) {
        // numeric CSV format
        const byteNumbers = base64Data.split(',').map((n) => Number(n.trim()));
        const byteArray = new Uint8Array(byteNumbers);
        blob = new Blob([byteArray], { type: 'application/pdf' });
      } else {
        // proper Base64 format
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        blob = new Blob([bytes], { type: 'application/pdf' });
      }

      // 🧾 Download if requested
      if (shouldDownload) {
        saveAs(blob, `sales_cash_${id}.pdf`);
        toast.success(response.data.message || 'PDF created successfully', {
          icon: (
            <img
              src={require('../assets/images/images.png')}
              width="24px"
              height="24px"
              alt="success"
            />
          ),
          autoClose: 1000,
        });
      }

      dispatch(SalesCashPdfSuccess(base64Data));
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);

      if (error?.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error?.response?.data?.error || 'An error occurred while fetching PDF', {
          autoClose: 1000,
        });
      }

      dispatch(SalesCashPdfFailure(error.message));
    }
  };
};
export const SalesCashImage = (id, navigate) => {
  return async (dispatch) => {
    dispatch(SalesCashImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_view_salesInvoice_jpg/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `sales_cash_${id}.jpeg`);

      dispatch(SalesCashImageSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesCashImageFailure(error.message));
    }
  };
};
export const SalesCashHtml = (id, navigate) => {
  return async (dispatch) => {
    dispatch(SalesCashHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_salesInvoice_html/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `sales_cash_${id}.html`);

      dispatch(SalesCashHtmlSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesCashHtmlFailure(error.message));
    }
  };
};
export const SalesInvoicePDF = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(SalesInvoicePdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/salesInvoice_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'sales_invoice.pdf');
      }
      dispatch(SalesInvoicePdfSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesInvoicePdfFailure(error.message));
    }
  };
};
export const SalesInvoiceImage = (id, navigate) => {
  return async (dispatch) => {
    dispatch(SalesInvoiceImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/view_salesInvoice_jpg/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `sales_invoice_${id}.jpeg`);
      dispatch(SalesInvoiceImageSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesInvoiceImageFailure(error.message));
    }
  };
};
export const SalesInvoiceHtml = (id, navigate) => {
  return async (dispatch) => {
    dispatch(SalesInvoiceHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/salesInvoice_html/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `salesinvoice_${id}.html`);
      dispatch(SalesInvoiceHtmlSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesInvoiceHtmlFailure(error.message));
    }
  };
};
export const SalesInvoiceExcel = (fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(SalesInvoiceExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/salesinvoice/salesInvoice_excel?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `sales_invoice.xlsx`);
          dispatch(SalesInvoiceExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesInvoiceExcelFailure(error.message));
    }
  };
};
export const SalesInvoiceSingleExcel = (id, navigate) => {
  return async (dispatch) => {
    dispatch(SalesInvoiceSingleExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/view_salesInvoice_excel/${id}`, config);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `sales_invoice_${id}.xlsx`);
          dispatch(SalesInvoiceSingleExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesInvoiceSingleExcelFailure(error.message));
    }
  };
};
export const SalesCashSingleExcel = (id, navigate) => {
  return async (dispatch) => {
    dispatch(SalesCashSingleExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/salesinvoice/C_view_salesInvoice_excel/${id}`, config);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `sales_cash_${id}.xlsx`);
          dispatch(SalesCashSingleExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesCashSingleExcelFailure(error.message));
    }
  };
};
export const SalesCashExcel = (fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(SalesCashExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/salesinvoice/C_salesInvoice_excel?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `sales_cash.xlsx`);
          dispatch(SalesCashExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(SalesCashExcelFailure(error.message));
    }
  };
};
export const PurchaseCashPDF = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(PurchaseCashPdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_view_purchaseCash_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'purchase_cash.pdf');
      }
      dispatch(PurchaseCashPdfSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseCashPdfFailure(error.message));
    }
  };
};
export const purchaseInvoiceSingleExcel = (id, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseInvoiceSingleExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/purchaseInvoice_excel/${id}`, config);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `purchase_invoice_${id}.xlsx`);
          dispatch(PurchaseInvoiceSingleExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseInvoiceSingleExcelFailure(error.message));
    }
  };
};
export const PurchaseInvoiceExcel = (fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseInvoiceExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/purchaseinvoice/get_all_purchaseInvoice_excel?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `purchase_invoice.xlsx`);
          dispatch(PurchaseInvoiceExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseInvoiceExcelFailure(error.message));
    }
  };
};
export const PurchaseCashExcel = (fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseCashExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_purchaseinvoice_all_excel?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `purchase_cash.xlsx`);
          dispatch(PurchaseCashExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseCashExcelFailure(error.message));
    }
  };
};
export const purchaseCashSingleExcel = (id, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseCashSingleExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_purchaseInvoice_excel/${id}`, config);

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `purchase_cash_${id}.xlsx`);
          dispatch(PurchaseCashSingleExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseCashSingleExcelFailure(error.message));
    }
  };
};
export const PurchaseInvoicePDF = (id, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(PurchaseInvoicePdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/purchaseInvoice_pdf/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'purchase_invoice.pdf');
      }
      dispatch(PurchaseInvoicePdfSuccess(base64Data));

      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseInvoicePdfFailure(error.message));
    }
  };
};
export const PurchaseInvoiceImage = (id, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseInvoiceImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/purchaseInvoice_jpg/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `purchase_invoice_${id}.jpeg`);
      dispatch(PurchaseInvoiceImageSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseInvoiceImageFailure(error.message));
    }
  };
};
export const PurchaseInvoiceHtml = (id, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseInvoiceHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/purchaseInvoice_html/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `purchaseinvoice_${id}.html`);
      dispatch(PurchaseInvoiceHtmlSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseInvoiceHtmlFailure(error.message));
    }
  };
};
export const PurchaseInvoiceCashImage = (id, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseInvoiceCashImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_view_purchaseCash_jpg/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `purchase_cash_${id}.jpeg`);
      dispatch(PurchaseInvoiceCashImageSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseInvoiceCashImageFailure(error.message));
    }
  };
};
export const PurchaseInvoiceCashHtml = (id, navigate) => {
  return async (dispatch) => {
    dispatch(PurchaseInvoiceCashHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purchaseinvoice/C_purchaseCash_html/${id}`, config);
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `purchase_cash_${id}.html`);
      dispatch(PurchaseInvoiceCashHtmlSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(PurchaseInvoiceCashHtmlFailure(error.message));
    }
  };
};
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DASHBOARD API +++++++++++++++++++++++++++++++++++++
export const TotalSalesDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalSalesRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/total_sales`, config);
      const data = response.data.data;
      dispatch(GetTotalSalesSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalSalesFailure(error.message));
    }
  };
};
export const TotalCashSalesDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalCashSalesRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard/C_total_sales`, config);
      const data = response.data.data;
      dispatch(GetTotalCashSalesSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalCashSalesFailure(error.message));
    }
  };
};
export const TotalPurchaseDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalPurchaseRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Dashboard/total_purchase`, config);
      const data = response.data.data;
      dispatch(GetTotalPurchaseSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalPurchaseFailure(error.message));
    }
  };
};
export const TotalCashPurchaseDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalCashPurchaseRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Dashboard/C_total_purchase`, config);
      const data = response.data.data;
      dispatch(GetTotalCashPurchaseSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalCashPurchaseFailure(error.message));
    }
  };
};
export const TotalReceiveDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalReceiveRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Dashboard/total_receive`, config);
      const data = response.data.data;
      dispatch(GetTotalReceiveSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalReceiveFailure(error.message));
    }
  };
};
export const TotalPaymentDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalPaymentRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Dashboard/total_payment`, config);
      const data = response.data.data;
      dispatch(GetTotalPaymentSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalPaymentFailure(error.message));
    }
  };
};
export const TotalCashReceiveDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalCashReceiveRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Dashboard/C_total_receive`, config);
      const data = response.data.data;
      dispatch(GetTotalCashReceiveSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalCashReceiveFailure(error.message));
    }
  };
};
export const TotalCashPaymentDashboard = () => {
  return async (dispatch) => {
    dispatch(GetTotalCashPaymentRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/Dashboard/C_total_payment`, config);
      const data = response.data.data;
      dispatch(GetTotalCashPaymentSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(GetTotalCashPaymentFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ITEM GROUP +++++++++++++++++++++++++++++++++++++++++++++
export const createItemgroup = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/itemGroup/create_itemGroup`, data, config);
      const additemgroup = response;
      dispatch(CreateItemGroupSuccess(additemgroup));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return additemgroup;
    } catch (error) {
      dispatch(CreateItemGroupFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllItemGroup = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemGroup/get_all_itemgroup`, { ...config, params: params });
      const data = response.data.data;
      dispatch(fetchAllItemGroupSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllItemGroupFailure(error.message));
    }
  };
};
export const ItemGroupview = (id) => {
  return async (dispatch) => {
    dispatch(ViewItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemGroup/view_itemGroup/${id}`, config);
      const data = response.data.data;
      dispatch(ViewItemGroupSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewItemGroupFailure(error.message));
    }
  };
};
export const updateItemgroup = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/itemGroup/update_itemGroup/${id}`, data, config);
      const upadteItemGroupData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(UpdateItemGroupSuccess(upadteItemGroupData));
      return upadteItemGroupData;
    } catch (error) {
      dispatch(UpdateItemGroupFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const DeleteItemgroup = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteItemGroupRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/itemGroup/delete_itemGroup/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteItemGroupSuccess(data));
      return data;
    } catch (error) {
      dispatch(DeleteItemGroupFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ WASTAGE +++++++++++++++++++++++++++++++++++++++++++++
export const createWastage = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateWastageRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/wastage/create_wastage`, data, config);
      const addWastage = response;
      dispatch(CreateWastageSuccess(addWastage));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return addWastage;
    } catch (error) {
      dispatch(CreateWastageFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const fetchAllWastage = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllWastageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wastage/get_all_wastage`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllWastageSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllWastageFailure(error.message));
    }
  };
};
export const Wastageview = (id) => {
  return async (dispatch) => {
    dispatch(ViewWastageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wastage/view_single_wastage/${id}`, config);
      const data = response.data.data;
      dispatch(ViewWastageSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewWastageFailure(error.message));
    }
  };
};
export const updateWastage = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateWastageRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/wastage/update_wastage/${id}`, data, config);
      const upadteWastageData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(UpdateWastageSuccess(upadteWastageData));
      return upadteWastageData;
    } catch (error) {
      dispatch(UpdateWastageFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const DeleteWastage = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteWastageRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/wastage/delete_wastage/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteWastageSuccess(data));
      return data;
    } catch (error) {
      dispatch(DeleteWastageFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURPOSE [CLIAM] +++++++++++++++++++++++++++++++++++++++++++++
export const createPurpose = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreatePurposeRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/purpose/create_purpose`, data, config);
      const addPurpose = response;
      dispatch(CreatePurposeSuccess(addPurpose));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return addPurpose;
    } catch (error) {
      dispatch(CreatePurposeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const fetchAllPurpose = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllPurposeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purpose/get_all_purpose`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllPurposeSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllPurposeFailure(error.message));
    }
  };
};
export const Purposeview = (id) => {
  return async (dispatch) => {
    dispatch(ViewPurposeRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/purpose/view_purpose/${id}`, config);
      const data = response.data.data;
      dispatch(ViewPurposeSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewPurposeFailure(error.message));
    }
  };
};
export const updatePurpose = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(UpdatePurposeRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/purpose/update_purpose/${id}`, data, config);
      const upadtePurposeData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(UpdatePurposeSuccess(upadtePurposeData));
      return upadtePurposeData;
    } catch (error) {
      dispatch(UpdatePurposeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const DeletePurpose = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeletePurposeRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/purpose/delete_purpose/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeletePurposeSuccess(data));
      return data;
    } catch (error) {
      dispatch(DeletePurposeFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ITEM CATEGORY +++++++++++++++++++++++++++++++++++++++++++++
export const createItemcategory = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/itemCategory/create_itemCategory`, data, config);
      const additemgroup = response;
      dispatch(CreateItemCategorySuccess(additemgroup));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return additemgroup;
    } catch (error) {
      dispatch(CreateItemCategoryFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllItemcategory = (groupId) => {
  return async (dispatch) => {
    dispatch(fetchAllItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemCategory/get_all_itemCategoryGroup/${groupId}`, config);
      const data = response.data.data;
      dispatch(fetchAllItemCategorySuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllItemCategoryFailure(error.message));
    }
  };
};
export const ItemCategoryview = (id) => {
  return async (dispatch) => {
    dispatch(ViewItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemCategory/view_itemCategory/${id}`, config);
      const data = response.data.data;
      dispatch(ViewItemCategorySuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewItemCategoryFailure(error.message));
    }
  };
};
export const updateItemcategory = (id, data, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/itemCategory/update_itemCategory/${id}`, data, config);
      const upadteItemCategoryData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(UpdateItemCategorySuccess(upadteItemCategoryData));
      return upadteItemCategoryData;
    } catch (error) {
      dispatch(UpdateItemCategoryFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message);
      }
    }
  };
};
export const DeleteItemcategory = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/itemCategory/delete_itemCategory/${id}`, config);
      const data = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteItemCategorySuccess(data));
      return data;
    } catch (error) {
      dispatch(DeleteItemCategoryFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const getAllcategory = (params = {}) => {
  return async (dispatch) => {
    dispatch(getAllItemCategoryRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/itemCategory/view_all_itemCategory`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(getAllItemCategorySuccess(data));
      return data;
    } catch (error) {
      dispatch(getAllItemCategoryFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SELECT LEDGR GROUP +++++++++++++++++++++++++++++++++++++++++++++

export const fetchAllAccountOptions = (navigate) => {
  return async (dispatch) => {
    dispatch(fetchAllAccountOptionsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/view_all_account_group`, config);
      const data = response.data.data;
      dispatch(fetchAllAccountOptionsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllAccountOptionsFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const createAccounts = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateAccountRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/account/create_account`, data, config);
      const additemgroup = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(CreateAccountSuccess(additemgroup));
      return additemgroup;
    } catch (error) {
      dispatch(CreateAccountFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewAccount = (accountId) => {
  return async (dispatch) => {
    dispatch(ViewAccountRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/view_one_account/${accountId}`, config);
      const data = response.data.data;
      dispatch(ViewAccountSuccess(data));
      return data;
    } catch (error) {
      dispatch(ViewAccountFailure(error.message));
    }
  };
};
export const fetchAllAccounts = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllAccountsRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/view_all_account?{search}=`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllAccountsSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllAccountsFailure(error.message));
    }
  };
};
export const updateAccount = (accountId, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateAccountRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/account/update_account/${accountId}`, formData, config);
      const upadateAccountdata = response.data.data;
      dispatch(UpdateAccountSuccess(upadateAccountdata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/accountlist');
      return upadateAccountdata;
    } catch (error) {
      dispatch(UpdateAccountFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const deleteAccount = (accountId, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteAccountRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/account/delete_account/${accountId}`, config);
      const deleteAccountdata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteAccountSuccess(deleteAccountdata));
      return deleteAccountdata;
    } catch (error) {
      dispatch(DeleteAccountFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllAccountCash = () => {
  return async (dispatch) => {
    dispatch(fetchAllAccountcashRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/C_view_all_account`, config);
      const data = response.data.data;
      dispatch(fetchAllAccountcashSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllAccountcashFailure(error.message));
    }
  };
};
export const getExpenseAccount = () => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/account/C_get_expense_account`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ACCOUNT LEDGER +++++++++++++++++++++++++++++++++++++++++++++
export const deleteCashLedgerSettlement = (payload, navigate) => {
  return async (dispatch) => {
    dispatch(deleteCashLedgerSettlementRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/ledger/C_ledger_settlement`, payload, config); 

      const settlementData = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });

      dispatch(deleteCashLedgerSettlementSuccess(settlementData));
      return settlementData;
    } catch (error) {
      dispatch(deleteCashLedgerSettlementFailure(error.message));
      
      if (error.response && error.response.status === 401) {
        navigate('/');
      } else {
        const errorMessage = error.response?.data?.message || "An error occurred";
        toast.error(errorMessage, {
          autoClose: 1000
        });
      }
    }
  };
};

export const getallAccountledger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllAccountLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/account_ledger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallAccountledgerlist = response.data.data;
      dispatch(getAllAccountLedgerSuccess(getallAccountledgerlist));
      return getallAccountledgerlist;
    } catch (error) {
      dispatch(getAllAccountLedgerFailure(error.message));
    }
  };
};
export const AccountledgerImage = (id, formDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(AccountImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/account_ledger_jpg/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `Account_${id}.jpeg`);
      dispatch(AccountImageSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching image:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(AccountImageFailure(error.message));
    }
  };
};
export const AccountledgerHtml = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(AccountHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/account_ledger_html/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `Account_${id}.html`);
      dispatch(AccountHtmlSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching html:', error);
      toast.error(error.response?.data?.error || 'An error occurred', {
        autoClose: 1000
      });
      dispatch(AccountHtmlFailure(error.message));
    }
  };
};
export const AccountCashledgerImage = (id, formDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(AccountCashImageRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_account_ledger_jpg/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'image/jpeg' });
      saveAs(blob, `Account_Cash_${id}.jpeg`);
      dispatch(AccountCashImageSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching image:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(AccountCashImageFailure(error.message));
    }
  };
};
export const AccountCashledgerHtml = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(AccountCashHtmlRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_account_ledger_html/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      const binaryString = atob(base64Data);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const blob = new Blob([bytes], { type: 'text/html' });
      saveAs(blob, `Account_Cash${id}.html`);
      dispatch(AccountCashHtmlSuccess(base64Data));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return base64Data;
    } catch (error) {
      console.error('Error fetching html:', error);
      toast.error(error.response?.data?.error || 'An error occurred', {
        autoClose: 1000
      });
      dispatch(AccountCashHtmlFailure(error.message));
    }
  };
};
export const AccountExcel = (id, fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(AccountExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/account_ledger_excel/${id}?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `Account_ledger_${id}.xlsx`);
          dispatch(AccountExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(AccountExcelFailure(error.message));
    }
  };
};
export const AccountCashExcel = (id, fromDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(AccountCashExcelRequest());
    try {
      const config = createConfig();

      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_account_ledger_excel/${id}?formDate=${fromDate}&toDate=${toDate}`,
        config
      );

      const contentType = response.headers['content-type'];
      if (contentType && contentType.includes('application/json')) {
        const jsonResponse = response.data;
        if (jsonResponse.status === 'true' || jsonResponse.status === true) {
          const base64Data = jsonResponse.data;

          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          });

          saveAs(blob, `Account_ledger_Cash_${id}.xlsx`);
          dispatch(AccountCashExcelSuccess());
          toast.success(response.data.message, {
            icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
            autoClose: 1000
          });
        } else {
          toast.error('Failed to generate Excel. Please try again.');
        }
      } else {
        toast.error('Unexpected response format. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading Excel:', error);
      if (error.response?.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(AccountCashExcelFailure(error.message));
    }
  };
};
export const AccountPDF = (id, formDate, toDate, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(AccountPdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/account_ledger_pdf/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'account_ledger.pdf');
      }
      dispatch(AccountPdfSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(AccountPdfFailure(error.message));
    }
  };
};
export const getallCashAccountledger = (id, formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllCashAccountLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_account_ledger/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallCashAccountledgerlist = response.data.data;
      dispatch(getAllCashAccountLedgerSuccess(getallCashAccountledgerlist));
      return getallCashAccountledgerlist;
    } catch (error) {
      dispatch(getAllCashAccountLedgerFailure(error.message));
    }
  };
};
export const AccountCashPDF = (id, formDate, toDate, navigate, shouldDownload = true) => {
  return async (dispatch) => {
    dispatch(AccountCashPdfRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_account_ledger_pdf/${id}?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const base64Data = response.data.data;
      if (!base64Data) {
        throw new Error('Base64 data is undefined');
      }
      if (shouldDownload) {
        const binaryString = atob(base64Data);
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        saveAs(blob, 'cash_account_ledger.pdf');
      }
      dispatch(AccountCashPdfSuccess(base64Data));
      if (shouldDownload) {
        toast.success(response.data.message, {
          icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
          autoClose: 1000
        });
      }
      return base64Data;
    } catch (error) {
      console.error('Error fetching PDF:', error);
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response?.data?.error || 'An error occurred', {
          autoClose: 1000
        });
      }
      dispatch(AccountCashPdfFailure(error.message));
    }
  };
};
export const getallDaybookledger = (formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllDaybookLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/ledger/daybook/?formDate=${formDate}&toDate=${toDate}`, config);
      const getallDaybookledgerlist = response.data.data;
      dispatch(getAllDaybookLedgerSuccess(getallDaybookledgerlist));
      return getallDaybookledgerlist;
    } catch (error) {
      dispatch(getAllDaybookLedgerFailure(error.message));
    }
  };
};
export const getallCashDaybookledger = (formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllCashDaybookLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/ledger/C_daybook/?formDate=${formDate}&toDate=${toDate}`, config);
      const getallCashDaybookledgerlist = response.data.data;
      dispatch(getAllCashDaybookLedgerSuccess(getallCashDaybookledgerlist));
      return getallCashDaybookledgerlist;
    } catch (error) {
      dispatch(getAllCashDaybookLedgerFailure(error.message));
    }
  };
};
export const getallCashbookledger = (formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllCashbookLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_cashbook/?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallCashbookledgerlist = response.data.data;
      dispatch(getAllCashbookLedgerSuccess(getallCashbookledgerlist));
      return getallCashbookledgerlist;
    } catch (error) {
      dispatch(getAllCashbookLedgerFailure(error.message));
    }
  };
};
export const getallPassbookledger = (formDate, toDate) => {
  return async (dispatch) => {
    dispatch(getAllPassbookLedgerRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_passbook/?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getallPassbookledgerlist = response.data.data;
      dispatch(getAllPassbookLedgerSuccess(getallPassbookledgerlist));
      return getallPassbookledgerlist;
    } catch (error) {
      dispatch(getAllPassbookLedgerFailure(error.message));
    }
  };
};
export const getWallet = (id, navigate) => {
  return async (dispatch) => {
    dispatch(getWalletRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_all_wallet/${id}`, config);
      const getWalletlist = response.data.data;
      dispatch(getWalletSuccess(getWalletlist));
      return getWalletlist;
    } catch (error) {
      dispatch(getWalletFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const getWalletcompanybalance = (navigate) => {
  return async (dispatch) => {
    dispatch(getWalletBalanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/claim/view_balance`, config);
      const getWalletBalancelist = response.data.data;
      dispatch(getWalletBalanceSuccess(getWalletBalancelist));
      return getWalletBalancelist;
    } catch (error) {
      dispatch(getWalletBalanceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const getWalletnormaluser = (formDate, toDate, navigate) => {
  return async (dispatch) => {
    dispatch(getWalletuserRequest());
    try {
      const config = createConfig();
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/ledger/C_wallet_ledger/?formDate=${formDate}&toDate=${toDate}`,
        config
      );
      const getWalletlist = response.data.data;
      dispatch(getWalletuserSuccess(getWalletlist));
      return getWalletlist;
    } catch (error) {
      dispatch(getWalletuserFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      }
    }
  };
};
export const ApproveWallet = (id) => {
  return async (dispatch) => {
    dispatch(approveWalletRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/wallet_approve/${id}`, config);
      const approveWalletlist = response.data.data;
      dispatch(approveWalletSuccess(approveWalletlist));
      return approveWalletlist;
    } catch (error) {
      dispatch(approveWalletFailure(error.message));
      throw error;
    }
  };
};
// ++++++++++++++++++++++++++++++++++++++++++++++++++++ ADD MAINTENANCE +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
export const createAddMaintenance = (data, navigate) => {
  return async (dispatch) => {
    dispatch(CreateAddMaintenanceRequest());
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/maintenance/create_maintenance`, data, config);
      const addMaintenancedata = response;
      dispatch(CreateAddMaintenanceSuccess(addMaintenancedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/maintenschedulelist');
      return addMaintenancedata;
    } catch (error) {
      dispatch(CreateAddMaintenanceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const updateAddMaintenance = (Id, formData, navigate) => {
  return async (dispatch) => {
    dispatch(UpdateAddMaintenanceRequest());
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/maintenance/update_maintenance/${Id}`, formData, config);
      const updateAddMaintenancedata = response.data.data;
      dispatch(UpdateAddMaintenanceSuccess(updateAddMaintenancedata));
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/maintenschedulelist');
      return updateAddMaintenancedata;
    } catch (error) {
      dispatch(UpdateAddMaintenanceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const viewAddMaintenance = (id) => {
  return async (dispatch) => {
    dispatch(ViewsingleAddMaintenanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/maintenance/view_one_maintenance/${id}`, config);
      const data = response.data.data;
      dispatch(ViewsingleAddMaintenanceSuccess(data));
      return data;
    } catch (error) {
      toast.error(error.response.data.error);
      dispatch(ViewsingleAddMaintenanceFailure(error.message));
    }
  };
};
export const deleteAddMaintenance = (id, navigate) => {
  return async (dispatch) => {
    dispatch(DeleteAddMaintenanceRequest());
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/maintenance/delete_maintenance/${id}`, config);
      const deleteAddMaintenancedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      dispatch(DeleteAddMaintenanceSuccess(deleteAddMaintenancedata));
      return deleteAddMaintenancedata;
    } catch (error) {
      dispatch(DeleteAddMaintenanceFailure(error.message));
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
export const fetchAllAddMaintenance = (params = {}) => {
  return async (dispatch) => {
    dispatch(fetchAllAddMaintenanceRequest());
    try {
      const config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/maintenance/view_all_maintenance`, {
        ...config,
        params: params
      });
      const data = response.data.data;
      dispatch(fetchAllAddMaintenanceSuccess(data));
      return data;
    } catch (error) {
      dispatch(fetchAllAddMaintenanceFailure(error.message));
    }
  };
};

// ++++++++++++++++++++++++++++++++++++++++++++ Attendees Type Functions +++++++++++++++++++++++++++++++++++++++++++++++++++
export const createAttendeesType = (data, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/attendanceType`, data, config);
      const addAttendeesTypedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/attendeestypeconfig');
      return addAttendeesTypedata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

export const fetchAllAttendeesType = () => {
  return async () => {
    try {
      let config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attendanceType`, config);
      const data = response.data.data.attendanceTypes;
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };
};

export const getAttendeesType = (attendeesTypeId) => {
  return async () => {
    try {
      let config = createConfig();
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attendanceType/${attendeesTypeId}`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };
};
export const getEmployeeDetails = (employeeId, month, year) => {
  return async () => {
    try {
      let config = createConfig();
      // Ensure month is two digits
      const paddedMonth = month ? month.toString().padStart(2, '0') : '';
      const queryParams = [];
      if (paddedMonth) queryParams.push(`month=${paddedMonth}`);
      if (year) queryParams.push(`year=${year}`);
      if (employeeId) queryParams.push(`employeeId=${employeeId}`);
      const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/attendance/full_month_attendance${queryString}`, config);
      const data = response.data.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
    }
  };
};

export const updateAttendeesType = (attendeesTypeId, formData, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/attendanceType/${attendeesTypeId}`, formData, config);
      const updateAttendeesTypedata = response.data.data;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      navigate('/attendeestypeconfig');
      return updateAttendeesTypedata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};

export const deleteAttendeesType = (attendeesTypeId, navigate) => {
  return async () => {
    try {
      const config = createConfig();
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/attendanceType/${attendeesTypeId}`, config);
      const deleteAttendeesTypedata = response;
      toast.success(response.data.message, {
        icon: <img src={require('../assets/images/images.png')} width={'24px'} height={'24px'} alt="success" />,
        autoClose: 1000
      });
      return deleteAttendeesTypedata;
    } catch (error) {
      if (error.response.status === 401) {
        navigate('/');
      } else {
        toast.error(error.response.data.message, {
          autoClose: 1000
        });
      }
    }
  };
};
