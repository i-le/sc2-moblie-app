/*
核心管理
*/

import {createStore, applyMiddleware} from 'redux'
import reducers from './Reducers'
import thunk from 'redux-thunk' //异步
import {composeWithDevTools} from 'redux-devtools-extension';

//向外暴露store 对象

export default createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))