import userReducer from './userSlice';
import filtersReducer from './filterSlice';

// This is where you would add reducers for slices of the redux store.
// Please ensure that the key for each reducer is the same as the name of the slice (or else the selector will not work).
const reducers = {
  user: userReducer,
  filters: filtersReducer,
};

export default reducers;
