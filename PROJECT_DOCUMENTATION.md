# PVC_FE Project Documentation

Last analyzed: 2026-07-05

This document is the primary project reference. Before making code changes, review this file to understand the current implementation. After any change that affects structure, behavior, dependencies, routes, APIs, state, configuration, permissions, or business flow, update this document in the same change.

## Recent Updates

- 2026-07-10: Product Costing product-rate table now highlights the Net Rate column and uses an explicit content width with visible horizontal/vertical scrollbars so right-side pricing columns remain reachable.
- 2026-07-10: Product Costing product-rate table now uses a content-width layout with horizontal scrolling when needed. Numeric price columns stay readable without forced shrinking, while long descriptions can wrap inside a wider description column.
- 2026-07-10: Product Costing product-rate rows now include `DISC %` and `PRICE LIST` after Final Value. Price List is calculated as product weight * MRP multiplier, and Disc % is calculated from the difference between Price List and Final Value.
- 2026-07-10: Product Costing compacted the Costing Inputs section into a wrapping pricing bar. Inputs now use shorter widths and move onto the next line when space is tight, final value appears in the same bar, and save/reset actions sit directly below the inputs.
- 2026-07-10: Product Costing UI was refreshed for a clearer costing workspace. The hierarchy selectors now sit in one compact Costing Scope panel, costing inputs use a stronger section header with base/average chips, and the product-rate table has integrated search/download controls with emphasized final-value cells.
- 2026-07-09: Product Costing now shows `Base Value / Price Per KG` before recipe selection. Manual Entry lets the user enter the base price directly, while selecting a recipe displays that recipe's final value as the locked base used by Net/Star/Gold/Silver, Ref/CD/TOD, final value, and row calculations.
- 2026-07-09: Product Costing hides the Brass Rate input for the `Pipes` item type because pipe costing is recipe/base-price driven; Brass Rate remains available for future non-pipe item types. The product costing table also removed `PCS/BOX` and `CONV.` columns.
- 2026-07-09: Product Costing table removed the Basic column, and row Net Rate now follows the selected Pricing Tier (`Net`, `Star`, `Gold`, or `Silver`) instead of always using the Net margin.
- 2026-07-09: Product Costing table now focuses on costing values only. Repeated hierarchy columns and Freight were removed because the selected hierarchy is already shown above the table, and per-row `Ref`, `CD`, and `TOD` currency columns were added after Net Rate.
- 2026-07-09: Product Costing final value now follows the selected pricing tier flow: selected tier value (`Net`, `Star`, `Gold`, or `Silver`) plus `Ref`, `CD`, and `TOD` currency amounts. Product rows use the same formula per item weight, so final values no longer use the old MRP multiplier calculation path.
- 2026-07-09: Product Costing settings now stop at Item Category scope while keeping Item Sub Category visible for product browsing/filtering. Selecting a subcategory changes the displayed product rows, but recipe/pricing save and load calls still use only Item Type -> Item Group -> Item Category so all subcategories in that category share one costing recipe/settings set.
- 2026-07-09: Product Costing now calculates `Ref`, `CD`, and `TOD` as currency amounts from the selected base column (`Net`, `Star`, `Gold`, or `Silver`) instead of adding their percentage to the resin/recipe base value. The costing editor includes a `Ref/CD/TOD Base` selector, defaults it to `Net`, saves it as `discountBaseColumn`, and displays zero percent as `Rs. 0.00`.
- 2026-07-09: Recipe add/edit component contribution percentages now calculate from material usage share (`component usage / total usage`) instead of cost share, so equal KG usage displays equal contribution even when material rates differ.
- 2026-07-09: Product Costing UI was tightened to match the operational ERP screens. The page now uses compact hierarchy selector bands, a framed costing-input editor, summary metrics with save/reset icon actions, a searchable sticky-header costing table, and clearer formula notes while preserving the existing scoped costing-setting API flow.
- 2026-07-08: Product Costing now completes the costing-setting flow against the backend. The page loads recipes, fetches the costing setting for the selected Item Type -> Item Group -> Item Category -> Item Sub Category path, replaces static form values with editable API-backed resin/brass/margin/multiplier/recipe fields, recalculates value labels and product rows from the active setting, and saves the selected hierarchy setting through `PUT /costing-setting/scope`.
- 2026-07-08: Recipe Management now uses dedicated raw-material and recipe detail APIs, keeps recipe edit inside the Recipe Management page, and sends the full recipe calculation payload on update. Recipe components now store `raw_material_id`, material name, usage, rate, and total so raw-material rate changes can sync recipe totals. Raw-material search and edit validation were hardened, and the raw-material detail view now displays raw-material fields instead of stale item/product fields.
- 2026-07-08: Product List and Product View now show the imported item hierarchy and product physical fields. The list includes Item Type, Item Group, Item Category, Item Sub Category, size, weight, unit, HSN, GST, sales price, and audit users. The detail view shows hierarchy, size, weight, pricing/tax, stock flags, low-stock quantity, and item classification flags. The add/edit item drawer now includes `size`, preserves zero/false values from imported products, and continues to submit `itemTypeId`, group/category/subcategory, `weight`, pricing/tax, stock flags, and classification flags.
- 2026-07-07: Product Costing now reads imported `size` and existing `weight` from item rows where available; other costing columns remain placeholders until backed by dedicated pricing logic.
- 2026-07-07: The Item drawer now treats Item Type as the first step in the item hierarchy. Selecting an Item Type filters Item Group options through `fetchAllItemGroupByType`, clears downstream group/category/subcategory selections, and sends `itemTypeId` in item create/update payloads. Creating an Item Group from the Item drawer preselects the active Item Type.
- 2026-07-07: Product Costing now loads its selection structure dynamically from the item taxonomy APIs instead of hardcoded labels. The page uses upper hierarchy tabs for Item Type -> Item Group -> Item Category -> Item Sub Category through `viewAllItemType`, `fetchAllItemGroupByType`, `fetchAllItemcategory`, and `getAllItemSubCategoryByCategory`; lower category/subcategory buttons were removed so the product table follows the selected hierarchy path. Item Group loading falls back to the all-groups API when the by-type API returns no rows, and costing rows are populated from `fetchAllProducts` with client-side taxonomy filtering by `itemTypeId`.
- 2026-07-07: Fixed item type integration by aligning the frontend item type list thunk with `GET /itemType/get_all_itemType`. Product create/update now sends optional item subcategory as `null` when no subcategory is selected, matching backend optional subcategory handling.

## Project Overview

PVC_FE is a React-based ERP/admin frontend for a PVC/manufacturing business workflow. It manages company accounts, users and permissions, finance vouchers, cash and bank flows, sales and purchase documents, stock, production, bill of material, machines, employees, attendance, maintenance, notifications, and reports.

The project started from the Materially Free React Material UI Dashboard template and has been customized into a domain-specific application. It is a frontend-only repository. The backend API, database migrations, and concrete database model definitions are not present in this codebase; schema and relationships in this document are inferred from frontend entities, routes, payload usage, and API endpoint names.

## Technology Stack

- React 18 with Create React App.
- React Router v6 for route configuration and nested layouts.
- Redux and Redux Toolkit store configuration, with hand-written action constants and thunk-style async action creators.
- Material UI v4/v5 packages, MUI icons, and custom theme overrides.
- Formik and Yup for form state and validation in selected forms.
- Axios for HTTP requests.
- React Toastify for user notifications.
- File Saver for report/document downloads.
- React Google reCAPTCHA on login when configured.
- ApexCharts/react-apexcharts are available, though dashboard charts are mostly commented in current code.
- Sass/SCSS for global theme styles.

## Root Structure

```text
PVC_FE/
  .env
  .env.development
  .env.qa
  .eslintrc
  .gitignore
  .gitlab-ci.yml
  .prettierrc
  config-overrides.js
  jsconfig.json
  LICENSE
  package.json
  package-lock.json
  yarn.lock
  README.md
  PROJECT_DOCUMENTATION.md
  public/
    favicon.svg
    index.html
  src/
    assets/
      images/
      scss/
    component/
    layout/
    routes/
    service/
    store/
    themes/
    ui-component/
    views/
    config.js
    disabledtools.js
    index.js
    menu-items.js
    serviceWorker.js
```

## Important Source Folders

```text
src/assets
  images/                         Static app images, logos, backgrounds, avatars.
  scss/                           Theme variables and global styles.

src/component
  Loader/                         Loading indicator.
  reports/financial report/       Bank/ledger/daybook report screens.
  reports/financial cash report/  Cash ledger, cashbook, passbook report screens.
  addparty.js                     Account/party creation helper component.
  details.js                      Shared detail component.
  itemcategory.js                 Item category helper component.
  itemgruop.js                    Item group helper component.
  ItemSubCategory.js              Item subcategory helper component.
  itemtype.js                     Item type helper component.
  Loadable.js                     Suspense/lazy loading wrapper.
  maintenancetype.js              Maintenance type helper component.
  notification.js                 Notification list/page component.
  productadd.js                   Product creation helper component.
  purposecliam.js                 Claim purpose helper component.
  unit.js                         Unit helper component.
  wastage.js                      Wastage helper component.

src/layout
  App.js                          Root themed app shell.
  MainLayout/                     Authenticated layout with app bar, sidebar, outlet.
  MinimalLayout/                  Public/auth layout.
  NavMotion.js                    Navigation animation wrapper.
  NavigationScroll.js             Scroll reset behavior on route changes.

src/routes
  index.js                        Combines auth and main route trees.
  AuthenticationRoutes.js         Public routes: login, register, privacy policy, 404.
  MainRoutes.js                   Authenticated feature routes and permission guards.

src/service
  Protected.js                    Authentication guard using Redux auth state.
  protectedcash.js                Resource/action permission guard.

src/store
  actions.js                      Large list of Redux action constants and creators.
  customizationReducer.js         App shell state plus authentication state.
  reducer.js                      Root reducer.
  thunk.js                        Central async service layer for nearly all API calls.

src/themes
  index.js                        MUI theme factory using SCSS variables.

src/ui-component
  cards/MainCard.js               Shared card wrapper.

src/views
  Dashboard/                      Dashboard totals and cards.
  Login/                          Login page and login form.
  Register/                       Register page.
  PrivacyPolicy/                  Privacy policy page.
  company managenment/            Company CRUD, company bank ledger.
  employee management/            Older/alternate employee screens.
  employees management/           Employee, salary, attendance, shift, bonus, penalty, holiday flows.
  finacial managenment/           Finance, cash/bank vouchers, claims, ledgers, wallet.
  general managenment/            Accounts/customers, maintenance, purpose, wastage.
  machine managenment/            Machine CRUD, schedules, maintenance schedules.
  permission managenment/         Role permissions, users, permission checking hook.
  production managenment/         Items, BOM, production, order processing, raw materials, recipes.
  purches managenment/            Purchase order, purchase invoice, purchase cash.
  sale managenment/               Sales invoice, sales cash, proforma, challan, debit/credit notes.
  stock managenment/              Stock list and low stock view.
```

Note: several folder names contain typos and spaces, for example `finacial managenment`, `purches managenment`, and `stock managenment`. Preserve existing import paths unless doing a deliberate broad rename.

## Application Architecture

The app is a single-page React frontend.

1. `src/index.js` imports global SCSS, creates the Redux store with `configureStore({ reducer })`, wraps the app in `Provider`, and configures `BrowserRouter` with `basename={process.env.REACT_APP_BASE_NAME}`.
2. `src/layout/App.js` reads customization/auth state from Redux, applies MUI theme via `ThemeProvider`, resets CSS, wraps navigation in `NavigationScroll`, and renders the route tree.
3. `src/routes/index.js` combines `AuthenticationRoutes` and `MainRoutes` with `useRoutes`.
4. Public routes render through `MinimalLayout`.
5. Private routes render through `MainLayout`, wrapped by `Protected`.
6. Most feature routes use `ProtectedRoute`, which checks a resource/action permission before rendering.
7. Feature views dispatch functions from `src/store/thunk.js` for HTTP requests.
8. API responses are either stored in local component state, dispatched to the customization reducer for selected global fields, returned directly from thunks, or used to trigger navigation/toasts/downloads.

## Runtime Data Flow

```text
User action
  -> React view/component
  -> optional Formik/Yup validation
  -> dispatch(thunk from src/store/thunk.js)
  -> createConfig() reads token from sessionStorage
  -> axios request to REACT_APP_BASE_URL
  -> backend response
  -> Redux action and/or returned data
  -> component local state update
  -> toast notification and/or navigation
```

The Redux store is intentionally small at root level. Many feature thunks dispatch request/success/failure actions, but most UI screens also rely on returned data and component-local state.

## Authentication Flow

Login is implemented in `src/views/Login/FirebaseLogin.js` and `loginAdmin` in `src/store/thunk.js`.

1. User enters `mobileno` and `password`.
2. If `REACT_APP_RECAPTCHA_SITE_KEY` is set, the login form requires a reCAPTCHA token.
3. The frontend posts credentials to `POST /user_login`.
4. On success, `loginAdmin` stores these session keys:
   - `token`
   - `type`
   - `role`
   - `username`
   - `userId`
   - `companyId`
   - `user` JSON
5. Redux receives `LOGIN_SUCCESS`, setting `customization.isAuthenticated = true`.
6. Authenticated routes become accessible through `Protected`.
7. Logout calls `POST /user_logout`, clears session storage, dispatches `LOGOUT_SUCCESS`, and navigates away.

The app persists authentication across refreshes through `customizationReducer.getInitialState()`, which checks `sessionStorage.token` and `sessionStorage.user`.

## Authorization Flow

Authorization is role/resource/permission based.

- `src/views/permission managenment/checkpermissionvalue.js` defines `useCan`.
- `useCan` fetches all permissions through `getallPermissions`.
- `checkPermission(resource, permissionName)` decodes the JWT with `jwt-decode`, reads the user role, finds the matching role permission object, then checks the requested resource and permission boolean.
- `src/service/protectedcash.js` exposes `ProtectedRoute`, which renders a component only when `checkPermission` returns true; otherwise it navigates to `/404`.
- `src/menu-items.js` also fetches permissions and uses them to dynamically show/hide sidebar items.
- `type` and `role` from session storage also affect menus. For example, `type === 'C'` gates cash/company-specific menus and `role === 'Super Admin'` gates authentication/permission management.

Important behavior: `checkPermission` currently returns `true` when no role permission object is found. That is a permissive fallback and should be reviewed carefully before security-sensitive changes.

## Main Route Map

Public routes:

| Path | Screen |
| --- | --- |
| `/` | Login |
| `/login` | Login |
| `/privacy-policy` | Privacy policy |
| `/application/register` | Register |
| `*` | Not found |

Authenticated feature groups in `MainRoutes.js`:

| Area | Representative paths |
| --- | --- |
| Dashboard | `/dashboard` |
| Profile/sample | `/profile` |
| User/permission | `/permission`, `/adduser`, `/updateuser/:id`, `/userlist`, `/userview/:id` |
| Finance cash | `/wallet`, `/selfExpense`, `/selfExpenselist`, `/claimcash`, `/claimcashlist`, `/recieveclaimcashlist`, `/salescashlist`, `/purchaseinvoicecashList`, `/paymentcashlist`, `/paymentrecieveList`, `/cashreports`, `/cashbook`, `/passbook` |
| Finance bank/vouchers | `/salesinvoicelist`, `/purchaseinvoiceList`, `/paymentbanklist`, `/paymentrecievebanklist`, `/reports`, `/proformainvoiceList`, `/purchaseorderlist`, `/deliverychallanlist`, `/debitnotelist`, `/creditnotelist` |
| Sales | `/salesinvoice`, `/salesinvoice/:id`, `/salesinvoiceview/:id`, `/salescash`, `/salescash/:id`, `/salescashview/:id`, `/deliverychallan`, `/debitnote`, `/creditnote`, cash note variants |
| Purchases | `/purchaseorderlist`, `/purchaseorder`, `/purchaseinvoice`, `/purchaseinvoicecash` and view/update paths |
| Company | `/companylist`, `/addcompany`, `/addcompany/:id`, `/companyview/:id`, `/singlebankledger` |
| Production | `/productlist`, `/productview/:id`, `/rawmateriallist`, `/sparelist`, `/billofmateriallist`, `/addbillofmaterial`, `/billofmaterialview/:bomId`, `/products`, `/productcosting`, `/recipemanagement`, `/orderprocessing`, `/orderprocessinglist` |
| Stock | `/stocklist` |
| General management | `/accountlist`, `/accountview/:id`, `/itemgrouplist`, `/itemcategorylist`, `/itemsubcategorylist`, `/itemtypelist`, `/maintenancelist`, `/purposelist`, `/wastagelist` |
| Employees | `/employeelist`, `/employeeadd`, `/employeeupdate/:id`, `/employeeview/:id`, `/employeesalary`, `/shift`, `/Attendance`, `/employeeDetails/:employeeId`, bonus/penalty/holiday/attendance type config paths |
| Machines | `/machinelist`, `/machineadd`, `/updatemachine/:id`, `/machineschedulelist`, `/machinescheduleadd`, maintenance schedule paths |
| Reports | `/productionreport`, `/reports`, `/cashreports`, ledger/cashbook/passbook paths |
| Notifications | `/notification` |

## Navigation Model

`src/menu-items.js` returns a menu configuration object at render time. It:

- Fetches permissions from the backend.
- Reads `type` and `role` from session storage.
- Checks groups of permissions to decide whether whole sidebar sections or individual items are visible.
- Uses MUI icons for top-level sections.

Major sidebar groups:

- Dashboard
- Authentication
- Financial Management
- Production Management
- Employee Management
- Company Management
- Stock Management
- Machine Management
- General Management, where item master links are ordered as Account, Item Type, Item Group, Item Category, Item Sub Category, Maintenance Type, and Purpose when permissions allow.

## API Layer

The API layer is concentrated in `src/store/thunk.js`. All URLs are built from:

```text
process.env.REACT_APP_BASE_URL
```

Most authenticated calls use a shared config helper in `thunk.js` that reads `sessionStorage.token` and sends it as an authorization header. Most errors show toast messages; many 401 paths navigate to `/`.

### API Resources

| Resource | Purpose |
| --- | --- |
| `/user_login`, `/user_logout` | Session login/logout |
| `/permission` | Role permission fetch/update |
| `/create_user`, `/get_all_user`, `/view_user`, `/update_user`, `/remove_company` | User management |
| `/company`, `/companybank` | Company, bank account, balance, ledger management |
| `/account` | Account/party/customer ledger account management |
| `/ledger` | Account ledger, cash ledger, daybook, cashbook, passbook, wallet reports |
| `/item`, `/itemGroup`, `/itemCategory`, `/itemSubCategory` | Item master data and categories |
| `/itemType` | Item type master data used by item/product creation |
| `/stock` | Stock view and stock update |
| `/profromainvoice` | Pro forma invoice CRUD |
| `/purchaseOrder` | Purchase order CRUD |
| `/deliverychallan` | Delivery challan CRUD |
| `/salesinvoice` | Sales invoice and cash sales CRUD plus PDFs/images/HTML/Excel |
| `/purchaseinvoice` | Purchase invoice and purchase cash CRUD plus PDFs/images/HTML/Excel |
| `/debitnote`, `/creditnote` | Debit/credit note, cash variants, document exports |
| `/payment`, `/receive` | Bank and cash payments/receipts |
| `/selfExpense`, `/claim`, `/wallet_approve` | Self expenses, claim cash, wallet |
| `/bom` | Bill of material/production |
| `/orderProcessing` | Production/sales order processing and order status |
| `/machine`, `/schedule` | Machines and machine schedules |
| `/maintenanceType`, `/maintenance` | Maintenance master data and maintenance records |
| `/employee`, `/salary`, `/attendance`, `/attendanceType`, `/shift`, `/holiday`, `/leave` | Employee, salary, attendance, shift, holiday, leave workflows |
| `/bonusConfiguration`, `/penaltyConfiguration`, `/systemSettings` | Employee configuration and system settings |
| `/dashboard` or `/Dashboard` | Totals for dashboard cards |
| `/raw-material`, `/recipe` | Raw material and recipe management |

### Endpoint Patterns

Common CRUD patterns:

```text
GET    /<resource>/get_all_...
GET    /<resource>/view_.../:id
POST   /<resource>/create_...
PUT    /<resource>/update_.../:id
DELETE /<resource>/delete_.../:id
```

Cash-specific endpoints often use a `C_` prefix, for example:

```text
GET  /salesinvoice/C_get_all_salesInvoice
POST /salesinvoice/C_create_salesinvoice
PUT  /salesinvoice/C_update_salesinvoice/:id
```

Document export endpoints include:

```text
..._pdf/:id
..._jpg/:id
..._html/:id
..._excel/:id
..._excel?formDate=<date>&toDate=<date>
```

## Business Domains and Inferred Relationships

Because backend models are not included, the following model map is inferred.

### Identity and Permissions

- User belongs to a role and may belong to a company.
- Role has many permission groups.
- Permission group is keyed by resource.
- Resource has many action permissions with boolean `permissionValue`.
- Login token encodes at least `role`.

### Company and Finance

- Company has bank details.
- Company has bank and cash balances.
- Company bank details have ledgers.
- Accounts represent customers, vendors, expense accounts, and ledger parties.
- Ledger reports are generated by account, date range, and cash/bank mode.
- Cash and bank voucher flows are separate:
  - Sales Invoice vs Sales Cash.
  - Purchase Invoice vs Purchase Cash.
  - Payment Bank vs Payment Cash.
  - Receipt Bank vs Receipt Cash.
  - Debit/Credit Note vs Debit/Credit Note Cash.

### Sales and Purchase Documents

- Pro Forma Invoice, Purchase Order, Delivery Challan, Sales Invoice, Purchase Invoice, Debit Note, and Credit Note are document entities.
- Documents likely contain line items, account references, company references, dates, totals, and tax/amount details.
- Document exports can be downloaded as PDF, JPG, HTML, and Excel.
- Order processing has order items and a status update endpoint.

### Production and Stock

- Items are organized by item type, item group, item category, and item subcategory.
- Item Groups can be linked to Item Types. The Item Group list displays the linked Item Type, and the Item Group drawer sends `itemTypeId` with create/update payloads.
- Items have an item type. The item drawer loads item types from `/itemType/get_all_itemType`, sends the selected type ID as `itemTypeId`, and filters item groups by that type before category/subcategory selection.
- Product list/detail screens display item hierarchy, imported `size`, `weight`, unit, pricing/tax fields, and item stock/classification flags. The item add/edit drawer includes `size` and preserves imported zero/false values during edits.
- Product Costing follows the same hierarchy dynamically: Item Type -> Item Group -> Item Category -> Item Sub Category.
- Product Costing displays imported product size and weight when those fields exist on item rows.
- Items include finished goods, raw materials, and spares.
- Stock records are associated with items and can be updated.
- Bill of Material links production output to item/raw material consumption.
- Product costing and recipe management build on item, raw material, and recipe entities.
- Raw material and recipe endpoints include `companyId`, read from session storage.

### Employees

- Employee records support salary, attendance, shift, bonus, penalty, holiday, attendance type, and leave flows.
- Attendance can be fetched by date, updated in bulk, and reported by month/year/employee.
- Employee salary has salary payment records.

### Machines and Maintenance

- Machines have schedules.
- Maintenance type is master data.
- Maintenance records are separate from maintenance types and can be created, updated, viewed, deleted, and listed.

## Database Schema Notes

No database schema files, migrations, ORM models, SQL, or backend code exist in this repository. Treat the frontend API contracts as the available schema source.

Inferred high-level schema:

```text
Company
  has many CompanyBankDetails
  has many Users
  has many Items
  has many Accounts
  has balances and ledgers

User
  belongs to Company
  belongs to Role
  has optional UserBankAccounts
  has wallet/claim/self-expense activity

Role
  has many PermissionResource entries

PermissionResource
  resource: string
  permissions: PermissionAction[]

PermissionAction
  permission: string
  permissionValue: boolean

Account
  belongs to Company
  participates in Ledgers, Payments, Receipts, Invoices, Notes

Item
  belongs to ItemGroup/ItemCategory/ItemSubCategory
  belongs to ItemType by itemTypeId
  participates in Stock, BOM, Sales, Purchase, Production

ItemGroup
  belongs to ItemType
  has many ItemCategory records

BillOfMaterial
  references output item/product
  references component items/raw materials

Sales/Purchase/Note/Challan/Order documents
  reference Account, Company, Items/line items, totals, status

Employee
  has Salary records
  has Attendance records
  belongs to Shift

Machine
  has MachineSchedule records
  has Maintenance records
```

Any backend-facing schema change should update this section with confirmed fields and relationships.

## Environment Variables and Configuration

`.env` currently contains:

```text
REACT_APP_VERSION = v2.1.0
GENERATE_SOURCEMAP = false
REACT_APP_BASE_URL = 'https://8845-firebase-pvcapi-1771004602323.cluster-va5f6x3wzzh4stde63ddr3qgge.cloudworkstations.dev/admin'
```

Commented alternatives include:

```text
REACT_APP_BASE_URL = 'https://accountsapiv2.harekrishnaindustries.com/admin'
REACT_APP_BASE_URL = 'http://localhost:8845/admin'
REACT_APP_RECAPTCHA_SITE_KEY='...'
```

`.env.development`:

```text
REACT_APP_VERSION = v2.0.0
REACT_APP_BASE_NAME =
```

`.env.qa`:

```text
REACT_APP_VERSION = v2.0.0
GENERATE_SOURCEMAP = false
PUBLIC_URL = https://codedthemes.com/demos/admin-templates/materially/react/free/stage
REACT_APP_BASE_NAME = demos/admin-templates/materially/react/free/stage
```

`config-overrides.js` configures browser fallbacks for Node core modules:

- `process`
- `stream`
- `crypto`
- `util`
- `buffer`

It also increases Workbox maximum cache file size to 50 MB and provides global `process` and `Buffer`.

`src/config.js` exports:

- `gridSpacing = 3`
- `drawerWidth = 290`

## Third-Party Integrations

- Backend REST API under `REACT_APP_BASE_URL`.
- Google reCAPTCHA through `react-google-recaptcha`, only active when `REACT_APP_RECAPTCHA_SITE_KEY` is configured.
- Material UI component and icon libraries.
- React Toastify notifications.
- File Saver downloads for generated reports and documents.
- JWT decoding with `jwt-decode`.
- CRA service worker scaffolding is present but `serviceWorker.unregister()` is used, so offline/PWA mode is disabled.

## Important Utilities and Services

- `src/store/thunk.js`: API service layer and async Redux actions.
- `createConfig()` in `thunk.js`: builds authenticated Axios config from session storage token.
- `src/service/Protected.js`: blocks unauthenticated users from `MainLayout`.
- `src/service/protectedcash.js`: blocks users without a specific permission.
- `src/views/permission managenment/checkpermissionvalue.js`: central permission hook.
- `src/component/Loadable.js`: wraps lazy imports in a loading state.
- `src/layout/NavigationScroll.js`: resets scroll on navigation.
- `src/menu-items.js`: computes sidebar menu based on role/type/permissions.
- `src/themes/index.js`: central MUI theme and component overrides.

## Error Handling and Notifications

Most async flows:

- Dispatch request action.
- Call Axios.
- Dispatch success or failure action.
- Show success/error toast.
- Navigate after successful create/update/delete where appropriate.
- Redirect/navigate to `/` or login-like flow on 401 in many thunks.

There is no centralized Axios interceptor in the current codebase.

## Reporting and Document Exports

The app supports report exports through backend endpoints. Common export formats:

- PDF
- JPG
- HTML
- Excel

Reports include:

- Account ledger
- Cash account ledger
- Daybook
- Cash daybook
- Cashbook
- Passbook
- Wallet ledger
- Sales invoice/cash documents
- Purchase invoice/cash documents
- Debit/credit notes and cash variants

Date filters are often stored temporarily in session storage under keys such as `RAccountformDate`, `RDaybooktoDate`, `RCashbookformDate`, and similar report-specific names.

## Coding Conventions

Current project conventions:

- JavaScript React components, not TypeScript.
- Functional components and React hooks.
- Material UI for UI primitives.
- Lazy-loaded route components through `Loadable(lazy(...))`.
- Feature folders under `src/views`, grouped by business area.
- Redux action constants are declared in `src/store/actions.js`.
- Async API operations live in `src/store/thunk.js`.
- Many create/update forms accept `navigate` and perform route changes inside thunks.
- Session storage is the main persistence layer for auth/session/report filter values.
- Toasts use `react-toastify`; many success toasts use `src/assets/images/images.png` as an icon.

Guidelines for future work:

- Read this document before editing.
- Keep route, menu, permission, and API documentation synchronized with code changes.
- Prefer reusing existing MUI, thunk, permission, and toast patterns.
- Do not introduce a second API client pattern unless replacing the existing one intentionally.
- Preserve existing path names with spaces/typos unless performing a coordinated rename across imports/routes.
- When adding a protected page, update all of these together:
  - view component
  - thunk/API function if needed
  - route in `MainRoutes.js`
  - menu item in `menu-items.js` if navigable
  - permission resource/action references
  - this documentation

## Key Implementation Details and Assumptions

- The repository is frontend-only.
- Backend response shape is usually expected as `response.data.data`, with `response.data.message` for user-facing success/error messages.
- Many thunks return raw data so components can set local state.
- Some action dispatches may not have reducer cases; this is existing behavior and should be checked before relying on Redux global state.
- Both `package-lock.json` and `yarn.lock` exist. Current README recommends `yarn`, while `package-lock.json` indicates npm has also been used.
- `serviceWorker.unregister()` means PWA caching is not active.
- `BrowserRouter` basename depends on `REACT_APP_BASE_NAME`; incorrect basename can break routing when deployed under a subpath.
- The dashboard fetches many totals in a `useEffect` without a dependency array, so it can call APIs on every render. Treat this carefully if editing dashboard behavior.
- Permission checking currently has a permissive fallback when role permissions are not found.
- API paths use both `/dashboard` and `/Dashboard`, so backend route casing matters.
- The app uses session storage heavily; opening a new browser session requires login/session state to be restored by the backend login flow.

## Future Development Notes

- Consider centralizing Axios configuration and 401 handling in a single client or interceptor.
- Consider splitting `src/store/thunk.js` by domain; it is currently the largest and most critical file.
- Consider normalizing route/resource/permission names to reduce mismatches.
- Consider documenting backend field schemas once backend models are available.
- Consider moving report session-storage keys into constants.
- Consider adding automated tests around permission gating, login persistence, and critical create/update flows.
- Consider adding a route inventory test or script so menu paths and route paths stay synchronized.

## Maintenance Rule

Every future code change must keep this file accurate. Examples:

- New route: update Route Map and Navigation Model.
- New API call: update API Layer and affected business domain.
- New permission: update Authorization Flow and relevant route/menu notes.
- New env var: update Environment Variables.
- New dependency: update Technology Stack or Third-Party Integrations.
- New model/entity: update Business Domains and Database Schema Notes.
- Behavior change: update Application Flow, Key Implementation Details, and any affected sections.
