// import axios from 'axios';
// import {
//     //COMPANIES LIST
//     FETCH_COMPANIES_REQUEST,
//     FETCH_COMPANIES_SUCCESS,
//     FETCH_COMPANIES_FAILURE,

// } from '../actionTypes';

// // COMPANIES LIST Action Creators

// export const fetchCompaniesRequest = () => ({
//     type: FETCH_COMPANIES_REQUEST
// });

// export const fetchCompaniesSuccess = (content) => ({
//     type: FETCH_COMPANIES_SUCCESS,
//     payload: {
//         content
//     }
// });

// export const fetchCompaniesFailure = (error) => ({
//     type: FETCH_COMPANIES_FAILURE,
//     payload: {
//         error
//     }
// });


// export function fetchCompanies() {
//     return dispatch => {
        
//         dispatch(fetchCompaniesRequest())
//         return axios.post('/proxy/get-all-Corporates', {
//             "fundname": "מור",
//             "chanell": "גמל/פנסיה"
//         })
//             .then(res => {
//                 console.log('inside the get companies().then')
//                 console.log(res.data.allResult);
//                 dispatch(fetchCompaniesSuccess(res.data.allResult))
//             })
//             .catch(error => {
//                 dispatch(fetchCompaniesFailure(error.message))
//             })
//     }
// }