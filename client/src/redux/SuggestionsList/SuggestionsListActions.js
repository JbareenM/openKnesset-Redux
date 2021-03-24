import {
    //COMPANIES LIST
    FETCH_SUGGESTIONS_REQUEST,
    FETCH_SUGGESTIONS_SUCCESS,
    FETCH_SUGGESTIONS_FAILURE,

} from '../actionTypes';

// COMPANIES LIST Action Creators

export const fetchSuggestionsRequest = () => ({
    type: FETCH_SUGGESTIONS_REQUEST
});

export const fetchSuggestionsSuccess = (content) => ({
    type: FETCH_SUGGESTIONS_SUCCESS,
    payload: {
        content
    }
});

export const fetchSuggestionsFailure = (error) => ({
    type: FETCH_SUGGESTIONS_FAILURE,
    payload: {
        error
    }
});


export function fetchSuggestions() {
    return dispatch => {

        dispatch(fetchSuggestionsRequest())
        return fetch('/suggestion/byKnessetMemberValidate')
            .then(r => r.json())
            .then(res => {
                console.log('inside the get suggestions().then')
                console.log(res);
                dispatch(fetchSuggestionsSuccess(res));
            })
            .catch(error => {
                dispatch(fetchSuggestionsFailure(error.message))
            })
    }
}