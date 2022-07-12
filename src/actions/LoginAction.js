import {Alert} from 'react-native';

import {apiHost} from '../config/index';
import httpRequest from '../util/HttpRequest';
import store from '../store';
import {clearDialog} from './DialogAction';
import {clearMessage} from './MessageAction';
import {getItemObject,setItemObject,getAllKeys} from '../util/LocalStorage';
import LocalStoragekey from '../util/LocalStorageKey';
import {setCurrentUser} from './CurrentUserActions';
import stanzaService from '../service'
// import createAction from "redux-actions/es/createAction";


export const loginInit = 'LOGIN_INIT';

export const Login = (param) => async (dispatch, getState) => {

    const {props:{navigation}, value:{userName}} = param;
    var password = ""
    var avatar = 'https://static-staging.mektoube.fr/2/1782/__QMwMjM4cTM/1ITMdbc7ca50f454e089710827b328d7edb098c2b84680d80b4802e93edcfaca8b74344b2.jpg'
    if(userName == "416500"){
        password = "e8428a9e55a063f34f6d9839db92fda2,jVQJsqUgDLwSZIXjuMD9jzBN8PvwjbOUJYXY6SSdBOm8ccazEUlWFpdqYmrNxaqLVyIgiBNvvjsH2gY6pXd8StoNZ7DbrQIvYaFgSDwZfNrTlpKr6z/Q5YO2w7o58G3g42/EYqd1v9b7T0bUHz/wZAT7aiy7aeQ1cTxxpvAk2BfLXPGFB7sED2x4WbCaCVfgmEfWhD0ZzoD7+KWp5hWxevEEZcjyUAjxN5HYa3yfpkvEMixDbQqeoULFW6JGiX3B1iU7DhXZohZ68eIUnuz09FcPk3loXpFXWbD8pTyD7RAFd4aH479qIAuHgGPatheWerGo7XOlZrZwlUe+l4Z33+Rb/a+qO1tBR0L3qH6DPv1SZ+TjLxx1rd9jEp64pY8RDTrI8h1t/JNTMiakKIkKPTO9IjTE0MCPKG/+l84He0f8iPq7vz2F5xMcWOn4TVd/VHF486VXh+b2qJiu+lkJ5YZmbfBjhnSipfHXfRAeOGo8Zi1jv8POIvbz9pAG+g9dlpHNuD9GJ9XPpD9U+e7LPLpB+8vdkKevn26nMyboHB3/nu+I3qPiTl61RzayTCj9VDVOTvGza2sbtZ2VVPlwalyKFKS+IZ3edpi0Xw=="
    }
    if(userName == "3980"){
        avatar = 'https://static-staging.mektoube.fr/2/3/__AM4kzM/__gMe5ffe48636e976482a5ae8ee0f0e6cabdb9e2c21c0c542afdf7f5c9f2acc40e5eb830.jpg'
        password = "5a9fb806c24015362a430f67a744a65b,jVQLkqwgDLwS5CvH8QP3P8LrRNfFWXfr1dQokk7S6QRk8MoVv5VIqrK4NBNT6y7WXLwRAUFcePXNOdEW6FLe8aXoMOzBb7MGPHPjBf6nt5++tJbi6voHcvlG2m7DHNge2LRqWO3APv5O934F1+8MyGEE72Ysm2lWc+L4xLFa5WZmlJnNYl+wqsjAqJRgF6wKTMaOL8e3WKiA2Hc8OjW8+KovXqAHvEMXsOwiudb8PkwnxpJMQmPKOAW/dr0XWH3Ctqk6Tv3YsgN6xcUuMtnh5c8MNZ8LqnSslgnLH7ozou2iiF2RYf+PDsgUQdIenv0lxjV5wds28B7ZL6VuNkVcHjVfOt5TU+8OfHTe2RbMIrTPCejQaFwKRU3+EqPNPXycgRNHP6cYbMDYKj1sIoKG4ISo7Cq3be6egUNHfLC847/MPqIP8Afrzxn3kpkPxMCT9h/q+qOTkc2neQ3d7dE3nfWzJZULzXrEj76caOn8cRNkBs5OR/8q1hv8LLkfd4YS6F8mraKauDkwSajhPusPVT5ns8Y06Hi5HeqZ62vi6cDbr+drvcHes+NO3nRkNTKd0tQrN2LnWHH11bUTjG7UUO1ua9WxjX3zUmWFar1t9g8="
    }
    try {
        const userObj = {
            accessToken : password,
            status : 1,
            userId : userName,
            userName : userName,
            jid : userName,
            impwd : password,
        }
        const localStorageUser = await getItemObject(LocalStoragekey.USER);
        dispatch(setCurrentUser({...userObj,avatar: avatar}));
        if(localStorageUser) {
            if (localStorageUser.jid && localStorageUser.jid == userObj.jid) {
                //缓存用户信息与新用户信息一致
            } else {
                //不一致清除redux-persist
                dispatch(clearDialog());
                dispatch(clearMessage());
            }
        }
        await setItemObject(LocalStoragekey.USER,userObj);
        if(stanzaService.client && stanzaService.client.xmppClient){
            stanzaService.client.xmppClient.disconnect();
        }

        stanzaService.config({username:userObj.jid,password:userObj.impwd});
        stanzaService.client.init({navigation});
        stanzaService.client.xmppClient.connect();
        dispatch({type: loginInit, payload: {user:userObj}})
            navigation.reset({index:0,routes:[{name:'mainStack'}]})

    } catch (err) {
        console.log(err)
    }

}
export const cleanLogin = (props) => async (dispatch, getState) => {
    const {navigation} = props;
    const {LoginReducer: { data: { user } } } = getState()
    const userObj = {
        accessToken : "",
        status : user.status,
        userId : user.userId,
        userName : user.userName,
        jid :user.jid,
        impwd : user.impwd,
    }

    await setItemObject(LocalStoragekey.USER,userObj);
    dispatch({ type: loginInit, payload: { user: userObj } })
    navigation.reset({index:0,routes:[{name:'welcomeStack'}]})
}

