import {SET_SCREAMS , LIKE_SCREAM , UNLIKE_SCREAM , LOADING_DATA, LOADING_UI, SET_ERRORS ,NOTIFICATION_MANAGE ,SET_SCREAM , ADD_SCREAM, CLEAR_ERRORS , DELETE_SCREAM , STOP_LOADING_UI , SET_COMMENT, SET_SCREAM_ERRORS } from '../types';
import axios from 'axios';

export const getAllScreams = () =>(dispatch) =>{
    dispatch({type:LOADING_DATA});
    
        axios.get('/screams')
        .then(res => {
            if(res.status >= 200 && res.status<300){
                dispatch({
                    type:SET_SCREAMS,
                    payload:res.data
                })
            }
            else throw new Error("Something went wrong.")
        })
        .catch(error => {
            if(error.message === 'Network Error'){
                dispatch({
                    type:SET_SCREAM_ERRORS,
                    payload:{error:"You are disconnected."}
                })
            }
            else if(error.message === 'Request failed with status code 500'){
                dispatch({
                    type:SET_SCREAM_ERRORS,
                    payload:{error:"Couldn't load, try again."}
                })
            }
            else{
                dispatch({
                    type:SET_SCREAM_ERRORS,
                    payload:{error:"Something went wrong. Try again."}
                })
            }
        })
    
}

export const likeScream = (screamid) => (dispatch) => {
    // dispatch({type:LOADING_UI});
    axios.get(`/screams/${screamid}/like`)
    .then(res => {
        dispatch({
            type:LIKE_SCREAM,
            payload:res.data
        })
    })
    .catch(error =>{
        if(error.message === 'Network Error'){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Something went wrong."}
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

export const unlikeScream = (screamid) => (dispatch) => {
    // dispatch({type:LOADING_UI});
    axios.get(`/screams/${screamid}/unlike`)
    .then(res => {
        dispatch({
            type:UNLIKE_SCREAM,
            payload:res.data
        })
    })
    .catch(error =>{
            if(error.message === 'Network Error'){
                dispatch({
                    type:SET_ERRORS,
                    payload:{error:"Something went wrong."}
                })
            }else{
                dispatch({
                    type:SET_ERRORS,
                    payload:error.response.data
                })
            }
    })
}

export const addScream = (screamData) => (dispatch) => {
    dispatch({type:LOADING_UI});

    axios.post('/screams',screamData)
        .then((res) => {
            // setAuthorization(res.data.token);
            dispatch({
                type:ADD_SCREAM,
                payload:res.data
            });
            dispatch({type:CLEAR_ERRORS});
        })
        .catch(error =>{
            if(error.message === 'Network Error'){
                dispatch({
                    type:SET_ERRORS,
                    payload:{error:"Something went wrong"}
                })
            }else{
                dispatch({
                    type:SET_ERRORS,
                    payload:error.response.data
                })
            }
        });
}

export const clearErrors = () => (dispatch) => {
    dispatch({
        type:CLEAR_ERRORS
    })
}

export const deleteScream = (screamid) => (dispatch) => {
    axios.get(`/screams/${screamid}/delete`)
    .then(() => {
        dispatch({
            type:DELETE_SCREAM,
            payload:screamid
        })
        dispatch({
            type:NOTIFICATION_MANAGE,
            payload:screamid
        })
        dispatch({
            type:CLEAR_ERRORS
        })
    })
    .catch(error => {
        if(error.message === 'Network Error'){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Check internet connection"}
            })
        }else{
            dispatch({
                type:SET_ERRORS,
                payload:error.response.data
            })
        }
        
    })
}

export const screamComment = (body , screamid) => (dispatch) => {
    dispatch({
        type:LOADING_UI
    })
    axios.post(`/screams/${screamid}/comment`,body)
    .then((res) => {
        if(res.status === 200){
            dispatch({type:STOP_LOADING_UI})
            dispatch({
                type:SET_COMMENT,
                payload:screamid
            })
        }else throw new Error({error:"Something went wrong."})
    })
    .catch(error => {
        if(error.message === 'Request failed with status code 500'){
            dispatch({type:STOP_LOADING_UI})
            dispatch({
                type:SET_SCREAM_ERRORS,
                payload:{error:"Request failed, try again."}
            })
        }
        else{
            dispatch({type:STOP_LOADING_UI})
            dispatch({
                type:SET_ERRORS,
                payload:error.response.data
            })
        }
    })
}

export const getScream = (screamid) => (dispatch) => {
    dispatch({
        type:LOADING_UI
    })
    axios.get(`/scream/${screamid}`)
    .then(res => {
        if(res.status === 200 && res.status<300){
            dispatch({
                type:SET_SCREAM,
                payload:res.data
            })
            dispatch({type:CLEAR_ERRORS})
        }else throw new Error({error:"Something went wrong"})
    })
    .catch(error => {
        console.log(error);
        if(error.message === 'Network Error'){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Couldn't load, try again."}
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

export const deleteComment = (body , screamid) => (dispatch) => {
    axios.post(`/comment/${screamid}/delete` , body)
    .then(res => {
        if(res.status >= 200 && res.status <300){
            dispatch({
                type:SET_SCREAM,
                payload:res.data
            })
            dispatch({type:CLEAR_ERRORS})
        }
        else throw new Error({error:"Something went wrong."})
    })
    .catch(error => {
        if(error.message === 'Network Error'){
            dispatch({
                type:SET_ERRORS,
                payload:{error:"Something went wrong."}
            })
        }else{
            dispatch({
                type:SET_ERRORS,
                payload:error.response.data
            })
        }
    })
}