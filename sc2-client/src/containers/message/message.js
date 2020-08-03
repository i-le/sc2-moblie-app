/* 
message interface component
*/
import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs, userid) {
  // 1.find each target's lastMsg，save {chat_id: lastMsg} as one object
  const lastMsgObj = {}
  chatMsgs.forEach(msg => {

    /* 
    getting unread message
    */
    // a.对msg进行个体统计(别人发给你，且read标识为未读)
    if (msg.to === userid && !msg.read) {
      msg.unReadCount = 1
    } else {
      msg.unReadCount = 0
    }

    const chatId = msg.chat_id
    // getting saved lastMsg
    const lastMsg = lastMsgObj[chatId]
    if (!lastMsg) {
      lastMsgObj[chatId] = msg
    } else {
      
      // b.累加unReadCount = 已统计的 + 当前msg的
      const unReadCount = lastMsg.unReadCount + msg.unReadCount

      // 如果msg比lastMsg晚，就将msg保存为lastMsg
      if (msg.create_time > lastMsg.create_time) {
        lastMsgObj[chatId] = msg
      }

      // c.将unReadCount保存在最新的lastMsg上
      lastMsgObj[chatId].unReadCount = unReadCount
    }
  })
  // 2.转化成lastMsg数组
  const lastMsgs = Object.values(lastMsgObj)
  // 3.排序，按时间
  lastMsgs.sort(function(m1, m2) {
    // 结果<0, m1放前面
    return m2.create_time - m1.create_time
  })

  console.log("function_getLastMsgs -> lastMsgs", lastMsgs)
  return lastMsgs
}

class Message extends React.Component {
 
  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    // 对chatMsg按chat_id进行分组，取出每组最后一条
    const lastMsgs = getLastMsgs(chatMsgs, user._id)

    return(
      <List style={{marginTop: 50, marginBottom: 50}}>
        {
          lastMsgs.map(msg => {
            // getting target id
            const targetUserId = msg.to === user._id ? msg.from : msg.to
            // getting target id info
            const targetUser = users[targetUserId]
            return (
              <Item extra={<Badge text={msg.unReadCount} />}
                thumb={targetUser.avatar ? require(`../../assets/sc2avatars/${targetUser.avatar}.png`) : null}
                arrow='horizontal'
                key={msg.chat_id}
                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.username}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {}
)(Message)