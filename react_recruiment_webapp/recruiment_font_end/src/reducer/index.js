/**
 * Created by haita on 2017/12/13 0013.
 */
import { combineReducers } from 'redux';
import { user } from '../redux/user.redux';
import { chatuser } from '../redux/chatuser.redux';
import { chat } from '../redux/chat.redux';
const rootReducer = combineReducers({
    user,
    chatuser,
    chat
});
export default rootReducer