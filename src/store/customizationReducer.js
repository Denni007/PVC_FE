// action - state management
import * as actionTypes from './actions';

// ==============================|| CUSTOMIZATION REDUCER ||============================== //

export const initialState = {
  open: false,
  isOpen: true,
  navType: '',
  quotations: [],
  loadingQuotations: false,
  errorQuotations: null,
  purchase: [],
  permipermissions: [],
  isAuthenticated: false,
  user: {},
  error: null
};

const getInitialState = () => {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');

  if (token && user) {
    return {
      ...initialState,
      isAuthenticated: true,
      user: JSON.parse(user)
    };
  }
  return initialState;
};

const customizationReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    case actionTypes.MENU_OPEN:
      return {
        ...state,
        isOpen: action.isOpen
      };
    case actionTypes.MENU_CLOSE:
      return {
        ...state,
        open: action.open
      };
    case actionTypes.MENU_TYPE:
      return {
        ...state,
        navType: action.navType
      };
    case actionTypes.LOGIN_REQUEST:
      return {
        ...state,
        error: null
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null
      };

    case actionTypes.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };
    case actionTypes.FETCH_ALL_PERMISSIONS_SUCCESS:
      return {
        ...state,
        permissions: action.payload
      };
    default:
      return state;
  }
};

export default customizationReducer;
