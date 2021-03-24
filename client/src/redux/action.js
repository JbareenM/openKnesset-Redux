import {

    //UPDATES
    ADD_SUGGESTIONS,
    UPDATE_SUGGESTIONS,

    //SUGGESTIONS LIST
    FETCH_SUGGESTIONS_REQUEST,
    FETCH_SUGGESTIONS_SUCCESS,
    FETCH_SUGGESTIONS_FAILURE,
    //HAVIRKNESSET
    FETCH_HAVIRKNESSET_REQUEST,
    FETCH_HAVIRKNESSET_SUCCESS,
    FETCH_HAVIRKNESSET_FAILURE,

    //USERS
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,

} from "./actionTypes";


//OFFICER Actions

export const fetchSuggestionsDataRequest = () => ({
    type: FETCH_SUGGESTIONS_REQUEST,
});

export const fetchSuggestionsDataSuccess = (content) => ({
    type: FETCH_SUGGESTIONS_SUCCESS,
    payload: {
        content,
    },
});

export const fetchSuggestionsDataFailure = (error) => ({
    type: FETCH_SUGGESTIONS_FAILURE,
    payload: {
        error,
    },
});

export const addSuggestions = (content) => ({
    type: ADD_SUGGESTIONS,
    payload: {
        content,
    },
});
