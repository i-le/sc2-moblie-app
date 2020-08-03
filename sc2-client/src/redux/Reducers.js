/*
包含n个reducer函数：
根据老得state和指定的action返回一个新的state
*/
import {combineReducers} from 'redux'

import {
    AUTH_SUCCESS,
    ERROR_MSG,
    RECEIVE_USER,
    RESET_USER,
    RECEIVE_USER_LIST,
    RECEIVE_MSG_LIST,
    RECEIVE_MSG,
    MSG_READED
} from './Action-types'

import {getRedirectTo} from '../utils/index'

const initUser = {
    username: '',
    type: '',
    msg: '',
    redirectTo: '' // 需要自动重定向的路由路径
}

//产生user状态的reducer
function user(state = initUser, action) {
    switch (action.type) {
        case AUTH_SUCCESS: //data 是user
        const {type, avatar} = action.data
            return {...state, ...action.data, redirectTo: getRedirectTo(type, avatar)}
        case ERROR_MSG: //data 是msg
            return {...state, msg: action.data}
        case RECEIVE_USER: //data 是USER
            return action.data
        case RESET_USER: //data 是msg
            return {...initUser, msg: action.data}
        default:
            return state
        }
}

const initUserList = []
// 产生userlist状态的reducer
function userList(state=initUserList, action) {
    switch (action.type) {
        case RECEIVE_USER_LIST: //data is userList
        return action.data
        default:
            return state
    }
}

const initChat = {
    // 所有用户简要信息（姓名，头像）
    users: {},
    // 当前用户所有消息
    chatMsgs: [],
    // 未读消息总数
    unReadCount: 0
  }
  function chat(state=initChat, action) {
    switch (action.type) {
      case RECEIVE_MSG_LIST:
        const {users, chatMsgs, userid} = action.data
        console.log("chat -> action.data", action.data)
        return {
          users,
          chatMsgs,
          // 直接在message也可统计
          unReadCount: chatMsgs.reduce((preTotal, msg) => preTotal + (!msg.read && msg.to === userid ? 1 : 0), 0)
        }
      case RECEIVE_MSG:
        // const {chatMsg, userid} = action.data
        const {chatMsg} = action.data
        // debugger
        return {
          users: state.users,
          chatMsgs: [...state.chatMsgs, chatMsg],
          unReadCount: state.unReadCount + (!chatMsg.read && chatMsg.to === action.data.userid ? 1 : 0)
        }
      case MSG_READED:
        const {from, to, count} = action.data
        // state.chatMsgs.forEach(msg => {
        //   if (msg.from === from && msg.to === to && !msg.read) {
        //     msg.read = true
        //   }
        // })
        return {
          users: state.users,
          chatMsgs: state.chatMsgs.map(msg => {
            // 需要更新
            if (msg.from === from && msg.to === to && !msg.read) {
              // 新的msg中read: true,不改变原来的msg
              /* msg.read = true
              return msg */
              return {...msg, read: true}
            } else {
              // 不需要更新
              return msg
            }
          }),
          unReadCount: state.unReadCount - count
        }
      default:
        return state
    }
  }

//向外暴露的状态的结构 ： {user: { }}
export default combineReducers({
    user,
    userList,
    chat
})

