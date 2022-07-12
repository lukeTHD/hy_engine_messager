import {handleActions} from 'redux-actions';
import {
    SET_CURRENT_USER
} from '../../actions/CurrentUserActions';
const initialState = {
    user:{}
};

export default handleActions(
    {
        [SET_CURRENT_USER]: (state, action) => {
            const {currentUser} = action;
            return {user:currentUser};
        }

    }
    , initialState)

