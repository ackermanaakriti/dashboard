import { combineReducers } from '@reduxjs/toolkit';
import TopTabSlice from '../TopTabSlice';

import FiscalYearSlice from './FiscalYearSlice';
import CurrencySlice from './CurrencySlice';
import CharofAccSlice from './CharofAccSlice';
import AccountGroupSlice from './AccountGroupSlice';
import VoucherSlice from './VoucherSlice';
const rootReducer = combineReducers({
  fiscalyear: FiscalYearSlice,
  tabslice:TopTabSlice,
  currency: CurrencySlice,
  charofacc: CharofAccSlice,
  accgroup : AccountGroupSlice,
  voucherD: VoucherSlice
});
export default rootReducer;