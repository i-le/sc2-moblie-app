import React from 'react'
import {connect} from 'react-redux'
import {NavBar, List, InputItem, Grid, Icon} from 'antd-mobile'
import {sendMsg, readMsg} from '../../redux/Actions'
import QueueAnim from 'rc-queue-anim'

const Item = List.Item


class Chat extends React.Component {
  state = {
    // 当前一条消息
    content: '',
    // 是否显示表情包列表
    isShowEmojis: false
  }

  handleSend = () => {
    // 收集数据
    const from = this.props.user._id 
    const to = this.props.match.params.userid
    const content = this.state.content.trim()
    // 发送请求（发消息）
    if (content) {
      this.props.sendMsg({from, to, content})
    }
    // 重置
    this.setState({
      content: '',
      isShowEmojis: false
    })
  }

  toggleShow = () => {
    // 异步手动派发resize事件，解决表情列表自身显示bug
    const isShowEmojis = !this.state.isShowEmojis
    this.setState({
      isShowEmojis
    })
    if (isShowEmojis) {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  // 在第一次render()之前回调
  componentWillMount() {
    // 初始化表情列表数据
    const emojis =  ['😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣'
    ,'😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣','😀', '😁', '🤣']
    this.emojis = emojis.map(emoji => ({text: emoji}))
  }

  componentDidMount() {
    // 初次进入时，定位到底部
    window.scrollTo(0, document.body.scrollHeight)

    // 发送请求，更新消息未读状态
    // const from = this.props.match.params.userid
    // const to = this.props.user._id
    // this.props.readMsg(from, to)
  }

  componentDidUpdate() {
    // 发送消息后，定位到底部
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentWillUnmount() {
    /* 解决从聊天界面退出，不更新已读问题（异步请求，显示有延时） */
    const from = this.props.match.params.userid
    const to = this.props.user._id
    this.props.readMsg(from, to)
  }

  render() {
    const {user} = this.props
    const {users, chatMsgs} = this.props.chat
    // debugger
    // chatMsgs: A和所有人聊天消息，过滤出和B的聊天
    const meId = user._id
    // 如果没有获取到数据，直接不做任何处理（解决刷新，清除users出现的异常）
    if (!users[meId]) {
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')

    const msgs = chatMsgs.filter(msg => msg.chat_id === chatId)

    // msg target's avatar
    const targetAvatar = users[targetId].avatar
    const targetIcon = targetAvatar ? require(`../../assets/sc2avatars/${targetAvatar}.png`) : null
    return (
      <div className="chat-page">
        <NavBar className='sticky-header' 
          icon={<Icon type='left' />}
          onLeftClick={() => this.props.history.goBack()}
          >
          {users[targetId].username}
        </NavBar>
        <List style={{marginTop: 50, marginBottom: 50}}>
            <QueueAnim type='alpha' delay={100}>
            {
              msgs.map(msg => {
                if (targetId === msg.from) {
                  // target sending msg to me
                  return (
                    <Item key={msg._id} thumb={targetIcon}>
                      {msg.content}
                    </Item>
                  )
                } else {
                  // sending msg to my target
                  return (
                    <Item key={msg._id} className='chat-me' extra='Me'>
                      {msg.content}
                    </Item>
                  )
                }
              })
            }
            </QueueAnim>
        </List>
        <div className="am-tab-bar">
          <InputItem placeholder="Typing.."
            extra={
              <div style={{padding: 5}}>
                {/* <span onClick={() => this.setState({isShowEmojis: true})}
                  style={{marginRight: 5}}
                  >
                  😀
                </span> */}
                <span role="img" aria-label="smile" onClick={this.toggleShow} style={{marginRight: 5}}>😀</span>
                <span onClick={this.handleSend}>Send</span>
              </div>
            }
            onChange={val => this.setState({content: val})}
            value={this.state.content}
            onFocus={() => this.setState({isShowEmojis: false})}
          />
          {
            this.state.isShowEmojis ? (
              <Grid data={this.emojis}
                columnNum={8}
                carouselMaxRow={4}
                isCarousel={true}
                onClick={item => this.setState({content: this.state.content + item.text})}
                >
              </Grid>
            ) : null
          }
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({user: state.user, chat: state.chat}),
  {sendMsg, readMsg}
)(Chat)