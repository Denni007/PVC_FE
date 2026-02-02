import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getallPermissions } from 'store/thunk';

const useCan = () => {
  const dispatch = useDispatch();
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await dispatch(getallPermissions());
        setPermissions(data);
      } catch (error) {
        console.error('permission', error);
      }
    };
    fetchData();
  }, [dispatch]);

  const checkPermission = (resource, permissionName) => {
    const token = sessionStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role;
    const rolePermissions = permissions?.find((role) => role.role === userRole);
    if (rolePermissions) {
      const permission = rolePermissions?.permissions?.find((res) => res.resource === resource);
      if (permission?.permissions?.length) {
        const is = permission.permissions.find((perm) => perm.permission === permissionName);
        if (is) {
          return is?.permissionValue;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
    return true;
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++ PROFORMA INVOICE
  const canCreateProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'create_ProFormaInvoice');
  };
  const canUpdateProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'update_ProFormaInvoice');
  };
  const canDeProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'delete_ProFormaInvoice');
  };
  const canViewProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'view_single_ProFormaInvoice');
  };
  const canViewAllProformainvoiceQuotation = () => {
    return checkPermission('ProFormaInvoice', 'view_all_ProFormaInvoice');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ LOGIN
  const canUserUpdate = () => {
    return checkPermission('Login', 'update_user');
  };
  const canUserView = () => {
    return checkPermission('Login', 'view_user');
  };
  const canUserLogout = () => {
    return checkPermission('Login', 'user_logout');
  };
  const canUserResetpassword = () => {
    return checkPermission('Login', 'reset_password');
  };
  const canUserCreate = () => {
    return checkPermission('Login', 'create_user');
  };
  const canUserDelete = () => {
    return checkPermission('Login', 'remove_company');
  };
  const canUserViewAll = () => {
    return checkPermission('Login', 'view_all_user');
  };
  const canUserViewAllCompany = () => {
    return checkPermission('Login', 'view_all_JoinComapny');
  };
  const canUserCreateBank = () => {
    return checkPermission('Login', 'add_user_bank_account');
  };
  const canUserUpdateBank = () => {
    return checkPermission('Login', 'edit_user_bank_account');
  };
  const canUserViewBank = () => {
    return checkPermission('Login', 'view_user_bank_account');
  };
  const canUserViewAllBank = () => {
    return checkPermission('Login', 'view_all_user_bank_account');
  };
  const canUserDeleteBank = () => {
    return checkPermission('Login', 'delete_user_bank_account');
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++ DELIVERY CHALLAN
  const canCreateDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'create_deliverychallan');
  };
  const canUpdateDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'update_deliverychallan');
  };
  const canDeleteDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'delete_deliverychallan');
  };
  const canViewDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'view_single_deliverychallan');
  };
  const canViewAllDeliverychallan = () => {
    return checkPermission('Delivery Challan', 'view_all_deliverychallan');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALES INVOICE
  const canCreateSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'create_salesinvoice');
  };
  const canUpdateSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'update_salesInvoice');
  };
  const canDeleteSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'delete_salesInvoice');
  };
  const canDeleteSalesinvoiceItem = () => {
    return checkPermission('Sales Invoice', 'delete_salesInvoiceItem');
  };
  const canViewalesinvoice = () => {
    return checkPermission('Sales Invoice', 'view_single_salesInvoice');
  };
  const canViewAllSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'view_all_salesInvoice');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALES RETURN
  const canCreateSalesinvoiceReturn = () => {
    return checkPermission('Sales Return', 'create_salesReturn');
  };
  const canViewAllSalesinvoiceReturn = () => {
    return checkPermission('Sales Return', 'view_all_salesReturn');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++ EXPENSE
  const canCreateExpense = () => {
    return checkPermission('Expense', 'create_expense');
  };
  const canUpdateExpense = () => {
    return checkPermission('Expense', 'update_expense');
  };
  const canDeleteExpense = () => {
    return checkPermission('Expense', 'delete_expense');
  };
  const canDeleteExpenseItem = () => {
    return checkPermission('Expense', 'delete_expenseItem');
  };
  const canViewExpense = () => {
    return checkPermission('Expense', 'view_expense');
  };
  const canViewAllExpense = () => {
    return checkPermission('Expense', 'view_all_expense');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE ORDER
  const canCreatePurchaseorder = () => {
    return checkPermission('Purchase Order', 'create_purchase');
  };
  const canUpdatePurchaseorder = () => {
    return checkPermission('Purchase Order', 'update_purchase');
  };
  const canDeletePurchaseorder = () => {
    return checkPermission('Purchase Order', 'delete_purchase');
  };
  const canDeletePurchaseorderItem = () => {
    return checkPermission('Purchase Order', 'delete_purchaseitem');
  };
  const canViewPurchaseorder = () => {
    return checkPermission('Purchase Order', 'view_single_purchase');
  };
  const canViewAllPurchaseorder = () => {
    return checkPermission('Purchase Order', 'view_all_purchase');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT
  const canCreatePayment = () => {
    return checkPermission('Payment', 'create_payment');
  };
  const canUpdatePayment = () => {
    return checkPermission('Payment', 'update_payment');
  };
  const canDeletePayment = () => {
    return checkPermission('Payment', 'delete_payment');
  };
  const canViewPayment = () => {
    return checkPermission('Payment', 'view_single_payment');
  };
  const canViewAllPayment = () => {
    return checkPermission('Payment', 'view_all_payment');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CUSTOMER
  const canViewAllCustomer = () => {
    return checkPermission('Customer', 'view_all_customer');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ VENDOR
  const canCreateVendor = () => {
    return checkPermission('Vendor', 'create_vendor');
  };
  const canUpdateVendor = () => {
    return checkPermission('Vendor', 'update_vendor');
  };
  const canDeleteVendor = () => {
    return checkPermission('Vendor', 'delete_vandor');
  };
  const canViewVendor = () => {
    return checkPermission('Vendor', 'view_vendor');
  };
  const canViewAllVendor = () => {
    return checkPermission('Vendor', 'view_all_vandor');
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PRODUCT
  const canCreateItem = () => {
    return checkPermission('Items', 'create_item');
  };
  const canUpdateItem = () => {
    return checkPermission('Items', 'update_item');
  };
  const canDeleteItem = () => {
    return checkPermission('Items', 'delete_item');
  };
  const canViewItem = () => {
    return checkPermission('Items', 'view_single_item');
  };
  const canViewAllItem = () => {
    return checkPermission('Items', 'view_all_item');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ITEM GROUP
  const canCreateItemgroup = () => {
    return checkPermission('Item Group', 'create_itemGroup');
  };
  const canUpdateItemgroup = () => {
    return checkPermission('Item Group', 'update_itemGroup');
  };
  const canViewItemgroup = () => {
    return checkPermission('Item Group', 'view_single_itemgroup');
  };
  const canViewAllItemgroup = () => {
    return checkPermission('Item Group', 'view_all_itemgroup');
  };
  const canDeleteItemgroup = () => {
    return checkPermission('Item Group', 'delete_itemGroup');
  };
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE BILL
  const canCreatePurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'create_purchase_Invoice');
  };
  const canUpdatePurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'update_purchase_Invoice');
  };
  const canDeletePurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'delete_purchase_Invoice');
  };
  const canViewPurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'view_single_purchase_Invoice');
  };
  const canViewAllPurchaseinvoice = () => {
    return checkPermission('Purchase Invoice', 'view_all_purchase_Invoice');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ RECEIPT
  const canCreateReceipt = () => {
    return checkPermission('Receipt', 'create_receipt');
  };
  const canUpdateReceipt = () => {
    return checkPermission('Receipt', 'update_receipt');
  };
  const canDeleteReceipt = () => {
    return checkPermission('Receipt', 'delete_receipt');
  };
  const canViewReceipt = () => {
    return checkPermission('Receipt', 'view_single_receipt');
  };
  const canViewAllReceipt = () => {
    return checkPermission('Receipt', 'view_all_receipt');
  };

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BANK ACCOUNT
  const canCreateBankaccount = () => {
    return checkPermission('Bank Account', 'create_bankaccount');
  };
  const canUpdateBankaccount = () => {
    return checkPermission('Bank Account', 'update_bankaccount');
  };
  const canDeleteBankaccount = () => {
    return checkPermission('Bank Account', 'delete_bankaccount');
  };
  const canViewBankaccount = () => {
    return checkPermission('Bank Account', 'view_single_bankaccount');
  };
  const canViwAllBankaccount = () => {
    return checkPermission('Bank Account', 'view_all_bankaccount');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEBIT NOTE

  const canCreateDebitnote = () => {
    return checkPermission('Debit Note', 'create_debitNote');
  };
  const canUpdateDebitnote = () => {
    return checkPermission('Debit Note', 'update_debitNote');
  };
  const canDeleteDebitnote = () => {
    return checkPermission('Debit Note', 'delete_debitNote');
  };
  const canViewDebitnote = () => {
    return checkPermission('Debit Note', 'view_single_debitNote');
  };
  const canViwAllDebitnote = () => {
    return checkPermission('Debit Note', 'view_all_debitNote');
  };
  const canDebitnotepdf = () => {
    return checkPermission('Debit Note', 'debitNote_pdf');
  };
  const canDebitnoteImage = () => {
    return checkPermission('Debit Note', 'debitNote_jpg');
  };
  const canDebitnoteHtml = () => {
    return checkPermission('Debit Note', 'debitNote_html');
  };
  const canDebitnoteExcel = () => {
    return checkPermission('Debit Note', 'debitNote_single_excel');
  };
  const canAllDebitnoteExcel = () => {
    return checkPermission('Debit Note', 'debitNote_excel');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ DEBIT NOTE CASH

  const canCreateDebitnotecash = () => {
    return checkPermission('Debit Note Cash', 'create_debitNote');
  };
  const canUpdateDebitnotecash = () => {
    return checkPermission('Debit Note Cash', 'update_debitNote');
  };
  const canDeleteDebitnotecash = () => {
    return checkPermission('Debit Note Cash', 'delete_debitNote');
  };
  const canViewDebitnotecash = () => {
    return checkPermission('Debit Note Cash', 'view_single_debitNote');
  };
  const canViwAllDebitnotecash = () => {
    return checkPermission('Debit Note Cash', 'view_all_debitNote');
  };
  const canDebitnotecashpdf = () => {
    return checkPermission('Debit Note Cash', 'debitNote_pdf');
  };
  const canDebitnotecashImage = () => {
    return checkPermission('Debit Note Cash', 'debitNote_jpg');
  };
  const canDebitnotecashHtml = () => {
    return checkPermission('Debit Note Cash', 'debitNote_html');
  };
  const canDebitnotecashExcel = () => {
    return checkPermission('Debit Note Cash', 'debitNote_single_excel');
  };
  const canDebitnoteAllCashExcel = () => {
    return checkPermission('Debit Note Cash', 'debitNote_excel');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CREDIT NOTE

  const canCreateCreditnote = () => {
    return checkPermission('Credit Note', 'create_creditNote');
  };
  const canUpdateCreditnote = () => {
    return checkPermission('Credit Note', 'update_creditNote');
  };
  const canDeleteCreditnote = () => {
    return checkPermission('Credit Note', 'delete_creditNote');
  };
  const canViewCreditnote = () => {
    return checkPermission('Credit Note', 'view_single_creditNote');
  };
  const canViwAllCreditnote = () => {
    return checkPermission('Credit Note', 'view_all_creditNote');
  };
  const canCreditnotepdf = () => {
    return checkPermission('Credit Note', 'creditNote_pdf');
  };
  const canCreditnoteImage = () => {
    return checkPermission('Credit Note', 'creditNote_jpg');
  };
  const canCreditnoteHtml = () => {
    return checkPermission('Credit Note', 'creditNote_html');
  };
  const canCreditnotesingleexcel = () => {
    return checkPermission('Credit Note', 'creditNote_single_excel');
  };
  const canCreditnoteexcel = () => {
    return checkPermission('Credit Note', 'creditNote_excel');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ CREDIT NOTE CASH

  const canCreateCreditnotecash = () => {
    return checkPermission('Credit Note Cash', 'create_creditNote');
  };
  const canUpdateCreditnotecash = () => {
    return checkPermission('Credit Note Cash', 'update_creditNote');
  };
  const canDeleteCreditnotecash = () => {
    return checkPermission('Credit Note Cash', 'delete_creditNote');
  };
  const canViewCreditnotecash = () => {
    return checkPermission('Credit Note Cash', 'view_single_creditNote');
  };
  const canViwAllCreditnotecash = () => {
    return checkPermission('Credit Note Cash', 'view_all_creditNote');
  };
  const canCreditnotecashpdf = () => {
    return checkPermission('Credit Note Cash', 'creditNote_pdf');
  };
  const canCreditnotecashImage = () => {
    return checkPermission('Credit Note Cash', 'creditNote_jpg');
  };
  const canCreditnotecashHtml = () => {
    return checkPermission('Credit Note', 'creditNote_html');
  };
  const canCreditnotecashsingleexcel = () => {
    return checkPermission('Credit Note Cash', 'creditNote_single_excel');
  };
  const canCreditnotecashexcel = () => {
    return checkPermission('Credit Note Cash', 'creditNote_excel');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SALES CASH

  const canCreateSalescash = () => {
    return checkPermission('Sales Cash', 'create_sales_cash');
  };
  const canUpdateSalescash = () => {
    return checkPermission('Sales Cash', 'update_sales_cash');
  };
  const canDeleteSalescash = () => {
    return checkPermission('Sales Cash', 'delete_sales_cash');
  };
  const canViewSalescash = () => {
    return checkPermission('Sales Cash', 'view_sales_cash');
  };
  const canViwAllSalescash = () => {
    return checkPermission('Sales Cash', 'view_all_sales_cash');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ ORDER PROCESSING

  const canCreateOrderProcessing = () => {
    return checkPermission('Order Processing', 'create_order_processing');
  };
  const canUpdateOrderProcessing = () => {
    return checkPermission('Order Processing', 'update_order_processing');
  };
  const canDeleteOrderProcessing = () => {
    return checkPermission('Order Processing', 'delete_order_processing');
  };
  const canViewOrderProcessing = () => {
    return checkPermission('Order Processing', 'view_order_processing');
  };
  const canViwAllOrderProcessing = () => {
    return checkPermission('Order Processing', 'view_all_order_processing');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PURCHASE BILL CASH

  const canCreatePurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'create_purchase_cash');
  };
  const canUpdatePurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'update_purchase_cash');
  };
  const canDeletePurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'delete_purchase_cash');
  };
  const canViewPurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'view_purchase_cash');
  };
  const canViwAllPurchasebillcash = () => {
    return checkPermission('Purchase Cash', 'view_all_purchase_cash');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT CASH

  const canCreatePaymentcash = () => {
    return checkPermission('Payment Cash', 'create_payment');
  };
  const canUpdatePaymentcash = () => {
    return checkPermission('Payment Cash', 'update_payment');
  };
  const canDeletePaymentcash = () => {
    return checkPermission('Payment Cash', 'delete_payment');
  };
  const canViewPaymentcash = () => {
    return checkPermission('Payment Cash', 'view_payment');
  };
  const canViwAllPaymentcash = () => {
    return checkPermission('Payment Cash', 'view_all_payment');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT RECIEVE CASH

  const canCreatePaymentrecievecash = () => {
    return checkPermission('Receipt Cash', 'create_receipt');
  };
  const canUpdatePaymentrecievecash = () => {
    return checkPermission('Receipt Cash', 'update_receipt');
  };
  const canDeletePaymentrecievecash = () => {
    return checkPermission('Receipt Cash', 'delete_receipt');
  };
  const canViewPaymentrecievecash = () => {
    return checkPermission('Receipt Cash', 'view_receipt');
  };
  const canViwAllPaymentrecievecash = () => {
    return checkPermission('Receipt Cash', 'view_all_receipt');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT BANK

  const canCreatePaymentBank = () => {
    return checkPermission('Payment', 'create_payment');
  };
  const canUpdatePaymentBank = () => {
    return checkPermission('Payment', 'update_payment');
  };
  const canDeletePaymentBank = () => {
    return checkPermission('Payment', 'delete_payment');
  };
  const canViewPaymentBank = () => {
    return checkPermission('Payment', 'view_payment');
  };
  const canViwAllPaymentBank = () => {
    return checkPermission('Payment', 'view_all_payment');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT Recieve BANK

  const canCreatePaymentRecieveBank = () => {
    return checkPermission('Receipt', 'create_receipt');
  };
  const canUpdatePaymentRecieveBank = () => {
    return checkPermission('Receipt', 'update_receipt');
  };
  const canDeletePaymentRecieveBank = () => {
    return checkPermission('Receipt', 'delete_receipt');
  };
  const canViewPaymentRecieveBank = () => {
    return checkPermission('Receipt', 'view_receipt');
  };
  const canViwAllPaymentRecieveBank = () => {
    return checkPermission('Receipt', 'get_all_receipt');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY

  const canCreateCompany = () => {
    return checkPermission('Company', 'create_company');
  };
  const canUpdateCompany = () => {
    return checkPermission('Company', 'update_company');
  };
  const canDeleteCompany = () => {
    return checkPermission('Company', 'delete_company');
  };
  const canViewCompany = () => {
    return checkPermission('Company', 'view_single_company');
  };
  const canViwAllCompany = () => {
    return checkPermission('Company', 'view_all_company');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ COMPANY BANK

  const canCreateCompanyBank = () => {
    return checkPermission('Company Bank Details', 'create_company_bankDetails');
  };
  const canUpdateCompanyBank = () => {
    return checkPermission('Company Bank Details', 'update_company_bankDetails');
  };
  const canDeleteCompanyBank = () => {
    return checkPermission('Company Bank Details', 'delete_company_bankDetails');
  };
  const canViwAllCompanyBank = () => {
    return checkPermission('Company Bank Details', 'view_all_company_bankDetails');
  };
  const canViewCompanyBankLedger = () => {
    return checkPermission('Company Bank Details', 'view_single_bankLedger');
  };
  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SELF EXPENSE
  const canCreateSelfExpense = () => {
    return checkPermission('Self Expense', 'create_selfExpense');
  };
  const canUpdateSelfExpense = () => {
    return checkPermission('Self Expense', 'update_selfExpense');
  };
  const canDeleteSelfExpense = () => {
    return checkPermission('Self Expense', 'delete_selfExpense');
  };
  const canViewSelfExpense = () => {
    return checkPermission('Self Expense', 'view_selfExpense');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ PAYMENT RECIEVE CASH

  const canCreateClaimcash = () => {
    return checkPermission('Claim Cash', 'create_claim');
  };
  const canUpdateClaimcash = () => {
    return checkPermission('Claim Cash', 'update_claim');
  };
  const canDeleteClaimcash = () => {
    return checkPermission('Claim Cash', 'delete_claim');
  };
  const canViewClaimcash = () => {
    return checkPermission('Claim Cash', 'view_single_claim');
  };
  const canViwAllClaimcash = () => {
    return checkPermission('Claim Cash', 'view_myclaim');
  };
  const canViwAllRecieveClaimcash = () => {
    return checkPermission('Claim Cash', 'view_reciveclaim');
  };
  const canIsapproveClaimcash = () => {
    return checkPermission('Claim Cash', 'isapproved_claim');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ BILL OF MATERIAL

  const canCreateBom = () => {
    return checkPermission('Production', 'create_production');
  };
  const canUpdateBom = () => {
    return checkPermission('Production', 'update_production');
  };
  const canDeleteBom = () => {
    return checkPermission('Production', 'delete_production');
  };
  const canSettleDeleteBom = () => {
    return checkPermission('Production', 'delete_production');
  };
  const canViewBom = () => {
    return checkPermission('Production', 'view_production');
  };
  const canViwAllBom = () => {
    return checkPermission('Production', 'view_all_production');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ STOKE

  const canViewAllStoke = () => {
    return checkPermission('Stock', 'view_all_item_stock');
  };
  const canViewStoke = () => {
    return checkPermission('Stock', 'view_item_stock');
  };
  const canUpdateStoke = () => {
    return checkPermission('Stock', 'update_item_stock');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Notification
  const canViewAllNotification = () => {
    return checkPermission('Notification', 'view_all_notification');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ EMPLOYEE SALARY

  // const canCreateEmployeeSalary = () => {
  //   return checkPermission('Salary', 'add_salary_payment');
  // };
  // const canUpdateEmployeeSalary = () => {
  //   return checkPermission('Salary', 'edit_salary_payment');
  // };
  // const canDeleteEmployeeSalary = () => {
  //   return checkPermission('Salary', 'delete_salary_payment');
  // };
  // const canViewAllEmployeeSalary = () => {
  //   return checkPermission('Salary', 'view_all_salary');
  // };
  // const canViwAllEmployeeSalary = () => {
  //   return checkPermission('Salary', 'view_all_salary_payment');
  // };
  // const canEmployee = () => {
  //   return checkPermission('Salary', 'employee');
  // };

  const canCreateEmployee = () => {
    return checkPermission('Employee', 'create_employee');
  };

  const canViewEmployee = () => {
    return checkPermission('Employee', 'view_one_employee');
  };

  const canUpdateEmployee = () => {
    return checkPermission('Employee', 'update_employee');
  };

  const canDeleteEmployee = () => {
    return checkPermission('Employee', 'delete_employee');
  };

  const canCreateShift = () => {
    return checkPermission('Shift', 'create_shift');
  };
  const canViewShift = () => {
    return checkPermission('Shift', 'view_one_shift');
  };
  const canUpdateShift = () => {
    return checkPermission('Shift', 'update_shift');
  };
  const canDeleteShift = () => {
    return checkPermission('Shift', 'delete_shift');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MACHINE

  const canCreateMachine = () => {
    return checkPermission('Machine', 'create_machine');
  };
  const canViewAllMachine = () => {
    return checkPermission('Machine', 'view_all_machine');
  };
  const canViewSingleMachine = () => {
    return checkPermission('Machine', 'view_one_machine');
  };
  const canUpdateMachine = () => {
    return checkPermission('Machine', 'update_machine');
  };
  const canDeleteMachine = () => {
    return checkPermission('Machine', 'delete_machine');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ MACHINE SCHEDULE

  const canCreateMachineSchedule = () => {
    return checkPermission('Machine Schedule', 'create_machine_schedule');
  };
  const canViewAllMachineSchedule = () => {
    return checkPermission('Machine Schedule', 'view_all_machine_schedule');
  };
  const canViewSingleMachineSchedule = () => {
    return checkPermission('Machine Schedule', 'view_machine_schedule');
  };
  const canUpdateMachineSchedule = () => {
    return checkPermission('Machine Schedule', 'update_machine_schedule');
  };
  const canDeleteMachineSchedule = () => {
    return checkPermission('Machine Schedule', 'delete_machine_schedule');
  };

  //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ customer ledger

  const canDownloadPdfCashSales = () => {
    return checkPermission('Sales Cash', 'view_sales_cash_pdf');
  };
  const canDownloadImageCashSales = () => {
    return checkPermission('Sales Cash', 'view_sales_cash_jpg');
  };
  const canDownloadPdfSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'salesInvoice_pdf');
  };
  const canDownloadSalesinvoiceImage = () => {
    return checkPermission('Sales Invoice', 'view_salesInvoice_jpg');
  };
  const canDownloadExcelSales = () => {
    return checkPermission('Sales Invoice', 'salesInvoice_excel');
  };
  const canDownloadSalesHtml = () => {
    return checkPermission('Sales Invoice', 'salesInvoice_html');
  };
  const canSingleExcelSalesinvoice = () => {
    return checkPermission('Sales Invoice', 'view_salesInvoice_excel');
  };
  const canSingleExcelSalesCash = () => {
    return checkPermission('Sales Cash', 'view_sales_cash_excel');
  };
  const canSalesCashHtml = () => {
    return checkPermission('Sales Cash', 'sales_cash_html');
  };
  const canDownloadExcelSalescash = () => {
    return checkPermission('Sales Cash', 'sales_cash_excel');
  };
  const canDownloadPdfCashPurchase = () => {
    return checkPermission('Purchase Cash', 'view_purchase_cash_pdf');
  };
  const canDownloadHtmlCashPurchase = () => {
    return checkPermission('Purchase Cash', 'purchase_cash_html');
  };
  const canDownloadImageCashPurchase = () => {
    return checkPermission('Purchase Cash', 'view_purchase_cash_jpg');
  };
  const canDownloadExcelCashPurchase = () => {
    return checkPermission('Purchase Cash', 'view_purchase_cash_excel');
  };
  const canDownloadAllExcelCashPurchase = () => {
    return checkPermission('Purchase Cash', 'purchase_cash_excel');
  };
  const canDownloadPdfPurchaseInvoice = () => {
    return checkPermission('Purchase Invoice', 'purchaseInvoice_pdf');
  };
  const canDownloadHtmlPurchaseInvoice = () => {
    return checkPermission('Purchase Invoice', 'purchaseInvoice_html');
  };
  const canDownloadImagePurchaseInvoice = () => {
    return checkPermission('Purchase Invoice', 'purchaseInvoice_jpg');
  };
  const canDownloadPurchaseInvoiceExcel = () => {
    return checkPermission('Purchase Invoice', 'purchaseInvoice_excel');
  };
  const canDownloadAllPurchaseInvoiceExcel = () => {
    return checkPermission('Purchase Invoice', 'purchaseInvoice_excel');
  };

  //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ dash board ++++++++++++++++++++++++

  const canSeeTotalSales = () => {
    return checkPermission('Dashboard', 'total_sales');
  };
  const canSeeTotalPurchase = () => {
    return checkPermission('Dashboard', 'total_purchase');
  };
  const canSeeTotalReceive = () => {
    return checkPermission('Dashboard', 'total_receive');
  };
  const canSeeTotalPayment = () => {
    return checkPermission('Dashboard', 'total_payment');
  };
  const canSeeTotalCashReceive = () => {
    return checkPermission('Dashboard Cash', 'total_receive');
  };
  const canSeeTotalCashPayment = () => {
    return checkPermission('Dashboard Cash', 'total_payment');
  };
  const canSeeTotalCashSales = () => {
    return checkPermission('Dashboard Cash', 'total_sales');
  };
  const canSeeTotalCashPurchase = () => {
    return checkPermission('Dashboard Cash', 'total_purchase');
  };
  const canSeeCompanyCashbalance = () => {
    return checkPermission('Company Cash', 'view_company_cash_balance');
  };

  //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ WASTAGE ++++++++++++++++++++++++

  const canseewastage = () => {
    return checkPermission('Wastage', 'create_wastage');
  };
  const canseeupdatewastage = () => {
    return checkPermission('Wastage', 'update_wastage');
  };
  const canseedeletewastage = () => {
    return checkPermission('Wastage', 'delete_wastage');
  };
  const canseeviewwastage = () => {
    return checkPermission('Wastage', 'view_single_wastage');
  };
  const canseeviewAllwastage = () => {
    return checkPermission('Wastage', 'view_all_wastage');
  };
  //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ WASTAGE ++++++++++++++++++++++++

  const canseepurpose = () => {
    return checkPermission('Purpose', 'create_purpose');
  };
  const canseeupdatepurpose = () => {
    return checkPermission('Purpose', 'update_purpose');
  };
  const canseedeletepurpose = () => {
    return checkPermission('Purpose', 'delete_purpose');
  };
  const canseeviewpurpose = () => {
    return checkPermission('Purpose', 'view_single_purpose');
  };
  const canseeviewAllpurpose = () => {
    return checkPermission('Purpose', 'view_all_purpose');
  };

  //  +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Item Category ++++++++++++++++++++++++

  const canseeitemcategory = () => {
    return checkPermission('Item Category', 'create_itemCategory');
  };
  const canseeviewitemcategory = () => {
    return checkPermission('Item Category', 'view_single_itemCategory');
  };
  const canseeviewAllitemcategory = () => {
    return checkPermission('Item Category', 'view_all_itemCategory_group');
  };
  const canseeDeleteitemcategory = () => {
    return checkPermission('Item Category', 'delete_itemCategory');
  };
  const canseeGetallitemcategory = () => {
    return checkPermission('Item Category', 'view_all_itemCategory');
  };
  const canseeUpdateitemcategory = () => {
    return checkPermission('Item Category', 'update_itemCategory');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Accounts +++++++++++++++++++++++++++++++++

  const canseecreateAccount = () => {
    return checkPermission('Account', 'create_account');
  };
  const canseeupdateAccount = () => {
    return checkPermission('Account', 'update_account');
  };
  const canseeviewAccount = () => {
    return checkPermission('Account', 'view_one_account');
  };
  const canseeviewAllAccount = () => {
    return checkPermission('Account', 'view_all_account');
  };
  const canseedeleteAccount = () => {
    return checkPermission('Account', 'delete_account');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Purchase order +++++++++++++++++++++++++++++++++

  const canseecreatePurchaseOrder = () => {
    return checkPermission('Purchase Order', 'create_purchaseOrder');
  };
  const canseeupdatePurchaseOrder = () => {
    return checkPermission('Purchase Order', 'update_purchaseOrder');
  };
  const canseeviewPurchaseOrder = () => {
    return checkPermission('Purchase Order', 'view_single_purchaseOrder');
  };
  const canseeviewAllPurchaseOrder = () => {
    return checkPermission('Purchase Order', 'view_all_purchaseOrder');
  };
  const canseedeletePurchaseOrder = () => {
    return checkPermission('Purchase Order', 'delete_purchaseOrder');
  };

  // ++++++++++++++++++++++++++++++++++++++ LEDGERS +++++++++++++++++++++++++++++++++++++++

  const canseeaccountledger = () => {
    return checkPermission('Ledger', 'account_ledger');
  };
  const canseeaccountcashledger = () => {
    return checkPermission('Ledger Cash', 'account_ledger');
  };
  const canseeaccountledgerjpg = () => {
    return checkPermission('Ledger', 'account_ledger_jpg');
  };
  const canseeaccountledgerhtml = () => {
    return checkPermission('Ledger', 'account_ledger_html');
  };
  const canseeaccountcashledgerjpg = () => {
    return checkPermission('Ledger Cash', 'account_ledger_jpg');
  };
  const canseeaccountcashledgerhtml = () => {
    return checkPermission('Ledger Cash', 'account_ledger_html');
  };
  const canseeaccountledgerexcel = () => {
    return checkPermission('Ledger', 'account_ledger_excel');
  };
  const canseeaccountcashledgerexcel = () => {
    return checkPermission('Ledger Cash', 'account_ledger_excel');
  };
  const canseedaybookledger = () => {
    return checkPermission('Ledger', 'daybook');
  };
  const canseedaybookcashledger = () => {
    return checkPermission('Ledger Cash', 'daybook');
  };
  const canseecashbookcashledger = () => {
    return checkPermission('Ledger Cash', 'cashbook');
  };
  const canseePassbookcashledger = () => {
    return checkPermission('Ledger Cash', 'passbook');
  };
  const canseewalletledger = () => {
    return checkPermission('Claim Cash', 'view_wallet');
  };
  const canseecompanybalacewallet = () => {
    return checkPermission('Claim Cash', 'view_company_wallet');
  };
  const canseewalletuserledger = () => {
    return checkPermission('Ledger Cash', 'wallet_ledger');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Maintenance Type

  const canCreateMaintenanceType = () => {
    return checkPermission('Maintenance Type', 'create_maintenanceType');
  };
  const canViewAllMaintenanceType = () => {
    return checkPermission('Maintenance Type', 'view_all_maintenanceType');
  };
  const canViewSingleMaintenanceType = () => {
    return checkPermission('Maintenance Type', 'view_single_maintenanceType');
  };
  const canUpdateMaintenanceType = () => {
    return checkPermission('Maintenance Type', 'update_maintenanceType');
  };
  const canDeleteMaintenanceType = () => {
    return checkPermission('Maintenance Type', 'delete_maintenanceType');
  };

  // ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ Add Maintenance

  const canCreateAddMaintenance = () => {
    return checkPermission('Maintenance', 'create_maintenance');
  };
  const canViewAllAddMaintenance = () => {
    return checkPermission('Maintenance', 'view_all_maintenance');
  };
  const canViewSingleAddMaintenance = () => {
    return checkPermission('Maintenance', 'view_one_maintenance');
  };
  const canUpdateAddMaintenance = () => {
    return checkPermission('Maintenance', 'update_maintenance');
  };
  const canDeleteAddMaintenance = () => {
    return checkPermission('Maintenance', 'delete_maintenance');
  };

  // PDF +++++++++++++++++++++++++++++++++++
  const canaccountpdf = () => {
    return checkPermission('Ledger', 'account_ledger_pdf');
  };
  const canaccountcashpdf = () => {
    return checkPermission('Ledger Cash', 'account_ledger_pdf');
  };

  return {
    // PROFORMAINVOICE +++++++++++++++++++++++
    checkPermission,
    canCreateProformainvoiceQuotation,
    canUpdateProformainvoiceQuotation,
    canViewProformainvoiceQuotation,
    canViewAllProformainvoiceQuotation,
    canDeProformainvoiceQuotation,
    // USERS +++++++++++++++++++++++++++
    canUserUpdate,
    canUserView,
    canUserLogout,
    canUserResetpassword,
    canUserCreate,
    canUserDelete,
    canUserViewAll,
    canUserViewAllCompany,
    // DELIVERY CHALLAN +++++++++++++++
    canCreateDeliverychallan,
    canUpdateDeliverychallan,
    canDeleteDeliverychallan,
    canViewDeliverychallan,
    canViewAllDeliverychallan,
    // SALES INVOICE ++++++++++++++++++
    canCreateSalesinvoice,
    canUpdateSalesinvoice,
    canDeleteSalesinvoice,
    canDeleteSalesinvoiceItem,
    canViewalesinvoice,
    canViewAllSalesinvoice,
    // SALES INVOICE RETURN +++++++++++
    canCreateSalesinvoiceReturn,
    canViewAllSalesinvoiceReturn,
    // EXPENSE ++++++++++++++++++++++++
    canCreateExpense,
    canUpdateExpense,
    canDeleteExpense,
    canDeleteExpenseItem,
    canViewExpense,
    canViewAllExpense,
    // PURCHASE ORDER +++++++++++++++++
    canCreatePurchaseorder,
    canUpdatePurchaseorder,
    canDeletePurchaseorder,
    canDeletePurchaseorderItem,
    canViewPurchaseorder,
    canViewAllPurchaseorder,
    // PAYMENT ++++++++++++++++++++++++
    canCreatePayment,
    canUpdatePayment,
    canDeletePayment,
    canViewPayment,
    canViewAllPayment,
    // CUSTOMER +++++++++++++++++++++++
    canViewAllCustomer,
    //  VENDOR ++++++++++++++++++++++++
    canCreateVendor,
    canUpdateVendor,
    canDeleteVendor,
    canViewVendor,
    canViewAllVendor,
    // PRODUCT ++++++++++++++++++++++++
    canCreateItem,
    canUpdateItem,
    canDeleteItem,
    canViewItem,
    canViewAllItem,
    // ITEM GROUP +++++++++++++++++++++
    canCreateItemgroup,
    canUpdateItemgroup,
    canViewItemgroup,
    canViewAllItemgroup,
    canDeleteItemgroup,
    // PURCHSE BILL +++++++++++++++++++
    canCreatePurchaseinvoice,
    canUpdatePurchaseinvoice,
    canDeletePurchaseinvoice,
    canViewPurchaseinvoice,
    canViewAllPurchaseinvoice,
    // RECEIPT ++++++++++++++++++++++++
    canCreateReceipt,
    canUpdateReceipt,
    canDeleteReceipt,
    canViewReceipt,
    canViewAllReceipt,
    //  BANK ACCOUNT ++++++++++++++++++
    canCreateBankaccount,
    canUpdateBankaccount,
    canDeleteBankaccount,
    canViewBankaccount,
    canViwAllBankaccount,
    //  DEBIT NOTE ++++++++++++++++++
    canCreateDebitnote,
    canUpdateDebitnote,
    canDeleteDebitnote,
    canViewDebitnote,
    canViwAllDebitnote,
    canDebitnotepdf,
    canDebitnoteImage,
    canDebitnoteHtml,
    canDebitnoteExcel,
    canAllDebitnoteExcel,
    //  DEBIT NOTE CASH++++++++++++++++++
    canCreateDebitnotecash,
    canUpdateDebitnotecash,
    canDeleteDebitnotecash,
    canViewDebitnotecash,
    canViwAllDebitnotecash,
    canDebitnotecashpdf,
    canDebitnotecashImage,
    canDebitnotecashHtml,
    canDebitnotecashExcel,
    canDebitnoteAllCashExcel,
    //  CREDIT NOTE ++++++++++++++++++
    canCreateCreditnote,
    canUpdateCreditnote,
    canDeleteCreditnote,
    canViewCreditnote,
    canViwAllCreditnote,
    canCreditnotepdf,
    canCreditnoteImage,
    canCreditnoteHtml,
    canCreditnotesingleexcel,
    canCreditnoteexcel,
    //  CREDIT NOTE CASH ++++++++++++++++++
    canCreateCreditnotecash,
    canUpdateCreditnotecash,
    canDeleteCreditnotecash,
    canViewCreditnotecash,
    canViwAllCreditnotecash,
    canCreditnotecashpdf,
    canCreditnotecashImage,
    canCreditnotecashHtml,
    canCreditnotecashsingleexcel,
    canCreditnotecashexcel,
    // SALES CASH ++++++++++++++++++++
    canCreateSalescash,
    canUpdateSalescash,
    canDeleteSalescash,
    canViewSalescash,
    canViwAllSalescash,
    // ORDER PROCESSING ++++++++++++++++++++
    canCreateOrderProcessing,
    canUpdateOrderProcessing,
    canDeleteOrderProcessing,
    canViewOrderProcessing,
    canViwAllOrderProcessing,
    // PURCHASE BILL CASH ++++++++++++
    canCreatePurchasebillcash,
    canUpdatePurchasebillcash,
    canDeletePurchasebillcash,
    canViewPurchasebillcash,
    canViwAllPurchasebillcash,
    //  PAYMENT CASH +++++++++++++++++
    canCreatePaymentcash,
    canUpdatePaymentcash,
    canDeletePaymentcash,
    canViewPaymentcash,
    canViwAllPaymentcash,
    // PAYMENT REICEVE CASH +++++++++++
    canCreatePaymentrecievecash,
    canUpdatePaymentrecievecash,
    canDeletePaymentrecievecash,
    canViewPaymentrecievecash,
    canViwAllPaymentrecievecash,
    // SELF EXPENSE +++++++++++
    canCreateSelfExpense,
    canUpdateSelfExpense,
    canDeleteSelfExpense,
    canViewSelfExpense,
    // CLAIM CASH +++++++++++
    canCreateClaimcash,
    canUpdateClaimcash,
    canDeleteClaimcash,
    canViewClaimcash,
    canViwAllClaimcash,
    canViwAllRecieveClaimcash,
    canIsapproveClaimcash,
    // PAYMENT BANK ++++++++++++
    canCreatePaymentBank,
    canUpdatePaymentBank,
    canDeletePaymentBank,
    canViewPaymentBank,
    canViwAllPaymentBank,
    // PAYMENT RECIEVE BANK +++++
    canCreatePaymentRecieveBank,
    canUpdatePaymentRecieveBank,
    canDeletePaymentRecieveBank,
    canViewPaymentRecieveBank,
    canViwAllPaymentRecieveBank,
    // COMPANY ++++++++++++++++++
    canCreateCompany,
    canUpdateCompany,
    canDeleteCompany,
    canViewCompany,
    canViwAllCompany,
    // COMPANY BANK DETAILS +++++++
    canCreateCompanyBank,
    canUpdateCompanyBank,
    canDeleteCompanyBank,
    canViwAllCompanyBank,
    canViewCompanyBankLedger,
    // BILL OF MATERIAL +++++++++
    canCreateBom,
    canUpdateBom,
    canDeleteBom,
    canSettleDeleteBom,
    canViewBom,
    canViwAllBom,
    //  STOKE +++++++++++++++++++
    canViewAllStoke,
    canViewStoke,
    canUpdateStoke,
    //  NOTIFICATION ++++++++++++++
    canViewAllNotification,
    //  USER BANK +++++++++++++++++
    canUserCreateBank,
    canUserUpdateBank,
    canUserViewBank,
    canUserViewAllBank,
    canUserDeleteBank,
    // EMPLOYEE SALARY +++++++++++
    // canCreateEmployeeSalary,
    // canUpdateEmployeeSalary,
    // canDeleteEmployeeSalary,
    // canViewAllEmployeeSalary,
    // canViwAllEmployeeSalary,
    // canEmployee,
    canCreateEmployee,
    canViewEmployee,
    canUpdateEmployee,
    canDeleteEmployee,
    canCreateShift,
    canViewShift,
    canUpdateShift,
    canDeleteShift,
    // MACHINE ++++++++++++++++++
    canCreateMachine,
    canViewAllMachine,
    canViewSingleMachine,
    canUpdateMachine,
    canDeleteMachine,
    // MACHINE SCHEDULE ++++++++++++++++++
    canCreateMachineSchedule,
    canViewAllMachineSchedule,
    canViewSingleMachineSchedule,
    canUpdateMachineSchedule,
    canDeleteMachineSchedule,
    // PDF OF LEDGER +++++++++
    canDownloadPdfCashSales,
    canDownloadImageCashSales,
    canDownloadPdfSalesinvoice,
    canDownloadSalesinvoiceImage,
    canDownloadSalesHtml,
    canSalesCashHtml,
    canSingleExcelSalesinvoice,
    canDownloadExcelSalescash,
    canSingleExcelSalesCash,
    canDownloadExcelSales,
    canDownloadPdfCashPurchase,
    canDownloadHtmlCashPurchase,
    canDownloadExcelCashPurchase,
    canDownloadAllExcelCashPurchase,
    canDownloadImageCashPurchase,
    canDownloadPdfPurchaseInvoice,
    canDownloadHtmlPurchaseInvoice,
    canDownloadImagePurchaseInvoice,
    canDownloadPurchaseInvoiceExcel,
    canDownloadAllPurchaseInvoiceExcel,
    // DASH BOARD +++++++++++++
    canSeeTotalSales,
    canSeeTotalPurchase,
    canSeeTotalReceive,
    canSeeTotalPayment,
    canSeeTotalCashSales,
    canSeeTotalCashPurchase,
    canSeeTotalCashReceive,
    canSeeTotalCashPayment,
    canSeeCompanyCashbalance,
    // WAASTAGE ++++++++++++
    canseewastage,
    canseeviewwastage,
    canseeviewAllwastage,
    canseeupdatewastage,
    canseedeletewastage,
    // PURPOSE ++++++++++++
    canseepurpose,
    canseeviewpurpose,
    canseeviewAllpurpose,
    canseeupdatepurpose,
    canseedeletepurpose,
    // ITEM CATEGORY ++++++++++
    canseeitemcategory,
    canseeviewitemcategory,
    canseeviewAllitemcategory,
    canseeUpdateitemcategory,
    canseeDeleteitemcategory,
    canseeGetallitemcategory,
    // ACCOUNTS ++++++++++++++
    canseecreateAccount,
    canseeupdateAccount,
    canseeviewAccount,
    canseeviewAllAccount,
    canseedeleteAccount,
    // PURCHSE ORDER ++++++++++++++
    canseecreatePurchaseOrder,
    canseeupdatePurchaseOrder,
    canseeviewPurchaseOrder,
    canseeviewAllPurchaseOrder,
    canseedeletePurchaseOrder,
    // LEDGERS ++++++++++++++++++
    canseeaccountledger,
    canseeaccountcashledger,
    canseeaccountledgerjpg,
    canseeaccountcashledgerjpg,
    canseeaccountcashledgerhtml,
    canseeaccountledgerhtml,
    canseeaccountledgerexcel,
    canseeaccountcashledgerexcel,
    canseedaybookledger,
    canseedaybookcashledger,
    canseecashbookcashledger,
    canseewalletledger,
    canseePassbookcashledger,
    canseecompanybalacewallet,
    canseewalletuserledger,
    // MAINTENANCE TYPE ++++++++++
    canDeleteMaintenanceType,
    canUpdateMaintenanceType,
    canViewSingleMaintenanceType,
    canViewAllMaintenanceType,
    canCreateMaintenanceType,
    // MAINTENANC ++++++++++
    canDeleteAddMaintenance,
    canUpdateAddMaintenance,
    canViewSingleAddMaintenance,
    canViewAllAddMaintenance,
    canCreateAddMaintenance,
    // PDF +++++++++++
    canaccountpdf,
    canaccountcashpdf
  };
};

export default useCan;
