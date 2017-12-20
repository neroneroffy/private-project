/**
 * Created by haita on 2017/12/13 0013.
 */
import { createStore,applyMiddleware,compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';
const state = {}
export default function configStore () {

    const store = createStore(
        rootReducer,
        //传入thunk中间件，实现异步
        compose(
            applyMiddleware(thunk),
            window.devToolsExtension ? window.devToolsExtension() : f=>f
        )

    );
    return store
}