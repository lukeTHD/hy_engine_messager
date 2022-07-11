import {handleActions} from 'redux-actions';
import {
    FETCH_DIALOGS,
    ADD_DIALOG,
    SORT_DIALOGS,
    UPDATE_DIALOG,
    UPDATE_DIALOG_UNREAD,
    DELETE_DIALOG,
    CLEAR_DIALOG
} from '../../actions/DialogAction';
import { createDialogByMessage,updateDialog,updateDialogUnread, sortedDialog } from '../ReducerUtil'

const initialState = {
    dialogs:[
        {
            name : '3980',
            photo: 'https://static-staging.mektoube.fr/2/3/__AM4kzM/__gMe5ffe48636e976482a5ae8ee0f0e6cabdb9e2c21c0c542afdf7f5c9f2acc40e5eb830.jpg',
            dialogId : '3980',
            lastMessage: 'No message',
            lastMessageId: 'alkj2349jlajjk34',
            lastMessageDateSent: 1605144573228,
            createdAt: 1605144573228,
            unreadMessagesCount: 0,
            unreadMessagesIds : []
        }
    ]
};

export default handleActions(
    {

        [UPDATE_DIALOG]: (state, action) => {
            const result = updateDialog(action,state.dialogs)
            return {
                ...state,
                dialogs: result
            }
        },
        [CLEAR_DIALOG]: (state, action)=>{
            return initialState;
        },
        [UPDATE_DIALOG_UNREAD]: (state, action) => {
            const result =updateDialogUnread(action,state.dialogs);
            return {...state,dialogs:result};
        },
        [ADD_DIALOG]: (state, action) => {
            const newDialog = createDialogByMessage(action);
            console.log(state);
            return {
                ...state,
                dialogs: [newDialog,...state.dialogs]
            }
        },
        [SORT_DIALOGS]: (state, action) => {
            const result = sortedDialog(action, state.dialogs)
            return {
                ...state,
                dialogs:result
            }
        },

    }, initialState)

