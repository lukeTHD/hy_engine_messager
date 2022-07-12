import {getItemObject, setItemObject} from '../util/LocalStorage';
import LocalStorageKey from '../util/LocalStorageKey';
import * as LoginAction from "./LoginAction"
import {setCurrentUser} from './CurrentUserActions';
import {deleteDialog} from './DialogAction';
import stanzaService from '../service'


export const SHOW_WELCOME = 'SHOW_WELCOME';

/**
 *  如果获取用户信息失败，跳转到登录，换token，如果更新token失败，跳转到登录，如果更新token成功，继续流程
 */
export const show = (props) => async (dispatch) =>  {
   //读取local
    const localUserObj = await getItemObject(LocalStorageKey.USER);
    if(localUserObj) {
        //换取token
        const {accessToken, userId,status,userName,jid,impwd} = localUserObj
       //成功 换accessToken 更新reducer 更新LocalStorage
        if (accessToken) {
            const userObj = {accessToken, status , userId , userName, jid, impwd}
            await setItemObject(LocalStorageKey.USER,userObj);
            dispatch(setCurrentUser({...userObj,avatar: userObj.avatar}));
            await dispatch(deleteDialog(userId));
            stanzaService.config({username:userObj.jid,password:userObj.impwd});
            stanzaService.client.init(props.navigation);
            console.log(stanzaService.client.xmppClient);
            stanzaService.client.xmppClient.connect();
            dispatch({type: LoginAction.loginInit, payload: {user:userObj}})
            props.navigation.reset({index:0,routes:[{name:'mainStack'}]});
        } else {
            props.navigation.reset({index:0,routes:[{name:'loginStack'}]});

        }
    }else {
        props.navigation.reset({index:0,routes:[{name:'loginStack'}]});
    }
}


