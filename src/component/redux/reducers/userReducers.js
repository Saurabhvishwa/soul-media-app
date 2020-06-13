import {SET_AUTHENTICATED , SET_UNAUTHENTICATED,SET_USER_IMAGE,
    STOP_USER_LOADING ,SET_USER_ERRORS,CLEAR_USER_ERRORS, SET_USER , 
    PASSWORD_RESET_FALSE , LIKE_SCREAM ,UNLIKE_SCREAM, LOADING_USER ,  
    SET_USER_DATA , PASSWORD_RESET , NOTIFICATION_MANAGE ,MAKE_NOTIFICATIONS_READ,
    UNSET_USER_IMAGE
} from '../types';

const initialState = {
    loading:false,
    authenticated:false,
    credential:{},
    likes:[],
    notifications:[],
    reset:false,
    set:false,
    errors:null
    
}

export default function(state = initialState , action){
    switch(action.type){
        case LOADING_USER:
            return {
                ...state,
                loading:true
            }

        case SET_AUTHENTICATED :
            return {
                ...state,
                authenticated:true,
            }

        case SET_USER_ERRORS:
            return {
                ...state,
                errors:action.payload,
                loading:false
            }
        case CLEAR_USER_ERRORS:
            return {
                ...state,
                errors:null,
                loading:false
            }

        case STOP_USER_LOADING:
            return {
                ...state,
                loading:false
            }

        case SET_USER_IMAGE:
            return {
                ...state,
                set:true
            }
        case UNSET_USER_IMAGE:
            return {
                ...state,
                set:false
            }

        case SET_UNAUTHENTICATED:
            return initialState;

        case SET_USER:
            return {
                authenticated:true,
                loading:false,
                reset:false,
                set:false,
                errors:null,
                ...action.payload,
            }
        case SET_USER_DATA:
            return {
                ...state,
                loading:false,
                ...action.payload
            }

        case LIKE_SCREAM :
            return {
                ...state,
                likes : [
                    ...state.likes,
                    {
                        handle:state.handle,
                        screamid:action.payload.screamid
                    }
                ]
            }

        case UNLIKE_SCREAM:
            return {
                ...state,
                likes : state.likes.filter(like => like.screamid !== action.payload.screamid)
            }
        
        case NOTIFICATION_MANAGE:
            return {
                ...state,
                notifications : state.notifications.filter (notification => notification.screamid !== action.payload)
                
            }

        case MAKE_NOTIFICATIONS_READ:
            state.notifications.forEach(notification => {
                if(notification.read === false){
                    notification.read = true
                }
            })
            return {
                ...state
            }
        
        case PASSWORD_RESET:
            return {
                ...state,
                loading:false,
                reset:true
            }
        case PASSWORD_RESET_FALSE:
            return {
                ...state,
                reset:false
            }


        default:
            return state;

    }   
}