import {SET_SCREAMS , LIKE_SCREAM ,SET_SCREAM_ERRORS,SCREAM_LOADING, CLEAR_SCREAM_ERRORS , UNLIKE_SCREAM , LOADING_DATA, ADD_SCREAM, DELETE_SCREAM , UPDATE_SCREAM_IMAGE , SET_COMMENT , SET_SCREAM } from '../types';

const initialState = {
    screams : [],
    scream : {},
    loading:false,
    errors:null,
    screamLoading:false
}

export default function(state = initialState , action){
    let index;
    switch(action.type){
        case LOADING_DATA :
            return {
                ...state,
                loading:true
            }

        case SET_COMMENT:{
            state.screams.forEach(scream => {
                if(scream.screamid === action.payload){
                    scream.comments += 1;
                }
            })
            return {
                ...state
            }
        }

        case SCREAM_LOADING:
            return {
                ...state,
                screamLoading:true
            }

        case ADD_SCREAM:
            return {
                ...state,
                screamLoading:false,
                screams:[
                    action.payload,
                    ...state.screams
                ]
            }

        case DELETE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamid === action.payload);
            state.screams.splice(index , 1)
            return {
                ...state
            }

        case SET_SCREAMS:
            return {
                ...state,
                screams:action.payload,
                loading:false
            }
        
        case SET_SCREAM:
            return {
                ...state,
                scream:action.payload
            }
        
        case UPDATE_SCREAM_IMAGE:
            state.screams.forEach(scream => {
                if(scream.handle === state.user.handle){
                    scream.imageUrl = action.payload.imageUrl
                }
            })
            return {
                ...state.screams
            }

        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            index = state.screams.findIndex(scream => scream.screamid === action.payload.screamid);
            state.screams[index] = action.payload;
            if(state.scream.screamid === action.payload.screamid){
                state.scream = action.payload;
            }
            return {
                ...state
            }

        case SET_SCREAM_ERRORS:
            return {
                ...state,
            loading:false,
                errors:action.payload
            }

        case CLEAR_SCREAM_ERRORS:
            return {
                ...state,
                loading:false,
                screamLoading:false,
                errors:null
            }

        default :
            return state
    }

}