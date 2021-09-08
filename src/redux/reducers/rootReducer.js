import { combineReducers } from 'redux';
import postReducer from './postReducer';
import projectPostReducer from './projectPostReducer';
import categoryReducer from './categoryReducer';
import accoutReducer from './accoutReducer'

const rootReducer = combineReducers({
    postReducer,
    projectPostReducer,
    categoryReducer,
    accoutReducer,
});

export default rootReducer;
