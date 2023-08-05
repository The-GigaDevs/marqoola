// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';
import customerReducer from './slices/customer';
import contactReducer from './slices/contact';
import productReducer from './slices/product';
import enumReducer from './slices/enumerations'
import enumDataReducer from './slices/enumerations'
import chatReducer from './slices/chat';
import calendarReducer from './slices/calendar';
import mailReducer from './slices/mail';
import userReducer from './slices/user';
import cartReducer from './slices/cart';
import kanbanReducer from './slices/kanban';
import menuReducer from './slices/menu';

//marqoola imports
import currencyReducer from './slices/currency'
import industryReducer from './slices/industry';
import subIndustryReducer from './slices/industry'
import organisationReducer from './slices/organisation'
import organisationtreeReducer from './slices/organisation'
import risktoleranceReducer from './slices/risktolerance';
import securityconceptReducer from './slices/securityconcept';
import controlCategoryReducer from './slices/controlcategory';



import assetReducer from './slices/asset'
import controlReducer from './slices/control'
import controlTemplateReducer from './slices/controltemplate'
import objectiveReducer from './slices/objective'

import divisionSelectorReducer from './slices/division-selector';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    snackbar: snackbarReducer,
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-'
        },
        cartReducer
    ),
    kanban: kanbanReducer,
    customer: customerReducer,
    contact: contactReducer,
    product: productReducer,
    organisation: organisationReducer,
    organisationtree: organisationtreeReducer,
    currency: currencyReducer,
    industry: industryReducer,
    subindustry: subIndustryReducer,
    risktolerance: risktoleranceReducer,
    securityconcept: securityconceptReducer,
    controlcategory: controlCategoryReducer,
    asset: assetReducer,
    control: controlReducer,
    controltemplate: controlTemplateReducer,
    objective: objectiveReducer,
    divisionselector: divisionSelectorReducer,
    enumlist: enumReducer,
    enumData: enumDataReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    user: userReducer,
    menu: menuReducer
});

export default reducer;
