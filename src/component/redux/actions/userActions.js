import {SET_UNAUTHENTICATED ,SET_USER_ERRORS,
    CLEAR_USER_ERRORS,STOP_USER_LOADING, SET_USER, LOADING_UI, CLEAR_ERRORS, 
    SET_ERRORS, LOADING_USER , SET_USER_DATA , MAKE_NOTIFICATIONS_READ , PASSWORD_RESET , 
    PASSWORD_RESET_FALSE,SET_USER_IMAGE,UNSET_USER_IMAGE
    } from '../types';

import axios from 'axios';


// login reducer
export const loginUser = (userData , history) =>(dispatch) => {

    
    dispatch({type:LOADING_USER});

    axios.post('/login',userData)
        .then(async (res) => {
            setAuthorization(res.data.token);
            const check = dispatch(getUserData());
            if(check ===  true){
                dispatch({type:CLEAR_USER_ERRORS})
            }
            history.push('/');
        })
        .catch(error =>{
            if(error.message === 'Network Error'){
                dispatch({
                    type:SET_USER_ERRORS,
                    payload:{error:"You are not connected to the internet"}
                })
            }
            else{
                dispatch({
                    type:SET_USER_ERRORS,
                    payload:error.response.data
                })
            }
        })
}


// sign-up reducer
export const signupUser = (userData , history) => (dispatch) => {

    dispatch({type:LOADING_USER});

    axios.post('/signup',userData)
        .then(res => {
            setAuthorization(res.data.token);
            const check = dispatch(getUserData());
            if(check ===  true){
                dispatch({type:CLEAR_USER_ERRORS})
            }
            history.push('/');
        })
        .catch(error =>{
            if(error.message === 'Network Error'){
                dispatch({
                    type:SET_USER_ERRORS,
                    payload:{error:"You are not connected to the internet"}
                })
            }
            else if(error.message === 'Request failed with status code 500'){
                dispatch({
                    type:SET_USER_ERRORS,
                    payload:{error:error.message}
                })
            }
            else{
                dispatch({
                    type:SET_USER_ERRORS,
                    payload:error.response.data
                })
            }
        })
}

// logout reducer

export const logout = () => (dispatch) => {
    localStorage.removeItem('FBIdToken');
    delete axios.defaults.headers.common['Authorization'];
    dispatch({
        type:SET_UNAUTHENTICATED
    })
}

export const updateProfile = (profileData) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post('/user',profileData)
    .then(() => {
        dispatch({
            type:SET_USER_DATA,
            payload:profileData
        })
        dispatch({type:CLEAR_ERRORS})
    })
    .catch(error => {
        if(error.message === 'Network Error'){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Connection error"}
            })
        }else{
            dispatch({
                type:SET_ERRORS,
                payload:error.response.data
            })
        }
        
    })
}

const setAuthorization = (token) => {

    const FBIdToken = token; 
            localStorage.setItem('FBIdToken' , FBIdToken);
            axios.defaults.headers.common['Authorization'] = FBIdToken;

}

export const getUserData = () => (dispatch) => {
    axios.get('/user')
    .then(async (res) => {
        await dispatch({
        type:SET_USER,
        payload:res.data
        })
        return true;
    })
    .catch(error => {
        if(error.message === 'Network Error'){
            dispatch({
                type:SET_USER_ERRORS,
                payload:{error:"Please check your internet connection."}
            })
        }
        else if(error.message === 'Request failed with status code 500'){
            dispatch({
                type:SET_USER_ERRORS,
                payload:{error:"Request Failed. Try again later."}
            })
        }
        else{
            dispatch({
                type:SET_USER_ERRORS,
                payload:error.response.data
            })
        }
        return true;
    });
}

export const uploadUserImage = (imageData) => (dispatch) => {
    axios.post('/upload' , imageData)
    .then((res) => {
        if(res.status>=200 && res.status<300){
            dispatch(getUserData());
            dispatch({
                type:SET_USER_IMAGE
            })
            
        }else{
            throw new Error({error:"Something went wrong."});
        }
    })
    .catch(error => {
        if(error.message === 'Network Error'){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Check your internet connection then try again."}
            })
        }
        else if(error.message === 'Request failed with status code 500'){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Something went wrong , try again later"}
            })
        }else{
            dispatch({
                type:SET_ERRORS,
                payload:error.response.data
            })
        }
        
    })
}

export const unSetUserImage = () => (dispatch) => {
    dispatch({
        type:UNSET_USER_IMAGE
    })
}

export const makeNotificationsRead = () => (dispatch) => {
    axios.get('user/notifications/read')
    .then(() => {
        dispatch({
            type:MAKE_NOTIFICATIONS_READ,
        })

    })
    .catch(error => {
        console.log(error);
        dispatch({
            type:SET_ERRORS,
            payload:error.response.data
        })
    })
}

export const resetPassword = (data) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post('/user/resetPassword' , data)
    .then(() => {
        dispatch({
            type : PASSWORD_RESET
        })
        dispatch({type:CLEAR_ERRORS})
    })
    .catch(error => {
        if(error.message === 'Network Error'){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Check your internet connection"}
            })
        }
        else{
            dispatch({
                type:SET_ERRORS,
                payload:error.response.data
            })
        }
        
    })
}

export const changePassword = (data) => (dispatch) => {
    dispatch({type:LOADING_UI});
    axios.post('/user/changePassword' , data)
    .then(res => {
        dispatch({
            type : PASSWORD_RESET
        })
        dispatch({type:CLEAR_ERRORS})
    })
    .catch(error => {
        if(error.message === 'Network Error'){
                dispatch({
                    type:SET_ERRORS,
                    payload:{error:"Something went wrong. Try again."}
                })
            }
        else if(error.response.data.error.code){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Incorrect password"}
            })
        }
        else{
        dispatch({
            type:SET_ERRORS,
            payload:error.response.data
        })
    }
    })
}

export const resetUserReset = () => (dispatch) => {
    dispatch({
        type:PASSWORD_RESET_FALSE
    })
}

export const handleUserLoading = () => (dispatch) => {
    dispatch({type:STOP_USER_LOADING})
}

export const clearUserErrors = () => (dispatch) => {
    dispatch({type:CLEAR_USER_ERRORS})
}
