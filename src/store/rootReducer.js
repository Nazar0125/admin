import { combineReducers } from "redux";
import { userReducer } from "./ducks/user/reducer"
import { templatesReducer } from './ducks/templates/reducer';
import { menuReducer } from "./ducks/menu/reducer";
import {applicationsReducer} from "./ducks/applications/reducer"
export const rootReducer = combineReducers({
    user: userReducer,
    templates: templatesReducer,
    menu: menuReducer,
    applications: applicationsReducer
});
