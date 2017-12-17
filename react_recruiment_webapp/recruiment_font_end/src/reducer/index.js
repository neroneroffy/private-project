/**
 * Created by haita on 2017/12/13 0013.
 */
import { combineReducers } from 'redux';
import { user } from '../redux/user.redux';
import { chatuser } from '../redux/chatuser.redux';
const rootReducer = combineReducers({
    user,
    chatuser
});
export default rootReducer