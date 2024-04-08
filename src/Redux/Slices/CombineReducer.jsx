import { combineReducers } from '@reduxjs/toolkit';
import TopTabSlice from '../TopTabSlice';

import FiscalYearSlice from './FiscalYearSlice';
import CurrencySlice from './CurrencySlice';
import CharofAccSlice from './CharofAccSlice';
import AccountGroupSlice from './AccountGroupSlice';
const rootReducer = combineReducers({
  fiscalyear: FiscalYearSlice,
  tabslice:TopTabSlice,
  currency: CurrencySlice,
  charofacc: CharofAccSlice,
  accgroup : AccountGroupSlice
});
export default rootReducer;