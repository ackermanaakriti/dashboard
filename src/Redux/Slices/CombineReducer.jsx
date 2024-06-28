import { combineReducers } from '@reduxjs/toolkit';
import TopTabSlice from '../TopTabSlice';

import FiscalYearSlice from './FiscalYearSlice';
import CurrencySlice from './CurrencySlice';
import CharofAccSlice from './CharofAccSlice';
import AccountGroupSlice from './AccountGroupSlice';
import VoucherSlice from './VoucherSlice';
import chartOfAccountSlice from './ChartOfAccountSlice';
import CreditorsSlice from './CreditorsSlice';
import PostDataslice from './PostDataslice';
import { companyDataReducers } from '../CustomSlice';
const rootReducer = combineReducers({
  fiscalyear: FiscalYearSlice,
  tabslice:TopTabSlice,
  currency: CurrencySlice,
  accgroup : AccountGroupSlice,
  voucherData: VoucherSlice,
  charofAccountData:chartOfAccountSlice,
  accgroup:AccountGroupSlice,
  postDataSlice:PostDataslice,
  companyDataReducers:companyDataReducers,
 
});
export default rootReducer;