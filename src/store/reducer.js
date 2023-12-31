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
import incidentReducer from './slices/incident';

//marqoola imports
import currencyReducer from './slices/currency'
import industryReducer from './slices/industry';
import subIndustryReducer from './slices/industry'
import organisationReducer from './slices/organisation'
import organisationtreeReducer from './slices/organisation'
import risktoleranceReducer from './slices/risktolerance';
import securityconceptReducer from './slices/securityconcept';
import controlCategoryReducer from './slices/controlcategory';
import assetTypeReducer from './slices/assettype';



import assetReducer from './slices/asset'
import controlReducer from './slices/control'
import riskReducer from './slices/risk'
import controlTemplateReducer from './slices/controltemplate'
import objectiveReducer from './slices/objective'

import divisionSelectorReducer from './slices/division-selector';
import assetSelectorReducer from './slices/asset-selector';
import riskSelectorReducer from './slices/risk-selector'
import objectiveSelectorReducer from './slices/objective-selector'

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
    assettype: assetTypeReducer,
    control: controlReducer,
    controltemplate: controlTemplateReducer,
    risk: riskReducer,
    objective: objectiveReducer,
    divisionselector: divisionSelectorReducer,
    assetselector: assetSelectorReducer,
    riskselector: riskSelectorReducer,
    objectiveselector: objectiveSelectorReducer,
    enumlist: enumReducer,
    enumData: enumDataReducer,
    chat: chatReducer,
    calendar: calendarReducer,
    mail: mailReducer,
    user: userReducer,
    menu: menuReducer,
    incident: incidentReducer
});

export default reducer;
