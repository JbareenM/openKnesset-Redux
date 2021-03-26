import { combineReducers } from "redux";
import SuggestionsListReducer from "./SuggestionsList/SuggestionsListReducer";
// import CompanyReducer from "./Company/CompanyReducer";
// import VotesReducer from "./Votes/VotesReducer";
// import OfficerReducer from './Officer/OfficerReducer';
import UserReducer from './User/UserReducer'

export default combineReducers({
    SuggestionsListReducer,
//   CompanyReducer,
//   VotesReducer,
//   OfficerReducer,
    UserReducer
});