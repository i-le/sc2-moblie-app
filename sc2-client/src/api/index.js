import ajax from './ajax'

// export function rerRegister() {}
/* 端口号不同，存在跨域
*  解决：1.json,只能解决get； 2. cross 服务器端配置；
*       3.代理（代理服务器，存在于客户端，帮助转发请求）
*  */


//regi api
export const reqRegister = (user) => ajax('/register', user, 'POST')

//login api
export const reqLogin = ({username, password}) => ajax('/login', {username, password}, 'POST')

//updating user asyn action
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')

// getting userinfo asyn action
export const reqUser = () => ajax('/user')

// getting userlist
export const reqUserList = (type) => ajax('/userlist', {type})

// getting current user message list
export const reqChatMsgList = () => ajax('/msglist')

// change msg read to read = true
export const reqReadMsg = (from) => ajax('/readmsg', {from}, 'POST')