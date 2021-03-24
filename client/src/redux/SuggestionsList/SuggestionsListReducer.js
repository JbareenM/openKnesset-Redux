import {
    //COMPANIES LIST
    FETCH_SUGGESTIONS_REQUEST,
    FETCH_SUGGESTIONS_SUCCESS,
    FETCH_SUGGESTIONS_FAILURE,

} from '../actionTypes';

const initialState = {
    suggestions: [],
    loading: false,
    error: ''
};

const SuggestionsListReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_SUGGESTIONS_REQUEST:
            return {
                ...state,
                suggestions: true
            };
        case FETCH_SUGGESTIONS_SUCCESS:
            return {
                loading: false,
                suggestions: action.payload.content,
                error: ''
            };
        case FETCH_SUGGESTIONS_FAILURE:
            return {
                loading: false,
                suggestions: [],
                error: action.payload.error
            };
        default:
            return state;
    }
}

export default SuggestionsListReducer;