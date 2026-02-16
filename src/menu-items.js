import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import StoreIcon from '@mui/icons-material/Store';
import PaymentsIcon from '@mui/icons-material/Payments';
import PropaneTankIcon from '@mui/icons-material/PropaneTank';
import HomeIcon from '@mui/icons-material/Home';
import ScannerIcon from '@mui/icons-material/Scanner';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ExtensionIcon from '@mui/icons-material/Extension';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getallPermissions } from 'store/thunk';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
  AccountBalanceIcon: AccountBalanceIcon,
  LoyaltyIcon: LoyaltyIcon,
  ShoppingBasketIcon: ShoppingBasketIcon,
  ProductionQuantityLimitsIcon: ProductionQuantityLimitsIcon,
  ContactMailIcon: ContactMailIcon,
  StoreIcon: StoreIcon,
  PaymentsIcon: PaymentsIcon,
  PropaneTankIcon: PropaneTankIcon,
  HomeIcon: HomeIcon,
  ScannerIcon: ScannerIcon,
  BusinessCenterIcon: BusinessCenterIcon,
  ExtensionIcon: ExtensionIcon
};

const MenuItem = () => {
  const [permissions, setPermissions] = useState([]);
  const dispatch = useDispatch();

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

  const getTypeFromSessionStorage = () => {
    return sessionStorage.getItem('type');
  };

  const getRoleFromSessionStorage = () => {
    return sessionStorage.getItem('role');
  };

  const createConfig = () => {
    const type = getTypeFromSessionStorage();
    return type;
  };

  const createConfig1 = () => {
    const role = getRoleFromSessionStorage();
    return role;
  };

  const checkAllPermissions = (resource, permissionNames) => {
    const rolePermissions = permissions?.find((role) => role.role === createConfig1());

    if (rolePermissions) {
      const permission = rolePermissions?.permissions?.find((res) => res.resource === resource);

      if (permission) {
        return permission.permissions.some((perm) => permissionNames.includes(perm.permission) && perm.permissionValue === true);
      }
    }

    return false;
  };

  const hasAllPermissions = checkAllPermissions('ProFormaInvoice', [
    'get_all_ProFormaInvoice',
    'view_single_ProFormaInvoice',
    'delete_ProFormaInvoice',
    'update_ProFormaInvoice',
    'create_ProFormaInvoice'
  ]);

  const hasAllPermissionsPurchaseorder = checkAllPermissions('Purchase Order', [
    'view_all_purchaseOrder',
    'view_single_purchaseOrder',
    'delete_purchaseOrder',
    'update_purchaseOrder',
    'create_purchaseOrder'
  ]);

  const hasAllPermissionsDebitnotecash = checkAllPermissions('Debit Note Cash', [
    'view_single_debitNote',
    'update_debitNote',
    'create_debitNote',
    'view_all_debitNote',
    'delete_debitNote'
  ]);

  const hasAllPermissionsCreditnotecash = checkAllPermissions('Credit Note Cash', [
    'view_single_creditNote',
    'update_creditNote',
    'create_creditNote',
    'view_all_creditNote',
    'delete_creditNote'
  ]);

  const hasAllpermissionsalesinvoice = checkAllPermissions('Sales Invoice', [
    'create_salesinvoice',
    'update_salesInvoice',
    'delete_salesInvoice',
    'view_single_salesInvoice',
    'view_all_salesInvoice'
  ]);

  const hasAllPermissiondeliverychallan = checkAllPermissions('Delivery Challan', [
    'get_all_deliverychallan',
    'create_deliverychallan',
    'view_deliverychallan',
    'update_deliverychallan',
    'delete_deliverychallan'
  ]);

  const hasAllPermissionDebitnote = checkAllPermissions('Debit Note', [
    'create_debitNote',
    'get_all_debitNote',
    'view_single_debitNote',
    'update_debitNote',
    'delete_debitNote'
  ]);

  const hasAllPermissionCreditnote = checkAllPermissions('Credit Note', [
    'create_creditNote',
    'get_all_creditNote',
    'view_single_creditNote',
    'update_creditNote',
    'delete_creditNote'
  ]);

  const hasAllPermissionPurchaseinvoice = checkAllPermissions('Purchase Invoice', [
    'create_purchase_Invoice',
    'update_purchase_Invoice',
    'delete_purchase_Invoice',
    'view_single_purchase_Invoice',
    'view_all_purchase_Invoice'
  ]);

  const hasAllPermissionSalesCash = checkAllPermissions('Sales Cash', [
    'create_sales_cash',
    'update_sales_cash',
    'delete_sales_cash',
    'view_sales_cash',
    'view_all_sales_cash'
  ]);

  const hasAllPermissionPurchaseinvoiceCash = checkAllPermissions('Purchase Cash', [
    'create_purchase_cash',
    'update_purchase_cash',
    'delete_purchase_cash',
    'view_purchase_cash',
    'view_all_purchase_cash'
  ]);

  const hasAllPermissionExpense = checkAllPermissions('Expense', [
    'create_expense',
    'update_expense',
    'delete_expense',
    'view_expense',
    'view_all_expense'
  ]);

  const hasAllPermissionPaymentCash = checkAllPermissions('Payment Cash', [
    'create_payment',
    'update_payment',
    'delete_payment',
    'view_payment',
    'view_all_payment'
  ]);

  const hasAllPermissionPaymentRecieveCash = checkAllPermissions('Receipt Cash', [
    'create_receipt',
    'update_receipt',
    'delete_receipt',
    'view_receipt',
    'view_all_receipt'
  ]);

  // const hasAllPermissionsClaimcash = checkAllPermissions('Claim Cash', [
  //   'create_claim',
  //   'update_claim',
  //   'delete_claim',
  //   'view_single_claim',
  //   'view_myclaim'
  // ]);

  // const hasAllPermissionsRecieveClaimcash = checkAllPermissions('Claim Cash', ['view_reciveclaim', 'isapproved_claim']);

  const hasAllPermissionsPaymentBank = checkAllPermissions('Payment', [
    'create_payment',
    'update_payment',
    'view_payment',
    'view_all_payment',
    'delete_payment'
  ]);

  const hasAllPermissionsCompany = checkAllPermissions('Company', [
    'create_company',
    'update_company',
    'delete_company',
    'view_all_company',
    'view_single_company'
  ]);

  const hasAllPermissionPaymentRecieveBank = checkAllPermissions('Receipt', [
    'create_receipt',
    'update_receipt',
    'delete_receipt',
    'view_receipt',
    'get_all_receipt'
  ]);

  const hasAllPermissionsItem = checkAllPermissions('Items', [
    'create_item',
    'update_item',
    'delete_item',
    'view_single_item',
    'view_all_item'
  ]);

  const hasAllPermissionsAccount = checkAllPermissions('Account', [
    'create_account',
    'update_account',
    'delete_account',
    'view_one_account',
    'view_all_account'
  ]);

  const hasAllPermissionsItemGroup = checkAllPermissions('Item Group', [
    'create_itemGroup',
    'update_itemGroup',
    'delete_itemGroup',
    'view_single_itemGroup',
    'view_all_itemGroup'
  ]);

  const hasAllPermissionsItemCategory = checkAllPermissions('Item Category', [
    'create_itemCategory',
    'delete_itemCategory',
    'view_all_itemCategory',
    'view_single_itemCategory',
    'update_itemCategory',
    'view_all_itemCategory_group'
  ]);

  // const hasAllPermissionsItemSubCategory = checkAllPermissions('Item Sub Category', [
  //   'create_itemSubCategory',
  //   'update_itemSubCategory',
  //   'delete_itemSubCategory',
  //   'view_single_itemSubCategory',
  //   'view_all_itemSubCategory',
  //   'view_all_itemSubCategory_category'
  // ]);


  const hasAllPermissionsOp = checkAllPermissions('Order Processing', [
    'create_order_processing',
    'update_order_processing',
    'delete_order_processing',
    'view_order_processing',
    'view_all_order_processing'
  ]);

  const hasAllPermissionsBom = checkAllPermissions('Production', [
    'create_production',
    'update_production',
    'delete_production',
    'view_production',
    'view_all_production'
  ]);

  const hasAllPermissionsMachine = checkAllPermissions('Machine', [
    'create_machine',
    'view_all_machine',
    'view_one_machine',
    'update_machine',
    'delete_machine'
  ]);

  const hasAllPermissionsMachineSchedule = checkAllPermissions('Machine Schedule', [
    'create_machine_schedule',
    'view_all_machine_schedule',
    'view_machine_schedule',
    'update_machine_schedule',
    'delete_machine_schedule'
  ]);

  const hasAllPermissionspassbook = checkAllPermissions('Ledger Cash', ['passbook']);
  const hasAllPermissionscashbook = checkAllPermissions('Ledger Cash', ['cashbook']);

  // const hasAllPermissionsPreventivemaintenance = checkAllPermissions('Preventive Maintenance', [
  //   'create_preventive_maintenance',
  //   'view_all_preventive_maintenance',
  //   'view_one_preventive_maintenance',
  //   'update_preventive_maintenance',
  //   'delete_preventive_maintenance'
  // ]);

  const hasAllPermissionsWallet = checkAllPermissions('Claim Cash', ['view_wallet']);

  const hasAllPermissionsEmployee = checkAllPermissions('Employee', [
    'create_employee',
    'update_employee',
    'view_all_employee',
    'view_one_employee',
    'delete_employee'
  ]);

  const hasAllPermissionsBonus = checkAllPermissions('Bonus Config', ['create_bonus', 'update_bonus', 'view_bonus', 'delete_bonus']);

  const hasAllPermissionsShift = checkAllPermissions('Shift', [
    'create_shift',
    'update_shift',
    'view_all_shift',
    'view_one_shift',
    'delete_shift'
  ]);

  return {
    items: [
      {
        id: 'navigation',
        type: 'group',
        icon: icons['HomeIcon'],
        children: [
          {
            id: 'dashboard',
            title: 'Dashboard',
            type: 'item',
            icon: icons['HomeIcon'],
            url: '/dashboard'
          }
        ]
      },
      createConfig() === 'C' && createConfig1() === 'Super Admin'
        ? {
          type: 'group',
          icon: icons['NavigationOutlinedIcon'],
          children: [
            {
              id: 'auth',
              title: 'Authentication',
              type: 'collapse',
              icon: icons['SecurityOutlinedIcon'],
              children: [
                {
                  id: 'permission',
                  title: 'Permission',
                  type: 'item',
                  url: '/permission'
                },
                {
                  id: 'adduser',
                  title: 'User Management',
                  type: 'item',
                  url: '/userlist'
                }
              ]
            }
          ]
        }
        : {},
      {
        type: 'group',
        icon: icons[''],
        children: [
          {
            id: 'Financial Management',
            title: 'Financial Management',
            type: 'collapse',
            icon: icons['AccountBalanceIcon'],
            children: [
              createConfig() === 'C'
                ? {
                  id: 'Cash',
                  title: 'Cash',
                  type: 'collapse',
                  icon: icons['PaymentsIcon'],
                  children: [
                    hasAllPermissionscashbook && {
                      id: 'Cash Book',
                      title: 'Cash Book',
                      type: 'item',
                      url: '/cashbook'
                    },
                    hasAllPermissionspassbook && {
                      id: 'Pass Book',
                      title: 'Pass Book',
                      type: 'item',
                      url: '/passbook'
                    },
                    hasAllPermissionsWallet && {
                      id: 'Wallet',
                      title: 'Wallet',
                      type: 'item',
                      url: '/wallet'
                    },
                    hasAllPermissionSalesCash && {
                      id: 'sales cash',
                      title: 'Sales Cash',
                      type: 'item',
                      url: '/salescashlist'
                    },
                    hasAllPermissionPurchaseinvoiceCash && {
                      id: 'Purchase Cash',
                      title: 'Purchase Cash',
                      type: 'item',
                      url: '/purchaseinvoicecashList'
                    },
                    hasAllPermissionExpense && {
                      id: 'expense',
                      title: 'Expense',
                      type: 'item',
                      url: '/expenselist'
                    },
                    hasAllPermissionPaymentCash && {
                      id: 'payment Cash',
                      title: 'Payment',
                      type: 'item',
                      url: '/paymentCashlist'
                    },
                    hasAllPermissionPaymentRecieveCash && {
                      id: 'Receipt cash',
                      title: 'Receipt',
                      type: 'item',
                      url: '/paymentrecieveList'
                    },
                    {
                      id: 'Report',
                      title: 'Report',
                      type: 'item',
                      url: '/cashreports'
                    },
                    hasAllPermissionsDebitnotecash && {
                      id: 'Debit note cash',
                      title: 'Debit Note Cash',
                      type: 'item',
                      url: '/debitnotecashlist'
                    },
                    hasAllPermissionsCreditnotecash && {
                      id: 'Credit note cash',
                      title: 'Credit Note Cash',
                      type: 'item',
                      url: '/creditnotecashlist'
                    }
                  ]
                }
                : {},
              // createConfig() === 'C'
              //   ? {
              //       id: 'Cliam',
              //       title: 'Cliam',
              //       type: 'collapse',
              //       icon: icons['PaymentsIcon'],
              //       children: [
              //         hasAllPermissionsClaimcash && {
              //           id: 'Demand cash',
              //           title: 'Demand Cash',
              //           type: 'item',
              //           url: '/claimcashlist'
              //         },
              //         hasAllPermissionsRecieveClaimcash && {
              //           id: 'Approve claim',
              //           title: 'Approve Claim',
              //           type: 'item',
              //           url: '/recieveclaimcashlist'
              //         }
              //       ]
              //     }
              //   : {},
              {
                id: 'Vouchers',
                title: 'Vouchers',
                type: 'collapse',
                icon: icons['PaymentsIcon'],
                children: [
                  hasAllpermissionsalesinvoice && {
                    id: 'sales invoice',
                    title: 'Sales Invoice',
                    type: 'item',
                    url: '/salesinvoicelist'
                  },
                  hasAllPermissionPurchaseinvoice && {
                    id: 'Purchase Invoice',
                    title: 'Purchase Invoice',
                    type: 'item',
                    url: '/purchaseinvoiceList'
                  },
                  hasAllPermissionsPaymentBank && {
                    id: 'Payment',
                    title: 'Payment',
                    type: 'item',
                    url: '/paymentbanklist'
                  },
                  hasAllPermissionPaymentRecieveBank && {
                    id: 'Receipt',
                    title: 'Receipt',
                    type: 'item',
                    url: '/paymentrecievebanklist'
                  },
                  {
                    id: 'Report',
                    title: 'Report',
                    type: 'item',
                    url: '/reports'
                  },
                  hasAllPermissions && {
                    id: 'proformainvoice',
                    title: 'Pro Forma Invoice',
                    type: 'item',
                    url: '/proformainvoiceList'
                  },
                  hasAllPermissionsPurchaseorder && {
                    id: 'purchaseorder',
                    title: 'Purchase Order',
                    type: 'item',
                    url: '/purchaseorderlist'
                  },
                  hasAllPermissiondeliverychallan && {
                    id: 'Delivery Challan',
                    title: 'Delivery Challan',
                    type: 'item',
                    url: '/deliverychallanlist'
                  },

                  hasAllPermissionCreditnote && {
                    id: 'credit note',
                    title: 'Credit Note',
                    type: 'item',
                    url: '/creditnotelist'
                  },

                  hasAllPermissionDebitnote && {
                    id: 'debit note',
                    title: 'Debit Note',
                    type: 'item',
                    url: '/debitnotelist'
                  }
                ]
              }
            ]
          }
        ]
      },
      createConfig() === 'C'
        ? {
          type: 'group',
          icon: icons['ProductionQuantityLimitsIcon'],
          children: [
            {
              id: 'Production Management',
              title: 'Production Management',
              type: 'collapse',
              icon: icons['ProductionQuantityLimitsIcon'],
              children: [
                // {
                // id: 'Items',
                // title: 'Items',
                // type: 'collapse',
                // icon: icons['ExtensionIcon'],
                // children: [
                hasAllPermissionsItem && {
                  id: 'Item List',
                  title: 'Item',
                  type: 'item',
                  url: '/productlist'
                },
                // hasAllPermissionsItem && {
                //   id: 'Raw Material List',
                //   title: 'Raw Material',
                //   type: 'item',
                //   url: '/rawmateriallist'
                // },
                // hasAllPermissionsItem && {
                //   id: 'Spare',
                //   title: 'Spare',
                //   type: 'item',
                //   url: '/sparelist'
                // }
                // ]
                // },
                // hasAllPermissionsOp && {
                //   id: 'Order Processing',
                //   title: 'Order Processing',
                //   type: 'item',
                //   url: '/orderprocessing'
                // },
                hasAllPermissionsBom && {
                  id: 'production',
                  title: 'Production',
                  type: 'item',
                  url: '/billofmateriallist'
                },
                hasAllPermissionsOp && {
                  id: 'order processing',
                  title: 'Order Processing',
                  type: 'item',
                  url: '/orderprocessinglist'
                }
              ]
            }
          ]
        }
        : {},
      {
        type: 'group',
        icon: icons['ContactMailIcon'],
        children: [
          {
            id: 'auth',
            title: 'employee management',
            type: 'collapse',
            icon: icons['ContactMailIcon'],
            children: [
              // {
              //   id: 'employee directory',
              //   title: 'Employee Directory',
              //   type: 'item',
              //   url: '/employeedirectory'
              // },

              hasAllPermissionsEmployee && {
                id: 'Employee',
                title: 'Employee',
                type: 'item',
                url: '/employeelist'
              },
              hasAllPermissionsEmployee && {
                id: 'employee salary',
                title: 'Employee Salary',
                type: 'item',
                url: '/employeesalary'
              },
              hasAllPermissionsBonus && {
                id: 'Bonus Config',
                title: 'Bonus Config',
                type: 'item',
                url: '/bonusconfig'
              },
              hasAllPermissionsBonus && {
                id: 'Penalty Config',
                title: 'Penalty Config',
                type: 'item',
                url: '/penaltyconfig'
              },
              hasAllPermissionsBonus && {
                id: 'Holiday List',
                title: 'Holiday List',
                type: 'item',
                url: '/holidayconfig'
              },
              hasAllPermissionsBonus && {
                id: 'Attendance Type',
                title: 'Attendance Type',
                type: 'item',
                url: '/attendeestypeconfig'
              },
              hasAllPermissionsShift && {
                id: 'Shift',
                title: 'Shift',
                type: 'item',
                url: '/shift'
              },
              hasAllPermissionsEmployee && {
                id: 'Attendance',
                title: 'Attendance',
                type: 'item',
                url: '/Attendance'
              }
              // {
              //   id: 'Report',
              //   title: 'Report',
              //   type: 'item',
              //   url: '/productionreport'
              // }
            ]
          }
        ]
      },
      hasAllPermissionsCompany && {
        type: 'group',
        icon: icons['StoreIcon'],
        children: [
          {
            id: 'auth',
            title: 'Company Management',
            type: 'collapse',
            icon: icons['StoreIcon'],
            children: [
              // {
              //   id: 'Company Profile',
              //   title: 'Company Profile',
              //   type: 'item',
              //   url: '/profile'
              // },
              {
                id: 'Company',
                title: 'Company',
                type: 'item',
                url: '/companylist'
              }
            ]
          }
        ]
      },
      createConfig() === 'C'
        ? {
          type: 'group',
          icon: icons['PropaneTankIcon'],
          children: [
            {
              id: 'auth',
              title: 'Stock Management',
              type: 'collapse',
              icon: icons['PropaneTankIcon'],
              children: [
                {
                  id: 'Stoke',
                  title: 'Stock List',
                  type: 'item',
                  url: '/stocklist'
                }
              ]
            }
          ]
        }
        : {},
      {
        type: 'group',
        icon: icons['ScannerIcon'],
        children: [
          {
            id: 'Machine Management',
            title: 'Machine Management',
            type: 'collapse',
            icon: icons['ScannerIcon'],
            children: [
              hasAllPermissionsMachine && {
                id: 'Machine',
                title: 'Machine',
                type: 'item',
                url: '/machinelist'
              },
              hasAllPermissionsMachineSchedule && {
                id: 'Create Schedule',
                title: 'Create Schedule',
                type: 'item',
                url: '/machineschedulelist'
              },
              {
                id: 'Add Maintenance',
                title: 'Add Maintenance',
                type: 'item',
                url: '/maintenschedulelist'
              }
              // hasAllPermissionsRegularmaintenance && {
              //   id: 'Regular maintenance',
              //   title: 'Regular maintenance',
              //   type: 'item',
              //   url: '/regularmaintenancelist'
              // },
              // hasAllPermissionsPreventivemaintenance && {
              //   id: 'Preventive maintenance',
              //   title: 'Preventive maintenance',
              //   type: 'item',
              //   url: '/preventivemaintenancelist'
              // },
              // hasAllPermissionsBreackdownmaintenance && {
              //   id: 'Breakdown maintenance',
              //   title: 'Breakdown maintenance',
              //   type: 'item',
              //   url: '/breakdownmaintenancelist'
              // }
            ]
          }
        ]
      },
      {
        type: 'group',
        icon: icons['BusinessCenterIcon'],
        children: [
          {
            id: 'general Management',
            title: 'general Management',
            type: 'collapse',
            icon: icons['BusinessCenterIcon'],
            children: [
              hasAllPermissionsAccount && {
                id: 'Account',
                title: "Account's",
                type: 'item',
                url: '/accountlist'
              },
              hasAllPermissionsItemGroup && {
                id: 'Item Group',
                title: 'Item Group',
                type: 'item',
                url: '/itemgrouplist'
              },
              hasAllPermissionsItemCategory && {
                id: 'Item Category',
                title: 'Item Category',
                type: 'item',
                url: '/itemcategorylist'
              },
              {
                id: 'Item Sub Category',
                title: 'Item Sub Category',
                type: 'item',
                url: '/itemsubcategorylist'
              },
              // {
              //   id: 'Wastage',
              //   title: 'Wastage',
              //   type: 'item',
              //   url: '/wastagelist'
              // },
              {
                id: 'Maintenance Type',
                title: 'Maintenance Type',
                type: 'item',
                url: '/maintenancelist'
              },
              {
                id: 'Purpose',
                title: 'Purpose',
                type: 'item',
                url: '/purposelist'
              }
            ]
          }
        ]
      }
    ]
  };
};

export default MenuItem;
